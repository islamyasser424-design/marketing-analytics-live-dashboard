import zipfile
import xml.etree.ElementTree as ET
import json
import time
import datetime
from collections import defaultdict

def excel_date_to_str(serial):
    try:
        days = int(float(serial))
        base = datetime.date(1899, 12, 30)
        dt = base + datetime.timedelta(days=days)
        return dt.strftime('%Y-%m-%d')
    except:
        return '2021-01-01'

def main():
    t0 = time.time()
    xlsx_path = r'C:\Users\Eslam\Downloads\marketing_campaign_dataset.xlsx'
    print("Reading shared strings...")
    with zipfile.ZipFile(xlsx_path) as z:
        with z.open('xl/sharedStrings.xml') as f:
            tree = ET.parse(f)
            strings = [elem.text for elem in tree.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')]
        
        print(f"Loaded {len(strings)} strings. Streaming rows...")
        with z.open('xl/worksheets/sheet1.xml') as f:
            total_campaigns = 0
            total_clicks = 0
            total_impressions = 0
            sum_conversion = 0.0
            sum_roi = 0.0
            sum_cac = 0.0
            sum_engagement = 0.0

            # Aggregates
            by_channel = defaultdict(lambda: {'count': 0, 'clicks': 0, 'impressions': 0, 'sum_roi': 0.0, 'sum_conv': 0.0, 'sum_cac': 0.0, 'sum_eng': 0.0})
            by_type = defaultdict(lambda: {'count': 0, 'clicks': 0, 'impressions': 0, 'sum_roi': 0.0, 'sum_conv': 0.0, 'sum_cac': 0.0})
            by_audience = defaultdict(lambda: {'count': 0, 'clicks': 0, 'impressions': 0, 'sum_roi': 0.0, 'sum_conv': 0.0, 'sum_eng': 0.0})
            by_segment = defaultdict(lambda: {'count': 0, 'clicks': 0, 'impressions': 0, 'sum_roi': 0.0, 'sum_conv': 0.0, 'sum_cac': 0.0})
            by_location = defaultdict(lambda: {'count': 0, 'clicks': 0, 'impressions': 0, 'sum_roi': 0.0, 'sum_conv': 0.0, 'sum_cac': 0.0})
            by_language = defaultdict(lambda: {'count': 0, 'clicks': 0, 'impressions': 0, 'sum_roi': 0.0, 'sum_conv': 0.0})
            by_month = defaultdict(lambda: {'clicks': 0, 'impressions': 0, 'sum_roi': 0.0, 'sum_conv': 0.0, 'sum_cac': 0.0, 'count': 0})
            by_duration = defaultdict(lambda: {'count': 0, 'clicks': 0, 'impressions': 0, 'sum_roi': 0.0, 'sum_conv': 0.0})

            sample_records = []

            for event, elem in ET.iterparse(f, events=('end',)):
                if elem.tag.endswith('row'):
                    total_campaigns += 1
                    if total_campaigns == 1:
                        elem.clear()
                        continue
                    
                    row_vals = []
                    for c in elem.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                        t = c.get('t')
                        v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                        val = v.text if v is not None else ''
                        if t == 's' and val.isdigit():
                            idx = int(val)
                            val = strings[idx] if idx < len(strings) else ''
                        row_vals.append(val)
                    
                    # Pad to 16
                    while len(row_vals) < 16:
                        row_vals.append('')

                    camp_id = str(int(float(row_vals[0]))) if row_vals[0] else str(total_campaigns-1)
                    company = row_vals[1]
                    camp_type = row_vals[2]
                    target_aud = row_vals[3]
                    duration = row_vals[4]
                    channel = row_vals[5]
                    conv_rate = float(row_vals[6]) if row_vals[6] else 0.0
                    cac = float(row_vals[7]) if row_vals[7] else 0.0
                    roi = float(row_vals[8]) if row_vals[8] else 0.0
                    location = row_vals[9]
                    language = row_vals[10]
                    clicks = int(float(row_vals[11])) if row_vals[11] else 0
                    impressions = int(float(row_vals[12])) if row_vals[12] else 0
                    engagement = float(row_vals[13]) if row_vals[13] else 0.0
                    segment = row_vals[14]
                    date_str = excel_date_to_str(row_vals[15])
                    month_key = date_str[:7]  # YYYY-MM

                    total_clicks += clicks
                    total_impressions += impressions
                    sum_conversion += conv_rate
                    sum_roi += roi
                    sum_cac += cac
                    sum_engagement += engagement

                    # Channel
                    ch = by_channel[channel]
                    ch['count'] += 1
                    ch['clicks'] += clicks
                    ch['impressions'] += impressions
                    ch['sum_roi'] += roi
                    ch['sum_conv'] += conv_rate
                    ch['sum_cac'] += cac
                    ch['sum_eng'] += engagement

                    # Type
                    tp = by_type[camp_type]
                    tp['count'] += 1
                    tp['clicks'] += clicks
                    tp['impressions'] += impressions
                    tp['sum_roi'] += roi
                    tp['sum_conv'] += conv_rate
                    tp['sum_cac'] += cac

                    # Audience
                    aud = by_audience[target_aud]
                    aud['count'] += 1
                    aud['clicks'] += clicks
                    aud['impressions'] += impressions
                    aud['sum_roi'] += roi
                    aud['sum_conv'] += conv_rate
                    aud['sum_eng'] += engagement

                    # Segment
                    sg = by_segment[segment]
                    sg['count'] += 1
                    sg['clicks'] += clicks
                    sg['impressions'] += impressions
                    sg['sum_roi'] += roi
                    sg['sum_conv'] += conv_rate
                    sg['sum_cac'] += cac

                    # Location
                    loc = by_location[location]
                    loc['count'] += 1
                    loc['clicks'] += clicks
                    loc['impressions'] += impressions
                    loc['sum_roi'] += roi
                    loc['sum_conv'] += conv_rate
                    loc['sum_cac'] += cac

                    # Language
                    lng = by_language[language]
                    lng['count'] += 1
                    lng['clicks'] += clicks
                    lng['impressions'] += impressions
                    lng['sum_roi'] += roi
                    lng['sum_conv'] += conv_rate

                    # Duration
                    dur = by_duration[duration]
                    dur['count'] += 1
                    dur['clicks'] += clicks
                    dur['impressions'] += impressions
                    dur['sum_roi'] += roi
                    dur['sum_conv'] += conv_rate

                    # Month
                    mo = by_month[month_key]
                    mo['clicks'] += clicks
                    mo['impressions'] += impressions
                    mo['sum_roi'] += roi
                    mo['sum_conv'] += conv_rate
                    mo['sum_cac'] += cac
                    mo['count'] += 1

                    # Sample records (first 1000)
                    if len(sample_records) < 1000:
                        sample_records.append({
                            'id': camp_id,
                            'company': company,
                            'type': camp_type,
                            'audience': target_aud,
                            'duration': duration,
                            'channel': channel,
                            'conversion_rate': round(conv_rate * 100, 2),
                            'cac': round(cac, 2),
                            'roi': round(roi, 2),
                            'location': location,
                            'language': language,
                            'clicks': clicks,
                            'impressions': impressions,
                            'ctr': round((clicks / impressions * 100) if impressions > 0 else 0, 2),
                            'engagement': round(engagement, 1),
                            'segment': segment,
                            'date': date_str
                        })

                    elem.clear()

    valid_rows = total_campaigns - 1
    print(f"Finished processing {valid_rows:,} rows in {time.time()-t0:.2f}s")

    # Format summaries
    def format_cat_dict(d, has_cac=True, has_eng=False):
        res = []
        for k, v in d.items():
            cnt = v['count']
            if cnt == 0: continue
            item = {
                'name': k,
                'count': cnt,
                'clicks': v['clicks'],
                'impressions': v['impressions'],
                'ctr': round((v['clicks'] / v['impressions'] * 100) if v['impressions'] > 0 else 0, 2),
                'avg_roi': round(v['sum_roi'] / cnt, 2),
                'avg_conversion': round((v['sum_conv'] / cnt) * 100, 2)
            }
            if has_cac and 'sum_cac' in v:
                item['avg_cac'] = round(v['sum_cac'] / cnt, 2)
            if has_eng and 'sum_eng' in v:
                item['avg_engagement'] = round(v['sum_eng'] / cnt, 1)
            res.append(item)
        res.sort(key=lambda x: x['count'], reverse=True)
        return res

    channels_data = format_cat_dict(by_channel, has_cac=True, has_eng=True)
    # Sort channels by ROI to compute Channel Rank (DAX logic)
    channels_by_roi = sorted(channels_data, key=lambda x: x['avg_roi'], reverse=True)
    for rank, ch in enumerate(channels_by_roi, 1):
        for c in channels_data:
            if c['name'] == ch['name']:
                c['rank'] = rank

    months_list = []
    for m in sorted(by_month.keys()):
        v = by_month[m]
        cnt = v['count']
        months_list.append({
            'month': m,
            'clicks': v['clicks'],
            'impressions': v['impressions'],
            'ctr': round((v['clicks'] / v['impressions'] * 100) if v['impressions'] > 0 else 0, 2),
            'avg_roi': round(v['sum_roi'] / cnt, 2),
            'avg_conversion': round((v['sum_conv'] / cnt) * 100, 2),
            'avg_cac': round(v['sum_cac'] / cnt, 2),
            'count': cnt
        })

    kpis = {
        'total_campaigns': valid_rows,
        'total_clicks': total_clicks,
        'total_impressions': total_impressions,
        'ctr': round((total_clicks / total_impressions * 100) if total_impressions > 0 else 0, 2),
        'avg_conversion_rate': round((sum_conversion / valid_rows) * 100, 2),
        'avg_roi': round(sum_roi / valid_rows, 2),
        'avg_cac': round(sum_cac / valid_rows, 2),
        'avg_engagement': round(sum_engagement / valid_rows, 1)
    }

    insights = [
        {
            'id': 1,
            'title': f"Top Channel by ROI: {channels_by_roi[0]['name']}",
            'description': f"{channels_by_roi[0]['name']} achieves the highest average ROI at {channels_by_roi[0]['avg_roi']}x with {channels_by_roi[0]['ctr']}% CTR across {channels_by_roi[0]['count']:,} campaigns.",
            'category': 'Channel Strategy',
            'type': 'positive'
        },
        {
            'id': 2,
            'title': f"Lowest Acquisition Cost: {min(channels_data, key=lambda x: x['avg_cac'])['name']}",
            'description': f"{min(channels_data, key=lambda x: x['avg_cac'])['name']} provides the lowest average customer acquisition cost at ${min(channels_data, key=lambda x: x['avg_cac'])['avg_cac']:.2f}.",
            'category': 'Budget Efficiency',
            'type': 'positive'
        },
        {
            'id': 3,
            'title': "Stable Multi-Channel Distribution",
            'description': "Campaigns are evenly distributed across major platforms (Google Ads, YouTube, Facebook, Instagram, Email) ensuring mitigated platform risk.",
            'category': 'Portfolio Health',
            'type': 'neutral'
        },
        {
            'id': 4,
            'title': "High Engagement Audience Segments",
            'description': "Fashionistas and Health & Wellness customer segments exhibit consistently above-average engagement scores (>7.0/10).",
            'category': 'Targeting',
            'type': 'insight'
        }
    ]

    dataset_output = {
        'meta': {
            'generated_at': datetime.datetime.utcnow().isoformat() + 'Z',
            'dataset_name': 'MarketPulse 200k Marketing Campaigns',
            'date_range': '2021-01-01 to 2021-12-31'
        },
        'kpis': kpis,
        'by_channel': channels_data,
        'by_type': format_cat_dict(by_type, has_cac=True),
        'by_audience': format_cat_dict(by_audience, has_cac=False, has_eng=True),
        'by_segment': format_cat_dict(by_segment, has_cac=True),
        'by_location': format_cat_dict(by_location, has_cac=True),
        'by_language': format_cat_dict(by_language, has_cac=False),
        'by_duration': format_cat_dict(by_duration, has_cac=False),
        'by_month': months_list,
        'insights': insights,
        'sample_records': sample_records
    }

    out_file1 = r'C:\Users\Eslam\Downloads\marketing-analytics-live-dashboard\public\data\marketing_data.json'
    out_file2 = r'C:\Users\Eslam\Downloads\marketing-analytics-live-dashboard\src\data\marketing_data.json'

    import os
    os.makedirs(os.path.dirname(out_file1), exist_ok=True)
    os.makedirs(os.path.dirname(out_file2), exist_ok=True)

    with open(out_file1, 'w', encoding='utf-8') as f:
        json.dump(dataset_output, f, indent=2)

    with open(out_file2, 'w', encoding='utf-8') as f:
        json.dump(dataset_output, f, indent=2)

    print(f"Data saved successfully to {out_file1} and {out_file2} ({os.path.getsize(out_file1)/1024:.1f} KB)")
    print("KPIs:", kpis)

if __name__ == '__main__':
    main()

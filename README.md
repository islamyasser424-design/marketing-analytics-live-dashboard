# MarketPulse Analytics 📊

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-184E77?style=for-the-badge&logo=github)](https://islamyasser424-design.github.io/marketing-analytics-live-dashboard/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**MarketPulse Analytics** is a live, high-performance marketing intelligence dashboard engineered to analyze **200,002 marketing campaigns** with granular breakdowns across channels, campaign types, target audiences, customer segments, metropolitan locations, and seasonal time series.

🔗 **Live Dashboard URL**: [https://islamyasser424-design.github.io/marketing-analytics-live-dashboard/](https://islamyasser424-design.github.io/marketing-analytics-live-dashboard/)

---

## 🚀 Key Dashboard Capabilities

- **Executive KPI Scorecards**: Real-time tracking of 200,002 campaigns, 109.95M clicks, 1.10B impressions, 9.98% overall CTR, 8.01% conversion rate, 5.00x average ROI, and customer acquisition costs (CAC).
- **Multi-Channel Performance**: Comparative evaluation across Google Ads, YouTube, Facebook, Instagram, and Email with DAX-evaluated channel ranking.
- **Audience & Demographic Intelligence**: Granular segmentation across age demographics (Men 18-24, Women 35-44, etc.) and affinity groups (Fashionistas, Health & Wellness, Tech Enthusiasts, etc.).
- **Geographic & Localization Breakdown**: Metropolitan analysis across top regions (New York, Chicago, Los Angeles, Miami, Houston) and localized ad language returns.
- **Timeline Progression & Seasonality**: Monthly performance trajectories (January to December 2021) tracing yield rate shifts and acquisition cost inflation.
- **Campaign Data Explorer**: Interactive client-side table with sorting, multi-attribute filtering, pagination, and one-click CSV export.
- **11 Verified DAX Formulas**: Reference panel featuring full DAX expressions for Power BI integration with 1-click copy functionality.
- **Custom Design System**: Dark / Light mode toggle powered by the custom MarketPulse palette (`#184E77`, `#52B69A`, `#76C893`, `#D9ED92`).

---

## 📐 Verified DAX Formulas (Power BI Model)

```dax
Total Campaigns = DISTINCTCOUNT(Campaigns[Campaign_ID])

Total Clicks = SUM(Campaigns[Clicks])

Total Impressions = SUM(Campaigns[Impressions])

CTR % = DIVIDE([Total Clicks], [Total Impressions], 0) * 100

Avg Conversion Rate = AVERAGE(Campaigns[Conversion_Rate])

Avg ROI (as provided) = AVERAGE(Campaigns[ROI])

Avg Acquisition Cost = AVERAGE(Campaigns[Acquisition_Cost])

Avg Engagement = AVERAGE(Campaigns[Engagement_Score])

Avg ROI by Channel = CALCULATE([Avg ROI (as provided)], ALLEXCEPT(Campaigns, Campaigns[Channel_Used]))

Channel Rank = RANKX(ALL(Campaigns[Channel_Used]), [Avg ROI (as provided)], , DESC, Dense)

Clicks LY = CALCULATE([Total Clicks], SAMEPERIODLASTYEAR('Date'[Date]))
```

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Setup & Run
```bash
# 1. Clone repository
git clone https://github.com/islamyasser424-design/marketing-analytics-live-dashboard.git
cd marketing-analytics-live-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production (outputs to dist/ with SPA 404 routing)
npm run build

# 5. Preview production build
npm run preview
```

---

## 👨‍💻 Author

**Islam Yasser**  
Data Analyst & Business Intelligence Specialist  
- 🌐 **Portfolio**: [islamyasser424-design.github.io/portfolio-/](https://islamyasser424-design.github.io/portfolio-/)  
- 💼 **GitHub**: [github.com/islamyasser424-design](https://github.com/islamyasser424-design)  

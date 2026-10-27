import React, { useState, useMemo } from 'react';
import { CampaignRecord, FilterState } from '../../types';
import { Table, ArrowUpDown, ChevronLeft, ChevronRight, Search, Download } from 'lucide-react';

interface ExplorerViewProps {
  records: CampaignRecord[];
  filters: FilterState;
  onExport: () => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({ records, filters, onExport }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [sortField, setSortField] = useState<keyof CampaignRecord>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter records based on global filters + local search
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      if (filters.channel !== 'all' && r.channel !== filters.channel) return false;
      if (filters.campaignType !== 'all' && r.type !== filters.campaignType) return false;
      if (filters.audience !== 'all' && r.audience !== filters.audience) return false;
      if (filters.location !== 'all' && r.location !== filters.location) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match = 
          r.id.toLowerCase().includes(q) ||
          r.company.toLowerCase().includes(q) ||
          r.channel.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.segment.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [records, filters]);

  // Sort records
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortOrder === 'asc' 
        ? String(aVal).localeCompare(String(bVal)) 
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredRecords, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const paginatedRecords = sortedRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: keyof CampaignRecord) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Title & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
            <Table className="w-5 h-5 text-brand-sea" />
            <span>Campaign Data Explorer</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Granular campaign audit records with instant client-side sorting, pagination and CSV export
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Showing <strong className="text-brand-navy dark:text-brand-lime">{sortedRecords.length.toLocaleString()}</strong> campaigns
          </span>
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-blue transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-brand-lime" />
            <span>Export Table</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-brand-darkBg/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-brand-darkBorder select-none">
                <th onClick={() => handleSort('id')} className="py-3 px-3.5 cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('company')} className="py-3 px-3.5 cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center gap-1">
                    <span>Company</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('channel')} className="py-3 px-3.5 cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center gap-1">
                    <span>Channel</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('type')} className="py-3 px-3.5 cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center gap-1">
                    <span>Type</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('location')} className="py-3 px-3.5 cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center gap-1">
                    <span>Location</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('clicks')} className="py-3 px-3.5 text-right cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center justify-end gap-1">
                    <span>Clicks</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('ctr')} className="py-3 px-3.5 text-right cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center justify-end gap-1">
                    <span>CTR</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('conversion_rate')} className="py-3 px-3.5 text-right cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center justify-end gap-1">
                    <span>Conv %</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('roi')} className="py-3 px-3.5 text-right cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center justify-end gap-1">
                    <span>ROI</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('cac')} className="py-3 px-3.5 text-right cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center justify-end gap-1">
                    <span>CAC</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th onClick={() => handleSort('date')} className="py-3 px-3.5 text-right cursor-pointer hover:text-brand-navy dark:hover:text-brand-lime">
                  <div className="flex items-center justify-end gap-1">
                    <span>Date</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-brand-darkBorder/40">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-400">
                    No campaigns found matching your current filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-brand-lightBg/50 dark:hover:bg-brand-navy/20 transition-colors">
                    <td className="py-2.5 px-3.5 font-mono text-slate-500 dark:text-slate-400">
                      #{r.id}
                    </td>
                    <td className="py-2.5 px-3.5 font-semibold text-brand-navy dark:text-white">
                      {r.company}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-700 dark:text-slate-200">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-brand-navy/50 text-[10px] font-bold">
                        {r.channel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-600 dark:text-slate-300">
                      {r.type}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-600 dark:text-slate-300">
                      {r.location}
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-700 dark:text-slate-200">
                      {r.clicks.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-bold text-brand-sea dark:text-brand-mint">
                      {r.ctr}%
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-semibold text-slate-700 dark:text-slate-200">
                      {r.conversion_rate}%
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-bold text-brand-navy dark:text-brand-lime">
                      {r.roi}x
                    </td>
                    <td className="py-2.5 px-3.5 text-right text-slate-600 dark:text-slate-300">
                      ${Math.round(r.cac).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {r.date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-brand-darkBorder flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-brand-darkBorder bg-slate-50 dark:bg-brand-darkBg text-slate-800 dark:text-slate-200"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-brand-darkBorder disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-brand-navy/40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-brand-darkBorder disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-brand-navy/40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { mockApplications, type Application } from '../data/mockData';
import { Search, Filter, Clock, XCircle, DollarSign } from 'lucide-react';

export const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Barchasi');

  const filteredApps = applications.filter((app) => {
    const matchesSearch = app.fullName.toLowerCase().includes(search.toLowerCase()) || app.phone.includes(search);
    const matchesStatus = filterStatus === 'Barchasi' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: Application['status']) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Arizalar boshqaruvi</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">O‘quv markaziga kelib tushgan barcha arizalar ro‘yxati.</p>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Ism yoki telefon orqali qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden"
          >
            <option value="Barchasi">Barcha statuslar</option>
            <option value="Yangi">Yangi</option>
            <option value="Jarayonda">Jarayonda</option>
            <option value="To‘langan">To‘langan</option>
            <option value="Bekor qilindi">Bekor qilindi</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">F.I.O</th>
                <th className="p-4">Telefon</th>
                <th className="p-4">Kurs</th>
                <th className="p-4">Sana</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                  <td className="p-4 font-medium">{app.fullName}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{app.phone}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{app.courseName}</td>
                  <td className="p-4 text-xs text-slate-400">{app.createdAt}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-1">
                    <button
                      onClick={() => updateStatus(app.id, 'Jarayonda')}
                      title="Jarayonga o'tkazish"
                      className="p-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950 text-amber-600 transition-colors"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'To‘langan')}
                      title="To'landi deb belgilash"
                      className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600 transition-colors"
                    >
                      <DollarSign className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'Bekor qilindi')}
                      title="Bekor qilish"
                      className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
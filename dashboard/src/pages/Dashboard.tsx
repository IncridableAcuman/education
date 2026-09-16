import React from 'react';
import { mockStats, mockApplications } from '../data/mockData';
import { ArrowUpRight, FileText, UserCheck, Wallet, BookOpen } from 'lucide-react';

const icons = [FileText, UserCheck, Wallet, BookOpen];

export const Dashboard: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Yangi': return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Jarayonda': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'To‘langan': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      default: return 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Boshqaruv paneli</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">O‘quv markazi bo‘yicha umumiy ko‘rsatkichlar va so‘nggi arizalar.</p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, idx) => {
          const Icon = icons[idx];
          return (
            <div key={stat.id} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</span>
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {stat.change}
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">So‘nggi kelib tushgan arizalar</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="p-4">F.I.O</th>
                <th className="p-4">Telefon</th>
                <th className="p-4">Kurs</th>
                <th className="p-4">Sana</th>
                <th className="p-4">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm">
              {mockApplications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-slate-100">{app.fullName}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{app.phone}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{app.courseName}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 text-xs">{app.createdAt}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
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
import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, BookOpen, MoreVertical } from 'lucide-react';
interface Student {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  enrolledCourse: string;
  joinedDate: string;
  paymentStatus: 'Faol' | 'Qarzdor' | 'Tugatgan';
  progress: number;
}

const mockStudents: Student[] = [
  {
    id: '1',
    fullName: 'Javohir Toshpulotov',
    phone: '+998 90 111 22 33',
    email: 'javohir@example.com',
    enrolledCourse: 'Frontend React',
    joinedDate: '2026-01-15',
    paymentStatus: 'Faol',
    progress: 75,
  },
  {
    id: '2',
    fullName: 'Shaxnoza Alimova',
    phone: '+998 93 444 55 66',
    email: 'shaxnoza@example.com',
    enrolledCourse: 'IELTS Intensive 7.5+',
    joinedDate: '2026-02-01',
    paymentStatus: 'Qarzdor',
    progress: 40,
  },
  {
    id: '3',
    fullName: 'Bekzod Rustamov',
    phone: '+998 97 777 88 99',
    email: 'bekzod@example.com',
    enrolledCourse: 'Python Backend',
    joinedDate: '2025-11-10',
    paymentStatus: 'Tugatgan',
    progress: 100,
  },
];

export const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Barchasi');

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      student.phone.includes(search) ||
      student.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Barchasi' || student.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Student['paymentStatus']) => {
    switch (status) {
      case 'Faol':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Qarzdor':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-800';
      case 'Tugatgan':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">O‘quvchilar</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Markazda ta'lim olayotgan va bitirgan o‘quvchilar bazasi.
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Ism, email yoki telefon orqali qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden"
          >
            <option value="Barchasi">Barcha holatlar</option>
            <option value="Faol">Faol</option>
            <option value="Qarzdor">Qarzdor</option>
            <option value="Tugatgan">Tugatgan</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">O‘quvchi</th>
                <th className="p-4">Aktiv Kurs</th>
                <th className="p-4">O‘zlashtirish</th>
                <th className="p-4">A'zo bo‘lgan sana</th>
                <th className="p-4">Holat</th>
                <th className="p-4 text-right">Boshqaruv</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{student.fullName}</div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{student.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{student.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      {student.enrolledCourse}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span>{student.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-slate-500">{student.joinedDate}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(student.paymentStatus)}`}>
                      {student.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
                      <MoreVertical className="w-4 h-4" />
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
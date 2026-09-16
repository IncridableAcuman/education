// src/sections/Footer.tsx
import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100 dark:border-slate-800">
          
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Edu<span className="text-indigo-600">Center</span>
              </span>
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Zamonaviy metodika, tajribali mentorlar va natijaga yo‘naltirilgan zamonaviy ta’lim platformasi.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Navigatsiya</h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-indigo-600">Bosh sahifa</a></li>
              <li><a href="#courses" className="hover:text-indigo-600">Kurslar</a></li>
              <li><a href="#why-us" className="hover:text-indigo-600">Biz haqimizda</a></li>
              <li><a href="#teachers" className="hover:text-indigo-600">O‘qituvchilar</a></li>
              <li><a href="#contact" className="hover:text-indigo-600">Aloqa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Kurslar</h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#courses" className="hover:text-indigo-600">Ingliz tili</a></li>
              <li><a href="#courses" className="hover:text-indigo-600">IELTS Intensive</a></li>
              <li><a href="#courses" className="hover:text-indigo-600">Frontend Dasturlash</a></li>
              <li><a href="#courses" className="hover:text-indigo-600">Backend Dasturlash</a></li>
              <li><a href="#courses" className="hover:text-indigo-600">Matematika</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Ish vaqti</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Dushanba - Shanba</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">08:00 - 20:00</p>
            <p className="text-xs text-slate-500 mt-3">Yakshanba - Dam olish kuni</p>
          </div>

        </div>

        <div className="pt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          © 2026 EduCenter. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
};
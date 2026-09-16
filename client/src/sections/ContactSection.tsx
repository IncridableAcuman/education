// src/sections/ContactSection.tsx
import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Aloqa
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Biz bilan bog‘laning
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Savollaringiz bormi? Markazimizga tashrif buyuring yoki ko‘rsatilgan kontaktlar orqali bog‘laning.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 font-medium">Manzil</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Toshkent shahri, Chilonzor tumani, 10-mavze</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 font-medium">Telefon</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">+998 90 123 45 67</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 font-medium">Elektron pochta</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">info@educenter.uz</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Ijtimoiy tarmoqlar</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                  <Send className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-rose-600 transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-red-600 transition-colors">
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Map Placeholder Block */}
          <div className="lg:col-span-7 h-96 rounded-3xl bg-slate-200 dark:bg-slate-800 relative overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin className="w-10 h-10 text-indigo-600 mx-auto mb-2 animate-bounce" />
              <p className="text-slate-700 dark:text-slate-300 font-bold">Google Maps Interaktiv Xaritasi</p>
              <p className="text-xs text-slate-500 mt-1">Chilonzor metro bekati yaqinida</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
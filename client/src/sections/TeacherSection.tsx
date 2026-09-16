import React from 'react';
import { motion } from 'framer-motion';
import { teachersData } from '../data/teachers';
import { SectionHeading } from '../components/SectionHeading';
import { Star, Award } from 'lucide-react';

export const TeachersSection: React.FC = () => {
  return (
    <section id="teachers" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Kadrlarimiz"
          title="Sizning natijangiz — ustozlarimizdan boshlanadi"
          description="Har bir yo‘nalish bo‘yicha o‘z sohasining top mutaxassislari."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachersData.map((teacher, idx) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {teacher.ieltsScore && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-md">
                      {teacher.ieltsScore}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {teacher.experience}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{teacher.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {teacher.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    {teacher.role}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {teacher.bio}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 w-full justify-center">
                  <Award className="w-3.5 h-3.5 text-indigo-500" />
                  {teacher.specialty}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
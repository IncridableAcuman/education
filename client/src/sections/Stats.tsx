import React from 'react';
import { motion } from 'framer-motion';

export const Stats: React.FC = () => {
  const stats = [
    { value: '5,000+', label: 'Faol o‘quvchilar' },
    { value: '50+', label: 'Professional mentorlar' },
    { value: '20+', label: 'Kurs yo‘nalishlari' },
    { value: '95%', label: 'O‘quvchilar mamnunligi' },
  ];

  return (
    <section className="py-12 bg-indigo-600 dark:bg-indigo-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-indigo-200 text-sm sm:text-base font-medium">
            Minglab o‘quvchilar o‘z kelajagini biz bilan qurdilar
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm"
            >
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-indigo-100 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
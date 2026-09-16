import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Darajangizni aniqlaymiz',
      description: 'Bepul diagnostic test va suhbat orqali joriy bilim darajangiz hamda zaif nuqtalaringizni aniklaymiz.'
    },
    {
      number: '02',
      title: 'Sizga mos kursni tanlaymiz',
      description: 'Maqsadingiz va bo‘sh vaqtingizdan kelib chiqib, individual o‘quv rejasi va mos guruhni belgilaymiz.'
    },
    {
      number: '03',
      title: 'Amaliy mashg‘ulotlar',
      description: 'Interaktiv darslar, amaliy topsiriqlar va mentorlarning kunlik feedback-lari orqali ta’lim olasiz.'
    },
    {
      number: '04',
      title: 'Natijangizni kuzatamiz',
      description: 'Muntazam testlar va yakuniy imtihon topshirib, orzu qilgan sertifikat va natijaga erishasiz.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="O‘quv jarayoni"
          title="Biz bilan qanday o‘rganasiz?"
          description="Natijaga yo‘naltirilgan 4 bosqichli oddiy va samarali tizim."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 block mb-4">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
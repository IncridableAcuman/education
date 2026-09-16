import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { UserCheck, Target, Layers, LineChart, Cpu, Briefcase } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const advantages = [
    {
      icon: UserCheck,
      title: 'Tajribali mentorlar',
      desc: 'O‘z sohasida ko‘p yillik real tajribaga ega professional ustozlar va xalqaro ekspertlar.'
    },
    {
      icon: Target,
      title: 'Amaliy ta’lim',
      desc: 'Quruq nazariya emas, balki 80% amaliyot va real studiya loyihalari orqali bilimlarni mustahkamlash.'
    },
    {
      icon: Layers,
      title: 'Individual yondashuv',
      desc: 'Har bir o‘quvchining shaxsiy o‘zlashtirish tezligi va maqsadiga moslashtirilgan dastur.'
    },
    {
      icon: LineChart,
      title: 'Doimiy monitoring',
      desc: 'Natijalar va o‘zlashtirish haftalik mock-testlar hamda shaxsiy analitika orqali kuzatiladi.'
    },
    {
      icon: Cpu,
      title: 'Zamonaviy metodika',
      desc: 'Xalqaro ta’lim standartlariga mos zamonaviy EdTech platformasi va texnologiyalar.'
    },
    {
      icon: Briefcase,
      title: 'Karyera imkoniyatlari',
      desc: 'Kursni muvaffaqiyatli bitirganlarga rezyume va portfolioni tayyorlash hamda ishga joylashishda yordam.'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Afzalliklarimiz"
          title="Nega aynan EduCenter?"
          description="Sizning muvaffaqiyatingiz uchun yaratilgan zamonaviy ta’lim ekotizimi."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-md shadow-indigo-500/20">
                <adv.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {adv.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {adv.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
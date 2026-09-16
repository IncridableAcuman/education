import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { testimonialsData } from '../data/testimonials';
import { Quote } from 'lucide-react';

export const ResultsSection: React.FC = () => {
  return (
    <section id="results" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Isbotlangan Natijalar"
          title="Natijalarimiz gapirsin"
          description="O‘quvchilarimizning xalqaro imtihonlar va nufuzli OTMlardagi ko‘rsatkichlari."
        />

        {/* Results Highlighting Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">IELTS 7.5+</span>
            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">320+</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">O‘quvchimiz erishgan</p>
          </div>
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">IELTS 8.0+</span>
            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">120+</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Yuqori ball sohiblari</p>
          </div>
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">OTM & IT Kirish</span>
            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">850+</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Talaba hamda mutaxassis</p>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-indigo-200 dark:text-indigo-900/60 mb-4" />
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {item.result} • {item.course}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
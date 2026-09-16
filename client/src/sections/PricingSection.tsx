import React from 'react';
import { motion } from 'framer-motion';
import { pricingData } from '../data/pricing';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  /*
    Izoh: Narxlar va tariflar demo ko'rinishida taqdim etilgan.
    Real tijorat loyihasida backend API orqali sinxronizatsiya qilinadi.
  */
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Shaffof Narxlar"
          title="O‘zingizga mos tarifni tanlang"
          description="Yashirin to‘lovlarsiz hamda qulay shartlar bilan sifatli ta’lim oling."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingData.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPopular
                  ? 'bg-slate-900 text-white dark:bg-slate-800 border-indigo-500 shadow-2xl scale-105 z-10'
                  : 'bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-extrabold uppercase bg-indigo-600 text-white rounded-full tracking-wider shadow-md">
                  Eng Mashhur
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-xs mb-6 ${plan.isPopular ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`text-xs ${plan.isPopular ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 text-sm mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.isPopular ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600'
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={plan.isPopular ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.isPopular ? 'primary' : 'outline'}
                onClick={onSelectPlan}
                className="w-full"
              >
                Kursga yozilish
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface CTASectionProps {
  onOpenRegister: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenRegister }) => {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-2xl">
          
          {/* Subtle Decorative Circle Shapes */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
            >
              Kelajagingizni keyinga qoldirmang.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-indigo-100 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
            >
              Birinchi qadamni bugun tashlang. Bepul sinov darsiga yoziling va o‘z imkoniyatlaringizni sinab ko‘ring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button size="lg" variant="secondary" onClick={onOpenRegister} className="w-full sm:w-auto gap-2">
                Bepul darsga yozilish <ArrowRight className="w-5 h-5" />
              </Button>
              <a href="tel:+998901234567" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 gap-2">
                  <PhoneCall className="w-5 h-5" /> Biz bilan bog‘lanish
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
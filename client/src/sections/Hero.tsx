import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star, CheckCircle2, Award } from 'lucide-react';
import { Button } from '../components/Button';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Subtle Gradient Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-tr from-indigo-500/15 to-violet-500/15 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-7 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Kelajagingizni bugundan boshlang</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              Bilimingizni kuchga aylantiring.{' '}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600">
                Kelajagingizni biz bilan quring.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed"
            >
              Zamonaviy dasturlar, tajribali mentorlar va amaliy yondashuv orqali o‘z maqsadingizga tezroq erishing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Button size="lg" onClick={onOpenRegister} className="gap-2">
                Bepul darsga yozilish <ArrowRight className="w-5 h-5" />
              </Button>
              <a href="#courses">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  Kurslarni ko‘rish
                </Button>
              </a>
            </motion.div>

            {/* Quick Metrics Under CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800/80"
            >
              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">5,000+</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Muvaffaqiyatli O‘quvchi</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">50+</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Professional Mentor</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">95%</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Yuqori Natija</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">10+</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Yillik Tajriba</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column Dynamic Visual / Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Illustration Base Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">IELTS Intensive 8.0</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Faol guruh • 12/15 ta joy band</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 rounded-lg">
                    Jonli Dars
                  </span>
                </div>

                {/* Simulated Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">O‘zlashtirish ko‘rsatkichi</span>
                    <span className="text-indigo-600 dark:text-indigo-400">92%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-linear-to-r from-indigo-500 to-violet-600 rounded-full" />
                  </div>
                </div>

                {/* Sub Features Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400">O‘rtacha Ball</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">7.5 Target</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Ishga Joylashuv</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">88% Bitiruvchilar</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 1: Student Rating Popover */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 sm:flex"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-900 dark:text-white">4.9 / 5.0</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">2,500+ O‘quvchi Bahosi</p>
                </div>
              </motion.div>

              {/* Floating Element 2: Verified Students Badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Kafolatlangan Natija</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Sertifikat va Portfolio</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { coursesData } from '../data/courses';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { Clock, Calendar, Laptop, ArrowRight, Languages, GraduationCap, Award, Code, Server, Cpu, Calculator, BookOpen, Trophy } from 'lucide-react';
import type { Course } from '../types';

interface CoursesSectionProps {
  onSelectCourse: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Languages,
  GraduationCap,
  Award,
  Code,
  Server,
  Cpu,
  Calculator,
  BookOpen,
  Trophy
};

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourse }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'ingliz-tili', label: 'Ingliz tili' },
    { id: 'ielts', label: 'IELTS' },
    { id: 'dasturlash', label: 'Dasturlash' },
    { id: 'matematika', label: 'Matematika' },
  ];

  const filteredCourses = activeCategory === 'all'
    ? coursesData
    : coursesData.filter(course => course.category === activeCategory);

  return (
    <section id="courses" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Bizning Kurslar"
          title="O‘zingizga mos yo‘nalishni tanlang"
          description="Maqsadingizga mos zamonaviy kurslar va amaliy dasturlar."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: Course) => {
            const IconComponent = iconMap[course.iconName] || BookOpen;

            return (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/50 flex flex-col justify-between transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {course.badge && (
                      <span className="px-3 py-1 text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-full border border-amber-200 dark:border-amber-900/50">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span>Davomiyligi: {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-indigo-500" />
                      <span>Format: {course.format} ({course.level})</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Oylik to‘lov</span>
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{course.price}</p>
                  </div>
                  <Button size="sm" onClick={onSelectCourse} className="gap-1.5">
                    Batafsil <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
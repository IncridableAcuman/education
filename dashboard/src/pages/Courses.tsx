import React, { useState } from 'react';
import { mockCourses, type Course } from '../data/mockData';
import { Plus, Users, Clock, Edit, Trash2, X } from 'lucide-react';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', price: '', duration: '' });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.price) return;

    const created: Course = {
      id: Date.now().toString(),
      title: newCourse.title,
      price: newCourse.price,
      duration: newCourse.duration || '3 oy',
      studentsCount: 0,
      status: 'Faol',
    };

    setCourses([created, ...courses]);
    setIsModalOpen(false);
    setNewCourse({ title: '', price: '', duration: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kurslar boshqaruvi</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Mavjud ta'lim dasturlari va ularning narxlari.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yangi kurs
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  {course.status}
                </span>
                <div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600"><Edit className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xl mb-4">{course.price}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {course.studentsCount} o'quvchi</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {course.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Yangi kurs qo'shish</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Kurs nomi</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Narxi (oylik/umumiy)</label>
                <input
                  type="text"
                  required
                  placeholder="1,200,000 UZS"
                  value={newCourse.price}
                  onChange={e => setNewCourse({ ...newCourse, price: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Davomiyligi</label>
                <input
                  type="text"
                  placeholder="4 oy"
                  value={newCourse.duration}
                  onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
                />
              </div>
              <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-xl text-sm hover:bg-indigo-700">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
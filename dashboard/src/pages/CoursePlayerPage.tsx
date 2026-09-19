import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  PlayCircle, 
  CheckCircle2, 
  Award, 
  Download, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { UseCourse } from '../context/CourseContext';
import { certificateService } from '../services/courseService';

export const CoursePlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);

  const {
    activeCourse,
    lessons,
    isEnrolled,
    progress,
    certificate,
    loading,
    error,
    loadCourseDetails,
    toggleLesson,
    enrollInCourse,
    issueCertificate,
  } = UseCourse();

  // Selected state va loading state
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  // Kurs tafsilotlarini yuklash
  useEffect(() => {
    if (courseId) {
      loadCourseDetails(courseId, true);
    }
  }, [courseId, loadCourseDetails]);

  // Derived state: Agar foydalanuvchi dars tanlamagan bo'lsa, birinchi dars avtomatik tanlanadi
  const activeLessonId = selectedLessonId ?? (lessons.length > 0 ? lessons[0].id : null);
  const currentLesson = lessons.find((l) => l.id === activeLessonId);

  const handleDownloadPdf = async () => {
    if (!certificate) return;
    setDownloading(true);
    try {
      await certificateService.downloadCertificatePdf(certificate.certificateNumber);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-indigo-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center gap-3 text-rose-600 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Header & Progress Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {activeCourse?.title}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {activeCourse?.description}
              </p>
            </div>

            {!isEnrolled ? (
              <button
                onClick={() => enrollInCourse(courseId)}
                className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer shrink-0"
              >
                Kursga a'zo bo'lish
              </button>
            ) : (
              progress?.isEligibleForCertificate && (
                <div>
                  {certificate ? (
                    <button
                      onClick={handleDownloadPdf}
                      disabled={downloading}
                      className="inline-flex items-center gap-2 py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      <span>Sertifikatni yuklab olish (PDF)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => issueCertificate(courseId)}
                      className="inline-flex items-center gap-2 py-2.5 px-5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Sertifikatni rasmiylashtirish</span>
                    </button>
                  )}
                </div>
              )
            )}
          </div>

          {/* Progress Indicator */}
          {isEnrolled && progress && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span>O'zlashtirish darajasi</span>
                <span>{progress.progressPercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress.progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-4">
            {currentLesson ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {currentLesson.sequenceOrder}. {currentLesson.title}
                  </h2>

                  {isEnrolled && (
                    <button
                      onClick={() => toggleLesson(currentLesson.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Tugatildi deb belgilash</span>
                    </button>
                  )}
                </div>

                {currentLesson.videoUrl && (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
                    <iframe
                      src={currentLesson.videoUrl}
                      title={currentLesson.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300">
                  {currentLesson.content}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-500">
                Darsni tanlang
              </div>
            )}
          </div>

          {/* Lessons List Sidebar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm h-fit space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Kurs Mundarijasi ({lessons.length} ta dars)
            </h3>

            <div className="space-y-2">
              {lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between text-xs font-medium cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-indigo-500'}`} />
                      <span className="truncate">{lesson.sequenceOrder}. {lesson.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
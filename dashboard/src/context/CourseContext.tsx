import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Course, Lesson, CourseProgressResponse, CertificateResponse } from '../interface/course';
import {
  courseService,
  lessonService,
  enrollmentService,
  progressService,
  certificateService,
} from '../services/courseService';

interface CourseContextType {
  activeCourse: Course | null;
  lessons: Lesson[];
  isEnrolled: boolean;
  progress: CourseProgressResponse | null;
  certificate: CertificateResponse | null;
  loading: boolean;
  error: string | null;
  loadCourseDetails: (courseId: number, isStudent?: boolean) => Promise<void>;
  toggleLesson: (lessonId: number) => Promise<void>;
  enrollInCourse: (courseId: number) => Promise<void>;
  issueCertificate: (courseId: number) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState<CourseProgressResponse | null>(null);
  const [certificate, setCertificate] = useState<CertificateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCourseDetails = useCallback(async (courseId: number, isStudent = true) => {
    setLoading(true);
    setError(null);
    try {
      const [courseData, lessonsData] = await Promise.all([
        courseService.getById(courseId),
        lessonService.getCourseLessons(courseId),
      ]);

      setActiveCourse(courseData);
      setLessons(lessonsData);

      if (isStudent) {
        const enrolled = await enrollmentService.isEnrolled(courseId);
        setIsEnrolled(enrolled);

        if (enrolled) {
          const progressData = await progressService.getCourseProgress(courseId);
          setProgress(progressData);

          try {
            const certData = await certificateService.getCertificateByCourse(courseId);
            setCertificate(certData);
          } catch {
            setCertificate(null);
          }
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Kurs ma’lumotlarini yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleLesson = async (lessonId: number) => {
    if (!activeCourse) return;
    try {
      await progressService.toggleLessonCompletion(lessonId);
      const updatedProgress = await progressService.getCourseProgress(activeCourse.id);
      setProgress(updatedProgress);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Dars holatini o‘zgartirib bo‘lmadi');
    }
  };

  const enrollInCourse = async (courseId: number) => {
    try {
      await enrollmentService.enroll(courseId);
      setIsEnrolled(true);
      await loadCourseDetails(courseId, true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || 'A’zo bo‘lishda xatolik yuz berdi');
    }
  };

  const issueCertificate = async (courseId: number) => {
    try {
      const cert = await certificateService.issueCertificate(courseId);
      setCertificate(cert);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Sertifikat olishda xatolik yuz berdi');
    }
  };

  return (
    <CourseContext.Provider
      value={{
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
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const UseCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse CourseProvider ichida ishlatilishi kerak');
  }
  return context;
};
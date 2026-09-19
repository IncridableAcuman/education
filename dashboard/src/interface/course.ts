// Course Types
export interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  price?: number;
  teacherName?: string;
  teacherId?: number;
  createdAt?: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  category?: string;
  price?: number;
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
}

// Lesson Types
export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  content: string;
  videoUrl?: string;
  sequenceOrder: number;
}

export interface CreateLessonRequest {
  title: string;
  content: string;
  videoUrl?: string;
  sequenceOrder: number;
}

export interface UpdateLessonRequest {
  title?: string;
  content?: string;
  videoUrl?: string;
  sequenceOrder?: number;
}

// Enrollment Types
export interface EnrollmentResponse {
  id: number;
  courseId: number;
  courseTitle: string;
  studentId: number;
  enrolledAt: string;
}

// Progress Types
export interface LessonProgressResponse {
  lessonId: number;
  completed: boolean;
}

export interface CourseProgressResponse {
  courseId: number;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  isEligibleForCertificate: boolean;
}

// Certificate Types
export interface CertificateResponse {
  id: number;
  certificateNumber: string;
  courseId: number;
  courseTitle: string;
  studentName: string;
  issuedAt: string;
}
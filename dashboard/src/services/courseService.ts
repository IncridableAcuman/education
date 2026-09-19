import axiosInstance from '../api/axiosInstance'; // O'zingizning tayyor axios instansingiz
import type {
    Course,
    CreateCourseRequest,
    UpdateCourseRequest,
    Lesson,
    CreateLessonRequest,
    UpdateLessonRequest,
    EnrollmentResponse,
    LessonProgressResponse,
    CourseProgressResponse,
    CertificateResponse,
} from '../interface/course';

// 1. Courses API
export const courseService = {
  getAll: async (): Promise<Course[]> => {
    const res = await axiosInstance.get('/courses');
    return res.data;
  },

  getById: async (id: number): Promise<Course> => {
    const res = await axiosInstance.get(`/courses/${id}`);
    return res.data;
  },

  getMyCourses: async (): Promise<Course[]> => {
    const res = await axiosInstance.get('/courses/my-courses');
    return res.data;
  },

  create: async (data: CreateCourseRequest): Promise<Course> => {
    const res = await axiosInstance.post('/courses', data);
    return res.data;
  },

  update: async (id: number, data: UpdateCourseRequest): Promise<Course> => {
    const res = await axiosInstance.put(`/courses/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<string> => {
    const res = await axiosInstance.delete(`/courses/${id}`);
    return res.data;
  },
};

// 2. Lessons API
export const lessonService = {
  getCourseLessons: async (courseId: number): Promise<Lesson[]> => {
    const res = await axiosInstance.get(`/lessons/course/${courseId}`);
    return res.data;
  },

  getById: async (id: number): Promise<Lesson> => {
    const res = await axiosInstance.get(`/lessons/${id}`);
    return res.data;
  },

  create: async (courseId: number, data: CreateLessonRequest): Promise<Lesson> => {
    const res = await axiosInstance.post(`/lessons/course/${courseId}`, data);
    return res.data;
  },

  update: async (id: number, data: UpdateLessonRequest): Promise<Lesson> => {
    const res = await axiosInstance.put(`/lessons/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<string> => {
    const res = await axiosInstance.delete(`/lessons/${id}`);
    return res.data;
  },
};

// 3. Enrollments API
export const enrollmentService = {
  enroll: async (courseId: number): Promise<EnrollmentResponse> => {
    const res = await axiosInstance.post(`/enrollments/course/${courseId}`);
    return res.data;
  },

  unenroll: async (courseId: number): Promise<string> => {
    const res = await axiosInstance.delete(`/enrollments/course/${courseId}`);
    return res.data;
  },

  getMyEnrolledCourses: async (): Promise<EnrollmentResponse[]> => {
    const res = await axiosInstance.get('/enrollments/my');
    return res.data;
  },

  isEnrolled: async (courseId: number): Promise<boolean> => {
    const res = await axiosInstance.get(`/enrollments/check/${courseId}`);
    return res.data;
  },
};

// 4. Progress API
export const progressService = {
  toggleLessonCompletion: async (lessonId: number): Promise<LessonProgressResponse> => {
    const res = await axiosInstance.post(`/progress/lessons/${lessonId}/toggle`);
    return res.data;
  },

  getCourseProgress: async (courseId: number): Promise<CourseProgressResponse> => {
    const res = await axiosInstance.get(`/progress/courses/${courseId}`);
    return res.data;
  },
};

// 5. Certificates API
export const certificateService = {
  issueCertificate: async (courseId: number): Promise<CertificateResponse> => {
    const res = await axiosInstance.post(`/certificates/issue/course/${courseId}`);
    return res.data;
  },

  getCertificateByCourse: async (courseId: number): Promise<CertificateResponse> => {
    const res = await axiosInstance.get(`/certificates/course/${courseId}`);
    return res.data;
  },

  getMyCertificates: async (): Promise<CertificateResponse[]> => {
    const res = await axiosInstance.get('/certificates/my');
    return res.data;
  },

  downloadCertificatePdf: async (certificateNumber: string): Promise<void> => {
    const response = await axiosInstance.get(`/certificates/download/${certificateNumber}`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `certificate-${certificateNumber}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
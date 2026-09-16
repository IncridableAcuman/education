export interface StatItem {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface Application {
  id: string;
  fullName: string;
  phone: string;
  courseName: string;
  createdAt: string;
  status: 'Yangi' | 'Jarayonda' | 'To‘langan' | 'Bekor qilindi';
}

export interface Course {
  id: string;
  title: string;
  price: string;
  studentsCount: number;
  duration: string;
  status: 'Faol' | 'Qoralama';
}

export const mockStats: StatItem[] = [
  { id: '1', title: 'Jami arizalar', value: '1,248', change: '+12.5%', isPositive: true },
  { id: '2', title: 'Aktiv o‘quvchilar', value: '850', change: '+8.2%', isPositive: true },
  { id: '3', title: 'Oylik daromad', value: '42,500,000 UZS', change: '+15.4%', isPositive: true },
  { id: '4', title: 'Aktiv kurslar', value: '12 ta', change: '0%', isPositive: true },
];

export const mockApplications: Application[] = [
  { id: '1', fullName: 'Anvar Rahimov', phone: '+998 90 123 45 67', courseName: 'Frontend React', createdAt: '2026-09-07 14:20', status: 'Yangi' },
  { id: '2', fullName: 'Malika Sobirova', phone: '+998 91 987 65 43', courseName: 'IELTS Bootcamp', createdAt: '2026-09-07 11:05', status: 'Jarayonda' },
  { id: '3', fullName: 'Sardor Ikromov', phone: '+998 93 456 78 90', courseName: 'Python Backend', createdAt: '2026-09-06 18:30', status: 'To‘langan' },
  { id: '4', fullName: 'Diyora Karimova', phone: '+998 94 321 09 87', courseName: 'UI/UX Dizayn', createdAt: '2026-09-06 10:15', status: 'Bekor qilindi' },
];

export const mockCourses: Course[] = [
  { id: '1', title: 'Frontend React & TypeScript', price: '1,200,000 UZS', studentsCount: 142, duration: '4 oy', status: 'Faol' },
  { id: '2', title: 'IELTS Intensive 7.5+', price: '900,000 UZS', studentsCount: 98, duration: '3 oy', status: 'Faol' },
  { id: '3', title: 'Python Backend (Django/FastAPI)', price: '1,400,000 UZS', studentsCount: 85, duration: '5 oy', status: 'Faol' },
];
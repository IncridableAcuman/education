import type { Course } from '../types';

export const coursesData: Course[] = [
  {
    id: '1',
    title: 'General English (Beginner → Advanced)',
    category: 'ingliz-tili',
    level: 'A1 dan C1 gacha',
    duration: '3 oy har bir bosqich',
    schedule: 'Haftasiga 3 marta / 1.5 soat',
    format: 'Hybrid',
    price: '450 000 so‘m',
    description: 'So‘zlashuv nutqini rivojlantirish, grammatika va tinglab tushunishni noldan professional darajagacha oshirish.',
    badge: 'Eng ommabop',
    iconName: 'Languages'
  },
  {
    id: '2',
    title: 'IELTS Foundation',
    category: 'ielts',
    level: 'Intermediate (B1+)',
    duration: '2 oy',
    schedule: 'Haftasiga 3 marta / 2 soat',
    format: 'Offline',
    price: '550 000 so‘m',
    description: 'IELTS imtihoni formatiga tayyorgarlik va har bir bo‘lim (Reading, Listening, Writing, Speaking) strategiyalarini o‘zlashtirish.',
    iconName: 'GraduationCap'
  },
  {
    id: '3',
    title: 'IELTS Intensive (Target 7.5+)',
    category: 'ielts',
    level: 'Upper-Intermediate (B2+)',
    duration: '2 oy',
    schedule: 'Haftasiga 5 marta / 2 soat',
    format: 'Offline',
    price: '750 000 so‘m',
    description: 'Har kuni mock-testlar, real imtihon keyslari va top-mentorlardan shaxsiy feedback bilan yuqori ball kafolati.',
    badge: 'Kafolatlangan',
    iconName: 'Award'
  },
  {
    id: '4',
    title: 'Frontend Dasturlash (React & TS)',
    category: 'dasturlash',
    level: 'Noldan boshlab',
    duration: '6 oy',
    schedule: 'Haftasiga 3 marta / 2 soat',
    format: 'Hybrid',
    price: '700 000 so‘m',
    description: 'HTML, CSS, JavaScript, React, TypeScript va Tailwind CSS yordamida zamonaviy web-ilovalar yaratishni o‘rganing.',
    badge: 'Top Kasb',
    iconName: 'Code'
  },
  {
    id: '5',
    title: 'Backend Dasturlash (Node.js & Python)',
    category: 'dasturlash',
    level: 'Boshlang‘ich',
    duration: '6 oy',
    schedule: 'Haftasiga 3 marta / 2 soat',
    format: 'Online',
    price: '700 000 so‘m',
    description: 'Server arxitekturasi, ma’lumotlar bazalari (PostgreSQL, MongoDB), API va xavfsiz tizimlarni barpo etish.',
    iconName: 'Server'
  },
  {
    id: '6',
    title: 'Full Stack Web Development',
    category: 'dasturlash',
    level: 'O‘rta',
    duration: '9 oy',
    schedule: 'Haftasiga 3 marta / 2.5 soat',
    format: 'Hybrid',
    price: '950 000 so‘m',
    description: 'Frontend va Backend texnologiyalarini to‘liq egallab, real loyihalar ustida tajriba orttiring va portfoliongizni boyiting.',
    badge: 'Kompleks',
    iconName: 'Cpu'
  },
  {
    id: '7',
    title: 'Maktab Matematikasi & Mantiq',
    category: 'matematika',
    level: '5–11 sinf',
    duration: '4 oy',
    schedule: 'Haftasiga 3 marta / 1.5 soat',
    format: 'Offline',
    price: '400 000 so‘m',
    description: 'Maktab dasturidagi barcha mavzularni chuqurlashtirilgan tartibda va mantiqiy fikrlash bilan o‘zlashtirish.',
    iconName: 'Calculator'
  },
  {
    id: '8',
    title: 'Abituriyentlar uchun Matematika',
    category: 'matematika',
    level: 'Tayyorgarlik',
    duration: '8 oy',
    schedule: 'Haftasiga 3 marta / 2 soat',
    format: 'Offline',
    price: '500 000 so‘m',
    description: 'OTM kirish imtihonlari va DTM standartlariga moslashtirilgan intensiv test yechish mashg‘ulotlari.',
    iconName: 'BookOpen'
  },
  {
    id: '9',
    title: 'Olimpiada Matematikasi',
    category: 'matematika',
    level: 'Yuqori',
    duration: '6 oy',
    schedule: 'Haftasiga 2 marta / 3 soat',
    format: 'Offline',
    price: '600 000 so‘m',
    description: 'Respublika va xalqaro olimpiada masalalarini yechish metodlari, noodatiy algoritmlar va tahlil.',
    iconName: 'Trophy'
  }
];
import type { PricingPlan } from '../types';

// Demo tariflar ma'lumotlari
export const pricingData: PricingPlan[] = [
  {
    id: '1',
    name: 'STARTER',
    price: '399 000',
    period: 'so‘m / oy',
    description: 'Boshlang‘ich darajadagilar va mustaqil o‘rganuvchilar uchun ideal yechim.',
    isPopular: false,
    features: [
      'Haftada 3 marta asosiy darslar',
      'O‘quv materiallari va PDF qo‘llanmalar',
      'Umumiy Telegram guruhida muloqot',
      'Haftalik uy vazifalari tahlili',
      'Mobil ilovadan foydalanish'
    ]
  },
  {
    id: '2',
    name: 'STANDARD',
    price: '599 000',
    period: 'so‘m / oy',
    description: 'Natijaga tezroq erishishni xohlovchi faol o‘quvchilar uchun eng ommabop tarif.',
    isPopular: true,
    features: [
      'Starter tarifining barcha imkoniyatlari',
      'Shaxsiy mentor bilan haftalik 1-on-1 session',
      'Haftalik real Mock testlar',
      'Karyera va rezyume bo‘yicha maslahatlar',
      'Yozib olingan videodarslarga doimiy kirish',
      'Sertifikat topshirish'
    ]
  },
  {
    id: '3',
    name: 'PREMIUM',
    price: '899 000',
    period: 'so‘m / oy',
    description: '100% natija va kafolatlangan ishga joylashishni istaganlar uchun VIP format.',
    isPopular: false,
    features: [
      'Standard tarifining barcha imkoniyatlari',
      'Cheksiz qo‘shimcha konsultatsiya soatlari',
      'Eksklyuziv master-klasslar va networking',
      'Ishga joylashish va HR yordami',
      'Co-working zonasidan tekin foydalanish',
      'Shaxsiy portfolioni baholash'
    ]
  }
];
export interface Course {
  id: string;
  title: string;
  category: 'ingliz-tili' | 'ielts' | 'dasturlash' | 'matematika';
  level: string;
  duration: string;
  schedule: string;
  format: 'Offline' | 'Online' | 'Hybrid';
  price: string;
  description: string;
  badge?: string;
  iconName: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  image: string;
  specialty: string;
  bio: string;
  ieltsScore?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  course: string;
  result: string;
  comment: string;
  avatar: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  isPopular?: boolean;
  features: string[];
}

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}
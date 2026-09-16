import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';
import { CoursesSection } from './sections/CoursesSection';
import { WhyUs } from './sections/WhyUs';
import { ProcessSection } from './sections/ProcessSection';
import { ResultsSection } from './sections/ResultsSection';
import { PricingSection } from './sections/PricingSection';
import { FAQSection } from './sections/FAQSection';
import { CTASection } from './sections/CTASection';
import { ContactSection } from './sections/ContactSection';
import { RegistrationModal } from './components/RegistrationModal';
import { TeachersSection } from './sections/TeacherSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterModalOpen(true);
  const handleCloseRegister = () => setIsRegisterModalOpen(false);

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header / Navbar */}
      <Navbar onOpenRegister={handleOpenRegister} />

      {/* Landing Page Funnel Structure */}
      <main>
        <Hero onOpenRegister={handleOpenRegister} />
        <Stats />
        <CoursesSection onSelectCourse={handleOpenRegister} />
        <WhyUs />
        <ProcessSection />
        <TeachersSection />
        <ResultsSection />
        <PricingSection onSelectPlan={handleOpenRegister} />
        <FAQSection />
        <CTASection onOpenRegister={handleOpenRegister} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Registration / Free Class Lead Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegister}
      />
    </div>
  );
};

export default App;
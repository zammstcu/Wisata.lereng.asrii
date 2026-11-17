import { useCallback, useEffect, useState } from 'react';
import { daftarPaket, type DestinasiItem, type PaketItem } from './data/wisataData';
import { Navbar, type NavSectionId } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinasiSection } from './components/DestinasiSection';
import { PaketSection } from './components/PaketSection';
import { GaleriSection } from './components/GaleriSection';
import { KontakSection } from './components/KontakSection';
import { StickyBookingBar } from './components/StickyBookingBar';
import { Footer } from './components/Footer';

const SECTION_IDS: NavSectionId[] = [
  'beranda',
  'destinasi',
  'paket',
  'galeri',
  'kontak',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSectionId>('beranda');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    daftarPaket[0]?.id || ''
  );
  const [participantCount, setParticipantCount] = useState<number>(2);
  const [preselectedNote, setPreselectedNote] = useState<string>('');

  const handleNavigate = useCallback((id: NavSectionId) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectPackage = useCallback(
    (paket: PaketItem) => {
      setSelectedPackageId(paket.id);
      if (participantCount < paket.minimalPeserta) {
        setParticipantCount(paket.minimalPeserta);
      }
      handleNavigate('kontak');
    },
    [handleNavigate, participantCount]
  );

  const handleInquiryDestinasi = useCallback(
    (destinasi: DestinasiItem) => {
      setPreselectedNote(`Ingin mengunjungi destinasi: ${destinasi.nama}.`);
      handleNavigate('kontak');
    },
    [handleNavigate]
  );

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id as NavSectionId;
          if (SECTION_IDS.includes(id)) {
            setActiveSection(id);
          }
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#132A13]">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <HeroSection onNavigate={handleNavigate} />
        <DestinasiSection onInquiryDestinasi={handleInquiryDestinasi} />
        <PaketSection
          selectedPackageId={selectedPackageId}
          participantCount={participantCount}
          onChangeParticipantCount={setParticipantCount}
          onSelectPackage={handleSelectPackage}
        />
        <GaleriSection />
        <KontakSection
          selectedPackageId={selectedPackageId}
          onSelectPackageId={setSelectedPackageId}
          participantCount={participantCount}
          onChangeParticipantCount={setParticipantCount}
          preselectedNote={preselectedNote}
        />
      </main>

      <Footer onNavigate={handleNavigate} />
      <StickyBookingBar
        selectedPackageId={selectedPackageId}
        participantCount={participantCount}
      />
    </div>
  );
}

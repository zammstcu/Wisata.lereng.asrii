import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profilDesa } from '../data/wisataData';

export type NavSectionId = 'beranda' | 'destinasi' | 'paket' | 'galeri' | 'kontak';

interface NavbarProps {
  activeSection: NavSectionId;
  onNavigate: (id: NavSectionId) => void;
}

const NAV_ITEMS: { id: NavSectionId; label: string }[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'destinasi', label: 'Destinasi' },
  { id: 'paket', label: 'Paket' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'kontak', label: 'Kontak' },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: NavSectionId) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#1B4332]/10">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zona 1: Brand Wordmark satu baris bersih */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('beranda');
          }}
          className="text-lg md:text-xl font-extrabold tracking-tight text-[#1B4332] whitespace-nowrap shrink-0"
        >
          {profilDesa.namaBrand}
        </a>

        {/* Zona 2: 5 tautan navigasi teks satu baris */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-2 text-[15px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#1B4332]'
                    : 'text-[#4A5568] hover:text-[#1B4332]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0.5 h-[2px] rounded-full bg-[#1B4332] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zona 3: 1 tombol aksi utama + toggle menu mobile */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('kontak')}
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-2xl bg-[#1B4332] text-white text-sm font-semibold hover:bg-[#132A13] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Pesan Kunjungan
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl text-[#1B4332] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Panel Menu Mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1B4332]/10 bg-[#FDFBF7] px-5 py-4 shadow-warm">
          <nav aria-label="Navigasi Mobile" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`min-h-[48px] px-4 rounded-xl flex items-center text-[15px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#1B4332] text-white'
                      : 'text-[#132A13] hover:bg-[#F4EFE6]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

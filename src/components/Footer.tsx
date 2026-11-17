import { profilDesa } from '../data/wisataData';
import type { NavSectionId } from './Navbar';

interface FooterProps {
  onNavigate: (id: NavSectionId) => void;
}

const FOOTER_LINKS: { id: NavSectionId; label: string }[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'destinasi', label: 'Destinasi' },
  { id: 'paket', label: 'Paket' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'kontak', label: 'Kontak' },
];

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#1B4332]/10 bg-[#F4EFE6]/70 pt-10 pb-24 md:pb-12">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1B4332]/10 text-left">
          <div className="max-w-md">
            <p className="text-[18px] font-extrabold text-[#1B4332] mb-1.5">
              {profilDesa.namaLengkap}
            </p>
            <p className="text-[14px] leading-[21px] text-[#4A5568]">
              {profilDesa.alamat}
            </p>
          </div>

          <nav aria-label="Navigasi Footer" className="flex flex-wrap items-center gap-5">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.id);
                }}
                className="text-[14px] font-semibold text-[#4A5568] hover:text-[#1B4332] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] text-[#4A5568] text-left">
          <p>© {new Date().getFullYear()} {profilDesa.namaLengkap}. Dikelola bersama masyarakat setempat.</p>
          <p>{profilDesa.jamLayanan}</p>
        </div>
      </div>
    </footer>
  );
}

import { ArrowRight } from 'lucide-react';
import { profilDesa } from '../data/wisataData';
import { SafeImage } from './SafeImage';
import type { NavSectionId } from './Navbar';

interface HeroSectionProps {
  onNavigate: (id: NavSectionId) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section id="beranda" className="pt-8 pb-12 md:pt-14 md:pb-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Hero Split Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Kolom Teks Kiri */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <p className="text-sm font-semibold text-[#40916C] tracking-wide mb-3">
              {profilDesa.sapaanHero}
            </p>
            <h1 className="text-[30px] leading-[38px] sm:text-[36px] sm:leading-[44px] lg:text-[42px] lg:leading-[50px] font-extrabold tracking-[-0.02em] text-[#132A13] mb-5">
              {profilDesa.judulHero}
            </h1>
            <p className="text-[16px] md:text-[17px] leading-[26px] text-[#4A5568] max-w-[60ch] mb-8">
              {profilDesa.subjudulHero}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('paket')}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl bg-[#1B4332] text-white text-[15px] font-semibold hover:bg-[#132A13] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Lihat Paket Wisata</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('destinasi')}
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-2xl border-[1.5px] border-[#1B4332] text-[#1B4332] text-[15px] font-semibold hover:bg-[#F4EFE6] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Jelajahi Destinasi
              </button>
            </div>
          </div>

          {/* Kolom Visual Kanan */}
          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-3xl overflow-hidden card-border-warm shadow-warm-lg bg-[#F4EFE6] aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
              <SafeImage
                src={profilDesa.gambarHero}
                alt={profilDesa.altGambarHero}
                fallbackLabel={profilDesa.namaLengkap}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Strip 4 Sorotan Utama Desa (lebar penuh di bawah Hero) */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {profilDesa.sorotan.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-[#F4EFE6] card-border-warm p-5 text-left"
            >
              <p className="text-[13px] font-semibold text-[#4A5568] mb-1">
                {item.label}
              </p>
              <p className="text-[20px] md:text-[22px] font-bold text-[#1B4332] tabular-nums mb-1">
                {item.nilai}
              </p>
              <p className="text-[13px] leading-[18px] text-[#4A5568]">
                {item.keterangan}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

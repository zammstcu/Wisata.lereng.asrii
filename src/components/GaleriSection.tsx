import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { daftarGaleri } from '../data/wisataData';
import { SafeImage } from './SafeImage';

export function GaleriSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % daftarGaleri.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + daftarGaleri.length) % daftarGaleri.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const activePhoto = lightboxIndex !== null ? daftarGaleri[lightboxIndex] : null;

  return (
    <section id="galeri" className="py-12 md:py-16 border-t border-[#1B4332]/8">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="text-left max-w-2xl mb-8 md:mb-10">
          <h2 className="text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] font-bold tracking-[-0.01em] text-[#132A13] mb-3">
            Galeri Suasana Desa
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[24px] text-[#4A5568]">
            Potret keseharian warga, kabut pagi di terasering, hingga kehangatan beranda homestay. Ketuk foto untuk melihat tampilan penuh.
          </p>
        </div>

        {/* Bento Grid Asimetris */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {daftarGaleri.map((item, index) => {
            const isWide = item.lebarKolom === 'wide';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className={`group relative rounded-3xl overflow-hidden card-border-warm shadow-warm bg-[#F4EFE6] text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1B4332] ${
                  isWide ? 'lg:col-span-2 aspect-[16/9]' : 'aspect-[4/3] lg:aspect-auto lg:min-h-[280px]'
                }`}
              >
                <SafeImage
                  src={item.gambar}
                  alt={item.altGambar}
                  fallbackLabel={item.judul}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {/* Scrim terukur untuk keterbacaan teks minimal 4.5:1 */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#132A13]/85 via-[#132A13]/30 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[12px] font-semibold text-[#A1F4C8] mb-1">
                    {item.lokasi}
                  </p>
                  <h3 className="text-[18px] leading-[24px] font-bold text-white mb-1">
                    {item.judul}
                  </h3>
                  <p className="text-[13px] leading-[18px] text-white/90 line-clamp-2">
                    {item.keterangan}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Galeri */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau foto ${activePhoto.judul}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#132A13]/85 backdrop-blur-xs"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-[#FDFBF7] shadow-warm-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-[#132A13]">
              <SafeImage
                src={activePhoto.gambar}
                alt={activePhoto.altGambar}
                fallbackLabel={activePhoto.judul}
                className="w-full h-full object-contain"
              />

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Tutup galeri"
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#FDFBF7]/95 text-[#132A13] flex items-center justify-center shadow-warm hover:bg-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + daftarGaleri.length) % daftarGaleri.length
                  )
                }
                aria-label="Foto sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FDFBF7]/90 text-[#132A13] flex items-center justify-center shadow-warm hover:bg-white cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % daftarGaleri.length)
                }
                aria-label="Foto berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FDFBF7]/90 text-[#132A13] flex items-center justify-center shadow-warm hover:bg-white cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <div>
                <p className="text-[12px] font-semibold text-[#40916C]">
                  {activePhoto.lokasi}
                </p>
                <h3 className="text-[18px] font-bold text-[#132A13]">
                  {activePhoto.judul}
                </h3>
                <p className="text-[14px] text-[#4A5568]">{activePhoto.keterangan}</p>
              </div>
              <p className="text-[13px] font-semibold text-[#4A5568] tabular-nums shrink-0">
                {lightboxIndex + 1} / {daftarGaleri.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

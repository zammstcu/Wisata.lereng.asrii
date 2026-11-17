import { useEffect, useState } from 'react';
import { Clock, MapPin, X, Check } from 'lucide-react';
import {
  daftarDestinasi,
  formatRupiah,
  type DestinasiItem,
  type KategoriDestinasi,
} from '../data/wisataData';
import { SafeImage } from './SafeImage';

interface DestinasiSectionProps {
  onInquiryDestinasi: (destinasi: DestinasiItem) => void;
}

const KATEGORI_FILTER: Array<'Semua' | KategoriDestinasi> = [
  'Semua',
  'Alam',
  'Agrowisata',
  'Budaya & Kriya',
];

export function DestinasiSection({ onInquiryDestinasi }: DestinasiSectionProps) {
  const [selectedKategori, setSelectedKategori] = useState<'Semua' | KategoriDestinasi>('Semua');
  const [activeModal, setActiveModal] = useState<DestinasiItem | null>(null);

  const filteredDestinasi =
    selectedKategori === 'Semua'
      ? daftarDestinasi
      : daftarDestinasi.filter((item) => item.kategori === selectedKategori);

  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  return (
    <section id="destinasi" className="py-12 md:py-16 border-t border-[#1B4332]/8">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Header Seksi & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="text-left max-w-2xl">
            <h2 className="text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] font-bold tracking-[-0.01em] text-[#132A13] mb-3">
              Destinasi Unggulan Desa
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[24px] text-[#4A5568]">
              Pilih titik kunjungan sesuai minat rombongan Anda, mulai dari air terjun hutan pinus hingga sanggar batik dan kopi warga.
            </p>
          </div>

          {/* Segmented Control Filter Interaktif */}
          <div
            role="tablist"
            aria-label="Filter kategori destinasi"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#F4EFE6] card-border-warm self-start md:self-auto"
          >
            {KATEGORI_FILTER.map((kategori) => {
              const isSelected = selectedKategori === kategori;
              const count =
                kategori === 'Semua'
                  ? daftarDestinasi.length
                  : daftarDestinasi.filter((d) => d.kategori === kategori).length;
              return (
                <button
                  key={kategori}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedKategori(kategori)}
                  className={`min-h-[40px] px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B4332] text-white shadow-warm'
                      : 'text-[#4A5568] hover:text-[#132A13] hover:bg-white/60'
                  }`}
                >
                  {kategori} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Kartu Destinasi */}
        {filteredDestinasi.length === 0 ? (
          <div className="rounded-2xl bg-[#F4EFE6] card-border-warm p-8 text-left">
            <p className="text-[15px] text-[#4A5568]">
              Belum ada destinasi pada kategori ini. Silakan pilih kategori lainnya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDestinasi.map((dest) => (
              <article
                key={dest.id}
                className="flex flex-col rounded-3xl bg-[#F4EFE6] card-border-warm shadow-warm overflow-hidden transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#EAE4D7]">
                  <SafeImage
                    src={dest.gambar}
                    alt={dest.altGambar}
                    fallbackLabel={dest.nama}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 p-6 text-left">
                  {/* Metadata bersih tanpa kotak pill */}
                  <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#40916C] mb-2">
                    <span>{dest.kategori}</span>
                    <span aria-hidden="true" className="text-[#4A5568]">·</span>
                    <span className="text-[#4A5568] font-medium">{dest.jarakDariPos}</span>
                    <span aria-hidden="true" className="text-[#4A5568]">·</span>
                    <span className="text-[#4A5568] font-medium tabular-nums">{dest.jamBuka}</span>
                  </div>

                  <h3 className="text-[20px] leading-[28px] font-bold text-[#132A13] mb-2">
                    {dest.nama}
                  </h3>

                  <p className="text-[15px] leading-[22px] text-[#4A5568] mb-5 flex-1">
                    {dest.ringkasan}
                  </p>

                  {/* Footer Kartu: Harga & Tombol Detail */}
                  <div className="pt-4 border-t border-[#1B4332]/10 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[12px] font-medium text-[#4A5568]">Tiket Masuk</p>
                      <p className="text-[17px] font-bold text-[#1B4332] tabular-nums">
                        {formatRupiah(dest.hargaTiket)}
                        {dest.hargaTiket > 0 && (
                          <span className="text-[13px] font-normal text-[#4A5568]">
                            {' '}
                            / {dest.satuanTiket}
                          </span>
                        )}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModal(dest)}
                      className="min-h-[48px] px-5 py-2.5 rounded-2xl border-[1.5px] border-[#1B4332] text-[#1B4332] text-[14px] font-semibold hover:bg-[#1B4332] hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Detail &amp; Rute
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detail Destinasi */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-destinasi-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#132A13]/55 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FDFBF7] card-border-warm shadow-warm-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full bg-[#EAE4D7]">
              <SafeImage
                src={activeModal.gambar}
                alt={activeModal.altGambar}
                fallbackLabel={activeModal.nama}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Tutup detail destinasi"
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#FDFBF7]/95 text-[#132A13] flex items-center justify-center shadow-warm hover:bg-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 text-left">
              <p className="text-[13px] font-semibold text-[#40916C] mb-1">
                {activeModal.kategori} · {activeModal.jarakDariPos}
              </p>
              <h3
                id="modal-destinasi-title"
                className="text-[24px] leading-[32px] font-bold text-[#132A13] mb-3"
              >
                {activeModal.nama}
              </h3>
              <p className="text-[15px] leading-[24px] text-[#4A5568] mb-6">
                {activeModal.deskripsiLengkap}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F4EFE6] mb-6">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#4A5568]">Jam Operasional</p>
                    <p className="text-[14px] font-bold text-[#132A13] tabular-nums">
                      {activeModal.jamBuka}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#4A5568]">Akses &amp; Tiket</p>
                    <p className="text-[14px] font-bold text-[#132A13] tabular-nums">
                      {formatRupiah(activeModal.hargaTiket)}
                      {activeModal.hargaTiket > 0 ? ` / ${activeModal.satuanTiket}` : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-[15px] font-bold text-[#132A13] mb-3">
                  Fasilitas di Lokasi
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModal.fasilitas.map((fasilitas) => (
                    <li
                      key={fasilitas}
                      className="flex items-center gap-2 text-[14px] text-[#4A5568]"
                    >
                      <Check className="w-4 h-4 text-[#40916C] shrink-0" aria-hidden="true" />
                      <span>{fasilitas}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#1B4332]/10">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="min-h-[48px] px-5 py-2.5 rounded-2xl border-[1.5px] border-[#1B4332] text-[#1B4332] text-[14px] font-semibold hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = activeModal;
                    setActiveModal(null);
                    onInquiryDestinasi(target);
                  }}
                  className="min-h-[48px] px-6 py-2.5 rounded-2xl bg-[#1B4332] text-white text-[14px] font-semibold hover:bg-[#132A13] transition-colors cursor-pointer"
                >
                  Tanyakan Jadwal Kunjungan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

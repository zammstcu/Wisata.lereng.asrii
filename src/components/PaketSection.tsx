import { Check, Minus, Plus, Users } from 'lucide-react';
import {
  daftarPaket,
  formatRupiah,
  type PaketItem,
} from '../data/wisataData';
import { SafeImage } from './SafeImage';

interface PaketSectionProps {
  selectedPackageId: string;
  participantCount: number;
  onChangeParticipantCount: (next: number) => void;
  onSelectPackage: (paket: PaketItem) => void;
}

export function PaketSection({
  selectedPackageId,
  participantCount,
  onChangeParticipantCount,
  onSelectPackage,
}: PaketSectionProps) {
  return (
    <section id="paket" className="py-12 md:py-16 border-t border-[#1B4332]/8">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Header Seksi & Pengatur Jumlah Peserta */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="text-left max-w-2xl">
            <h2 className="text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] font-bold tracking-[-0.01em] text-[#132A13] mb-3">
              Paket Wisata &amp; Homestay
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[24px] text-[#4A5568]">
              Pilih paket perjalanan lengkap bersama pemandu warga lokal. Tanpa login dan tanpa pembayaran daring—pesan langsung ke pengelola via WhatsApp.
            </p>
          </div>

          {/* Kalkulator Jumlah Peserta */}
          <div className="flex items-center justify-between sm:justify-start gap-4 rounded-2xl bg-[#F4EFE6] card-border-warm px-4 py-3 self-start lg:self-auto">
            <div className="flex items-center gap-2 text-[#132A13]">
              <Users className="w-5 h-5 text-[#1B4332]" aria-hidden="true" />
              <span className="text-[14px] font-semibold">Jumlah Peserta</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Kurangi jumlah peserta"
                onClick={() => onChangeParticipantCount(Math.max(1, participantCount - 1))}
                disabled={participantCount <= 1}
                className="w-10 h-10 rounded-xl bg-white card-border-warm flex items-center justify-center text-[#1B4332] hover:bg-[#EAE4D7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span
                aria-live="polite"
                className="min-w-[3.25rem] text-center text-[16px] font-bold text-[#132A13] tabular-nums"
              >
                {participantCount} org
              </span>

              <button
                type="button"
                aria-label="Tambah jumlah peserta"
                onClick={() => onChangeParticipantCount(Math.min(50, participantCount + 1))}
                className="w-10 h-10 rounded-xl bg-white card-border-warm flex items-center justify-center text-[#1B4332] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid Kartu Paket */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {daftarPaket.map((paket) => {
            const isSelected = selectedPackageId === paket.id;
            const effectiveParticipants = Math.max(participantCount, paket.minimalPeserta);
            const totalEstimasi = paket.hargaPerOrang * effectiveParticipants;

            return (
              <article
                key={paket.id}
                className={`flex flex-col rounded-3xl overflow-hidden transition-all duration-150 ${
                  isSelected
                    ? 'bg-white ring-2 ring-[#1B4332] shadow-warm-lg'
                    : 'bg-[#F4EFE6] card-border-warm shadow-warm'
                }`}
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-[#EAE4D7]">
                  <SafeImage
                    src={paket.gambar}
                    alt={paket.altGambar}
                    fallbackLabel={paket.nama}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 p-6 text-left">
                  {/* Kicker teks bersih */}
                  <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold mb-2">
                    <span className="text-[#40916C]">{paket.durasi}</span>
                    <span aria-hidden="true" className="text-[#4A5568]">·</span>
                    <span className="text-[#4A5568] font-medium tabular-nums">
                      Min. {paket.minimalPeserta} peserta
                    </span>
                    {paket.labelStatus && (
                      <>
                        <span aria-hidden="true" className="text-[#4A5568]">·</span>
                        <span className="text-[#E76F51]">{paket.labelStatus}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-[20px] leading-[28px] font-bold text-[#132A13] mb-1.5">
                    {paket.nama}
                  </h3>
                  <p className="text-[14px] leading-[21px] text-[#4A5568] mb-5">
                    {paket.subjudul}
                  </p>

                  {/* Daftar Fasilitas Termasuk */}
                  <ul className="space-y-2.5 mb-5 flex-1">
                    {paket.termasuk.map((poin) => (
                      <li
                        key={poin}
                        className="flex items-start gap-2.5 text-[14px] leading-[20px] text-[#132A13]"
                      >
                        <Check
                          className="w-4 h-4 text-[#40916C] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{poin}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[13px] leading-[18px] text-[#4A5568] mb-5">
                    {paket.catatanTambahan}
                  </p>

                  {/* Harga & Aksi Pilih Paket */}
                  <div className="pt-4 border-t border-[#1B4332]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-[12px] font-medium text-[#4A5568]">
                        {formatRupiah(paket.hargaPerOrang)} / {paket.satuanHarga}
                      </p>
                      <p className="text-[18px] font-extrabold text-[#1B4332] tabular-nums">
                        Estimasi {formatRupiah(totalEstimasi)}
                        <span className="text-[12px] font-medium text-[#4A5568]">
                          {' '}
                          ({effectiveParticipants} org)
                        </span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectPackage(paket)}
                      className={`min-h-[48px] px-5 py-2.5 rounded-2xl text-[14px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        paket.unggulan
                          ? 'bg-[#E76F51] text-white hover:bg-[#D45B3E]'
                          : 'bg-[#1B4332] text-white hover:bg-[#132A13]'
                      }`}
                    >
                      {isSelected ? 'Terpilih · Lanjut Pesan' : 'Pilih Paket Ini'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

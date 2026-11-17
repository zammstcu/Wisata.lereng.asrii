import { MessageCircle } from 'lucide-react';
import {
  buatTautanWhatsApp,
  daftarPaket,
  formatRupiah,
  profilDesa,
} from '../data/wisataData';

interface StickyBookingBarProps {
  selectedPackageId: string;
  participantCount: number;
}

export function StickyBookingBar({
  selectedPackageId,
  participantCount,
}: StickyBookingBarProps) {
  const selectedPaket =
    daftarPaket.find((p) => p.id === selectedPackageId) || daftarPaket[0];
  const effectiveParticipants = Math.max(participantCount, selectedPaket.minimalPeserta);

  const quickMessage = `Halo Pengelola ${profilDesa.namaLengkap}, saya tertarik memesan ${selectedPaket.nama} untuk ${effectiveParticipants} orang. Mohon informasi jadwal yang tersedia.`;

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#1B4332]/15 px-4 py-2.5">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="min-w-0 text-left">
          <p className="text-[12px] font-semibold text-[#4A5568] truncate">
            {selectedPaket.nama}
          </p>
          <p className="text-[15px] font-extrabold text-[#1B4332] tabular-nums truncate">
            Mulai {formatRupiah(selectedPaket.hargaPerOrang)}
            <span className="text-[12px] font-normal text-[#4A5568]"> / org</span>
          </p>
        </div>

        <a
          href={buatTautanWhatsApp(quickMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 rounded-full bg-[#25D366] text-white text-[14px] font-bold hover:bg-[#1EBE5D] transition-colors whitespace-nowrap shrink-0"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          <span>Chat &amp; Pesan</span>
        </a>
      </div>
    </div>
  );
}

import { useEffect, useState, type FormEvent } from 'react';
import {
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  AlertCircle,
} from 'lucide-react';
import {
  buatTautanWhatsApp,
  daftarDestinasi,
  daftarPaket,
  formatRupiah,
  profilDesa,
} from '../data/wisataData';

interface KontakSectionProps {
  selectedPackageId: string;
  onSelectPackageId: (id: string) => void;
  participantCount: number;
  onChangeParticipantCount: (count: number) => void;
  preselectedNote?: string;
}

interface FormErrors {
  nama?: string;
  whatsapp?: string;
  tanggal?: string;
}

export function KontakSection({
  selectedPackageId,
  onSelectPackageId,
  participantCount,
  onChangeParticipantCount,
  preselectedNote = '',
}: KontakSectionProps) {
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [catatan, setCatatan] = useState(preselectedNote);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedNote) {
      setCatatan(preselectedNote);
    }
  }, [preselectedNote]);

  const selectedPaket =
    daftarPaket.find((p) => p.id === selectedPackageId) || daftarPaket[0];
  const effectiveCount = selectedPaket
    ? Math.max(participantCount, selectedPaket.minimalPeserta)
    : participantCount;
  const estimasiBiaya = selectedPaket
    ? selectedPaket.hargaPerOrang * effectiveCount
    : 0;

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!nama.trim() || nama.trim().length < 2) {
      nextErrors.nama = 'Mohon isi nama lengkap Anda (minimal 2 huruf).';
    }
    const cleanPhone = whatsapp.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      nextErrors.whatsapp = 'Mohon isi nomor WhatsApp aktif yang dapat dihubungi.';
    }
    if (!tanggal) {
      nextErrors.tanggal = 'Pilih perkiraan tanggal kunjungan Anda.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildMessage = () => {
    const paketLabel =
      selectedPackageId === 'kunjungan-reguler'
        ? 'Kunjungan Tiket Masuk Reguler (Tanpa Paket)'
        : `${selectedPaket.nama} (${formatRupiah(selectedPaket.hargaPerOrang)}/org)`;

    const lines = [
      `Halo Pengelola ${profilDesa.namaLengkap},`,
      `Saya ingin menanyakan ketersediaan dan memesan kunjungan:`,
      '',
      `• Nama: ${nama.trim()}`,
      `• No. WhatsApp: ${whatsapp.trim()}`,
      `• Pilihan: ${paketLabel}`,
      `• Tanggal Kunjungan: ${tanggal}`,
      `• Perkiraan Peserta: ${effectiveCount} orang`,
      selectedPackageId !== 'kunjungan-reguler'
        ? `• Estimasi Total: ${formatRupiah(estimasiBiaya)}`
        : null,
      catatan.trim() ? `• Catatan: ${catatan.trim()}` : null,
      '',
      'Terima kasih.',
    ].filter((line): line is string => line !== null);

    return lines.join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const message = buildMessage();
    setSubmittedMessage(message);
    setCopied(false);
  };

  const handleCopyMessage = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="kontak" className="py-12 md:py-16 border-t border-[#1B4332]/8">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="text-left max-w-2xl mb-8 md:mb-10">
          <h2 className="text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] font-bold tracking-[-0.01em] text-[#132A13] mb-3">
            Kontak &amp; Pemesanan Langsung
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[24px] text-[#4A5568]">
            Isi ringkasan rencana kunjungan di bawah ini untuk menyiapkan pesan terformat ke WhatsApp pengelola desa, atau hubungi kami secara langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Formulir Reservasi Wisatawan */}
          <div className="lg:col-span-7 rounded-3xl bg-[#F4EFE6] card-border-warm shadow-warm p-6 md:p-8 text-left">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="input-nama"
                    className="block text-[13px] font-semibold text-[#132A13] mb-1.5"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="input-nama"
                    type="text"
                    value={nama}
                    onChange={(e) => {
                      setNama(e.target.value);
                      if (errors.nama) setErrors((prev) => ({ ...prev, nama: undefined }));
                    }}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full h-12 px-4 rounded-xl bg-white border border-[#D8D2C2] text-[15px] text-[#132A13] placeholder:text-[#4A5568]/60 focus:border-2 focus:border-[#2D6A4F] focus:outline-none"
                  />
                  {errors.nama && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-[#BA1A1A]">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{errors.nama}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="input-wa"
                    className="block text-[13px] font-semibold text-[#132A13] mb-1.5"
                  >
                    Nomor WhatsApp
                  </label>
                  <input
                    id="input-wa"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => {
                      setWhatsapp(e.target.value);
                      if (errors.whatsapp)
                        setErrors((prev) => ({ ...prev, whatsapp: undefined }));
                    }}
                    placeholder="Contoh: 08123456789"
                    className="w-full h-12 px-4 rounded-xl bg-white border border-[#D8D2C2] text-[15px] text-[#132A13] placeholder:text-[#4A5568]/60 focus:border-2 focus:border-[#2D6A4F] focus:outline-none tabular-nums"
                  />
                  {errors.whatsapp && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-[#BA1A1A]">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{errors.whatsapp}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="select-paket"
                  className="block text-[13px] font-semibold text-[#132A13] mb-1.5"
                >
                  Pilihan Paket Wisata
                </label>
                <select
                  id="select-paket"
                  value={selectedPackageId}
                  onChange={(e) => {
                    onSelectPackageId(e.target.value);
                    setSubmittedMessage(null);
                  }}
                  className="w-full h-12 px-4 rounded-xl bg-white border border-[#D8D2C2] text-[15px] text-[#132A13] focus:border-2 focus:border-[#2D6A4F] focus:outline-none"
                >
                  {daftarPaket.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama} — {formatRupiah(p.hargaPerOrang)} / {p.satuanHarga}
                    </option>
                  ))}
                  <option value="kunjungan-reguler">
                    Kunjungan Reguler (Tiket Masuk Per Destinasi)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="input-tanggal"
                    className="block text-[13px] font-semibold text-[#132A13] mb-1.5"
                  >
                    Rencana Tanggal Kunjungan
                  </label>
                  <input
                    id="input-tanggal"
                    type="date"
                    min={todayStr}
                    value={tanggal}
                    onChange={(e) => {
                      setTanggal(e.target.value);
                      if (errors.tanggal)
                        setErrors((prev) => ({ ...prev, tanggal: undefined }));
                    }}
                    className="w-full h-12 px-4 rounded-xl bg-white border border-[#D8D2C2] text-[15px] text-[#132A13] focus:border-2 focus:border-[#2D6A4F] focus:outline-none tabular-nums"
                  />
                  {errors.tanggal && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-[#BA1A1A]">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{errors.tanggal}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="input-peserta"
                    className="block text-[13px] font-semibold text-[#132A13] mb-1.5"
                  >
                    Perkiraan Jumlah Peserta
                  </label>
                  <input
                    id="input-peserta"
                    type="number"
                    min={1}
                    max={100}
                    value={participantCount}
                    onChange={(e) =>
                      onChangeParticipantCount(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-full h-12 px-4 rounded-xl bg-white border border-[#D8D2C2] text-[15px] text-[#132A13] focus:border-2 focus:border-[#2D6A4F] focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="input-catatan"
                  className="block text-[13px] font-semibold text-[#132A13] mb-1.5"
                >
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  id="input-catatan"
                  rows={3}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Misalnya: membawa peserta lansia, permintaan kamar lantai dasar, atau minat khusus destinasi tertentu."
                  className="w-full p-4 rounded-xl bg-white border border-[#D8D2C2] text-[15px] text-[#132A13] placeholder:text-[#4A5568]/60 focus:border-2 focus:border-[#2D6A4F] focus:outline-none"
                />
              </div>

              {/* Ringkasan Estimasi Biaya */}
              {selectedPackageId !== 'kunjungan-reguler' && (
                <div className="p-4 rounded-2xl bg-white card-border-warm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-[#4A5568]">
                      Estimasi Biaya Paket ({effectiveCount} peserta)
                    </p>
                    <p className="text-[12px] text-[#4A5568]">
                      Dibayarkan langsung di lokasi atau sesuai kesepakatan dengan pengelola.
                    </p>
                  </div>
                  <p className="text-[20px] font-extrabold text-[#1B4332] tabular-nums shrink-0">
                    {formatRupiah(estimasiBiaya)}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full min-h-[52px] px-6 py-3 rounded-2xl bg-[#1B4332] text-white text-[15px] font-bold hover:bg-[#132A13] transition-colors duration-150 cursor-pointer"
              >
                Siapkan Pesan Reservasi
              </button>
            </form>

            {/* Panel Konfirmasi & Tautan WhatsApp Setelah Validasi */}
            {submittedMessage && (
              <div
                aria-live="polite"
                className="mt-6 p-5 rounded-2xl bg-white ring-1 ring-[#40916C]/30 shadow-warm"
              >
                <div className="flex items-center gap-2 text-[#1B4332] font-bold text-[15px] mb-2">
                  <Check className="w-5 h-5 text-[#40916C]" aria-hidden="true" />
                  <span>Draf Pesan Siap Dikirim ke Pengelola</span>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-[13px] leading-[20px] text-[#4A5568] bg-[#FDFBF7] p-4 rounded-xl border border-[#1B4332]/10 mb-4">
                  {submittedMessage}
                </pre>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={buatTautanWhatsApp(submittedMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#25D366] text-white text-[14px] font-bold hover:bg-[#1EBE5D] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>Kirim via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 rounded-2xl border-[1.5px] border-[#1B4332] text-[#1B4332] text-[14px] font-semibold hover:bg-[#F4EFE6] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#40916C]" aria-hidden="true" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Salin Teks</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Kolom Kanan: Informasi Kontak & Akses Lokasi Desa */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            <div className="rounded-3xl bg-[#F4EFE6] card-border-warm shadow-warm p-6 md:p-7">
              <h3 className="text-[18px] font-bold text-[#132A13] mb-4">
                Pusat Informasi Pengelola
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#132A13]">Alamat Pos Wisata</p>
                    <p className="text-[14px] leading-[21px] text-[#4A5568]">
                      {profilDesa.alamat}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#132A13]">Jam Layanan &amp; Kunjungan</p>
                    <p className="text-[14px] leading-[21px] text-[#4A5568]">
                      {profilDesa.jamLayanan}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#132A13]">Telepon / WhatsApp Resmi</p>
                    <p className="text-[14px] leading-[21px] text-[#4A5568] tabular-nums">
                      {profilDesa.nomorTeleponTampil}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#132A13]">Surat Elektronik</p>
                    <p className="text-[14px] leading-[21px] text-[#4A5568]">
                      {profilDesa.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#1B4332]/10">
                <a
                  href={buatTautanWhatsApp(
                    `Halo Pengelola ${profilDesa.namaLengkap}, saya ingin bertanya mengenai informasi kunjungan ke desa wisata.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-full bg-[#25D366] text-white text-[15px] font-bold hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Chat Langsung via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Ringkasan Rute & Daftar Tiket Cepat */}
            <div className="rounded-3xl bg-[#F4EFE6] card-border-warm p-6 md:p-7">
              <h3 className="text-[16px] font-bold text-[#132A13] mb-3">
                Referensi Tiket Masuk Per Destinasi
              </h3>
              <ul className="divide-y divide-[#1B4332]/10">
                {daftarDestinasi.map((dest) => (
                  <li
                    key={dest.id}
                    className="py-2.5 flex items-center justify-between gap-3 text-[14px]"
                  >
                    <span className="text-[#132A13] font-medium">{dest.nama}</span>
                    <span className="font-bold text-[#1B4332] tabular-nums shrink-0">
                      {formatRupiah(dest.hargaTiket)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

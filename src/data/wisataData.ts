/**
 * BERKAS DATA TERPISAH — DESA WISATA LERENG ASRI
 * ---------------------------------------------------------------------------
 * Seluruh konten profil desa, destinasi wisata, paket kunjungan/homestay,
 * serta galeri disimpan di berkas ini agar pengelola mudah memperbarui
 * harga, deskripsi, jam buka, maupun nomor WhatsApp tanpa mengubah kode tampilan.
 */

export type KategoriDestinasi = 'Alam' | 'Budaya & Kriya' | 'Agrowisata';

export interface DestinasiItem {
  id: string;
  nama: string;
  kategori: KategoriDestinasi;
  ringkasan: string;
  deskripsiLengkap: string;
  hargaTiket: number;
  satuanTiket: string;
  jamBuka: string;
  jarakDariPos: string;
  fasilitas: string[];
  gambar: string;
  altGambar: string;
  unggulan?: boolean;
}

export interface PaketItem {
  id: string;
  nama: string;
  subjudul: string;
  durasi: string;
  hargaPerOrang: number;
  satuanHarga: string;
  minimalPeserta: number;
  labelStatus?: string;
  termasuk: string[];
  catatanTambahan: string;
  gambar: string;
  altGambar: string;
  unggulan?: boolean;
}

export interface GaleriItem {
  id: string;
  judul: string;
  lokasi: string;
  keterangan: string;
  gambar: string;
  altGambar: string;
  lebarKolom?: 'wide' | 'standard';
}

export interface SorotanDesa {
  label: string;
  nilai: string;
  keterangan: string;
}

export interface ProfilDesa {
  namaBrand: string;
  namaLengkap: string;
  sapaanHero: string;
  judulHero: string;
  subjudulHero: string;
  nomorWhatsApp: string; // Format internasional tanpa tanda +, mis. 6281234567890
  nomorTeleponTampil: string;
  email: string;
  alamat: string;
  jamLayanan: string;
  waktuTempuhKota: string;
  gambarHero: string;
  altGambarHero: string;
  sorotan: SorotanDesa[];
}

export const profilDesa: ProfilDesa = {
  namaBrand: 'Lereng Asri',
  namaLengkap: 'Desa Wisata Lereng Asri',
  sapaanHero: 'Sugeng Rawuh di Lereng Asri',
  judulHero: 'Menikmati Sejuknya Lereng Pegunungan Bersama Warga Desa',
  subjudulHero:
    'Nikmati udara sejuk ketinggian 1.150 mdpl, jalur jalan kaki di tengah terasering hijau, seduhan kopi arabika panen warga, serta kehangatan menginap di rumah kayu pedesaan.',
  nomorWhatsApp: '6281234567890',
  nomorTeleponTampil: '+62 812-3456-7890',
  email: 'halo@lerengasri.desa.id',
  alamat: 'Jl. Raya Terasering No. 14, Dusun Krajan, Kec. Sumbersejuk, Kab. Malang 65154',
  jamLayanan: 'Setiap hari, 06.00 – 17.30 WIB',
  waktuTempuhKota: '45 menit dari pusat kota',
  gambarHero: '/src/assets/images/hero_lereng_asri_1794889066619.jpg',
  altGambarHero: 'Pemandangan matahari terbit di terasering hijau dan pendopo kayu Desa Wisata Lereng Asri',
  sorotan: [
    {
      label: 'Ketinggian Desa',
      nilai: '1.150 mdpl',
      keterangan: 'Udara pegunungan sejuk 18–23°C',
    },
    {
      label: 'Akses Kendaraan',
      nilai: '45 Menit',
      keterangan: 'Jalan aspal mulus dari pusat kota',
    },
    {
      label: 'Jam Kunjungan',
      nilai: '06.00 – 17.30',
      keterangan: 'Pos wisata buka setiap hari',
    },
    {
      label: 'Ramah Keluarga',
      nilai: 'Semua Usia',
      keterangan: 'Tersedia jalur landai ramah lansia',
    },
  ],
};

export const daftarDestinasi: DestinasiItem[] = [
  {
    id: 'curug-pinus',
    nama: 'Curug Embun Pinus',
    kategori: 'Alam',
    ringkasan:
      'Air terjun alami berair jernih di tengah rindang hutan pinus dengan jembatan kayu yang aman dilalui keluarga.',
    deskripsiLengkap:
      'Curug Embun Pinus berada di lembah utara desa dengan jalur setapak berbatu rapi dan pegangan kayu di tepiannya. Pengunjung dapat bersantai di gazebo tepi sungai, merendam kaki di kolam dangkal, atau berfoto di bawah sinar matahari pagi yang menembus kabut.',
    hargaTiket: 15000,
    satuanTiket: 'orang',
    jamBuka: '06.30 – 16.30 WIB',
    jarakDariPos: '10 menit jalan santai',
    fasilitas: ['Jalur batu aman & pegangan kayu', 'Gazebo istirahat', 'Toilet bersih & musala', 'Warung wedang jahe'],
    gambar: '/src/assets/images/dest_curug_pinus_1794889067916.jpg',
    altGambar: 'Air terjun Curug Embun Pinus mengalir jernih di antara bebatuan berlumut dan hutan pinus',
    unggulan: true,
  },
  {
    id: 'terasering-pandang',
    nama: 'Gardu Pandang Terasering',
    kategori: 'Agrowisata',
    ringkasan:
      'Anjungan kayu menghadap hamparan kebun teh, sayur organik, dan barisan pegunungan di ufuk timur.',
    deskripsiLengkap:
      'Terletak di punggung bukit sebelah timur, Gardu Pandang Terasering menjadi lokasi favorit menyambut matahari terbit tanpa harus mendaki berat. Pengunjung bisa memetik sayur segar langsung bersama petani lokal dan menikmati teh hangat di pendopo.',
    hargaTiket: 10000,
    satuanTiket: 'orang',
    jamBuka: '05.30 – 17.30 WIB',
    jarakDariPos: '5 menit dari parkir utama',
    fasilitas: ['Anjungan kayu luas', 'Akses landai dekat parkir', 'Edukasi petik sayur organik', 'Tempat duduk teduh'],
    gambar: '/src/assets/images/dest_kebun_terasering_1794889070023.jpg',
    altGambar: 'Anjungan kayu Gardu Pandang Terasering menghadap kebun sayur dan perbukitan hijau',
    unggulan: true,
  },
  {
    id: 'sanggar-batik-kopi',
    nama: 'Sanggar Batik & Sangrai Kopi',
    kategori: 'Budaya & Kriya',
    ringkasan:
      'Ruang belajar membatik motif daun pakis menggunakan pewarna alami sekaligus menyangrai kopi arabika lereng.',
    deskripsiLengkap:
      'Dipandu langsung oleh ibu-ibu pengrajin dan kelompok tani kopi desa, pengunjung diajak mengenal proses pewarnaan kain dari kulit kayu serta daun indigo. Sesi ditutup dengan mencicipi seduhan kopi sangrai tradisional di pendopo bambu terbuka.',
    hargaTiket: 35000,
    satuanTiket: 'orang (termasuk suvenir kain kecil)',
    jamBuka: '08.00 – 16.00 WIB',
    jarakDariPos: '3 menit dari balai desa',
    fasilitas: ['Alat canting & bahan alami', 'Kopi arabika seduh tubruk/V60', 'Pendopo teduh ramah lansia', 'Galeri karya warga'],
    gambar: '/src/assets/images/dest_batik_kopi_1794889068375.jpg',
    altGambar: 'Pengrajin desa membatik dengan pewarna alami di samping nampan biji kopi sangrai',
  },
  {
    id: 'kampung-homestay',
    nama: 'Kampung Rumah Kayu & Kebun Bunga',
    kategori: 'Budaya & Kriya',
    ringkasan:
      'Kawasan rumah warga bergaya tradisional beranda luas yang dikelilingi taman bunga dan kebun buah pekarangan.',
    deskripsiLengkap:
      'Kawasan pemukiman tertata asri tempat wisatawan berinteraksi langsung dengan keseharian warga. Setiap beranda menghadap lembah hijau, cocok untuk bersantai sore sembari menyantap jajanan pasar hangat dan teh sereh.',
    hargaTiket: 0,
    satuanTiket: 'Gratis (area pejalan kaki desa)',
    jamBuka: '06.00 – 18.00 WIB',
    jarakDariPos: 'Pusat dusun wisata',
    fasilitas: ['Jalur pejalan kaki rata', 'Taman bunga warga', 'Kios oleh-oleh UMKM', 'Parkir bus & mobil pribadi'],
    gambar: '/src/assets/images/paket_homestay_desa_1794889068581.jpg',
    altGambar: 'Beranda rumah kayu homestay warga menghadap taman hijau dan kabut pegunungan',
  },
];

export const daftarPaket: PaketItem[] = [
  {
    id: 'paket-jelajah-sehari',
    nama: 'Paket Jelajah Desa Sehari',
    subjudul: 'Cocok untuk kunjungan keluarga & rombongan akhir pekan tanpa menginap',
    durasi: '1 Hari (08.00 – 15.30 WIB)',
    hargaPerOrang: 125000,
    satuanHarga: 'orang',
    minimalPeserta: 2,
    labelStatus: 'Paling Diminati',
    termasuk: [
      'Tiket masuk seluruh destinasi wisata desa',
      'Pemandu lokal ramah selama perjalanan',
      '1x makan siang prasmanan masakan rumahan desa',
      'Welcome drink teh sereh hangat & jajanan tradisional',
      'Sesi singkat mencicipi kopi sangrai warga',
    ],
    catatanTambahan: 'Rute jalan kaki dapat disesuaikan untuk rombongan lansia atau anak-anak.',
    gambar: '/src/assets/images/dest_kebun_terasering_1794889070023.jpg',
    altGambar: 'Wisatawan menikmati panorama terasering hijau pada Paket Jelajah Desa Sehari',
    unggulan: true,
  },
  {
    id: 'paket-homestay-2h1m',
    nama: 'Paket Nginep Homestay Lereng (2H1M)',
    subjudul: 'Menginap tenang di rumah kayu warga lengkap dengan sarapan kebun dan jelajah pagi',
    durasi: '2 Hari 1 Malam',
    hargaPerOrang: 285000,
    satuanHarga: 'orang',
    minimalPeserta: 2,
    labelStatus: 'Tersedia Akhir Pekan',
    termasuk: [
      '1 malam menginap di Homestay Rumah Kayu (kamar bersih & air panas)',
      '3x makan masakan khas desa (makan malam, sarapan, makan siang)',
      'Jelajah matahari terbit di Gardu Pandang & Curug Embun Pinus',
      'Api unggun sore & jagung bakar bersama warga',
      'Dokumentasi foto kenangan bersama pemandu',
    ],
    catatanTambahan: 'Anak usia di bawah 5 tahun gratis. Tersedia kamar di lantai dasar tanpa tangga.',
    gambar: '/src/assets/images/paket_homestay_desa_1794889068581.jpg',
    altGambar: 'Beranda homestay kayu hangat dengan sajian teh dan kue tradisional di pagi hari',
    unggulan: true,
  },
  {
    id: 'paket-kriya-kopi',
    nama: 'Paket Workshop Batik & Panen Kopi',
    subjudul: 'Pengalaman edukatif membuat batik warna alam dan menyangrai kopi lereng',
    durasi: 'Half-Day (4 Jam)',
    hargaPerOrang: 150000,
    satuanHarga: 'orang',
    minimalPeserta: 4,
    labelStatus: 'Edukasi & Komunitas',
    termasuk: [
      'Alat canting, malam, dan kain sapu tangan batik untuk dibawa pulang',
      'Pendampingan pengrajin batik dan petani kopi lokal',
      'Praktik sangrai biji kopi arabika secara tradisional',
      '1x makan siang nasi liwet daun pisang',
    ],
    catatanTambahan: 'Ideal untuk outing kantor, komunitas, atau kunjungan edukasi sekolah.',
    gambar: '/src/assets/images/dest_batik_kopi_1794889068375.jpg',
    altGambar: 'Kegiatan membatik pewarna alami dan menyangrai kopi di sanggar bambu',
  },
  {
    id: 'paket-panen-keluarga',
    nama: 'Paket Agrowisata Petik Sayur & Air Terjun',
    subjudul: 'Liburan santai memetik hasil kebun organik dan bermain air di curug pinus',
    durasi: '1 Hari (07.30 – 14.00 WIB)',
    hargaPerOrang: 110000,
    satuanHarga: 'orang',
    minimalPeserta: 2,
    termasuk: [
      'Tiket masuk Gardu Pandang & Curug Embun Pinus',
      'Keranjang petik sayur organik (bisa dibawa pulang 1 kg per orang)',
      'Sajian teh hangat & pisang goreng gula aren di pendopo',
      'Pemandu pendamping jalur landai',
    ],
    catatanTambahan: 'Disarankan memakai alas kaki nyaman yang tidak licin.',
    gambar: '/src/assets/images/dest_curug_pinus_1794889067916.jpg',
    altGambar: 'Pemandangan asri Curug Embun Pinus untuk wisata keluarga',
  },
];

export const daftarGaleri: GaleriItem[] = [
  {
    id: 'galeri-1',
    judul: 'Fajar Keemasan di Pendopo Joglo',
    lokasi: 'Pendopo Utama Desa',
    keterangan: 'Kabut tipis menyelimuti terasering sawah saat matahari mulai menyinari lembah.',
    gambar: '/src/assets/images/hero_lereng_asri_1794889066619.jpg',
    altGambar: 'Pendopo joglo menghadap kabut pagi di lembah terasering Lereng Asri',
    lebarKolom: 'wide',
  },
  {
    id: 'galeri-2',
    judul: 'Jernihnya Aliran Curug Embun Pinus',
    lokasi: 'Lembah Pinus Utara',
    keterangan: 'Gemericik air pegunungan yang sejuk dengan jalur kayu aman untuk semua usia.',
    gambar: '/src/assets/images/dest_curug_pinus_1794889067916.jpg',
    altGambar: 'Aliran Curug Embun Pinus di tengah hutan pinus yang asri',
  },
  {
    id: 'galeri-3',
    judul: 'Karya Tangan Pengrajin Batik & Kopi',
    lokasi: 'Sanggar Kriya Krajan',
    keterangan: 'Ibu-ibu perajin membatik motif pakis dengan pewarna alami daun dan kulit kayu.',
    gambar: '/src/assets/images/dest_batik_kopi_1794889068375.jpg',
    altGambar: 'Pengrajin desa sedang membatik di pendopo bambu terbuka',
  },
  {
    id: 'galeri-4',
    judul: 'Pagi Hangat di Beranda Homestay',
    lokasi: 'Kampung Rumah Kayu',
    keterangan: 'Menyeruput teh hangat dan jajanan pasar di beranda rumah warga yang asri.',
    gambar: '/src/assets/images/paket_homestay_desa_1794889068581.jpg',
    altGambar: 'Teh hangat dan kue pasar tersaji di beranda rumah kayu pedesaan',
  },
  {
    id: 'galeri-5',
    judul: 'Panorama Kebun Terasering',
    lokasi: 'Gardu Pandang Timur',
    keterangan: 'Hamparan kebun teh dan sayuran lereng gunung yang tertata rapi sepanjang bukit.',
    gambar: '/src/assets/images/dest_kebun_terasering_1794889070023.jpg',
    altGambar: 'Wisatawan memandang kebun terasering hijau dari anjungan kayu',
    lebarKolom: 'wide',
  },
];

/**
 * Helper pemformatan Rupiah & pembuatan tautan WhatsApp
 */
export function formatRupiah(nominal: number): string {
  if (nominal === 0) return 'Gratis';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(nominal);
}

export function buatTautanWhatsApp(pesan: string): string {
  const nomor = profilDesa.nomorWhatsApp.replace(/[^0-9]/g, '');
  return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
}

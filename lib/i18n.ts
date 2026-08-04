import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

export const translations = {
  en: {
    // Nav & Utilities
    documentation: "Documentation",
    forum: "Forum",
    dealerPortal: "Dealer Portal",
    buyOnline: "Buy Online",
    
    // Header Nav
    products: "Products",
    solutions: "Solutions",
    support: "Support",
    community: "Community",
    
    // Hero
    heroTagline: "MOTORSPORT TELEMETRY SYSTEM",
    heroTitleLine1: "Precision Telemetry",
    heroTitleLine2: "For Every Track Level",
    heroSubtitle: "From weekend track days to professional endurance racing. Capture, analyze, and optimize your performance with real-time data streaming and sub-millisecond precision.",
    exploreSystems: "EXPLORE SYSTEMS",
    viewDemo: "REQUEST DEMO",
    
    // Hardware lineup
    hardwareCategory: "Hardware Lineup",
    hardwareTitle: "Choose Your Performance Tier",
    hardwareSubtitle: "Three distinct systems engineered for specific racing environments.",
    
    // Cards
    energySpecialist: "Energy Specialist",
    joulemeterSubtitle: "Precision Energy Logger",
    mostPopular: "Most Popular",
    nexusSubtitle: "Brain & Mouth — 4G LTE Telemetry",
    driverCockpit: "Driver Cockpit",
    displaySubtitle: "The Eyes — Race-Grade Display",
    learnMore: "Learn More",
    
    // Features
    wirelessTitle: "Wireless Everything",
    wirelessDesc: "Seamless connectivity via WiFi, Bluetooth 5.0, and 4G LTE. Stream data to the pits without cables.",
    ioTitle: "Flexible I/O",
    ioDesc: "Connect any sensor. Configurable analog inputs, RPM frequency, PWM outputs, and digital switching.",
    imuTitle: "6-Axis IMU",
    imuDesc: "High-precision accelerometer and gyroscope for detailed G-force mapping, pitch, and roll analysis.",
    
    // Software
    softwareCategory: "Podium Cloud Software",
    softwareDesc: "Visualize your telemetry data instantly. Our cloud-based platform allows pit crews to monitor vehicle health and lap times from anywhere in the world.",
    liveTelemetry: "Live Telemetry Streaming",
    historicalAnalysis: "Historical Session Analysis",
    socialComparison: "Social Sharing & Comparison",
    viewLiveDemo: "View Live Demo Dashboard",
    
    // Contact
    contactCategory: "Contact Us",
    contactTitle: "Contact Our Engineering Team",
    contactSubtitle: "Have questions about SynchroTech telemetry systems? Get in touch directly.",
    detailTitle: "Contact & Workshop Details",
    detailDesc: "Please visit our workshop or contact us via WhatsApp/Email for quick support and product information.",
    addressLabel: "Address",
    whatsappLabel: "No. HP / WhatsApp",
    emailLabel: "Email",
    businessCategory: "Business Category",
    businessDesc: "Automotive Services, Motorsport Tech",
    operationalHours: "Operational Hours",
    operationalDesc: "Monday - Saturday (Sunday: Closed)",
    
    // Form
    formTitle: "Send Message",
    fullName: "Full Name",
    namePlaceholder: "Your Name",
    emailPlaceholder: "name@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Write your message here...",
    sendMessage: "Send Message",
    sending: "Sending...",
    sentTitle: "Message Sent!",
    sentDesc: "Thank you {name}. We have opened Gmail in a new tab to send to {email}.",
    sentGmailBtn: "Open Gmail (Web)",
    sentOtherBtn: "Send via Other Email Client",
    sendAnother: "Send another message",
    
    // Footer
    footerDesc: "Advanced telemetry systems for racers who demand data-driven performance. Designed in Detroit, raced worldwide.",
    stayConnected: "Stay Connected",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",

    // Coming Soon
    systemUpdate: "SYSTEM UPDATE",
    comingSoonTitle: "COMING SOON",
    comingSoonDesc: "The page {page} is currently in active development to expand the SynchroTech ecosystem.",
    backToHome: "BACK TO HOMEPAGE",
    establishingTelemetry: "ESTABLISHING TELEMETRY STREAM... 87%"
  },
  id: {
    // Nav & Utilities
    documentation: "Dokumentasi",
    forum: "Forum",
    dealerPortal: "Portal Dealer",
    buyOnline: "Beli Online",
    
    // Header Nav
    products: "Produk",
    solutions: "Solusi",
    support: "Dukungan",
    community: "Komunitas",
    
    // Hero
    heroTagline: "SISTEM TELEMETRI BALAP PRESISI",
    heroTitleLine1: "Telemetri Presisi Untuk",
    heroTitleLine2: "Setiap Level Lintasan",
    heroSubtitle: "Dari track day akhir pekan hingga balap ketahanan profesional. Rekam, analisis, dan tingkatkan performa Anda dengan streaming data real-time dan presisi sub-milidetik.",
    exploreSystems: "JELAJAHI SISTEM",
    viewDemo: "AJUKAN DEMO",
    
    // Hardware lineup
    hardwareCategory: "Lini Perangkat Keras",
    hardwareTitle: "Pilih Tingkat Performa Anda",
    hardwareSubtitle: "Tiga sistem berbeda yang dirancang khusus untuk lingkungan balapan tertentu.",
    
    // Cards
    energySpecialist: "Spesialis Energi",
    joulemeterSubtitle: "Perekam Energi Presisi",
    mostPopular: "Paling Populer",
    nexusSubtitle: "Otak & Mulut — Telemetri 4G LTE",
    driverCockpit: "Kokpit Pengemudi",
    displaySubtitle: "Mata — Layar Kelas Balap",
    learnMore: "Pelajari Selengkapnya",
    
    // Features
    wirelessTitle: "Serba Nirkabel",
    wirelessDesc: "Konektivitas tanpa hambatan via WiFi, Bluetooth 5.0, dan 4G LTE. Kirim data ke pit tanpa kabel.",
    ioTitle: "I/O Fleksibel",
    ioDesc: "Hubungkan sensor apa pun. Input analog yang dapat dikonfigurasi, frekuensi RPM, output PWM, dan pensaklaran digital.",
    imuTitle: "IMU 6-Axis",
    imuDesc: "Akselerometer dan giroskop presisi tinggi untuk pemetaan gaya G, analisis pitch, dan roll yang mendetail.",
    
    // Software
    softwareCategory: "Perangkat Lunak Podium Cloud",
    softwareDesc: "Visualisasikan data Anda secara instan. Platform berbasis cloud kami memungkinkan kru pit memantau kesehatan kendaraan dan waktu lap dari mana saja di dunia.",
    liveTelemetry: "Streaming Telemetri Langsung",
    historicalAnalysis: "Analisis Sesi Historis",
    socialComparison: "Berbagi Sosial & Perbandingan",
    viewLiveDemo: "Lihat Dasbor Demo Langsung",
    
    // Contact
    contactCategory: "Hubungi Kami",
    contactTitle: "Hubungi Tim Rekayasa Kami",
    contactSubtitle: "Ada pertanyaan mengenai sistem telemetri SynchroTech? Hubungi kami langsung.",
    detailTitle: "Detail Kontak & Workshop",
    detailDesc: "Silakan kunjungi workshop kami atau hubungi kami melalui WhatsApp/Email untuk dukungan cepat dan informasi produk.",
    addressLabel: "Alamat",
    whatsappLabel: "No. HP / WhatsApp",
    emailLabel: "Email",
    businessCategory: "Kategori Bisnis",
    businessDesc: "Layanan Otomotif, Bisnis Tech Motorsport",
    operationalHours: "Jam Operasional",
    operationalDesc: "Senin - Sabtu (Minggu: Tutup)",
    
    // Form
    formTitle: "Kirim Pesan",
    fullName: "Nama Lengkap",
    namePlaceholder: "Nama Anda",
    emailPlaceholder: "nama@email.com",
    messageLabel: "Pesan",
    messagePlaceholder: "Tuliskan pesan Anda di sini...",
    sendMessage: "Kirim Pesan",
    sending: "Mengirim...",
    sentTitle: "Pesan Terkirim!",
    sentDesc: "Terima kasih {name}. Kami telah membuka Gmail di tab baru untuk mengirim ke {email}.",
    sentGmailBtn: "Buka Gmail (Web)",
    sentOtherBtn: "Kirim via Aplikasi Email Lain",
    sendAnother: "Kirim pesan lain",
    
    // Footer
    footerDesc: "Sistem telemetri canggih untuk pembalap yang menuntut performa berbasis data. Dirancang di Detroit, diuji di lintasan balap dunia.",
    stayConnected: "Tetap Terhubung",
    privacyPolicy: "Kebijakan Privasi",
    termsOfService: "Syarat & Ketentuan",

    // Coming Soon
    systemUpdate: "PEMBARUAN SISTEM",
    comingSoonTitle: "SEGERA HADIR",
    comingSoonDesc: "Halaman {page} sedang dikembangkan untuk melengkapi sistem telemetri presisi SynchroTech.",
    backToHome: "KEMBALI KE BERANDA",
    establishingTelemetry: "MEMBANGUN ALIRAN TELEMETRI... 87%"
  }
};

export type Language = 'en' | 'id';

export function t(key: keyof typeof translations['en'], lang: Language): string {
  return translations[lang][key] || translations['en'][key] || key;
}

const LANG_STORAGE_KEY = 'synchrotech-lang';

export function useLang(): [Language, Dispatch<SetStateAction<Language>>] {
  const [lang, setLangState] = useState<Language>('id');

  useEffect(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'en' || stored === 'id') setLangState(stored);
  }, []);

  const setLang: Dispatch<SetStateAction<Language>> = (value) => {
    setLangState(prev => {
      const next = value instanceof Function ? value(prev) : value;
      localStorage.setItem(LANG_STORAGE_KEY, next);
      return next;
    });
  };

  return [lang, setLang];
}

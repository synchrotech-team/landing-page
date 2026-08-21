export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ProductLocalizedData {
  subtitle: string;
  badge: string;
  stockStatus: string;
  description: string;
  longDescription: string;
  keySpecs: string[];
  features: ProductFeature[];
  specifications: ProductSpec[];
  inTheBox: string[];
}

export interface Product extends ProductLocalizedData {
  slug: string;
  name: string;
  badgeType: 'blue' | 'purple' | 'dark';
  category: string;
  price: string;
  mockupType: 'joulemeter' | 'nexus' | 'display';
  image: string;
  en: ProductLocalizedData;
}

export function getLocalizedProduct(product: Product, lang: 'id' | 'en'): ProductLocalizedData & Product {
  const fallback = PRODUCTS_DATA[product.slug];

  const baseFeatures = (product.features && product.features.length > 0) ? product.features : (fallback?.features || []);
  const baseSpecs = (product.specifications && product.specifications.length > 0) ? product.specifications : (fallback?.specifications || []);
  const baseInTheBox = (product.inTheBox && product.inTheBox.length > 0) ? product.inTheBox : (fallback?.inTheBox || []);
  const baseKeySpecs = (product.keySpecs && product.keySpecs.length > 0) ? product.keySpecs : (fallback?.keySpecs || []);

  if (lang === 'en' && product.en) {
    const enFeatures = (product.en.features && product.en.features.length > 0) ? product.en.features : (fallback?.en?.features || baseFeatures);
    const enSpecs = (product.en.specifications && product.en.specifications.length > 0) ? product.en.specifications : (fallback?.en?.specifications || baseSpecs);
    const enInTheBox = (product.en.inTheBox && product.en.inTheBox.length > 0) ? product.en.inTheBox : (fallback?.en?.inTheBox || baseInTheBox);
    const enKeySpecs = (product.en.keySpecs && product.en.keySpecs.length > 0) ? product.en.keySpecs : (fallback?.en?.keySpecs || baseKeySpecs);

    return {
      ...product,
      ...product.en,
      features: enFeatures,
      specifications: enSpecs,
      inTheBox: enInTheBox,
      keySpecs: enKeySpecs,
    };
  }

  return {
    ...product,
    features: baseFeatures,
    specifications: baseSpecs,
    inTheBox: baseInTheBox,
    keySpecs: baseKeySpecs,
  };
}

export const PRODUCTS_DATA: Record<string, Product> = {
  'joulemeter': {
    slug: 'joulemeter',
    name: 'Joulemeter',
    image: '/products/joulemeter.png',
    badgeType: 'dark',
    category: 'Precision Energy Logger',
    price: 'Rp 3.850.000',
    mockupType: 'joulemeter',
    
    // ID Content (Default)
    subtitle: 'Perekam Energi Presisi / Precision Energy Logger',
    badge: 'Spesialis Energi',
    stockStatus: 'Ready Stock',
    description: 'Sistem perekam konsumsi energi dan pemantau arus presisi tinggi untuk kendaraan balap listrik, hybrid, dan aplikasi uji ketahanan.',
    longDescription: 'SynchroTech Joulemeter dirancang khusus untuk memenuhi standar ketat pemantauan energi pada kompetisi balap listrik & hybrid. Menggunakan ADC 24-bit Texas Instruments ADS1256 dipadu dengan Manganin Shunt 50A bertoleransi 0.1%, modul ini mencatat konsumsi energi instantaneous, tegangan s/d 60V, arus s/d 50A, dan total Watt-Hour dengan tingkat kesalahan mendekati nol. Dilengkapi isolasi galvanik CAN Bus dan konektivitas WiFi/Bluetooth untuk kemudahan integrasi data.',
    keySpecs: [
      'ADS1256 24-bit Delta-Sigma ADC (Low Noise)',
      'Manganin Shunt 50A (Akurasi Presisi 0.1%)',
      'Isolated CAN Bus + WiFi 802.11 b/g/n & Bluetooth 5.0',
      'Perekaman Daya Instantaneous, Tegangan & Watt-Hour'
    ],
    features: [
      {
        title: 'Pengukuran Ultra Presisi',
        description: 'Chip ADC 24-bit ADS1256 menangkap fluktuasi arus sekecil miliamper dengan kecepatan hingga 30,000 sampel per detik.',
        iconName: 'Cpu'
      },
      {
        title: 'Isolasi Galvanik CAN',
        description: 'Isolasi galvanik 2.5kV RMS melindungi sistem utama dari lonjakan listrik dan ground loop sirkuit bertenaga tinggi.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Manganin Shunt 50A',
        description: 'Resistor shunt berbahan Manganin dengan koefisien suhu sangat rendah untuk stabilitas pembacaan dalam suhu ekstrem.',
        iconName: 'Zap'
      },
      {
        title: 'Konektivitas Nirkabel Dual-Band',
        description: 'Stream data energi secara langsung ke laptop pit crew via WiFi atau aplikasi mobile via Bluetooth Low Energy.',
        iconName: 'Radio'
      }
    ],
    specifications: [
      { label: 'Mikrokontroler', value: 'ESP32-S3 Dual-Core LX7 @ 240MHz' },
      { label: 'ADC Resolution', value: '24-Bit Texas Instruments ADS1256' },
      { label: 'Current Range', value: '±50A Continuous (Peak 75A)' },
      { label: 'Voltage Range', value: '0 - 60V DC' },
      { label: 'Shunt Accuracy', value: 'Manganin Alloy Shunt ±0.1%' },
      { label: 'Sampling Rate', value: 'Configurable up to 30 KSPS' },
      { label: 'Bus Isolation', value: '2.5kV RMS Galvanic CAN Isolation' },
      { label: 'Interfaces', value: 'CAN 2.0B, Wi-Fi 802.11 b/g/n, BLE 5.0' },
      { label: 'Supply Voltage', value: '9V - 36V DC Wide Input' },
      { label: 'Enclosure', value: 'CNC Anodized Aluminum Enclosure (IP65)' }
    ],
    inTheBox: [
      '1x SynchroTech Joulemeter Module',
      '1x 50A Precision Manganin Shunt Block',
      '1x IP67 Power & CAN Connector Cable (1.5m)',
      '1x Stainless Steel Mounting Bracket Kit',
      '1x Quick Setup Guide & Calibration Certificate'
    ],

    // EN Content
    en: {
      subtitle: 'Precision Energy Logger',
      badge: 'Energy Specialist',
      stockStatus: 'In Stock',
      description: 'High-precision energy consumption recorder and current monitoring system for electric & hybrid race vehicles.',
      longDescription: 'The SynchroTech Joulemeter is engineered to meet strict energy monitoring standards in electric & hybrid racing competitions. Powered by a 24-bit Texas Instruments ADS1256 ADC coupled with a 0.1% tolerance 50A Manganin Shunt, this module logs instantaneous power, voltage up to 60V, current up to 50A, and total Watt-Hours with near-zero error. Features galvanic CAN Bus isolation and WiFi/Bluetooth connectivity for seamless data integration.',
      keySpecs: [
        'ADS1256 24-bit Delta-Sigma ADC (Low Noise)',
        '50A Manganin Shunt (0.1% Precision Accuracy)',
        'Isolated CAN Bus + WiFi 802.11 b/g/n & Bluetooth 5.0',
        'Instantaneous Power, Voltage & Watt-Hour Logging'
      ],
      features: [
        {
          title: 'Ultra-Precision Measurement',
          description: '24-bit ADS1256 ADC chip captures milliamp current fluctuations at sampling rates up to 30,000 samples per second.',
          iconName: 'Cpu'
        },
        {
          title: 'Galvanic CAN Isolation',
          description: '2.5kV RMS galvanic isolation protects the master system from electrical spikes and high-voltage ground loops.',
          iconName: 'ShieldCheck'
        },
        {
          title: '50A Manganin Shunt',
          description: 'Manganin alloy shunt resistor with ultra-low thermal drift for stable readings in extreme racing heat.',
          iconName: 'Zap'
        },
        {
          title: 'Dual-Band Wireless Connectivity',
          description: 'Stream energy data live to pit crew laptops via WiFi or mobile devices via Bluetooth Low Energy.',
          iconName: 'Radio'
        }
      ],
      specifications: [
        { label: 'Microcontroller', value: 'ESP32-S3 Dual-Core LX7 @ 240MHz' },
        { label: 'ADC Resolution', value: '24-Bit Texas Instruments ADS1256' },
        { label: 'Current Range', value: '±50A Continuous (Peak 75A)' },
        { label: 'Voltage Range', value: '0 - 60V DC' },
        { label: 'Shunt Accuracy', value: 'Manganin Alloy Shunt ±0.1%' },
        { label: 'Sampling Rate', value: 'Configurable up to 30 KSPS' },
        { label: 'Bus Isolation', value: '2.5kV RMS Galvanic CAN Isolation' },
        { label: 'Interfaces', value: 'CAN 2.0B, Wi-Fi 802.11 b/g/n, BLE 5.0' },
        { label: 'Supply Voltage', value: '9V - 36V DC Wide Input' },
        { label: 'Enclosure', value: 'CNC Anodized Aluminum Enclosure (IP65)' }
      ],
      inTheBox: [
        '1x SynchroTech Joulemeter Module',
        '1x 50A Precision Manganin Shunt Block',
        '1x IP67 Power & CAN Connector Cable (1.5m)',
        '1x Stainless Steel Mounting Bracket Kit',
        '1x Quick Setup Guide & Calibration Certificate'
      ]
    }
  },

  'nexus-one': {
    slug: 'nexus-one',
    name: 'Nexus One',
    image: '/products/nexus-one.png',
    badgeType: 'blue',
    category: 'Master Telemetry Hub',
    price: 'Rp 6.499.000',
    mockupType: 'nexus',
    
    // ID Content
    subtitle: 'Otak & Mulut — Telemetri 4G LTE',
    badge: 'Paling Populer',
    stockStatus: 'Ready Stock — Best Seller',
    description: 'Modul telemetri utama balap bertenaga 4G LTE Global dengan GNSS 25Hz dan manajemen daya mandiri untuk streaming data real-time.',
    longDescription: 'Nexus One adalah pusat komando telemetri kendaraan balap Anda. Bertindak sebagai "Otak & Mulut" dari ekosistem SynchroTech, Nexus One mengumpulkan data telemetri dari seluruh sensor kendaraan melalui CAN Bus dan IMU internal, kemudian mentransmisikannya secara real-time ke cloud melalui jaringan 4G LTE Global T-SIM7600G-H. Dilengkapi modul GNSS u-blox NEO-M9N 25Hz untuk pelacakan posisi dan timing lap yang sangat akurat, serta baterai internal Li-Po 2000mAh untuk perlindungan dari kegagalan daya aki.',
    keySpecs: [
      '4G LTE Global (T-SIM7600G-H) Multi-Band Support',
      'u-blox NEO-M9N 25Hz High-Frequency GNSS Receiver',
      'Standalone Li-Po 2000mAh Battery dengan Auto-Charging M12 IP67',
      '6-Axis IMU Sensor & High-Speed MicroSD Logger'
    ],
    features: [
      {
        title: 'Telemetri Real-Time 4G LTE',
        description: 'Mengirimkan telemetry data tanpa jarak terbatas langsung ke dasbor pit wall menggunakan koneksi seluler global.',
        iconName: 'Radio'
      },
      {
        title: 'GNSS Presisi 25Hz',
        description: 'Sensor posisi u-blox NEO-M9N memperbarui koordinat lintasan 25 kali per detik untuk timing lap presisi milidetik.',
        iconName: 'MapPin'
      },
      {
        title: 'Baterai Mandiri & M12 Waterproof',
        description: 'Baterai Li-Po 2000mAh memastikan data tetap terkirim meskipun kelistrikan utama kendaraan mati total.',
        iconName: 'Battery'
      },
      {
        title: 'IMU 6-Axis Terintegrasi',
        description: 'Akselerometer & giroskop bawaan mengukur G-Force akselerasi, pengereman, sudut kemiringan cornering, dan roll.',
        iconName: 'Activity'
      }
    ],
    specifications: [
      { label: 'LTE Modem', value: 'SIMCom SIM7600G-H LTE Cat-4 Global' },
      { label: 'GNSS Receiver', value: 'u-blox NEO-M9N 25Hz Concurrent GNSS' },
      { label: 'Internal Battery', value: 'Li-Po 3.7V 2000mAh Smart Power Management' },
      { label: 'External Power', value: '9 - 36V DC via M12 IP67 Connector' },
      { label: 'Logging Storage', value: 'MicroSD Card Slot (Up to 64GB FAT32)' },
      { label: 'Internal Sensors', value: '6-Axis Motion Sensor (Accel + Gyro)' },
      { label: 'Communication', value: 'CAN 2.0B, RS485, USB Type-C, 4G LTE, WiFi' },
      { label: 'Telemetry Rate', value: '10Hz - 100Hz Configurable Stream Rate' },
      { label: 'Operating Temp', value: '-40°C to +85°C Industrial Grade' },
      { label: 'Protection Rating', value: 'IP67 Dust & Water Resistant' }
    ],
    inTheBox: [
      '1x SynchroTech Nexus One Telemetry Hub',
      '1x External High-Gain 4G LTE Antenna',
      '1x Active GNSS / GPS Antenna (3m Cable)',
      '1x Industrial M12 Waterproof Harness',
      '1x Quick Start Guide & Cloud License'
    ],

    // EN Content
    en: {
      subtitle: 'Brain & Mouth — 4G LTE Telemetry',
      badge: 'Most Popular',
      stockStatus: 'In Stock — Best Seller',
      description: '4G LTE Global powered master racing telemetry module with 25Hz GNSS and independent battery backup for live data streaming.',
      longDescription: "Nexus One is the command center of your racing vehicle telemetry. Acting as the 'Brain & Mouth' of the SynchroTech ecosystem, Nexus One aggregates telemetry data from vehicle sensors via CAN Bus and onboard 6-axis IMU, transmitting live streams to the cloud via global 4G LTE. Equipped with a 25Hz u-blox NEO-M9N GNSS module for high-precision lap timing, and a standalone 2000mAh Li-Po battery for power failure protection.",
      keySpecs: [
        '4G LTE Global (T-SIM7600G-H) Multi-Band Support',
        'u-blox NEO-M9N 25Hz High-Frequency GNSS Receiver',
        'Standalone Li-Po 2000mAh Battery with M12 IP67 Auto-Charging',
        '6-Axis IMU Sensor & High-Speed MicroSD Logger'
      ],
      features: [
        {
          title: '4G LTE Real-Time Telemetry',
          description: 'Transmits telemetry data with unlimited range straight to pit wall dashboards using global cellular connection.',
          iconName: 'Radio'
        },
        {
          title: '25Hz Precision GNSS',
          description: 'u-blox NEO-M9N position sensor updates track coordinates 25 times per second for millisecond lap timing.',
          iconName: 'MapPin'
        },
        {
          title: 'Standalone Battery & IP67 M12',
          description: '2000mAh Li-Po battery ensures data continues streaming even if vehicle main electrical system fails.',
          iconName: 'Battery'
        },
        {
          title: 'Integrated 6-Axis IMU',
          description: 'Built-in accelerometer & gyroscope measure acceleration, braking G-Forces, lean angles, and chassis roll.',
          iconName: 'Activity'
        }
      ],
      specifications: [
        { label: 'LTE Modem', value: 'SIMCom SIM7600G-H LTE Cat-4 Global' },
        { label: 'GNSS Receiver', value: 'u-blox NEO-M9N 25Hz Concurrent GNSS' },
        { label: 'Internal Battery', value: 'Li-Po 3.7V 2000mAh Smart Power Management' },
        { label: 'External Power', value: '9 - 36V DC via M12 IP67 Connector' },
        { label: 'Logging Storage', value: 'MicroSD Card Slot (Up to 64GB FAT32)' },
        { label: 'Internal Sensors', value: '6-Axis Motion Sensor (Accel + Gyro)' },
        { label: 'Communication', value: 'CAN 2.0B, RS485, USB Type-C, 4G LTE, WiFi' },
        { label: 'Telemetry Rate', value: '10Hz - 100Hz Configurable Stream Rate' },
        { label: 'Operating Temp', value: '-40°C to +85°C Industrial Grade' },
        { label: 'Protection Rating', value: 'IP67 Dust & Water Resistant' }
      ],
      inTheBox: [
        '1x SynchroTech Nexus One Telemetry Hub',
        '1x External High-Gain 4G LTE Antenna',
        '1x Active GNSS / GPS Antenna (3m Cable)',
        '1x Industrial M12 Waterproof Harness',
        '1x Quick Start Guide & Cloud License'
      ]
    }
  },

  'display': {
    slug: 'display',
    name: 'Display',
    image: '/products/display.png',
    badgeType: 'purple',
    category: 'Driver Digital Dashboard',
    price: 'Rp 4.950.000',
    mockupType: 'display',
    
    // ID Content
    subtitle: 'Mata — Layar Kelas Balap',
    badge: 'Kokpit Pengemudi',
    stockStatus: 'Ready Stock',
    description: 'Layar instrumen digital kokpit balap 5-inci dengan sensor cahaya otomatis dan 5 mode tampilan real-time.',
    longDescription: 'SynchroTech Display bertindak sebagai "Mata" pengemudi di kokpit. Menampilkan layar IPS 5-inci 1000-nits anti-glare yang tetap terlihat tajam di bawah sinar matahari langsung. Dengan 5 mode tampilan khusus (Race Mode, Lap Delta, Energy Monitor, Diagnostics, dan Config), pembalap mendapatkan umpan balik visual secara instan mengenai waktu lap, target delta, suhu, dan konsumsi energi.',
    keySpecs: [
      '5 View Modes (Race / Lap / Energy / Diagnostic / Custom)',
      'Auto Day/Night Theme Switching via Ambient Light Sensor (ALS)',
      'Cross-Venue Auto-Scaling & Predictive Lap Delta',
      '5.0" Ultra-Bright IPS Panel (1000 nits) Anti-Glare'
    ],
    features: [
      {
        title: '5 Mode Tampilan Pintar',
        description: 'Beralih dengan cepat antara layar Race untuk fokus berkendara, Lap Delta untuk waktu lap, atau Energy untuk manajemen daya.',
        iconName: 'Sliders'
      },
      {
        title: 'Sensor Kecerahan Otomatis (ALS)',
        description: 'Secara cerdas menyesuaikan tingkat kecerahan layar dan beralih ke dark mode saat memasuki malam hari atau terowongan.',
        iconName: 'Sun'
      },
      {
        title: 'Layar Ultra-Terang 1000 Nits',
        description: 'Panel IPS 5 inci dengan lapisan optical bonding anti-glare untuk visibilitas maksimal tanpa sudut buta.',
        iconName: 'Tv'
      },
      {
        title: 'Indikator Shift Light RGB',
        description: 'Bar LED progresif bawaan memberikan sinyal visual pergantian gigi atau batasan energi yang akurat.',
        iconName: 'Zap'
      }
    ],
    specifications: [
      { label: 'Display Panel', value: '5.0-inch High-Contrast IPS LCD' },
      { label: 'Resolution', value: '800 x 480 Pixels Optical Bonding' },
      { label: 'Brightness', value: '1000 nits High Ambient Readability' },
      { label: 'Light Sensor', value: 'Integrated ALS for Auto Dimming & Theme' },
      { label: 'View Modes', value: 'Race, Lap Delta, Energy, Diagnostic, Minimalist' },
      { label: 'Inputs', value: '4x Tactile Buttons + CAN Bus Interface' },
      { label: 'Mounting', value: 'Standard RAM Mount & VESA 75 Pattern' },
      { label: 'Operating Voltage', value: '9 - 28V DC Vehicle Power' },
      { label: 'Housing Material', value: 'Billet Aluminum Body with Carbon Plate' },
      { label: 'Dimensions', value: '142mm x 90mm x 24mm' }
    ],
    inTheBox: [
      '1x SynchroTech Cockpit Display Unit',
      '1x RAM Mount Compatible Ball Adaptor',
      '1x Waterproof CAN + Power Connection Harness (2m)',
      '1x Anti-Glare Screen Protector (Pre-installed)',
      '1x Quick Installation Manual'
    ],

    // EN Content
    en: {
      subtitle: 'The Eyes — Race-Grade Display',
      badge: 'Driver Cockpit',
      stockStatus: 'In Stock',
      description: '5-inch digital racing cockpit instrument display with automatic light sensing and 5 customizable real-time view modes.',
      longDescription: "SynchroTech Display acts as the driver's 'Eyes' in the cockpit. Featuring an ultra-bright 1000-nits 5-inch IPS panel with anti-glare optical bonding, readable under direct track sunlight. With 5 specialized view modes (Race, Lap Delta, Energy Monitor, Diagnostics, and Minimalist), drivers receive instant visual feedback on lap times, target delta, temperatures, and energy consumption.",
      keySpecs: [
        '5 View Modes (Race / Lap / Energy / Diagnostic / Custom)',
        'Auto Day/Night Theme Switching via Ambient Light Sensor (ALS)',
        'Cross-Venue Auto-Scaling & Predictive Lap Delta',
        '5.0" Ultra-Bright IPS Panel (1000 nits) Anti-Glare'
      ],
      features: [
        {
          title: '5 Smart View Modes',
          description: 'Quickly toggle between Race view for focused driving, Lap Delta for lap times, or Energy for power management.',
          iconName: 'Sliders'
        },
        {
          title: 'Automatic Brightness Sensor (ALS)',
          description: 'Intelligently adjusts screen brightness and switches to dark theme when entering night sessions or tunnels.',
          iconName: 'Sun'
        },
        {
          title: 'Ultra-Bright 1000 Nits Display',
          description: '5-inch IPS panel with optical bonding anti-glare coating for maximum visibility without blind angles.',
          iconName: 'Tv'
        },
        {
          title: 'RGB Progressive Shift Lights',
          description: 'Built-in RGB LED bar provides clear visual cues for gear shifts or power threshold limits.',
          iconName: 'Zap'
        }
      ],
      specifications: [
        { label: 'Display Panel', value: '5.0-inch High-Contrast IPS LCD' },
        { label: 'Resolution', value: '800 x 480 Pixels Optical Bonding' },
        { label: 'Brightness', value: '1000 nits High Ambient Readability' },
        { label: 'Light Sensor', value: 'Integrated ALS for Auto Dimming & Theme' },
        { label: 'View Modes', value: 'Race, Lap Delta, Energy, Diagnostic, Minimalist' },
        { label: 'Inputs', value: '4x Tactile Buttons + CAN Bus Interface' },
        { label: 'Mounting', value: 'Standard RAM Mount & VESA 75 Pattern' },
        { label: 'Operating Voltage', value: '9 - 28V DC Vehicle Power' },
        { label: 'Housing Material', value: 'Billet Aluminum Body with Carbon Plate' },
        { label: 'Dimensions', value: '142mm x 90mm x 24mm' }
      ],
      inTheBox: [
        '1x SynchroTech Cockpit Display Unit',
        '1x RAM Mount Compatible Ball Adaptor',
        '1x Waterproof CAN + Power Connection Harness (2m)',
        '1x Anti-Glare Screen Protector (Pre-installed)',
        '1x Quick Installation Manual'
      ]
    }
  }
};

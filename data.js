const KALKAL_DRAMAS = [
  {
    id: 'drama-01',
    title: 'Huling Liham',
    description: 'Isang liham na hindi naipadala, isang pag-ibig na hindi nalimutan. Pauwi si Mara pagkatapos ng 5 taon.',
    src: 'https://cdn.kalkal.app/videos/huling-liham.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=720&h=1280&fit=crop',
    duration: '2:14',
    likes: 12453,
    shares: 892,
    author: '@mara_writes',
    tags: ['#romance', '#letter', '#comeback']
  },
  {
    id: 'drama-02',
    title: 'Tindahan ni Aling Nena',
    description: 'Sa maliit na sari-sari store, nabubuo ang pinakamalalaking sikreto ng barangay.',
    src: 'https://cdn.kalkal.app/videos/tindahan.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=720&h=1280&fit=crop',
    duration: '1:48',
    likes: 9821,
    shares: 421,
    author: '@kwentongkanto',
    tags: ['#barangay', '#mystery', '#nanay']
  },
  {
    id: 'drama-03',
    title: 'Jeep ng Alaala',
    description: 'Araw-araw sumasakay si Lolo sa jeep. Pero isang araw, hindi na siya bumaba.',
    src: 'https://cdn.kalkal.app/videos/jeep.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=720&h=1280&fit=crop',
    duration: '2:02',
    likes: 15302,
    shares: 1203,
    author: '@byahero',
    tags: ['#jeepney', '#memory', '#lolo']
  },
  {
    id: 'drama-04',
    title: 'Ulan sa Quiapo',
    description: 'Nagkita sila sa ilalim ng tulay habang umuulan. Hindi sinasadya, pero tadhana.',
    src: 'https://cdn.kalkal.app/videos/ulan.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=720&h=1280&fit=crop',
    duration: '1:55',
    likes: 22109,
    shares: 2104,
    author: '@ulanstories',
    tags: ['#ulan', '#quiapo', '#fate']
  },
  {
    id: 'drama-05',
    title: 'Anak ng Tadhana',
    description: 'Ipinagpalit sa ospital noong sanggol. Ngayon, 21 years old na sila at nagkita sa iisang university.',
    src: 'https://cdn.kalkal.app/videos/anak.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=720&h=1280&fit=crop',
    duration: '2:30',
    likes: 18744,
    shares: 1566,
    author: '@tadhanacuts',
    tags: ['#family', '#twist', '#campus']
  },
  {
    id: 'drama-06',
    title: 'Kape at Pan de Sal',
    description: 'Simpleng almusal, komplikadong pag-ibig. Magkasama pa ba sila pagkatapos ng lahat?',
    src: 'https://cdn.kalkal.app/videos/kape.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=720&h=1280&fit=crop',
    duration: '1:32',
    likes: 11290,
    shares: 734,
    author: '@almusalfilms',
    tags: ['#kape', '#everyday', '#love']
  }
];

// Freeze to avoid accidental mutation
Object.freeze(KALKAL_DRAMAS);

// Export for modules (if used with type="module")
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KALKAL_DRAMAS;
}

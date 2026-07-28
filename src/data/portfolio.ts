import type { LocalizedText } from '../i18n/types';

export interface TimelineItem {
  time: string;
  href?: string;
  title: LocalizedText;
  description?: LocalizedText;
}

interface Publication {
  title: string;
  authors: string[];
  pages: string;
  role: LocalizedText;
  isFirstAuthor: boolean;
  url: string;
}

interface PublicationGroup {
  name: string;
  venue: string;
  meta: LocalizedText;
  publications: Publication[];
}

export const educationItems: TimelineItem[] = [
  {
    time: '2026/04 - now',
    href: 'https://www.teu.ac.jp/grad/index.html',
    title: {
      ja: '東京工科大学大学院 バイオ・情報メディア研究科 コンピュータサイエンス専攻',
      en: 'Tokyo University of Technology Graduate School of Bionics, Computer and Media Sciences, Computer Science Program',
    },
  },
  {
    time: '2023/04 - 2026/03',
    href: 'https://www.teu.ac.jp/',
    title: {
      ja: '東京工科大学 コンピュータサイエンス学部 人工知能専攻',
      en: 'Tokyo University of Technology, School of Computer Science, Artificial Intelligence Major',
    },
  },
  {
    time: '2021/04 - 2023/03',
    href: 'https://www.neec.ac.jp/',
    title: {
      ja: '日本工学院専門学校 ITカレッジ AIシステム科',
      en: 'Nihon Kogakuin College, IT College, AI Systems Department',
    },
  },
];

export const experienceItems: Array<TimelineItem & { description: LocalizedText }> = [
  {
    time: '2024/08 - now',
    href: 'https://neoai.jp/',
    title: {
      ja: '株式会社neoAI',
      en: 'neoAI Inc.',
    },
    description: {
      ja: 'AI エンジニア（インターンシップ）',
      en: 'AI Engineer (Internship)',
    },
  },
];

export const awards: TimelineItem[] = [
  {
    time: '2024/03',
    title: { ja: '学部長賞受賞', en: "Dean's Award" },
  },
  {
    time: '2024/12',
    href: 'https://user.competition.signate.jp/ja/competition/detail/?competition=dc999accde4442cdb4cd5d607e9e7adf',
    title: { ja: '【SOTA】SIGNATE Cup 2024 銅メダル', en: '[SOTA] SIGNATE Cup 2024 - Bronze Medal' },
  },
  {
    time: '2025/03',
    href: 'https://www.kaggle.com/competitions/llms-you-cant-please-them-all',
    title: { ja: "LLMs - You Can't Please Them All 銀メダル", en: "LLMs - You Can't Please Them All - Silver Medal" },
  },
  {
    time: '2025/10',
    href: 'https://www.kaggle.com/competitions/jigsaw-agile-community-rules',
    title: { ja: 'Jigsaw - Agile Community Rules Classification 銅メダル', en: 'Jigsaw - Agile Community Rules Classification - Bronze Medal' },
  },
  {
    time: '2026/02',
    href: 'https://user.competition.signate.jp/ja/competition/detail/?competition=385dcbba17b645f3ac10f827dfba03f6',
    title: { ja: 'SIGNATE × TECH OCEAN Student Cup 2025 銀メダル', en: 'SIGNATE × TECH OCEAN Student Cup 2025 - Silver Medal' },
  },
  {
    time: '2026/04',
    href: 'https://www.kaggle.com/competitions/ai-mathematical-olympiad-progress-prize-3',
    title: { ja: 'AI Mathematical Olympiad - Progress Prize 3 銅メダル', en: 'AI Mathematical Olympiad - Progress Prize 3 - Bronze Medal' },
  },
];

export const publicationGroups: PublicationGroup[] = [
  {
    name: 'IIAI-AAI-Winter 2025',
    venue: '2025 19th IIAI International Congress on Advanced Applied Informatics (IIAI-AAI-Winter)',
    meta: { ja: 'Phuket, Thailand / 2025/12', en: 'Phuket, Thailand / Dec. 2025' },
    publications: [
      {
        title: 'Real-Time Animation of User-Drawn Images via Smoothed Skeleton Time-Series Data',
        authors: ['Yuhei Yamada', 'Takafumi Nakanishi'],
        pages: 'pp. 227-232',
        role: { ja: '筆頭著者', en: 'First Author' },
        isFirstAuthor: true,
        url: 'https://ieeexplore.ieee.org/document/11418345',
      },
      {
        title: 'Hacking the Black Box: Prompt Injection for Visualizing LLM Reasoning as Graphs',
        authors: ['Takumi Sugimoto', 'Hiryu Kimura', 'Yuhei Yamada', 'Tomoki Akiyama', 'Minato Hojo', 'Takafumi Nakanishi'],
        pages: 'pp. 303-306',
        role: { ja: '共著', en: 'Co-author' },
        isFirstAuthor: false,
        url: 'https://ieeexplore.ieee.org/document/11418350',
      },
    ],
  },
  {
    name: 'AAIML 2026',
    venue: '2026 International Conference on Advances in Artificial Intelligence and Machine Learning (AAIML)',
    meta: { ja: 'Tokyo, Japan / 2026/03', en: 'Tokyo, Japan / Mar. 2026' },
    publications: [
      {
        title: 'Autonomous Knowledge Pipeline for AI Research: LLM Agents for Automatic Paper Curation, Multimodal Media Generation, and Online Publishing',
        authors: ['Yuhei Yamada', 'Takafumi Nakanishi'],
        pages: 'pp. 357-366',
        role: { ja: '筆頭著者', en: 'First Author' },
        isFirstAuthor: true,
        url: 'https://ieeexplore.ieee.org/document/11498163',
      },
      {
        title: 'A State-Driven Planning Framework for Research Dialogue Agents with Selective Retrieval-Augmented Generation',
        authors: ['Hiryu Kimura', 'Yuhei Yamada', 'Takafumi Nakanishi'],
        pages: 'pp. 347-356',
        role: { ja: '共著', en: 'Co-author' },
        isFirstAuthor: false,
        url: 'https://ieeexplore.ieee.org/document/11498180',
      },
    ],
  },
];

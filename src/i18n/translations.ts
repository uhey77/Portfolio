import type { Locale, PortfolioTranslations } from './types';

export const translations = {
  ja: {
    meta: {
      title: '山田祐平 | ポートフォリオ',
      description: 'AIエンジニア / 学生 / リサーチャーとしてのポートフォリオサイト。研究実績、学歴、連絡先を掲載。',
    },
    navigation: {
      about: 'About',
      education: 'Education',
      experience: 'Work Experience',
      research: 'Research',
      awards: 'Awards',
      contact: 'お問い合わせ',
      switchLanguage: 'English version',
      switchLanguageShort: 'EN',
    },
    hero: {
      name: '山田 祐平',
      role: 'AI Engineer / Student',
      contact: 'お問い合わせ',
      profileAlt: '山田祐平の写真',
      contactAriaLabel: 'お問い合わせフォーム',
    },
    about: {
      heading: 'About Me',
      title: '自己紹介',
      paragraphs: [
        '現在、大学でAIを学び、エンタメ領域における業務自動化や研究開発プロジェクトに取り組んでいます。',
        'Kaggle Expertとして継続的にアウトプットしつつ、学術・実務の両面からスキルを磨いています。',
      ],
    },
    sections: {
      education: 'Education',
      experience: 'Work Experience',
      research: 'Research',
      awards: 'Awards',
      contact: 'Contact',
    },
    contact: {
      introduction: 'お気軽にお問い合わせください',
      form: {
        name: 'お名前',
        namePlaceholder: '山田太郎',
        email: 'メールアドレス',
        message: 'メッセージ',
        messagePlaceholder: 'お問い合わせ内容をご記入ください',
        submit: '送信する',
        unavailable: 'フォーム送信先が未設定です。',
        subject: 'ポートフォリオサイトからのお問い合わせ',
      },
    },
  },
  en: {
    meta: {
      title: 'Yuhei Yamada | Portfolio',
      description: 'Portfolio of Yuhei Yamada - AI engineer / student / researcher. Research publications, education, and contact information.',
    },
    navigation: {
      about: 'About',
      education: 'Education',
      experience: 'Work Experience',
      research: 'Research',
      awards: 'Awards',
      contact: 'Contact',
      switchLanguage: 'Japanese version',
      switchLanguageShort: 'JA',
    },
    hero: {
      name: 'Yuhei Yamada',
      role: 'AI Engineer / Student',
      contact: 'Contact',
      profileAlt: 'Portrait of Yuhei Yamada',
      contactAriaLabel: 'Contact form',
    },
    about: {
      heading: 'About Me',
      title: 'Introduction',
      paragraphs: [
        'I study AI at university and work on business automation and R&D projects in the entertainment domain.',
        'As a Kaggle Expert, I keep shipping learnings while sharpening skills across research and practice.',
      ],
    },
    sections: {
      education: 'Education',
      experience: 'Work Experience',
      research: 'Research',
      awards: 'Awards',
      contact: 'Contact',
    },
    contact: {
      introduction: 'Feel free to reach out',
      form: {
        name: 'Name',
        namePlaceholder: 'John Doe',
        email: 'Email',
        message: 'Message',
        messagePlaceholder: 'How can I help?',
        submit: 'Send',
        unavailable: 'The contact form endpoint is not configured.',
        subject: 'Contact from portfolio site',
      },
    },
  },
} satisfies Record<Locale, PortfolioTranslations>;

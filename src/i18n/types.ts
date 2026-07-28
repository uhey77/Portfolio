export const locales = ['ja', 'en'] as const;

export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;

export interface PortfolioTranslations {
  meta: {
    title: string;
    description: string;
  };
  navigation: {
    about: string;
    education: string;
    experience: string;
    research: string;
    awards: string;
    contact: string;
    switchLanguage: string;
    switchLanguageShort: string;
  };
  hero: {
    name: string;
    role: string;
    contact: string;
    profileAlt: string;
    contactAriaLabel: string;
  };
  about: {
    heading: string;
    title: string;
    paragraphs: [string, string];
  };
  sections: {
    education: string;
    experience: string;
    research: string;
    awards: string;
    contact: string;
  };
  contact: {
    introduction: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      unavailable: string;
      subject: string;
    };
  };
}

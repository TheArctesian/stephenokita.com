import { db } from '$lib/db/config';
import { quotes, poems, music, instruments, languages, latinPhrases, animations } from '$lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export interface Quote {
  id: number;
  text: string;
  author?: string;
  source?: string;
  category?: string;
  language: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Poem {
  id: number;
  title: string;
  content: string;
  author?: string;
  language: string;
  category?: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Music {
  id: number;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  year?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  favorite: boolean;
  currentlyListening: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Instrument {
  id: number;
  name: string;
  level?: string;
  yearsPlaying?: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Language {
  id: number;
  name: string;
  nativeName?: string;
  level?: string;
  flag?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LatinPhrase {
  id: number;
  phrase: string;
  translation: string;
  context?: string;
  category?: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Animation {
  id: number;
  name: string;
  description?: string;
  type?: string;
  code?: string;
  previewUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class PersonalService {
  // Quotes
  static async getAllQuotes(): Promise<Quote[]> {
    return await db.select().from(quotes).orderBy(desc(quotes.createdAt));
  }

  static async getFavoriteQuotes(): Promise<Quote[]> {
    return await db.select().from(quotes).where(eq(quotes.favorite, true));
  }

  static async createQuote(data: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>): Promise<Quote> {
    const [quote] = await db.insert(quotes).values(data).returning();
    return quote;
  }

  // Poems
  static async getAllPoems(): Promise<Poem[]> {
    return await db.select().from(poems).orderBy(desc(poems.createdAt));
  }

  static async getFavoritePoems(): Promise<Poem[]> {
    return await db.select().from(poems).where(eq(poems.favorite, true));
  }

  static async createPoem(data: Omit<Poem, 'id' | 'createdAt' | 'updatedAt'>): Promise<Poem> {
    const [poem] = await db.insert(poems).values(data).returning();
    return poem;
  }

  // Music
  static async getAllMusic(): Promise<Music[]> {
    return await db.select().from(music).orderBy(desc(music.createdAt));
  }

  static async getCurrentlyListening(): Promise<Music[]> {
    return await db.select().from(music).where(eq(music.currentlyListening, true));
  }

  static async getFavoriteMusic(): Promise<Music[]> {
    return await db.select().from(music).where(eq(music.favorite, true));
  }

  static async createMusic(data: Omit<Music, 'id' | 'createdAt' | 'updatedAt'>): Promise<Music> {
    const [musicItem] = await db.insert(music).values(data).returning();
    return musicItem;
  }

  // Instruments
  static async getAllInstruments(): Promise<Instrument[]> {
    return await db.select().from(instruments).orderBy(desc(instruments.createdAt));
  }

  static async createInstrument(data: Omit<Instrument, 'id' | 'createdAt' | 'updatedAt'>): Promise<Instrument> {
    const [instrument] = await db.insert(instruments).values(data).returning();
    return instrument;
  }

  // Languages
  static async getAllLanguages(): Promise<Language[]> {
    return await db.select().from(languages).orderBy(desc(languages.createdAt));
  }

  static async createLanguage(data: Omit<Language, 'id' | 'createdAt' | 'updatedAt'>): Promise<Language> {
    const [language] = await db.insert(languages).values(data).returning();
    return language;
  }

  // Latin Phrases
  static async getAllLatinPhrases(): Promise<LatinPhrase[]> {
    return await db.select().from(latinPhrases).orderBy(desc(latinPhrases.createdAt));
  }

  static async getFavoriteLatinPhrases(): Promise<LatinPhrase[]> {
    return await db.select().from(latinPhrases).where(eq(latinPhrases.favorite, true));
  }

  static async createLatinPhrase(data: Omit<LatinPhrase, 'id' | 'createdAt' | 'updatedAt'>): Promise<LatinPhrase> {
    const [phrase] = await db.insert(latinPhrases).values(data).returning();
    return phrase;
  }

  // Animations
  static async getAllAnimations(): Promise<Animation[]> {
    return await db.select().from(animations).orderBy(desc(animations.createdAt));
  }

  static async getFeaturedAnimations(): Promise<Animation[]> {
    return await db.select().from(animations).where(eq(animations.featured, true));
  }

  static async createAnimation(data: Omit<Animation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Animation> {
    const [animation] = await db.insert(animations).values(data).returning();
    return animation;
  }
}
import { db } from '$lib/db/config';
import { skills, skillCategories } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export interface Skill {
  id: number;
  name: string;
  categoryId: number;
  level?: string;
  description?: string;
  icon?: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillCategory {
  id: number;
  name: string;
  slug: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillWithCategory extends Skill {
  category: SkillCategory;
}

export class SkillsService {
  static async getAllSkills(): Promise<SkillWithCategory[]> {
    const result = await db
      .select()
      .from(skills)
      .leftJoin(skillCategories, eq(skills.categoryId, skillCategories.id));
    
    return result.map(row => ({
      ...row.skills,
      category: row.skill_categories!
    }));
  }

  static async getSkillsByCategory(categorySlug: string): Promise<SkillWithCategory[]> {
    const result = await db
      .select()
      .from(skills)
      .leftJoin(skillCategories, eq(skills.categoryId, skillCategories.id))
      .where(eq(skillCategories.slug, categorySlug));
    
    return result.map(row => ({
      ...row.skills,
      category: row.skill_categories!
    }));
  }

  static async getSkillCategories(): Promise<SkillCategory[]> {
    return await db.select().from(skillCategories);
  }

  static async createSkillCategory(data: Omit<SkillCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<SkillCategory> {
    const [category] = await db.insert(skillCategories).values(data).returning();
    return category;
  }

  static async createSkill(data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Skill> {
    const [skill] = await db.insert(skills).values(data).returning();
    return skill;
  }

  static async updateSkill(id: number, data: Partial<Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Skill> {
    const [skill] = await db.update(skills)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(skills.id, id))
      .returning();
    return skill;
  }

  static async deleteSkill(id: number): Promise<void> {
    await db.delete(skills).where(eq(skills.id, id));
  }
}
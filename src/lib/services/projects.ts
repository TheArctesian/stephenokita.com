import { db } from '$lib/db/config';
import { projects, projectCategories } from '$lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export interface Project {
  id: number;
  title: string;
  description?: string;
  longDescription?: string;
  categoryId: number;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  status?: string;
  featured: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectWithCategory extends Project {
  category: ProjectCategory;
}

export class ProjectsService {
  static async getAllProjects(): Promise<ProjectWithCategory[]> {
    const result = await db
      .select()
      .from(projects)
      .leftJoin(projectCategories, eq(projects.categoryId, projectCategories.id))
      .orderBy(desc(projects.createdAt));
    
    return result.map(row => ({
      ...row.projects,
      category: row.project_categories!
    }));
  }

  static async getFeaturedProjects(): Promise<ProjectWithCategory[]> {
    const result = await db
      .select()
      .from(projects)
      .leftJoin(projectCategories, eq(projects.categoryId, projectCategories.id))
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.createdAt));
    
    return result.map(row => ({
      ...row.projects,
      category: row.project_categories!
    }));
  }

  static async getProjectsByCategory(categorySlug: string): Promise<ProjectWithCategory[]> {
    const result = await db
      .select()
      .from(projects)
      .leftJoin(projectCategories, eq(projects.categoryId, projectCategories.id))
      .where(eq(projectCategories.slug, categorySlug))
      .orderBy(desc(projects.createdAt));
    
    return result.map(row => ({
      ...row.projects,
      category: row.project_categories!
    }));
  }

  static async getProjectCategories(): Promise<ProjectCategory[]> {
    return await db.select().from(projectCategories);
  }

  static async createProjectCategory(data: Omit<ProjectCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectCategory> {
    const [category] = await db.insert(projectCategories).values(data).returning();
    return category;
  }

  static async createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const [project] = await db.insert(projects).values(data).returning();
    return project;
  }

  static async updateProject(id: number, data: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project> {
    const [project] = await db.update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  static async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }
}
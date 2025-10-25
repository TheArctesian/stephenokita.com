// Icon utility helper for managing technology and service icons
// UNIX Philosophy: Single responsibility - convert names to Iconify icon identifiers

/**
 * Converts a technology/service name to an Iconify icon identifier
 * Uses Simple Icons collection from Iconify: https://icon-sets.iconify.design/simple-icons/
 *
 * @param name - Technology or service name (e.g., "Python", "React", "Node.js")
 * @returns Iconify icon identifier (e.g., "simple-icons:python")
 */
export function getTechIcon(name: string): string {
  // Normalize the name for Simple Icons format
  const normalized = name
    .toLowerCase()
    .replace(/\s+/g, '') // Remove spaces
    .replace(/\./g, 'dot') // Replace dots with 'dot'
    .replace(/\+/g, 'plus') // Replace + with 'plus'
    .replace(/#/g, 'sharp'); // Replace # with 'sharp'

  // Special case mappings for technologies with different icon names
  const specialCases: Record<string, string> = {
    // JavaScript ecosystem
    'typescript': 'typescript',
    'javascript': 'javascript',
    'nodejs': 'nodedotjs',
    'node': 'nodedotjs',
    'node.js': 'nodedotjs',
    'nextjs': 'nextdotjs',
    'next': 'nextdotjs',
    'next.js': 'nextdotjs',
    'vuejs': 'vuedotjs',
    'vue': 'vuedotjs',
    'vue.js': 'vuedotjs',
    'nuxtjs': 'nuxtdotjs',
    'nuxt': 'nuxtdotjs',
    'nuxt.js': 'nuxtdotjs',
    'react': 'react',
    'svelte': 'svelte',
    'angular': 'angular',

    // Languages
    'csharp': 'csharp',
    'c#': 'csharp',
    'c++': 'cplusplus',
    'cplusplus': 'cplusplus',
    'python': 'python',
    'java': 'openjdk',
    'go': 'go',
    'golang': 'go',
    'rust': 'rust',
    'ruby': 'ruby',
    'php': 'php',
    'swift': 'swift',
    'kotlin': 'kotlin',

    // Frameworks
    'dotnet': 'dotnet',
    '.net': 'dotnet',
    'django': 'django',
    'flask': 'flask',
    'spring': 'spring',
    'springboot': 'springboot',
    'spring boot': 'springboot',
    'express': 'express',
    'expressjs': 'express',
    'express.js': 'express',
    'fastapi': 'fastapi',
    'nestjs': 'nestjs',

    // Databases
    'postgresql': 'postgresql',
    'postgres': 'postgresql',
    'mongodb': 'mongodb',
    'mongo': 'mongodb',
    'mysql': 'mysql',
    'redis': 'redis',
    'sqlite': 'sqlite',
    'mariadb': 'mariadb',
    'cassandra': 'apachecassandra',
    'elasticsearch': 'elasticsearch',

    // Cloud & DevOps
    'aws': 'amazonaws',
    'amazon web services': 'amazonaws',
    'gcp': 'googlecloud',
    'google cloud': 'googlecloud',
    'googlecloud': 'googlecloud',
    'azure': 'microsoftazure',
    'microsoft azure': 'microsoftazure',
    'docker': 'docker',
    'kubernetes': 'kubernetes',
    'k8s': 'kubernetes',
    'terraform': 'terraform',
    'jenkins': 'jenkins',
    'githubactions': 'githubactions',
    'github actions': 'githubactions',
    'circleci': 'circleci',

    // Version Control
    'git': 'git',
    'github': 'github',
    'gitlab': 'gitlab',
    'bitbucket': 'bitbucket',

    // Tools & Others
    'vscode': 'visualstudiocode',
    'vs code': 'visualstudiocode',
    'visualstudiocode': 'visualstudiocode',
    'npm': 'npm',
    'yarn': 'yarn',
    'webpack': 'webpack',
    'vite': 'vite',
    'tailwind': 'tailwindcss',
    'tailwindcss': 'tailwindcss',
    'css': 'css3',
    'html': 'html5',
    'sass': 'sass',
    'scss': 'sass',
    'graphql': 'graphql',
    'apollo': 'apollographql',
    'prisma': 'prisma',
    'drizzle': 'drizzle',
  };

  // Check for special cases first
  const lowerName = name.toLowerCase().trim();
  if (specialCases[lowerName]) {
    return `simple-icons:${specialCases[lowerName]}`;
  }

  // Return normalized icon name
  return `simple-icons:${normalized}`;
}

/**
 * Gets a social media icon identifier
 *
 * @param service - Service name (e.g., "GitHub", "LinkedIn", "Twitter")
 * @returns Iconify icon identifier
 */
export function getSocialIcon(service: string): string {
  const socialMap: Record<string, string> = {
    'github': 'simple-icons:github',
    'linkedin': 'simple-icons:linkedin',
    'twitter': 'simple-icons:twitter',
    'x': 'simple-icons:x',
    'instagram': 'simple-icons:instagram',
    'youtube': 'simple-icons:youtube',
    'spotify': 'simple-icons:spotify',
    'goodreads': 'simple-icons:goodreads',
    'letterboxd': 'simple-icons:letterboxd',
    'pixelfed': 'simple-icons:pixelfed',
    'mastodon': 'simple-icons:mastodon',
    'reddit': 'simple-icons:reddit',
    'discord': 'simple-icons:discord',
    'telegram': 'simple-icons:telegram',
    'email': 'heroicons:envelope',
    'website': 'heroicons:globe-alt',
    'cal.com': 'simple-icons:caldotcom',
    'calendar': 'simple-icons:caldotcom',
  };

  const normalized = service.toLowerCase().trim();
  return socialMap[normalized] || getTechIcon(service);
}

/**
 * Icon size presets for consistent sizing across the app
 */
export const IconSize = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export type IconSizeKey = keyof typeof IconSize;

/**
 * Get icon size in pixels from size key
 */
export function getIconSize(size: IconSizeKey | number): number {
  if (typeof size === 'number') return size;
  return IconSize[size];
}

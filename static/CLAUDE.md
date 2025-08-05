# CLAUDE.md - static/

This file provides guidance for working with the static assets directory containing images, documents, and other public files.

## Directory Overview
The `static/` directory contains static assets that are served directly by the web server without processing. These files are publicly accessible and cached by browsers.

## Directory Structure

### Root Level Files
- `favicon.png` - Site favicon (32x32px recommended)

### Images Directory (`images/`)
Contains visual assets used throughout the site:
- `being.jpg` - Philosophical/existential imagery
- `me&kim.jpg` - Personal photography
- `sillyhat.jpg` - Casual/fun imagery

### Other Directory (`other/`)
Contains downloadable documents and files:
- `Stephen Okita Resume 2024.pdf` - Current professional resume
- `Stephen_Activites_Resume.pdf` - Activities and involvement resume

## Asset Categories

### Favicon and Branding
- **Format**: PNG for better compression and transparency support
- **Size**: 32x32px minimum, 512x512px recommended for high-DPI displays
- **Purpose**: Browser tab icon, bookmark icon, mobile home screen icon

### Personal Photography
High-quality images used for:
- About page photography
- Personal branding
- Blog post illustrations
- Social media sharing

### Professional Documents
PDF documents for:
- Resume downloads
- Portfolio materials
- Academic transcripts
- Certificates and credentials

## Asset Optimization Guidelines

### Image Optimization
All images should be optimized for web delivery:

#### File Format Guidelines
- **JPEG**: Photographs and complex images with many colors
- **PNG**: Images with transparency, logos, simple graphics
- **WebP**: Modern format for better compression (with fallbacks)
- **SVG**: Vector graphics, icons, simple illustrations

#### Size Optimization
```bash
# Example optimization commands
# JPEG optimization
jpegoptim --max=85 --strip-all image.jpg

# PNG optimization
optipng -o2 image.png

# WebP conversion
cwebp -q 85 image.jpg -o image.webp
```

#### Responsive Images
Consider multiple sizes for different screen densities:
```
image.jpg      # 1x (standard)
image@2x.jpg   # 2x (retina)
image@3x.jpg   # 3x (high-DPI)
```

### Document Optimization
PDF documents should be optimized for web delivery:
- Compress images within PDFs
- Remove unnecessary metadata
- Use web-optimized fonts
- Keep file sizes reasonable (<5MB)

## File Naming Conventions

### Consistent Naming Patterns
- Use lowercase letters
- Replace spaces with hyphens or underscores
- Use descriptive names
- Include version numbers for documents

#### Examples
```
Good:
- profile-photo-2024.jpg
- stephen-okita-resume-2024.pdf
- company-logo.png

Avoid:
- IMG_1234.jpg
- Resume.pdf
- photo.jpeg
```

### Semantic File Names
File names should be descriptive and meaningful:
- `favicon.png` - Clear purpose
- `me&kim.jpg` - Descriptive content
- `stephen-okita-resume-2024.pdf` - Full name and year

## SvelteKit Integration

### Static Asset Serving
Files in `static/` are served from the root URL:
```
static/favicon.png → /favicon.png
static/images/profile.jpg → /images/profile.jpg
static/other/resume.pdf → /other/resume.pdf
```

### Asset References in Code
```svelte
<!-- Image references -->
<img src="/images/profile.jpg" alt="Profile photo" />

<!-- Document links -->
<a href="/other/resume.pdf" download>Download Resume</a>

<!-- Favicon in app.html -->
<link rel="icon" href="/favicon.png" />
```

### Asset Preloading
For critical assets, consider preloading:
```html
<!-- In app.html -->
<link rel="preload" href="/images/hero-image.jpg" as="image" />
```

## Performance Considerations

### Caching Strategy
Static assets benefit from aggressive caching:
```javascript
// In svelte.config.js or server configuration
const cacheHeaders = {
  'Cache-Control': 'public, max-age=31536000', // 1 year
  'Expires': new Date(Date.now() + 31536000000).toUTCString()
};
```

### Image Loading Strategies
```svelte
<!-- Lazy loading for below-the-fold images -->
<img src="/images/large-image.jpg" loading="lazy" alt="Description" />

<!-- Eager loading for above-the-fold images -->
<img src="/images/hero.jpg" loading="eager" alt="Hero image" />
```

### Progressive Enhancement
```svelte
<!-- WebP with JPEG fallback -->
<picture>
  <source srcset="/images/photo.webp" type="image/webp" />
  <img src="/images/photo.jpg" alt="Photo" />
</picture>
```

## SEO and Accessibility

### Image Alt Text
All images should have descriptive alt text:
```svelte
<img 
  src="/images/me&kim.jpg" 
  alt="Stephen and Kim standing together at a conference, both smiling"
/>
```

### Structured Data for Documents
For important documents like resumes:
```html
<a href="/other/resume.pdf" 
   itemscope 
   itemtype="http://schema.org/DigitalDocument">
  <span itemprop="name">Stephen Okita Resume 2024</span>
</a>
```

### Open Graph Images
For social media sharing:
```html
<!-- In svelte:head -->
<meta property="og:image" content="/images/social-preview.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

## Security Considerations

### File Type Restrictions
Only serve safe file types:
- Images: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`
- Documents: `.pdf`
- Avoid: `.exe`, `.zip`, `.js`, `.html`

### Content Security
- Scan uploaded files for malware
- Validate file headers match extensions
- Limit file sizes appropriately
- Use secure file naming conventions

### Privacy Considerations
- Remove EXIF data from photos
- Avoid sensitive information in file names
- Consider privacy implications of personal photos
- Regular audit of public files

## Maintenance Guidelines

### Regular Asset Auditing
- Review unused assets monthly
- Check for outdated documents
- Verify all links are working
- Update images as needed

### Asset Organization
```
static/
├── favicon.png
├── images/
│   ├── profile/          # Personal photos
│   ├── blog/            # Blog illustrations
│   ├── projects/        # Project screenshots
│   └── social/          # Social media images
├── documents/
│   ├── resume/          # Current resumes
│   ├── portfolio/       # Portfolio materials
│   └── certificates/    # Credentials
└── downloads/
    ├── software/        # Code/apps
    └── media/          # Videos/audio
```

### Version Control
- Track changes to important documents
- Use semantic versioning for assets
- Maintain changelog for major updates
- Backup important files regularly

### Content Delivery Network (CDN)
For better performance, consider using a CDN:
```javascript
// Example CDN configuration
const CDN_BASE = 'https://cdn.example.com';
const imageSrc = `${CDN_BASE}/images/photo.jpg`;
```

## Development Workflow

### Adding New Assets
1. Optimize the asset (compress, resize, format)
2. Choose appropriate directory location
3. Use descriptive, consistent naming
4. Test across devices and browsers
5. Update relevant documentation
6. Commit to version control

### Asset Processing Pipeline
```bash
# Example build script for asset processing
npm run optimize-images    # Compress and convert images
npm run generate-webp      # Create WebP versions
npm run update-manifests   # Update asset manifests
```

### Local Development
```bash
# Serve static files locally
npx serve static/

# Or use SvelteKit dev server
npm run dev
```

## Monitoring and Analytics

### Asset Performance Tracking
- Monitor load times for large assets
- Track download rates for documents
- Analyze which images are most viewed
- Optimize based on usage patterns

### Error Monitoring
- Track 404 errors for missing assets
- Monitor failed image loads
- Check for broken document links
- Set up alerts for asset issues
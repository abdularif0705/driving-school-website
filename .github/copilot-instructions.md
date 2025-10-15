# Rajput Driving School Website - AI Coding Instructions

## Project Architecture

This is a static HTML driving school website with integrated AI chatbot functionality and backend infrastructure components. The site focuses on Ontario driving education with SEO-optimized content.

### Core Components

- **Frontend**: Static HTML pages with Bootstrap 5, jQuery, and custom CSS
- **Chatbot**: OpenAI-powered chat interface (`js/script.js`, `chatbot-knowledge-base/`)
- **Email System**: PHP-based contact form using PHPMailer (`mailer/`)
- **Infrastructure**: Elasticsearch on GKE and Kubeflow ML pipelines for chatbot

## File Structure Patterns

### HTML Pages
- `index.html` - Main landing page with performance optimizations (preload, GTM, deferred scripts)
- `blog-*.html` - SEO-focused blog articles about driving education
- `about.html`, `courses.html`, `contact.html` - Standard informational pages

### Styling System
- Primary brand color: `--primary: #CE252A` (red)
- Uses Work Sans font family from Google Fonts
- Bootstrap 5 + custom CSS in `css/style.css`
- Font Awesome and Bootstrap Icons for iconography

### JavaScript Architecture
- `js/main.js` - Core UI functionality (sticky navbar, back-to-top, WOW animations)
- `js/script.js` - Chatbot implementation (currently has OpenAI API integration issues)
- `js/lazyload.js` - Image lazy loading for performance
- All scripts loaded with `defer` attribute for optimization

## Development Conventions

### SEO Patterns
- Every HTML page includes comprehensive meta tags with driving school keywords
- Google Tag Manager integration (`GTM-KRD8TNJ8`) on all pages
- Structured data and schema markup for local business
- Image preloading for LCP optimization

### Chatbot Implementation
- Dataset in `chatbot-knowledge-base/RajputChatbotDataset.json` contains intents/responses
- ML pipeline in `pipeline.py` for processing knowledge base
- Elasticsearch cluster configured in `elasticsearch-on-gke/elastic.yaml`
- Note: Current OpenAI integration in `js/script.js` needs environment variable setup

### Contact Form System
- PHP backend in `mailer/contact.form.php` 
- Recipient email: `rajputwindsor@gmail.com`
- Uses PHPMailer library for email delivery
- Form validation in `mailer/validation.form.js`

## Critical Development Workflows

### Adding New Blog Content
1. Follow naming pattern: `blog-{number}-{topic-slug}.html`
2. Include GTM script, meta description, and structured navigation
3. Use consistent header structure from existing blog pages
4. Ensure mobile-responsive layout with Bootstrap classes

### Chatbot Updates
1. Modify intent patterns in `RajputChatbotDataset.json`
2. Run `convert_json_to_jsonl_format.py` to update training data
3. Deploy pipeline using `pipeline.py` for knowledge base updates
4. Test responses through chat interface

### Performance Considerations
- All external scripts use `defer` loading
- Images in `img/` directory should be optimized
- Critical CSS inlined, non-critical CSS loaded asynchronously
- Preload key images (e.g., hero banner) for LCP

## Integration Points

### External Services
- **Google Tag Manager**: Analytics and tracking (`GTM-KRD8TNJ8`)
- **OpenAI API**: Chatbot responses (requires API key configuration)
- **Google Fonts**: Work Sans typography
- **CDNs**: jQuery, Bootstrap, Font Awesome from public CDNs

### Infrastructure Dependencies
- **Elasticsearch**: Knowledge base search and retrieval
- **Kubeflow**: ML pipeline orchestration for chatbot training
- **GKE**: Container orchestration for Elasticsearch cluster
- **PHP/PHPMailer**: Contact form email delivery

## Local Development

When working locally, note that:
- Contact forms require PHP server environment
- Chatbot requires OpenAI API key configuration
- Static files can be served with any web server
- No build process required for frontend changes
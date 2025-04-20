# Áine Physiotherapy Website

A modern, responsive website for Áine's specialized physiotherapy services focused on osteoporosis, vertebral fractures, and bone health.

## Technology Stack

### Frontend
- **HTML5**: Semantic structure and modern elements
- **CSS3**: Custom styling with CSS variables, flexbox, and grid layouts
- **JavaScript (ES6+)**: Client-side functionality and interactive elements
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Fonts and Assets
- **Google Fonts**: Inter font family
- **Custom Icons**: Emoji icons for service categories

### Form Handling
- **Formspree**: Backend form processing and email delivery (`formspree.io/f/mjkyqklq`)

### Development Tools
- **npm**: Package management
- **serve**: Local development server

## Analytics Implementation

The website implements Google Analytics 4 (GA4) tracking with the following events:

### Tracked Events

1. **Form Submissions**
   - Event: `form_submit`
   - Category: `Contact`
   - Label: `Contact Form`
   - Triggered when a user submits the contact form

2. **CTA Button Clicks**
   - Event: `button_click`
   - Category: `CTA`
   - Label: `Book a Consultation`
   - Triggered when a user clicks the consultation booking button

3. **Contact Information Clicks**
   - Event: `contact_click`
   - Category: `Contact`
   - Label: `Phone` or `Email`
   - Triggered when a user clicks on phone or email links

4. **External Link Clicks**
   - Event: `outbound_link`
   - Category: `External Links`
   - Label: URL of the clicked link
   - Triggered when a user clicks on any external link

5. **Service Card Views**
   - Event: `service_view`
   - Category: `Content`
   - Label: Service name (e.g., "Osteoporosis Care")
   - Triggered when a service card becomes visible in the viewport
   - Uses Intersection Observer API to detect visibility

## GitHub Versioning System

The website implements a version tracking system that displays the current deployed commit in the footer.

### How It Works

1. **Local Development**:
   - During local development, the `git-version.js` file contains placeholder values:
   ```javascript
   const GIT_COMMIT_HASH = 'local';
   const GIT_REPO_URL = 'https://github.com/anu-physical-therapy/web/commit/';
   ```

2. **Deployment Process**:
   - GitHub Actions automatically updates the `git-version.js` file during deployment
   - The actual commit hash of the deployed version is injected into the file

3. **Footer Display**:
   - The footer shows:
     - A "latest" link that points to the current main branch
     - A "deployed version" link that points to the specific commit that's currently deployed
   - The version links are updated via JavaScript in `main.js`

4. **JavaScript Implementation**:
   - The `main.js` file imports values from `git-version.js`
   - Updates the DOM elements with the proper links and commit hash
   - Provides fallback handling if elements are missing

This versioning system allows for quick identification of which exact code version is currently deployed, making troubleshooting and verification easier.
# Yash Saxena - Research Portfolio

A modern, multi-page portfolio website showcasing research, publications, and professional experience.

## 🎨 Design Features

- **Sophisticated color scheme** with light and dark modes
- **Custom typography** using Playfair Display, DM Sans, and JetBrains Mono
- **Smooth animations** and interactive elements
- **Fully responsive** design for all devices
- **Accessible** with proper ARIA labels and semantic HTML

## 📁 File Structure

```
portfolio/
├── index.html              # Home page with hero, about, and stats
├── research.html           # Research focus areas and technical skills
├── experience.html         # Education, work experience, and awards
├── publications.html       # Publications, presentations, and works in progress
├── contact.html           # Contact information and social links
├── css/
│   └── style.css          # Main stylesheet with light/dark themes
├── js/
│   └── main.js            # Interactive features and animations
└── images/
    └── profile.png        # Profile photo (to be added)
```

## ✨ Key Changes Made

### 1. Multi-Page Structure
- Separated single-page design into 5 distinct pages
- Improved navigation with active page highlighting
- Better organization and faster loading

### 2. Fixed Dark Mode
- Resolved white background issues in dark mode
- Added `--bg-alternate` variable for section backgrounds
- All sections now properly use CSS variables for theming

### 3. Publications Update
- **Moved IMRNNS** from "In Preparation" to main Publications section (EACL 2026)
- Updated publication count from 4 to 5 on home page stats
- Added modal for IMRNNS with detailed description

### 4. Improved Styling
- Better contrast in dark mode
- Smoother transitions between themes
- Enhanced card hover effects
- Fixed timeline styling

## 🚀 Setup Instructions

1. **Add your profile image:**
   - Place your profile photo in `images/profile.png`
   - Recommended size: 400x400px minimum

2. **Update Google Scholar link:**
   - Replace `<REPLACE_WITH_ID>` with your actual Google Scholar ID in all HTML files

3. **Add your resume:**
   - Place your resume PDF in `assets/Yash_Resume.pdf`

4. **Deploy:**
   - Upload all files to your web hosting
   - Ensure folder structure is maintained

## 🎯 Features

### Dark Mode
- Toggle button in navigation bar
- Persists user preference in localStorage
- Respects system color scheme preference

### Interactive Elements
- Typing animation on home page
- Counter animations for stats
- Smooth scroll navigation
- Scroll-to-top button
- Tilt effect on research cards (desktop only)

### Responsive Design
- Mobile-friendly navigation
- Optimized layouts for all screen sizes
- Touch-friendly interactions

## 🔧 Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --accent: #2563eb;        /* Primary accent color */
    --accent-2: #7c3aed;      /* Secondary accent */
    --hero-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Typography
Fonts are loaded from Google Fonts:
- **Headings:** Playfair Display
- **Body:** DM Sans
- **Code:** JetBrains Mono

### Content
Update the HTML files directly to modify:
- Text content
- Links and URLs
- Publication details
- Experience timeline

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## 📄 License

© 2025 Yash Saxena. All rights reserved.

## 🤝 Credits

- Built with Bootstrap 5.3.2
- Icons by Font Awesome 6.5.0
- Fonts by Google Fonts

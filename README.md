# The Rustic Table - Restaurant Website

A beautiful, responsive restaurant website built for The Rustic Table, featuring farm-to-fork dining with a rustic, artisan aesthetic. cheers.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Aesthetics**: Rustic charm with irregular borders, handwritten fonts, and warm colors
- **Complete Restaurant Experience**:
  - Home page with hero section and story
  - Full menu with categorized items and dietary labels
  - Online reservation system
  - About us page with team and partner information
  - Location with embedded map
  - Contact forms with validation

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS with custom styles
- **Fonts**: Google Fonts (Caveat, Quicksand)
- **Icons**: SVG icons for social media
- **Images**: Unsplash for high-quality stock photography

## Project Structure

```
the-rustic-table/
├── index.html          # Homepage
├── menu.html           # Full menu page
├── reservations.html   # Reservation booking page
├── about.html          # About us and team page
├── css/
│   └── styles.css      # Custom stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── assets/             # Images and icons (if any local assets)
├── package.json        # Node.js project configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MrPrince419/the-rustic-table.git
   cd the-rustic-table
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```
   This will start a live server on `http://localhost:8080`

4. **Alternative server option**:
   ```bash
   npm run serve
   ```

### Manual Setup (No Node.js required)

Since this is a static website, you can also:

1. Download all files to your computer
2. Open `index.html` in any modern web browser
3. Or serve the files using any web server (Apache, Nginx, etc.)

## Deployment Options

### 1. GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Your site will be available at `https://yourusername.github.io/the-rustic-table/`

### 2. Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build` (optional)
3. Set publish directory: `/` (root directory)
4. Deploy automatically on every push

### 3. Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the setup prompts
4. Your site will be deployed with a custom URL

### 4. Traditional Web Hosting

1. Upload all files to your web server's public directory
2. Ensure `index.html` is in the root directory
3. Configure your server to serve static files

## Customization

### Updating Content

- **Restaurant Information**: Edit contact details, hours, and location in all HTML files
- **Menu Items**: Modify the menu items in `menu.html` and the preview section in `index.html`
- **Images**: Replace Unsplash URLs with your own images
- **Colors**: Modify the Tailwind classes or add custom CSS in `styles.css`

### Adding Features

- **Online Ordering**: Integrate with services like Square, Toast, or custom e-commerce
- **Payment Processing**: Add Stripe or PayPal for deposits/payments
- **Email Integration**: Connect forms to EmailJS, Formspree, or backend service
- **Analytics**: Add Google Analytics or similar tracking

### SEO Optimization

The site includes basic SEO features:
- Meta descriptions and titles
- Semantic HTML structure
- Alt tags for images
- Schema markup (can be added for local business)

## Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The website is optimized for performance:
- Minimal external dependencies
- Compressed images via Unsplash
- CSS and JavaScript minification (for production)
- Lazy loading for images (implemented in JS)

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. Feel free to use it as a template for your own restaurant website.

## Support

For support or questions about this template:
- Create an issue in the GitHub repository
- Check the documentation in the code comments
- Review the browser console for any JavaScript errors

## Credits

- Design inspiration: Rustic and artisan restaurant aesthetics
- Images: Unsplash.com
- Icons: Custom SVG designs
- Fonts: Google Fonts

---

**The Rustic Table** - Farm-to-fork dining since 2012

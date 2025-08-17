# 🚀 Deployment Guide for The Rustic Table

Your restaurant website is now complete and ready for deployment! Here are several options to get your site live on the internet.

## 🎯 Quick Start - Recommended Deployment Options

### Option 1: GitHub Pages (Free & Easy)

**Best for**: Personal websites, small businesses, free hosting

1. **Create a GitHub account** at [github.com](https://github.com) if you don't have one
2. **Create a new repository**:
   - Name it `the-rustic-table` or your restaurant name
   - Make it public
   - Don't initialize with README (we already have one)
3. **Upload your files**:
   - You can drag and drop all files directly on GitHub, or
   - Use Git commands (see Git section below)
4. **Enable GitHub Pages**:
   - Go to Settings > Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Click Save
5. **Your site will be live** at: `https://yourusername.github.io/the-rustic-table/`

### Option 2: Netlify (Free with Premium Features)

**Best for**: Professional websites, easy deployment, form handling

1. **Visit [netlify.com](https://netlify.com)** and create an account
2. **Drag & Drop Method**:
   - Zip your entire project folder
   - Drag the zip file to Netlify's deployment area
   - Your site gets a random URL like `https://amazing-site-123.netlify.app`
3. **GitHub Integration** (Recommended):
   - Connect your GitHub repository
   - Automatic deployments on every update
   - Custom domain support
4. **Benefits**: Form processing, custom domains, SSL certificates

### Option 3: Vercel (Free for Personal Use)

**Best for**: Modern hosting, great performance, easy custom domains

1. **Visit [vercel.com](https://vercel.com)** and sign up
2. **Connect GitHub**: Import your repository
3. **Deploy**: Automatic deployment with every Git push
4. **Custom domain**: Easy to set up your own domain

### Option 4: Traditional Web Hosting

**Best for**: Full control, existing hosting plans, custom server needs

1. **Choose a hosting provider**: Bluehost, GoDaddy, HostGator, etc.
2. **Upload files via FTP**:
   - Upload all HTML, CSS, JS files
   - Ensure `index.html` is in the root directory
3. **Configure your domain** to point to your hosting

## 🛠 Using Git (Recommended for Developers)

If you're comfortable with Git, here's how to push your code:

```bash
# Navigate to your project directory
cd the-rustic-table

# Initialize Git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit - The Rustic Table website"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/the-rustic-table.git

# Push to GitHub
git push -u origin main
```

## 🎨 Customization Before Deployment

### Update Restaurant Information

1. **Contact Details**: Replace placeholder information in all HTML files
   - Phone number: `(555) 123-4567`
   - Address: `123 Farmhouse Lane, Countryside, NY 12345`
   - Email: Add your actual email address

2. **Social Media Links**: Update social media URLs in footer
   - Facebook, Instagram, Twitter links currently point to `#`

3. **Google Maps**: Replace the map iframe with your actual location
   - Go to Google Maps, find your restaurant
   - Click "Share" > "Embed a map"
   - Replace the iframe src in `index.html` and `reservations.html`

4. **Menu Items**: Update the menu with your actual dishes and prices

5. **Images**: Replace Unsplash stock photos with your own restaurant photos

### SEO Optimization

1. **Update meta descriptions** in each HTML file's `<head>` section
2. **Add your business schema markup** for better search results
3. **Submit your site to Google Search Console**
4. **Create a sitemap.xml** (optional but recommended)

## 📱 Testing Your Website

Before going live, test these features:

### Desktop Testing
- [ ] All pages load correctly
- [ ] Navigation menu works
- [ ] Forms submit properly (reservation form)
- [ ] Images load and display correctly
- [ ] Hover effects work on menu items
- [ ] Contact links work (phone, email)

### Mobile Testing
- [ ] Website is responsive on phone screens
- [ ] Navigation menu works on mobile
- [ ] Forms are easy to use on mobile
- [ ] Text is readable without zooming
- [ ] Buttons are tap-friendly

### Performance Testing
- [ ] Pages load quickly (under 3 seconds)
- [ ] Images are optimized
- [ ] No broken links
- [ ] Works in different browsers (Chrome, Safari, Firefox, Edge)

## 🔧 Advanced Configuration

### Custom Domain Setup

After deploying to Netlify, GitHub Pages, or Vercel:

1. **Buy a domain** from registrar like Namecheap, GoDaddy, etc.
2. **Configure DNS** to point to your hosting service
3. **Enable HTTPS** (usually automatic with modern hosts)
4. **Set up email** with your domain for contact forms

### Form Processing

Your contact and reservation forms currently show alerts. For production:

1. **Netlify Forms**: Automatic form handling (if using Netlify)
2. **Formspree**: Easy form processing service
3. **EmailJS**: Send emails directly from JavaScript
4. **Custom Backend**: Build your own form processor

### Analytics & Monitoring

1. **Google Analytics**: Track visitor behavior
2. **Google Search Console**: Monitor search performance
3. **Performance Monitoring**: Use tools like GTmetrix or PageSpeed Insights

## 🆘 Troubleshooting

### Common Issues

**"Page not loading"**
- Check that `index.html` is in the root directory
- Ensure all file paths are correct (case-sensitive on some servers)

**"Forms not working"**
- JavaScript alerts are for demonstration only
- Set up proper form processing (see Form Processing section)

**"Images not displaying"**
- Unsplash images require internet connection
- Replace with your own images for full control

**"Mobile site looks broken"**
- Ensure viewport meta tag is present: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Test with browser developer tools

### Getting Help

1. **Check browser console** for JavaScript errors (F12 > Console)
2. **Validate HTML** using [W3C Markup Validator](https://validator.w3.org/)
3. **Test performance** with [PageSpeed Insights](https://pagespeed.web.dev/)

## 🎉 Go Live Checklist

Before announcing your website:

- [ ] All placeholder content replaced with real information
- [ ] Contact forms tested and working
- [ ] Phone numbers and addresses verified
- [ ] Social media links updated
- [ ] Google Maps showing correct location
- [ ] Menu items and prices current
- [ ] Website tested on multiple devices
- [ ] SSL certificate active (https://)
- [ ] Analytics tracking set up
- [ ] Business listed in Google My Business

## 📞 Final Notes

Your website includes:
- **4 main pages**: Home, Menu, Reservations, About
- **Responsive design**: Works on all devices
- **Modern aesthetics**: Rustic, artisan styling
- **Form validation**: JavaScript validation for user inputs
- **SEO-friendly**: Proper HTML structure and meta tags
- **Accessibility**: Screen reader friendly, keyboard navigation

**Congratulations!** 🎊 Your restaurant website is ready to serve customers online!

For any questions or support, refer to the README.md file or the inline comments in the code.

/**
 * The Rustic Table - Main Application
 * Modular restaurant website functionality with enhanced error handling
 */

class RusticTableApp {
    constructor() {
        this.config = {
            headerOffset: 100,
            animationThreshold: 0.1,
            formspreeEndpoint: 'https://formspree.io/f/movlzwvv',
            debug: false // Set to true for development
        };
        
        this.components = new Map();
        this.init();
    }

    init() {
        try {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
            
            // Global error handler
            window.addEventListener('error', (event) => {
                this.handleGlobalError(event.error, 'Global Error');
            });
            
            window.addEventListener('unhandledrejection', (event) => {
                this.handleGlobalError(event.reason, 'Unhandled Promise Rejection');
            });
            
        } catch (error) {
            this.handleGlobalError(error, 'App Initialization');
        }
    }

    initializeComponents() {
        // Preload critical assets first
        this.preloadCriticalAssets();

        // Define components with priority levels
        const componentInitializers = [
            { name: 'Navigation', class: Navigation, priority: 'high' },
            { name: 'ScrollAnimations', class: ScrollAnimations, priority: 'medium' },
            { name: 'MenuInteractions', class: MenuInteractions, priority: 'low' },
            { name: 'MobileMenu', class: MobileMenu, priority: 'high' },
            { name: 'FormHandler', class: FormHandler, priority: 'medium' },
            { name: 'ReservationSystem', class: ReservationSystem, priority: 'medium' },
            { name: 'StickyHeader', class: StickyHeader, priority: 'low' }
        ];

        // Initialize high priority components immediately
        const highPriorityComponents = componentInitializers.filter(comp => comp.priority === 'high');
        this.initializeBatch(highPriorityComponents);

        // Initialize medium priority components with requestIdleCallback
        const mediumPriorityComponents = componentInitializers.filter(comp => comp.priority === 'medium');
        if (window.requestIdleCallback) {
            requestIdleCallback(() => this.initializeBatch(mediumPriorityComponents));
        } else {
            setTimeout(() => this.initializeBatch(mediumPriorityComponents), 0);
        }

        // Initialize low priority components after user interaction or after a delay
        const lowPriorityComponents = componentInitializers.filter(comp => comp.priority === 'low');
        const initLowPriority = () => this.initializeBatch(lowPriorityComponents);
        
        let lowPriorityInitialized = false;
        const initOnce = () => {
            if (!lowPriorityInitialized) {
                lowPriorityInitialized = true;
                initLowPriority();
                // Remove event listeners after initialization
                ['scroll', 'click', 'touchstart'].forEach(event => {
                    document.removeEventListener(event, initOnce, { passive: true });
                });
            }
        };

        // Initialize on first user interaction or after 3 seconds
        ['scroll', 'click', 'touchstart'].forEach(event => {
            document.addEventListener(event, initOnce, { passive: true, once: true });
        });
        setTimeout(initOnce, 3000);
    }

    initializeBatch(components) {
        components.forEach(({ name, class: ComponentClass }) => {
            try {
                const component = new ComponentClass(this.config);
                this.components.set(name, component);
                this.log(`${name} component initialized successfully`, 'info');
            } catch (error) {
                this.handleGlobalError(error, `${name} Component Initialization`);
            }
        });
    }

    preloadCriticalAssets() {
        try {
            // Preload hero background image
            const heroSection = document.querySelector('.hero-section, [class*="hero"]');
            if (heroSection) {
                const bgImage = getComputedStyle(heroSection).backgroundImage;
                const imageUrl = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
                if (imageUrl && imageUrl[1]) {
                    Utils.prefetchImage(imageUrl[1]);
                }
            }

            // Preload critical images with high priority
            const criticalImages = document.querySelectorAll('img[loading="eager"], img[data-priority="high"]');
            criticalImages.forEach(img => {
                if (img.dataset.src) {
                    Utils.prefetchImage(img.dataset.src);
                } else if (img.src) {
                    Utils.prefetchImage(img.src);
                }
            });

            // Preload fonts if specified
            const fontPreloads = document.querySelectorAll('link[rel="preload"][as="font"]');
            if (fontPreloads.length === 0) {
                // Add font preloading for common web fonts
                this.preloadFont('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
            }

        } catch (error) {
            this.log('Asset preloading failed', 'warn', error);
        }
    }

    preloadFont(fontUrl) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        link.onload = () => {
            link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
    }

    handleGlobalError(error, context = 'Unknown') {
        const errorInfo = {
            message: error?.message || 'Unknown error',
            stack: error?.stack || 'No stack trace',
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.log(`Error in ${context}: ${errorInfo.message}`, 'error', errorInfo);

        // In production, you might want to send this to an error tracking service
        if (this.config.debug) {
            console.error('Detailed Error Info:', errorInfo);
        }
    }

    log(message, level = 'info', data = null) {
        if (!this.config.debug && level === 'info') return;
        
        // Performance monitoring
        if (level === 'perf' && window.performance && window.performance.mark) {
            window.performance.mark(message);
        }

        const logMethod = {
            'info': console.log,
            'warn': console.warn,
            'error': console.error
        }[level] || console.log;

        logMethod(`[RusticTable] ${message}`, data || '');
    }

    getComponent(name) {
        return this.components.get(name);
    }

    // Performance monitoring methods
    markPerformance(name) {
        if (window.performance && window.performance.mark) {
            window.performance.mark(name);
        }
    }

    measurePerformance(name, startMark, endMark) {
        if (window.performance && window.performance.measure) {
            try {
                window.performance.measure(name, startMark, endMark);
                const measure = window.performance.getEntriesByName(name, 'measure')[0];
                this.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`, 'perf');
                return measure.duration;
            } catch (error) {
                this.log(`Performance measurement failed for ${name}`, 'warn');
            }
        }
        return null;
    }

    getPerformanceMetrics() {
        if (!window.performance) return null;

        const navigation = window.performance.getEntriesByType('navigation')[0];
        const paint = window.performance.getEntriesByType('paint');
        
        return {
            domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
            loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
            firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
            firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
            userMarks: window.performance.getEntriesByType('mark'),
            userMeasures: window.performance.getEntriesByType('measure')
        };
    }
}

/**
 * Navigation Component - Handles smooth scrolling and navigation
 */
class Navigation {
    constructor(config) {
        this.config = config;
        this.navLinks = [];
        this.init();
    }

    init() {
        try {
            this.setupSmoothScrolling();
        } catch (error) {
            console.error('Navigation initialization failed:', error);
        }
    }

    setupSmoothScrolling() {
        this.navLinks = document.querySelectorAll('a[href^="#"]');
        
        if (this.navLinks.length === 0) {
            console.warn('No navigation links found');
            return;
        }
        
        this.navLinks.forEach((link, index) => {
            try {
                link.addEventListener('click', (e) => this.handleSmoothScroll(e, link));
            } catch (error) {
                console.error(`Failed to add event listener to navigation link ${index}:`, error);
            }
        });
    }

    handleSmoothScroll(event, link) {
        try {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (!targetId || targetId === '#') {
                console.warn('Invalid target ID for smooth scroll:', targetId);
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = Math.max(0, elementPosition - this.config.headerOffset);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Target element not found: ${targetId}`);
            }
        } catch (error) {
            console.error('Smooth scroll failed:', error);
            // Fallback to default browser behavior
            window.location.hash = link.getAttribute('href');
        }
    }
}

/**
 * Scroll Animations Component - Handles fade-in and scroll-triggered animations
 */
class ScrollAnimations {
    constructor(config) {
        this.config = config;
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: this.config.animationThreshold,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => this.handleIntersection(entry));
        }, options);
    }

    handleIntersection(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
        }
    }

    observeElements() {
        const animatedElements = document.querySelectorAll(
            'section:not(.hero-section) > div, .card, .menu-item'
        );
        
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            this.observer.observe(element);
        });
    }
}

/**
 * Menu Interactions Component - Handles menu item animations
 */
class MenuInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupMenuItemAnimations();
    }

    setupMenuItemAnimations() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => this.onMenuItemHover(item));
            item.addEventListener('mouseleave', () => this.onMenuItemLeave(item));
        });
    }

    onMenuItemHover(item) {
        item.style.transform = 'rotate(0deg) scale(1.02)';
        item.style.transition = 'all 0.3s ease';
    }

    onMenuItemLeave(item) {
        item.style.transform = 'rotate(-0.5deg) scale(1)';
    }
}

/**
 * Mobile Menu Component - Handles mobile navigation toggle
 */
class MobileMenu {
    constructor() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.init();
    }

    init() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());
    }

    toggleMenu() {
        this.mobileMenu.classList.toggle('active');
        this.mobileMenuBtn.classList.toggle('active');
    }
}

/**
 * Form Handler Component - Generic form validation and handling
 */
class FormHandler {
    constructor(config) {
        this.config = config;
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.init();
    }

    init() {
        this.setupFormValidation();
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form:not(#reservationForm)');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));
        });
    }

    handleFormSubmit(event, form) {
        if (!this.validateForm(form)) {
            event.preventDefault();
            return false;
        }
        this.showLoadingState(form);
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        // Clear previous errors
        this.clearAllErrors(form);

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !this.isValidEmail(field.value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        return this.emailRegex.test(email);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-600 text-sm mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    clearAllErrors(form) {
        const errorElements = form.querySelectorAll('.field-error');
        errorElements.forEach(error => error.remove());
        
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }

    showLoadingState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    }
}

/**
 * Sticky Header Component - Handles header scroll effects
 */
class StickyHeader {
    constructor() {
        this.header = document.querySelector('header');
        this.init();
    }

    init() {
        if (this.header) {
            this.setupScrollListener();
        }
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.classList.add('nav-sticky');
            } else {
                this.header.classList.remove('nav-sticky');
            }
        });
    }
}





// Sticky header effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('nav-sticky');
    } else {
        header.classList.remove('nav-sticky');
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Reservation System Component - Handles restaurant reservation functionality
 */
class ReservationSystem {
    constructor(config) {
        this.config = config;
        this.form = null;
        this.isSubmitting = false;
        this.operatingHours = {
            0: { start: 16 * 60, end: 20 * 60 }, // Sunday: 4pm - 8pm
            1: null, // Monday: Closed
            2: { start: 17 * 60, end: 21 * 60 }, // Tuesday: 5pm - 9pm
            3: { start: 17 * 60, end: 21 * 60 }, // Wednesday: 5pm - 9pm
            4: { start: 17 * 60, end: 21 * 60 }, // Thursday: 5pm - 9pm
            5: { start: 17 * 60, end: 22 * 60 }, // Friday: 5pm - 10pm
            6: { start: 17 * 60, end: 22 * 60 }, // Saturday: 5pm - 10pm
        };
        this.init();
    }

    init() {
        try {
            this.form = document.getElementById('reservationForm');
            if (!this.form) {
                console.warn('Reservation form not found (ID: reservationForm)');
                return;
            }
            
            this.setupFormElements();
            this.setupEventListeners();
        } catch (error) {
            console.error('ReservationSystem initialization failed:', error);
        }
    }

    setupFormElements() {
        try {
            this.dateInput = this.form.querySelector('input[type="date"]');
            this.timeInput = this.form.querySelector('input[type="time"]');
            this.guestsInput = this.form.querySelector('select[name="guests"]');
            this.submitButton = this.form.querySelector('button[type="submit"]');
            
            // Set minimum date to today and maximum to 3 months out
            if (this.dateInput) {
                const today = new Date();
                const todayString = today.toISOString().split('T')[0];
                this.dateInput.min = todayString;

                const maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 3);
                const maxDateString = maxDate.toISOString().split('T')[0];
                this.dateInput.max = maxDateString;
            }
        } catch (error) {
            console.error('Failed to setup form elements:', error);
        }
    }

    setupEventListeners() {
        try {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            if (this.timeInput) {
                this.timeInput.addEventListener('change', () => this.validateReservationTime());
            }

            if (this.dateInput) {
                this.dateInput.addEventListener('change', () => this.validateReservationTime());
            }
        } catch (error) {
            console.error('Failed to setup event listeners:', error);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        if (this.isSubmitting) {
            return false;
        }
        
        try {
            if (!this.validateForm()) {
                return false;
            }
            
            await this.submitForm();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('An unexpected error occurred. Please try again.');
        }
    }

    validateForm() {
        try {
            const formHandler = new FormHandler(this.config);
            const isValid = formHandler.validateForm(this.form);
            
            // Additional reservation-specific validation
            if (isValid && !this.validateReservationSpecifics()) {
                return false;
            }
            
            return isValid;
        } catch (error) {
            console.error('Form validation error:', error);
            this.showErrorMessage('Validation error occurred. Please refresh and try again.');
            return false;
        }
    }

    validateReservationSpecifics() {
        let isValid = true;
        
        // Validate date is not in the past
        if (this.dateInput && this.dateInput.value) {
            const selectedDate = new Date(this.dateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                this.showFieldError(this.dateInput, 'Please select a future date');
                isValid = false;
            }
        }
        
        // Validate time within operating hours
        if (this.timeInput && this.timeInput.value && this.dateInput && this.dateInput.value) {
            const dayOfWeek = new Date(this.dateInput.value).getDay();
            if (!this.isValidReservationTime(dayOfWeek, this.timeInput.value)) {
                this.showFieldError(this.timeInput, 'Please select a time within our operating hours');
                isValid = false;
            }
        }
        
        return isValid;
    }

    validateReservationTime() {
        try {
            if (!this.timeInput?.value || !this.dateInput?.value) return;
            
            const selectedTime = this.timeInput.value;
            const selectedDate = this.dateInput.value;
            const dayOfWeek = new Date(selectedDate).getDay();
            
            // Clear previous errors
            this.clearFieldError(this.timeInput);
            this.clearFieldError(this.dateInput);
            
            // Check if restaurant is closed on selected day
            if (dayOfWeek === 1) {
                this.showFieldError(this.dateInput, 'We are closed on Mondays. Please select another day.');
                return;
            }
            
            if (!this.isValidReservationTime(dayOfWeek, selectedTime)) {
                const hours = this.getOperatingHoursText(dayOfWeek);
                this.showFieldError(this.timeInput, `Please select a time within our operating hours: ${hours}`);
            }
        } catch (error) {
            console.error('Time validation error:', error);
        }
    }

    isValidReservationTime(dayOfWeek, time) {
        try {
            if (!time) return false;
            
            const [hours, minutes] = time.split(':').map(Number);
            const timeInMinutes = hours * 60 + minutes;
            
            // Monday closed
            if (dayOfWeek === 1) return false;
            
            const schedule = this.operatingHours[dayOfWeek];
            return schedule && timeInMinutes >= schedule.start && timeInMinutes <= schedule.end;
        } catch (error) {
            console.error('Time validation error:', error);
            return false;
        }
    }

    getOperatingHoursText(dayOfWeek) {
        const schedule = this.operatingHours[dayOfWeek];
        if (!schedule) return 'Closed';
        
        const startHour = Math.floor(schedule.start / 60);
        const startMin = schedule.start % 60;
        const endHour = Math.floor(schedule.end / 60);
        const endMin = schedule.end % 60;
        
        const formatTime = (hour, min) => {
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
            return `${displayHour}${min > 0 ? ':' + min.toString().padStart(2, '0') : ''}${period}`;
        };
        
        return `${formatTime(startHour, startMin)} - ${formatTime(endHour, endMin)}`;
    }

    async submitForm() {
        if (!this.submitButton) {
            console.error('Submit button not found');
            return;
        }

        const originalText = this.submitButton.textContent;
        
        try {
            this.isSubmitting = true;
            this.setLoadingState(this.submitButton, true);
            this.hideMessages();
            
            const formData = new FormData(this.form);
            
            // Add reservation-specific data
            const reservationData = {
                type: 'reservation',
                timestamp: new Date().toISOString(),
                restaurant: 'The Rustic Table'
            };
            
            Object.entries(reservationData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            
            const response = await fetch(this.config.formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: { 
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                this.showSuccessMessage('Your reservation request has been submitted successfully! We\'ll confirm your booking within 24 hours. Check your email for confirmation details.');
                this.form.reset();
                this.clearAllFieldErrors();
                
                // Analytics or tracking could go here
                if (window.gtag) {
                    window.gtag('event', 'reservation_submitted', {
                        event_category: 'engagement',
                        event_label: 'reservation_form'
                    });
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `Server error (${response.status}). Please try again.`;
                this.showErrorMessage(errorMessage);
            }
        } catch (error) {
            console.error('Reservation submission error:', error);
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                this.showErrorMessage('Network error. Please check your internet connection and try again.');
            } else if (error.name === 'AbortError') {
                this.showErrorMessage('Request was cancelled. Please try again.');
            } else {
                this.showErrorMessage('An unexpected error occurred. Please try again or call us directly at (555) 123-4567.');
            }
        } finally {
            this.isSubmitting = false;
            this.setLoadingState(this.submitButton, false, originalText);
        }
    }

    clearAllFieldErrors() {
        try {
            const errorElements = this.form.querySelectorAll('.field-error');
            errorElements.forEach(error => error.remove());
            
            const inputs = this.form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => input.classList.remove('error'));
        } catch (error) {
            console.error('Failed to clear field errors:', error);
        }
    }

    setLoadingState(button, isLoading, originalText = 'Request Reservation') {
        if (isLoading) {
            button.textContent = 'Sending...';
            button.disabled = true;
        } else {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-600 text-sm mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) errorElement.remove();
    }

    showSuccessMessage(message) {
        this.showMessage('success', message);
    }

    showErrorMessage(message) {
        this.showMessage('error', message);
    }

    showMessage(type, message) {
        const container = document.getElementById('form-messages');
        const messageElement = document.getElementById(`${type}-message`);
        const textElement = document.getElementById(`${type}-text`);
        
        if (container && messageElement && textElement) {
            textElement.textContent = message;
            messageElement.classList.remove('hidden');
            container.style.display = 'block';
            container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    hideMessages() {
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');
        
        if (successMessage) successMessage.classList.add('hidden');
        if (errorMessage) errorMessage.classList.add('hidden');
    }
}



/**
 * Utility Functions
 */
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static showGlobalMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.global-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = `global-message bg-${type === 'success' ? 'green' : 'red'}-100 border border-${type === 'success' ? 'green' : 'red'}-400 text-${type === 'success' ? 'green' : 'red'}-700 px-4 py-3 rounded mb-4 fixed top-4 right-4 z-50 max-w-sm shadow-lg transition-all duration-300 ease-in-out transform translate-x-full`;
        messageDiv.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <strong>${type === 'success' ? 'Success!' : 'Error!'}</strong> 
                    <span class="block sm:inline">${message}</span>
                </div>
                <button class="ml-4 text-lg font-bold opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Animate in
        requestAnimationFrame(() => {
            messageDiv.classList.remove('translate-x-full');
        });
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.classList.add('translate-x-full');
                setTimeout(() => messageDiv.remove(), 300);
            }
        }, 8000);
    }

    static lazy(fn) {
        let result;
        let computed = false;
        return function(...args) {
            if (!computed) {
                result = fn.apply(this, args);
                computed = true;
            }
            return result;
        };
    }

    static async loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    static prefetchImage(src) {
        const img = new Image();
        img.src = src;
    }

    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    static sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
}

// Initialize the application
const rusticTableApp = new RusticTableApp();

// Export for backwards compatibility and external access
window.RusticTable = {
    app: rusticTableApp,
    Utils: Utils
};

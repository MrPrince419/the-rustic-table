// The Rustic Table - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initFadeInAnimations();
    initMenuItemAnimations();
    initMobileMenu();
    initFormValidation();
    initImageLazyLoading();
    initParallaxEffect();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100; // Account for sticky header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fade in animations on scroll
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate (excluding hero section divs)
    const animatedElements = document.querySelectorAll('section:not(.hero-section) > div, .card, .menu-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Menu item hover animations
function initMenuItemAnimations() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'rotate(0deg) scale(1.02)';
            item.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'rotate(-0.5deg) scale(1)';
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// Form validation and submission
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Only prevent default if validation fails
            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }
            
            // Show loading state but allow form to submit to Formspree
            showFormLoadingState(this);
        });
    });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-600 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormLoadingState(form) {
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Re-enable button after a short delay (form will redirect to Formspree)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
    successDiv.innerHTML = `
        <strong>Success!</strong> ${message}
    `;
    
    // Insert at top of page
    document.body.insertBefore(successDiv, document.body.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Lazy loading for images
function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Simple parallax effect for hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-parallax');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroSection.style.transform = `translateY(${parallax}px)`;
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

// Reservation form specific functionality
function initReservationForm() {
    const reservationForm = document.getElementById('reservationForm');
    if (!reservationForm) return;
    
    const dateInput = reservationForm.querySelector('input[type="date"]');
    const timeInput = reservationForm.querySelector('input[type="time"]');
    const guestsInput = reservationForm.querySelector('select[name="guests"]');
    
    // Set minimum date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    // Add AJAX form submission handler
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Validate form first
        if (!validateForm(this)) {
            return false;
        }
        
        // Submit form via AJAX
        submitReservationForm(this);
    });
    
    // Validate time based on restaurant hours
    if (timeInput) {
        timeInput.addEventListener('change', function() {
            const selectedTime = this.value;
            const selectedDate = dateInput.value;
            
            if (selectedDate && selectedTime) {
                const dayOfWeek = new Date(selectedDate).getDay();
                
                // Check if time is within operating hours
                if (!isValidReservationTime(dayOfWeek, selectedTime)) {
                    showFieldError(this, 'Please select a time within our operating hours');
                } else {
                    clearFieldError(this);
                }
            }
        });
    }
}

function isValidReservationTime(dayOfWeek, time) {
    // Convert time to minutes for easier comparison
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    
    // Restaurant hours in minutes
    const hours_schedule = {
        0: null, // Sunday: 4pm - 8pm
        1: null, // Monday: Closed
        2: { start: 17 * 60, end: 21 * 60 }, // Tuesday: 5pm - 9pm
        3: { start: 17 * 60, end: 21 * 60 }, // Wednesday: 5pm - 9pm
        4: { start: 17 * 60, end: 21 * 60 }, // Thursday: 5pm - 9pm
        5: { start: 17 * 60, end: 22 * 60 }, // Friday: 5pm - 10pm
        6: { start: 17 * 60, end: 22 * 60 }, // Saturday: 5pm - 10pm
    };
    
    // Sunday special hours
    if (dayOfWeek === 0) {
        return timeInMinutes >= 16 * 60 && timeInMinutes <= 20 * 60;
    }
    
    // Monday closed
    if (dayOfWeek === 1) {
        return false;
    }
    
    const schedule = hours_schedule[dayOfWeek];
    return schedule && timeInMinutes >= schedule.start && timeInMinutes <= schedule.end;
}

// AJAX form submission for reservations
async function submitReservationForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    hideFormMessages();
    
    try {
        // Prepare form data
        const formData = new FormData(form);
        
        // Submit to Formspree
        const response = await fetch('https://formspree.io/f/movlzwvv', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showFormSuccessMessage('Your reservation request has been submitted! We\'ll confirm your booking within 24 hours.');
            form.reset(); // Clear the form
        } else {
            const data = await response.json();
            if (data.errors) {
                showFormErrorMessage('Please check your form and try again.');
            } else {
                showFormErrorMessage('Something went wrong. Please try again or call us directly.');
            }
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showFormErrorMessage('Network error. Please check your connection and try again.');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Show success message for reservations
function showFormSuccessMessage(message) {
    const messagesContainer = document.getElementById('form-messages');
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    
    if (messagesContainer && successMessage && successText) {
        successText.textContent = message;
        successMessage.classList.remove('hidden');
        messagesContainer.style.display = 'block';
        
        // Scroll to message
        messagesContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Show error message for reservations
function showFormErrorMessage(message) {
    const messagesContainer = document.getElementById('form-messages');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    
    if (messagesContainer && errorMessage && errorText) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
        messagesContainer.style.display = 'block';
        
        // Scroll to message
        messagesContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Hide form messages
function hideFormMessages() {
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (successMessage) successMessage.classList.add('hidden');
    if (errorMessage) errorMessage.classList.add('hidden');
}

// Initialize reservation form when DOM is loaded
document.addEventListener('DOMContentLoaded', initReservationForm);

// Export functions for use in other scripts
window.RusticTable = {
    showSuccessMessage,
    showFieldError,
    clearFieldError,
    validateForm,
    isValidEmail
};

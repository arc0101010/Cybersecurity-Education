/**
 * Image Handlers and Animation JavaScript for CyberFace Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for elements
    initializeAnimations();
    
    // Add hover effects to navigation icons
    setupNavIconEffects();
    
    // Setup developer profile interactions
    setupDeveloperProfiles();
    
    // Setup newsletter form
    setupNewsletterForm();
});

/**
 * Initialize animations for various elements
 */
function initializeAnimations() {
    // Removed hero section animations to prevent multiple text effect
    /* Original code commented out to fix multiple text issue
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.animation = `fadeInUp 0.5s ease-out forwards ${index * 0.2}s`;
        element.style.opacity = '0';
    });
    */
    
    // Make sure hero content elements are visible
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach(element => {
        element.style.opacity = '1';
    });
    
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease-out forwards ${index * 0.2 + 0.5}s`;
        card.style.opacity = '0';
    });
    
    // Add pulse animation to cyber images
    const cyberImages = document.querySelectorAll('.cyber-image');
    cyberImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.boxShadow = '0 0 20px rgba(12, 255, 12, 0.7)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.boxShadow = '0 0 15px rgba(12, 255, 12, 0.3)';
        });
    });
}

/**
 * Setup hover effects for navigation icons
 */
function setupNavIconEffects() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const icon = link.querySelector('.nav-icon');
        if (!icon) return;
        
        link.addEventListener('mouseenter', () => {
            icon.style.filter = 'brightness(0) invert(1) sepia(100%) saturate(1000%) hue-rotate(90deg)';
            link.style.color = 'var(--secondary-color)';
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                icon.style.filter = 'brightness(0) invert(1)';
                link.style.color = 'var(--text-color)';
            }
        });
    });
}

/**
 * Setup developer profile interactions
 */
function setupDeveloperProfiles() {
    const developerCards = document.querySelectorAll('.developer-card');
    
    developerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('.developer-img');
            if (img) {
                img.style.transform = 'scale(1.1)';
                img.style.boxShadow = '0 0 15px rgba(12, 255, 12, 0.7)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('.developer-img');
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.boxShadow = '0 0 10px rgba(12, 255, 12, 0.5)';
            }
        });
    });
}

/**
 * Setup newsletter form submission
 */
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Show success message (in a real app, you would send this to a server)
            const formContainer = this.parentElement;
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Salamat sa pag-subscribe! Makakatanggap ka na ng mga updates.`;
            
            // Replace form with success message
            this.style.display = 'none';
            formContainer.appendChild(successMsg);
            
            // Animation for success message
            successMsg.style.animation = 'fadeIn 0.5s ease-out forwards';
        }
    });
}
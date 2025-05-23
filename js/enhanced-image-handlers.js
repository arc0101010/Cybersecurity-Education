/**
 * Enhanced Image Handlers and Animation JavaScript for CyberFace Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for elements
    initializeAnimations();
    
    // Add parallax effect to hero sections - DISABLED to prevent multiple text effect
    // setupParallaxEffect();
    
    // Setup image hover effects
    setupImageHoverEffects();
    
    // Setup team member interactions
    setupTeamMemberInteractions();
    
    // Setup lesson card interactions
    setupLessonCardInteractions();
    
    // Setup blog post interactions
    setupBlogInteractions();
    
    // Setup contact form terminal effect
    setupTerminalEffect();
});

/**
 * Initialize animations for various elements
 */
function initializeAnimations() {
    // Completely removed hero section animations to prevent multiple text effect
    // Only animate feature cards with staggered delay
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease-out forwards ${index * 0.2 + 0.5}s`;
        card.style.opacity = '0';
    });
    
    // Add scroll-triggered animations
    setupScrollAnimations();
}

/**
 * Setup parallax effect for hero sections - DISABLED to prevent multiple text effect
 */
function setupParallaxEffect() {
    // Function disabled to prevent multiple text effect and animation issues
    // Original code commented out below
    /*
    const heroSections = document.querySelectorAll('.hero-section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        heroSections.forEach(section => {
            // Apply parallax effect to the background
            if (section.querySelector('.hero-parallax')) {
                section.querySelector('.hero-parallax').style.transform = 
                    `translateY(${scrollPosition * 0.5}px)`;
            }
            
            // Apply subtle movement to hero content
            if (section.querySelector('.hero-content')) {
                section.querySelector('.hero-content').style.transform = 
                    `translateY(${scrollPosition * 0.2}px)`;
            }
        });
    });
    */
}

/**
 * Setup image hover effects
 */
function setupImageHoverEffects() {
    // Add hover effects to cyber images
    const cyberImages = document.querySelectorAll('.cyber-image');
    cyberImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.boxShadow = '0 0 20px rgba(0, 255, 140, 0.7)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.boxShadow = '0 0 15px rgba(0, 255, 140, 0.3)';
        });
    });
    
    // Add glitch effect on hover for certain images
    const glitchImages = document.querySelectorAll('.glitch-on-hover');
    glitchImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.classList.add('glitch-effect');
        });
        
        img.addEventListener('mouseleave', () => {
            img.classList.remove('glitch-effect');
        });
    });
}

/**
 * Setup team member interactions
 */
function setupTeamMemberInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.querySelector('.member-image').style.transform = 'scale(1.1)';
            member.querySelector('.member-image').style.boxShadow = '0 0 20px rgba(0, 255, 140, 0.7)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.querySelector('.member-image').style.transform = 'scale(1)';
            member.querySelector('.member-image').style.boxShadow = '0 0 15px rgba(0, 255, 140, 0.3)';
        });
    });
}

/**
 * Setup lesson card interactions
 */
function setupLessonCardInteractions() {
    const lessonCards = document.querySelectorAll('.lesson-card');
    
    lessonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 140, 0.5)';
            
            const icon = card.querySelector('.lesson-icon');
            if (icon) {
                icon.style.borderColor = 'var(--cyber-accent)';
                icon.style.boxShadow = '0 0 15px rgba(0, 255, 140, 0.5)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            
            const icon = card.querySelector('.lesson-icon');
            if (icon) {
                icon.style.borderColor = 'transparent';
                icon.style.boxShadow = 'none';
            }
        });
    });
    
    // Setup lesson filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter lesson cards
                lessonCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Setup blog post interactions
 */
function setupBlogInteractions() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', () => {
            const image = post.querySelector('.post-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        post.addEventListener('mouseleave', () => {
            const image = post.querySelector('.post-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

/**
 * Setup terminal effect for contact form
 */
function setupTerminalEffect() {
    const terminalForm = document.querySelector('.terminal-form');
    if (!terminalForm) return;
    
    const terminalLines = terminalForm.querySelectorAll('.terminal-line');
    
    // Animate terminal lines with typing effect
    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            simulateTyping(line, 50);
        }, index * 1000);
    });
    
    // Add blinking cursor to input fields
    const inputs = terminalForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.add('cursor-blink');
        });
        
        input.addEventListener('blur', () => {
            input.classList.remove('cursor-blink');
        });
    });
}

/**
 * Simulate typing effect for terminal lines
 */
function simulateTyping(element, speed) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

/**
 * Setup scroll-triggered animations
 */
function setupScrollAnimations() {
    // Get all elements that need to be animated on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class when element is visible
                entry.target.classList.add('animated');
                // Stop observing the element after it's animated
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Add cyber glitch effect to elements - DISABLED to prevent multiple text effect
 */
function addGlitchEffect(element) {
    // Function disabled to prevent multiple text effect
    // Original implementation commented out below
    /*
    // Create glitch layers
    const glitchElement = document.createElement('div');
    glitchElement.classList.add('glitch-container');
    
    // Clone the element content for glitch layers
    const content = element.innerHTML;
    
    // Store the original content separately to avoid duplication
    const originalContent = content;
    
    glitchElement.innerHTML = `
        <div class="glitch-layer layer1">${originalContent}</div>
        <div class="glitch-layer layer2">${originalContent}</div>
        <div class="glitch-layer layer3">${originalContent}</div>
    `;
    
    // Add the original content back to the container instead of duplicating it
    const originalContentElement = document.createElement('div');
    originalContentElement.classList.add('original-content');
    originalContentElement.innerHTML = originalContent;
    
    // Replace element content with glitch effect
    element.innerHTML = '';
    element.appendChild(glitchElement);
    element.appendChild(originalContentElement);
    */
    
    // Just ensure the element is visible without effects
    element.style.opacity = '1';
}

// Apply glitch effect to elements with cyber-glitch-text class
document.addEventListener('DOMContentLoaded', function() {
    const glitchElements = document.querySelectorAll('.cyber-glitch-text');
    glitchElements.forEach(element => {
        addGlitchEffect(element);
    });
});
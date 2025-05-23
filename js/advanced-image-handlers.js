/**
 * Advanced Image Handlers and Animation JavaScript for CyberFace Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize advanced animations
    initializeAdvancedAnimations();
    
    // Setup 3D parallax effects - DISABLED to prevent multiple text effect
    // setup3DParallaxEffects();
    
    // Setup holographic image effects
    setupHolographicEffects();
    
    // Setup glitch effects
    setupGlitchEffects();
    
    // Setup interactive team member images
    setupTeamMemberInteractions();
    
    // Setup lesson card interactions
    setupLessonCardInteractions();
    
    // Setup blog post interactions
    setupBlogInteractions();
    
    // Setup contact form effects
    setupContactEffects();
});

/**
 * Initialize advanced animations for various elements
 */
function initializeAdvancedAnimations() {
    // Add scroll-triggered animations with enhanced effects
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add random delay for staggered animation effect
                const delay = Math.random() * 0.5;
                entry.target.style.animationDelay = `${delay}s`;
                
                // Add random direction for more dynamic animations
                const directions = ['fadeIn', 'slideInLeft', 'slideInRight', 'slideInUp'];
                const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                entry.target.classList.add(randomDirection);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Removed glitch text effect to headings to prevent multiple text effect
    // setupGlitchTextEffect();
}

/**
 * Setup 3D parallax effects for hero sections - DISABLED to prevent multiple text effect
 */
function setup3DParallaxEffects() {
    // Function disabled to prevent multiple text effect and animation issues
    // Original code commented out below
    /*
    const heroSections = document.querySelectorAll('.hero-section');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        heroSections.forEach(section => {
            // Apply 3D rotation effect based on mouse position
            section.style.transform = `perspective(1000px) rotateX(${mouseY * 5}deg) rotateY(${mouseX * -5}deg)`;
            
            // Apply parallax effect to hero content
            if (section.querySelector('.hero-content')) {
                section.querySelector('.hero-content').style.transform = 
                    `translateX(${mouseX * 15}px) translateY(${mouseY * 15}px)`;
            }
            
            // Apply subtle movement to background
            if (section.querySelector('.hero-parallax')) {
                section.querySelector('.hero-parallax').style.transform = 
                    `translateX(${mouseX * 25}px) translateY(${mouseY * 25}px)`;
            }
        });
    });
    
    // Reset transform on mouse leave
    heroSections.forEach(section => {
        section.addEventListener('mouseleave', () => {
            section.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            
            if (section.querySelector('.hero-content')) {
                section.querySelector('.hero-content').style.transform = 'translateX(0) translateY(0)';
            }
            
            if (section.querySelector('.hero-parallax')) {
                section.querySelector('.hero-parallax').style.transform = 'translateX(0) translateY(0)';
            }
        });
    });
    */
}

/**
 * Setup holographic effects for image containers
 */
function setupHolographicEffects() {
    const imageContainers = document.querySelectorAll('.cyber-image-container');
    
    imageContainers.forEach(container => {
        container.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to the container
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate percentage position
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            // Apply holographic effect
            container.style.backgroundPosition = `${xPercent * 100}% ${yPercent * 100}%`;
            
            // Apply 3D tilt effect
            const rotateX = (yPercent - 0.5) * -10;
            const rotateY = (xPercent - 0.5) * 10;
            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            
            // Adjust shadow based on mouse position
            const shadowX = (xPercent - 0.5) * 20;
            const shadowY = (yPercent - 0.5) * 20;
            container.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 255, 140, 0.3), 0 0 15px rgba(0, 255, 140, 0.5)`;
        });
        
        // Reset effects on mouse leave
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            container.style.boxShadow = '0 0 15px rgba(0, 255, 140, 0.3)';
        });
    });
}

/**
 * Setup glitch effects for images with glitch-on-hover class
 */
function setupGlitchEffects() {
    const glitchImages = document.querySelectorAll('.glitch-on-hover');
    
    glitchImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            // Create glitch effect by adding random offsets
            const glitchInterval = setInterval(() => {
                const randomX = Math.random() * 10 - 5;
                const randomY = Math.random() * 10 - 5;
                img.style.transform = `translate(${randomX}px, ${randomY}px)`;
                
                // Random color channel offset
                if (Math.random() > 0.8) {
                    img.style.filter = 'hue-rotate(90deg) saturate(200%)';
                } else if (Math.random() > 0.6) {
                    img.style.filter = 'hue-rotate(180deg) saturate(200%)';
                } else {
                    img.style.filter = 'none';
                }
            }, 50);
            
            // Store the interval ID for cleanup
            img.dataset.glitchInterval = glitchInterval;
        });
        
        img.addEventListener('mouseleave', () => {
            // Clear the glitch interval
            clearInterval(img.dataset.glitchInterval);
            img.style.transform = 'translate(0, 0)';
            img.style.filter = 'none';
        });
    });
}

/**
 * Setup glitch text effect for headings - DISABLED to prevent multiple text effect
 */
function setupGlitchTextEffect() {
    // Function completely disabled to prevent multiple text effect and animation issues
    
    // Make sure all headings are visible without effects
    const glitchTexts = document.querySelectorAll('.cyber-glitch-text');
    glitchTexts.forEach(text => {
        // Remove the cyber-glitch-text class to prevent any glitch effects
        text.classList.remove('cyber-glitch-text');
        // Ensure text is visible
        text.style.opacity = '1';
    });
}

/**
 * Setup team member image interactions
 */
function setupTeamMemberInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        const image = member.querySelector('.member-image');
        if (!image) return;
        
        member.addEventListener('mouseenter', () => {
            // Add scan effect animation
            image.classList.add('scan-effect');
            
            // Add pulse glow effect
            image.style.boxShadow = '0 0 25px rgba(0, 255, 140, 0.7)';
            image.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        member.addEventListener('mouseleave', () => {
            // Remove scan effect animation
            image.classList.remove('scan-effect');
            
            // Reset styles
            image.style.boxShadow = '0 0 15px rgba(0, 255, 140, 0.3)';
            image.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

/**
 * Setup lesson card interactions
 */
function setupLessonCardInteractions() {
    const lessonCards = document.querySelectorAll('.lesson-card');
    
    lessonCards.forEach(card => {
        const icon = card.querySelector('.lesson-icon');
        if (!icon) return;
        
        card.addEventListener('mouseenter', () => {
            // Add pulse radial animation
            icon.classList.add('pulse-radial');
            
            // Add glow effect
            icon.style.boxShadow = '0 0 20px rgba(0, 255, 140, 0.5)';
            icon.style.borderColor = 'var(--cyber-accent)';
            icon.style.transform = 'scale(1.1) rotate(10deg)';
            
            // Animate icon
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.style.transform = 'scale(1.2)';
                iconElement.style.textShadow = '0 0 10px rgba(0, 255, 140, 0.8)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Remove pulse radial animation
            icon.classList.remove('pulse-radial');
            
            // Reset styles
            icon.style.boxShadow = 'none';
            icon.style.borderColor = 'transparent';
            icon.style.transform = 'scale(1) rotate(0deg)';
            
            // Reset icon
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.style.transform = 'scale(1)';
                iconElement.style.textShadow = 'none';
            }
        });
    });
}

/**
 * Setup blog post interactions
 */
function setupBlogInteractions() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        const image = post.querySelector('.post-image');
        const category = post.querySelector('.post-category');
        
        post.addEventListener('mouseenter', () => {
            // Add zoom effect to image
            if (image && image.querySelector('img')) {
                image.querySelector('img').style.transform = 'scale(1.1)';
            }
            
            // Change category style
            if (category) {
                category.style.backgroundColor = 'var(--cyber-darker)';
                category.style.color = 'var(--cyber-accent)';
                category.style.boxShadow = '0 0 15px rgba(0, 255, 140, 0.8)';
            }
            
            // Add glow effect to post
            post.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 140, 0.5)';
            post.style.transform = 'translateY(-5px)';
        });
        
        post.addEventListener('mouseleave', () => {
            // Reset image zoom
            if (image && image.querySelector('img')) {
                image.querySelector('img').style.transform = 'scale(1)';
            }
            
            // Reset category style
            if (category) {
                category.style.backgroundColor = 'var(--cyber-accent)';
                category.style.color = 'var(--cyber-darker)';
                category.style.boxShadow = '0 0 10px rgba(0, 255, 140, 0.5)';
            }
            
            // Reset post style
            post.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            post.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Setup contact form effects
 */
function setupContactEffects() {
    // Add interactive effects to contact info items
    const infoItems = document.querySelectorAll('.contact-info .info-item');
    
    infoItems.forEach(item => {
        const icon = item.querySelector('i');
        if (!icon) return;
        
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.textShadow = '0 0 10px rgba(0, 255, 140, 0.8)';
        });
        
        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.textShadow = 'none';
        });
    });
    
    // Add interactive effects to social icons
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px)';
            icon.style.boxShadow = '0 5px 15px rgba(0, 255, 140, 0.3)';
            
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.style.color = '#fff';
                iconElement.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
            }
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0)';
            icon.style.boxShadow = 'none';
            
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.style.color = 'var(--cyber-accent)';
                iconElement.style.textShadow = 'none';
            }
        });
    });
    
    // Add terminal typing effect to contact form
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        // Simulate typing effect
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
    });
}
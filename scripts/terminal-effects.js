/**
 * CyberType - Terminal Effects
 * Adds visual effects to enhance the terminal screen experience
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal effects
    initializeTerminalEffects();
});

/**
 * Initialize all terminal visual effects
 */
function initializeTerminalEffects() {
    createMatrixRainEffect();
    addTerminalButtonsInteractivity();
    addTypingCursorEffect();
    addGlitchEffect();
}

/**
 * Create the Matrix-style falling characters effect in the background
 */
function createMatrixRainEffect() {
    const matrixRain = document.querySelector('.matrix-rain');
    if (!matrixRain) return;
    
    // Create canvas for matrix rain
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    matrixRain.appendChild(canvas);
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = matrixRain.offsetWidth;
        canvas.height = matrixRain.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix rain characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to track the y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    // Drawing the characters
    function draw() {
        // Black semi-transparent background to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        // Loop through each drop
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // x = i * fontSize, y = drops[i] * fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Sending the drop back to the top randomly after it crosses the screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Incrementing Y coordinate
            drops[i]++;
        }
    }
    
    // Animation loop
    setInterval(draw, 35);
}

/**
 * Add interactivity to terminal window buttons
 */
function addTerminalButtonsInteractivity() {
    const closeButton = document.querySelector('.terminal-button.close');
    const minimizeButton = document.querySelector('.terminal-button.minimize');
    const maximizeButton = document.querySelector('.terminal-button.maximize');
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            // Show a terminal shutdown animation
            const terminalScreen = document.querySelector('.terminal-screen');
            if (terminalScreen) {
                terminalScreen.classList.add('terminal-shutdown');
                setTimeout(() => {
                    terminalScreen.classList.remove('terminal-shutdown');
                }, 1000);
            }
        });
    }
    
    if (minimizeButton) {
        minimizeButton.addEventListener('click', () => {
            // Minimize animation
            const terminalContent = document.querySelector('.terminal-content');
            if (terminalContent) {
                terminalContent.classList.toggle('minimized');
            }
        });
    }
    
    if (maximizeButton) {
        maximizeButton.addEventListener('click', () => {
            // Maximize animation
            const terminalScreen = document.querySelector('.terminal-screen');
            if (terminalScreen) {
                terminalScreen.classList.toggle('maximized');
            }
        });
    }
}

/**
 * Add blinking cursor effect to the terminal
 */
function addTypingCursorEffect() {
    const textInput = document.getElementById('text-input');
    const textDisplay = document.getElementById('text-display');
    
    if (!textInput || !textDisplay) return;
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    cursor.innerHTML = '█';
    textDisplay.appendChild(cursor);
    
    // Blink the cursor
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 530);
    
    // Move cursor when typing
    textInput.addEventListener('input', () => {
        // Logic to move cursor based on typing position would go here
        // This is a simplified version
        cursor.style.opacity = '1';
        setTimeout(() => {
            cursor.style.opacity = '0';
        }, 100);
    });
}

/**
 * Add occasional glitch effect to terminal text
 */
function addGlitchEffect() {
    const terminalElements = document.querySelectorAll('.terminal-title, .terminal-prompt span');
    
    // Apply glitch effect randomly
    setInterval(() => {
        // Only apply glitch occasionally
        if (Math.random() > 0.95) {
            const randomElement = terminalElements[Math.floor(Math.random() * terminalElements.length)];
            if (randomElement) {
                randomElement.classList.add('glitch-text');
                setTimeout(() => {
                    randomElement.classList.remove('glitch-text');
                }, 1000);
            }
        }
    }, 3000);
}

// Add CSS for additional terminal effects
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Terminal Shutdown Effect */
        .terminal-shutdown {
            animation: shutdown 1s forwards;
        }
        
        @keyframes shutdown {
            0% { opacity: 1; transform: scale(1); }
            15% { opacity: 0.9; transform: scale(1.02); filter: brightness(1.2); }
            30% { opacity: 0.8; transform: scale(0.98); }
            45% { opacity: 0.7; transform: scale(1); }
            60% { opacity: 0.5; transform: scale(0.95); }
            75% { opacity: 0.3; transform: scale(0.9); }
            100% { opacity: 0; transform: scale(0.8); }
        }
        
        /* Minimized Terminal */
        .terminal-content.minimized {
            height: 40px;
            overflow: hidden;
            transition: height 0.3s ease;
        }
        
        /* Maximized Terminal */
        .terminal-screen.maximized {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            max-width: none;
            z-index: 9999;
            margin: 0;
            border-radius: 0;
            transition: all 0.3s ease;
        }
        
        /* Terminal Cursor */
        .terminal-cursor {
            color: #00ff41;
            font-weight: bold;
            margin-left: 2px;
            animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
// Cybersecurity-related text snippets for typing practice
// Cybersecurity text snippets for typing practice
const textSnippets = [
    "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information.",
    "A firewall is a network security device that monitors incoming and outgoing network traffic and permits or blocks data packets based on a set of security rules.",
    "Encryption is the process of encoding information in such a way that only authorized parties can access it and those who are not authorized cannot.",
    "Two-factor authentication provides an additional layer of security by requiring not only a password and username but also something that only the user has on them.",
    "A vulnerability is a weakness which can be exploited by a threat actor, such as an attacker, to perform unauthorized actions within a computer system.",
    "Phishing is the fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity.",
    "Malware is any software intentionally designed to cause damage to a computer, server, client, or computer network.",
    "A denial-of-service attack is a cyber-attack in which the perpetrator seeks to make a machine or network resource unavailable to its intended users.",
    "Penetration testing is an authorized simulated attack on a computer system, performed to evaluate the security of the system.",
    "Social engineering is the psychological manipulation of people into performing actions or divulging confidential information.",
    "A zero-day vulnerability is a software security flaw that is unknown to those who should be interested in mitigating the vulnerability.",
    "Ransomware is a type of malicious software designed to block access to a computer system until a sum of money is paid.",
    "Biometric authentication is a security process that relies on the unique biological characteristics of individuals to verify they are who they say they are.",
    "A security token is a physical device that an authorized user of computer services is given to ease authentication.",
    "Cryptography is the practice and study of techniques for secure communication in the presence of third parties called adversaries.",
    "A VPN (Virtual Private Network) creates a secure, encrypted connection over a less secure network, such as the public internet.",
    "Threat hunting is the practice of proactively searching for cyber threats that are lurking undetected in a network.",
    "An intrusion detection system (IDS) is a device or software application that monitors a network for malicious activity or policy violations.",
    "Secure coding practices involve writing code in a way that guards against accidental introduction of security vulnerabilities.",
    "A security operations center (SOC) is a facility that houses an information security team responsible for monitoring and analyzing an organization's security posture."
];

// Advanced cybersecurity terms for more challenging typing tests
const advancedSnippets = [
    "Cross-site scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites.",
    "SQL injection is a code injection technique, used to attack data-driven applications, in which malicious SQL statements are inserted into an entry field for execution.",
    "A man-in-the-middle attack is a type of cybersecurity attack that allows attackers to eavesdrop on the communication between two targets.",
    "The principle of least privilege (PoLP) is a computer security concept in which a user is given the minimum levels of access necessary to complete his or her job functions.",
    "A security information and event management (SIEM) system is a subsection of the computer security field, where software products and services combine security information management and security event management."
];

// Cybersecurity commands and code snippets for advanced typing practice
const codeSnippets = [
    "nmap -sS -p 1-65535 192.168.1.1 # Scan all ports with TCP SYN scan",
    "ssh -i private_key.pem user@192.168.1.100 # Secure shell connection with key authentication",
    "openssl enc -aes-256-cbc -salt -in file.txt -out file.enc # Encrypt a file using AES-256",
    "sudo tcpdump -i eth0 -n -s 0 -w capture.pcap # Capture network traffic on interface eth0",
    "hashcat -m 0 -a 0 hash.txt wordlist.txt # Crack MD5 hashes using a wordlist"
];

// Game variables
let currentText = '';
let typedText = '';
let startTime;
let timerInterval;
let timeLeft = 60; // 60 seconds game
let errors = 0;
let totalTyped = 0;
let isGameActive = false;
let currentWordIndex = 0;
let currentCharIndex = 0;
let currentDifficulty = 'easy'; // Default difficulty

// Set difficulty level - exposed globally for the difficulty modal
window.setDifficultyLevel = function(level) {
    currentDifficulty = level;
    console.log('Difficulty set to:', level);
};

// DOM elements
const textDisplay = document.getElementById('text-display');
const typingInput = document.getElementById('typing-input');
const typingPrompt = document.getElementById('typing-prompt');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timeDisplay = document.getElementById('time');
const errorsDisplay = document.getElementById('errors');
const restartBtn = document.getElementById('restart-btn');
const saveBtn = document.getElementById('save-btn');

// Initialize the game
function initGame() {
    // Get random text snippet based on difficulty
    currentText = getRandomText();
    typedText = '';
    errors = 0;
    totalTyped = 0;
    timeLeft = 60;
    isGameActive = false;
    currentWordIndex = 0;
    currentCharIndex = 0;
    
    // Display the text with a typing effect
    displayTextWithEffect();
    
    // Update stats display
    updateStats();
    
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Reset time display
    timeDisplay.textContent = timeLeft + 's';
    
    // Show typing prompt with animation
    typingPrompt.textContent = 'Click here or press any key to focus';
    typingPrompt.style.display = 'block';
    
    // Remove any completion message
    const completionMessage = document.querySelector('.completion-message');
    if (completionMessage) {
        completionMessage.remove();
    }
    
    // Enable input field
    typingInput.disabled = false;
    
    // Focus on input field
    typingInput.value = '';
    typingInput.focus();
}

// Make initGame available globally for the difficulty modal
window.initGame = initGame;

// Get random text from snippets based on difficulty
function getRandomText() {
    switch(currentDifficulty) {
        case 'easy':
            return textSnippets[Math.floor(Math.random() * textSnippets.length)];
        case 'medium':
            // 70% chance for regular, 30% for advanced
            return Math.random() < 0.7 ? 
                textSnippets[Math.floor(Math.random() * textSnippets.length)] :
                advancedSnippets[Math.floor(Math.random() * advancedSnippets.length)];
        case 'hard':
            // 30% chance for regular, 70% for advanced
            return Math.random() < 0.3 ? 
                textSnippets[Math.floor(Math.random() * textSnippets.length)] :
                advancedSnippets[Math.floor(Math.random() * advancedSnippets.length)];
        case 'code':
            return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        default:
            return textSnippets[Math.floor(Math.random() * textSnippets.length)];
    }
}

// Display text with a typing effect
function displayTextWithEffect() {
    textDisplay.innerHTML = '';
    const characters = currentText.split('');
    
    // Create all spans but make them invisible
    characters.forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        charSpan.style.opacity = '0';
        textDisplay.appendChild(charSpan);
    });
    
    // Reveal characters one by one with a slight delay
    const spans = textDisplay.querySelectorAll('span');
    spans.forEach((span, index) => {
        setTimeout(() => {
            span.style.opacity = '1';
        }, index * 15); // 15ms delay between each character
    });
}

// Display text with character formatting
function displayText() {
    textDisplay.innerHTML = '';
    
    // Split text into characters for display
    const characters = currentText.split('');
    
    characters.forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        
        if (index < typedText.length) {
            // Character has been typed
            if (char === typedText[index]) {
                charSpan.classList.add('correct');
            } else {
                charSpan.classList.add('incorrect');
            }
        } else if (index === typedText.length) {
            // Current character to type
            charSpan.classList.add('current');
        }
        
        textDisplay.appendChild(charSpan);
    });
}

// Start the game timer
function startTimer() {
    startTime = new Date();
    isGameActive = true;
    
    // Hide typing prompt with fade out effect
    typingPrompt.classList.add('fade-out');
    setTimeout(() => {
        typingPrompt.style.display = 'none';
        typingPrompt.classList.remove('fade-out');
    }, 300);
    
    // Add active class to monitor
    document.querySelector('.monitor-frame').classList.add('active');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft + 's';
        
        // Add pulse animation when time is running low
        if (timeLeft <= 10) {
            timeDisplay.classList.add('time-warning');
        }
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// End the game
function endGame() {
    isGameActive = false;
    clearInterval(timerInterval);
    typingInput.blur();
    
    // Calculate final stats
    updateStats();
    
    // Calculate final stats for display
    const minutes = (60 - timeLeft) / 60;
    const wpm = Math.round(minutes > 0 ? (typedText.length / 5) / minutes : 0);
    const accuracy = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;
    
    // Show completion message
    const resultMessage = document.createElement('div');
    resultMessage.className = 'completion-message';
    resultMessage.innerHTML = `<h3>Test Complete!</h3><p>You typed at ${wpm} WPM with ${accuracy}% accuracy.</p>`;
    document.querySelector('.monitor-content').appendChild(resultMessage);
    
    // Disable input
    typingInput.disabled = true;
    
    // Show save button if logged in
    if (saveBtn) {
        saveBtn.style.display = 'inline-block';
        saveBtn.classList.add('pulse-animation');
    }
    
    // Remove active class from monitor
    document.querySelector('.monitor-frame').classList.remove('active');
}

// Update game statistics
function updateStats() {
    // Calculate WPM (Words Per Minute)
    // Assuming average word length of 5 characters
    const minutes = (60 - timeLeft) / 60;
    const wpm = Math.round(minutes > 0 ? (typedText.length / 5) / minutes : 0);
    
    // Calculate accuracy
    const accuracy = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;
    
    // Update displays
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy + '%';
    errorsDisplay.textContent = errors;
}

// Handle user input
typingInput.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    
    // Start timer on first input
    if (!isGameActive && inputValue.length > 0) {
        startTimer();
    }
    
    if (isGameActive) {
        // Get the current character to type
        const expectedChar = currentText[typedText.length];
        const typedChar = inputValue[inputValue.length - 1];
        
        // Check if the typed character is correct
        if (typedChar === expectedChar) {
            // Correct character
            typedText += typedChar;
        } else {
            // Incorrect character
            typedText += typedChar;
            errors++;
        }
        
        totalTyped++;
        
        // Update display
        displayText();
        updateStats();
        
        // Clear input field to prepare for next character
        e.target.value = '';
        
        // Check if text is completed
        if (typedText.length >= currentText.length) {
            // Get a new text snippet
            currentText = getRandomText();
            typedText = '';
            displayText();
        }
    }
});

// Focus on typing input when clicking anywhere in the monitor screen
document.querySelector('.monitor-screen').addEventListener('click', () => {
    typingInput.focus();
});

// Handle keyboard focus
document.addEventListener('keydown', (e) => {
    // Don't capture special keys like F5, etc.
    if (e.key.length === 1 || e.key === 'Backspace') {
        typingInput.focus();
    }
});

// Restart button
restartBtn.addEventListener('click', () => {
    initGame();
});

// Save results button (if user is logged in)
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        if (!isGameActive) {
            // Get current stats
            const wpm = parseInt(wpmDisplay.textContent);
            const accuracy = parseInt(accuracyDisplay.textContent);
            
            // Send data to server
            fetch('save_results.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `wpm=${wpm}&accuracy=${accuracy}&errors=${errors}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Results saved successfully!');
                } else {
                    alert('Failed to save results: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while saving results.');
            });
        } else {
            alert('Please finish the current game before saving results.');
        }
    });
}

// Initialize the game when page loads
window.addEventListener('load', initGame);
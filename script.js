// Cybersecurity-themed text samples by topic and difficulty
const textSamples = {
    // Network Security topic
    'network-security': {
        beginner: [
            "A firewall is a network security device that monitors incoming and outgoing traffic.",
            "VPN stands for Virtual Private Network, which creates a secure connection over the internet.",
            "Network segmentation divides a network into multiple segments to improve security and performance.",
            "A DMZ (Demilitarized Zone) is a network area that separates a local area network from untrusted networks.",
            "Port scanning is a technique used to identify open ports and services on a network host."
        ],
        intermediate: [
            "Intrusion Detection Systems (IDS) monitor network traffic for suspicious activity and issue alerts when such activity is discovered.",
            "Network Access Control (NAC) restricts the availability of network resources to endpoint devices that comply with a defined security policy.",
            "A proxy server acts as an intermediary between client applications and servers, filtering requests and providing anonymity.",
            "Software-Defined Networking (SDN) separates the network control plane from the forwarding plane to enable more flexible network management.",
            "Deep Packet Inspection (DPI) examines the data part of a packet as it passes an inspection point, searching for protocol non-compliance or defined criteria."
        ],
        extreme: [
            "Zero Trust Network Access (ZTNA) is a security framework that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter.",
            "BGP (Border Gateway Protocol) hijacking occurs when attackers maliciously reroute Internet traffic by falsely announcing ownership of IP addresses they do not actually own, control, or route to.",
            "DNS Cache Poisoning attacks manipulate the DNS resolver's cache, causing it to return an incorrect IP address and diverting traffic to a malicious website even when the user enters the correct web address.",
            "Advanced evasion techniques (AETs) combine multiple known evasion techniques to create new, dynamic techniques that are not recognized by security devices and thus can deliver malicious payloads without detection.",
            "Side-channel attacks in network security exploit information gained from the physical implementation of a system, such as timing information, power consumption, electromagnetic leaks, or sound to compromise the system."
        ]
    },
    // Cryptography topic
    'cryptography': {
        beginner: [
            "Encryption is the process of encoding information in such a way that only authorized parties can access it.",
            "A cryptographic key is a string of data used to lock or unlock cryptographic functions.",
            "Symmetric encryption uses the same key for both encryption and decryption of data.",
            "Asymmetric encryption uses a pair of keys: a public key for encryption and a private key for decryption.",
            "Hashing is a one-way function that converts data of any size to a fixed-size string."
        ],
        intermediate: [
            "Public Key Infrastructure (PKI) is a framework that enables secure electronic transfer of information using public key cryptography and digital certificates.",
            "Elliptic Curve Cryptography (ECC) is an approach to public-key cryptography based on the algebraic structure of elliptic curves over finite fields.",
            "A digital signature is a mathematical scheme for verifying the authenticity of digital messages or documents.",
            "Transport Layer Security (TLS) is a cryptographic protocol designed to provide communications security over a computer network.",
            "Quantum cryptography uses quantum mechanical properties to perform cryptographic tasks that are impossible with conventional cryptography."
        ],
        extreme: [
            "Post-quantum cryptography refers to cryptographic algorithms that are thought to be secure against an attack by a quantum computer, including lattice-based, hash-based, code-based, multivariate, and supersingular isogeny-based mechanisms.",
            "Homomorphic encryption is a form of encryption that allows computation on ciphertexts, generating an encrypted result which, when decrypted, matches the result of operations performed on the plaintext.",
            "Zero-knowledge proofs are cryptographic methods by which one party can prove to another party that they know a value x, without conveying any information apart from the fact that they know the value x.",
            "Secure Multi-party Computation (MPC) is a subfield of cryptography that enables multiple parties to jointly compute a function over their inputs while keeping those inputs private.",
            "Threshold cryptography is a type of cryptography where the private key is divided into multiple parts, and a minimum number of parts are required to decrypt the data, enhancing security by distributing trust."
        ]
    },
    // Malware Analysis topic
    'malware-analysis': {
        beginner: [
            "Malware is malicious software designed to harm or exploit any programmable device or network.",
            "A virus is a type of malware that attaches itself to clean files and spreads throughout a computer system.",
            "Trojans are malware that disguise themselves as legitimate software to trick users into installing them.",
            "Ransomware is a type of malware that encrypts files and demands payment for the decryption key.",
            "Spyware is software that secretly monitors and collects information about a user's activities."
        ],
        intermediate: [
            "Static analysis examines malware without executing it, looking at characteristics like file headers, strings, and code structure.",
            "Dynamic analysis involves running malware in a controlled environment to observe its behavior and interactions with the system.",
            "Sandboxing is a security mechanism for separating running programs, often used to execute untrusted code or programs from unverified sources.",
            "Obfuscation techniques are used by malware authors to make their code difficult to understand and analyze.",
            "Memory forensics is the analysis of a computer's volatile memory (RAM) to investigate and identify malware or other threats."
        ],
        extreme: [
            "Fileless malware resides entirely in memory rather than on the hard drive, making it difficult to detect with traditional antivirus solutions that scan for malicious files.",
            "Polymorphic malware continuously changes its code to evade detection, using encryption algorithms with different keys for each infection to generate different decryptors.",
            "Advanced persistent threats (APTs) are prolonged and targeted cyberattacks where attackers gain access to a network and remain undetected for an extended period while exfiltrating data or causing damage.",
            "Firmware rootkits target the firmware of devices, such as the BIOS or UEFI, allowing them to persist even after operating system reinstallation and evade most security solutions.",
            "Hardware-based malware exploits vulnerabilities in hardware components like CPUs, creating sophisticated attacks that are extremely difficult to detect and mitigate through software-based security measures."
        ]
    }
};

// Custom prompt storage
let customPrompt = '';

// DOM Elements
const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const timer = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const correctCharsDisplay = document.getElementById('correct-chars');
const wrongCharsDisplay = document.getElementById('wrong-chars');
const themeSelect = document.getElementById('theme');
const timeSelect = document.getElementById('time');
const difficultySelect = document.getElementById('difficulty');
const topicSelect = document.getElementById('topic');
const aboutLink = document.getElementById('about-link');
const aboutModal = document.getElementById('about-modal');
const closeModal = document.querySelector('.close');
const builtInPromptRadio = document.getElementById('built-in-prompt');
const customPromptRadio = document.getElementById('custom-prompt');
const customPromptContainer = document.getElementById('custom-prompt-container');
const customPromptInput = document.getElementById('custom-prompt-input');
const promptPreviewText = document.getElementById('prompt-preview-text');
const progressBar = document.getElementById('progress-bar');
const currentWpmDisplay = document.getElementById('current-wpm');
const currentAccuracyDisplay = document.getElementById('current-accuracy');
const currentErrorsDisplay = document.getElementById('current-errors');

// Variables
let currentText = '';
let timeLeft = 60;
let timer_interval;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let correctChars = 0;
let wrongChars = 0;
let startTime;
let isCustomPrompt = false;
let metrics_interval;

// Initialize
function init() {
    // Set up event listeners
    startBtn.addEventListener('click', startTest);
    resetBtn.addEventListener('click', resetTest);
    textInput.addEventListener('input', checkTyping);
    themeSelect.addEventListener('change', changeTheme);
    topicSelect.addEventListener('change', updatePromptPreview);
    difficultySelect.addEventListener('change', updatePromptPreview);
    builtInPromptRadio.addEventListener('change', togglePromptType);
    customPromptRadio.addEventListener('change', togglePromptType);
    customPromptInput.addEventListener('input', validateCustomPrompt);
    aboutLink?.addEventListener('click', openModal);
    closeModal?.addEventListener('click', closeModalFunc);
    window.addEventListener('click', outsideClick);

    // Load saved settings from localStorage
    loadSavedSettings();

    // Set initial theme
    changeTheme();

    // Load a random text sample and update preview
    updatePromptPreview();

    // Set initial app state
    setAppState('ready');
}

// Load saved settings from localStorage
function loadSavedSettings() {
    if (localStorage.getItem('cybertype-settings')) {
        const settings = JSON.parse(localStorage.getItem('cybertype-settings'));
        
        if (settings.topic) topicSelect.value = settings.topic;
        if (settings.difficulty) difficultySelect.value = settings.difficulty;
        if (settings.time) timeSelect.value = settings.time;
        if (settings.theme) themeSelect.value = settings.theme;
    }
}

// Save current settings to localStorage
function saveSettings() {
    const settings = {
        topic: topicSelect.value,
        difficulty: difficultySelect.value,
        time: timeSelect.value,
        theme: themeSelect.value
    };
    
    localStorage.setItem('cybertype-settings', JSON.stringify(settings));
}

// Toggle between built-in and custom prompts
function togglePromptType() {
    isCustomPrompt = customPromptRadio.checked;
    customPromptContainer.style.display = isCustomPrompt ? 'block' : 'none';
    updatePromptPreview();
}

// Validate custom prompt
function validateCustomPrompt() {
    const text = customPromptInput.value.trim();
    customPrompt = text;
    
    if (text.length < 10) {
        promptPreviewText.innerHTML = '<span class="error">Custom text must be at least 10 characters long</span>';
        startBtn.disabled = true;
    } else {
        updatePromptPreview();
        startBtn.disabled = false;
    }
}

// Update the prompt preview
function updatePromptPreview() {
    if (isCustomPrompt) {
        // Show custom prompt preview
        if (customPrompt.length >= 10) {
            const previewText = customPrompt.length > 300 ? 
                customPrompt.substring(0, 300) + '...' : customPrompt;
            promptPreviewText.textContent = previewText;
            startBtn.disabled = false;
        } else {
            promptPreviewText.innerHTML = '<span class="error">Custom text must be at least 10 characters long</span>';
            startBtn.disabled = true;
        }
    } else {
        // Show built-in prompt preview
        loadTextSample(true);
        const previewText = currentText.length > 300 ? 
            currentText.substring(0, 300) + '...' : currentText;
        promptPreviewText.textContent = previewText;
        startBtn.disabled = false;
    }
    
    // Save current settings
    saveSettings();
}

// Set application state
function setAppState(state) {
    const settingsContainer = document.querySelector('.settings-container');
    const promptPreview = document.querySelector('.prompt-preview');
    const testContainer = document.querySelector('.test-container');
    const resultsSection = document.getElementById('results');
    
    switch (state) {
        case 'ready':
            settingsContainer.style.display = 'block';
            promptPreview.style.display = 'block';
            testContainer.style.display = 'block';
            resultsSection.style.display = 'none';
            progressBar.style.width = '0%';
            currentWpmDisplay.textContent = '0';
            currentAccuracyDisplay.textContent = '0%';
            currentErrorsDisplay.textContent = '0';
            break;
            
        case 'running':
            settingsContainer.style.display = 'none';
            promptPreview.style.display = 'none';
            testContainer.style.display = 'block';
            resultsSection.style.display = 'none';
            break;
            
        case 'finished':
            settingsContainer.style.display = 'none';
            promptPreview.style.display = 'none';
            testContainer.style.display = 'none';
            resultsSection.style.display = 'block';
            break;
    }
}

// Load a random text sample based on topic and difficulty
function loadTextSample(previewOnly = false) {
    const topic = topicSelect.value;
    const difficulty = difficultySelect.value;
    
    if (isCustomPrompt && !previewOnly) {
        currentText = customPrompt;
    } else {
        // Get a random sample from the selected topic and difficulty
        const samples = textSamples[topic][difficulty];
        const randomIndex = Math.floor(Math.random() * samples.length);
        currentText = samples[randomIndex];
    }
    
    if (!previewOnly) {
        // Display the text for typing
        textDisplay.innerHTML = '';
        currentText.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.innerText = char;
            textDisplay.appendChild(charSpan);
        });

        // Highlight the first character
        if (textDisplay.childNodes.length > 0) {
            textDisplay.childNodes[0].classList.add('current');
        }
    }
    
    return currentText;
}

// Start the typing test
function startTest() {
    resetTest();
    setAppState('running');
    textInput.disabled = false;
    textInput.focus();
    
    // Load the selected text sample
    loadTextSample();
    
    // Set time based on selection
    timeLeft = parseInt(timeSelect.value);
    timer.innerText = timeLeft;
    
    // Record start time
    startTime = new Date();
    
    // Start the timer and metrics update
    timer_interval = setInterval(updateTimer, 1000);
    metrics_interval = setInterval(updateMetrics, 200);
    
    // Disable start button, enable reset button
    startBtn.disabled = true;
    resetBtn.disabled = false;
    
    // Initialize typing state
    isTyping = true;
    charIndex = 0;
    mistakes = 0;
    correctChars = 0;
    wrongChars = 0;
}

// Update the timer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timer.innerText = timeLeft;
        
        // Update progress bar
        const totalTime = parseInt(timeSelect.value);
        const progress = ((totalTime - timeLeft) / totalTime) * 100;
        progressBar.style.width = `${progress}%`;
    } else {
        finishTest();
    }
}

// Update real-time metrics
function updateMetrics() {
    if (!isTyping) return;
    
    // Calculate elapsed time in minutes
    const elapsedTime = (new Date() - startTime) / 60000;
    
    // Calculate current WPM
    const wpm = Math.round((charIndex / 5) / (elapsedTime || 0.001));
    currentWpmDisplay.textContent = wpm;
    
    // Calculate current accuracy
    const accuracy = charIndex > 0 ? Math.round(((charIndex - mistakes) / charIndex) * 100) : 100;
    currentAccuracyDisplay.textContent = `${accuracy}%`;
    
    // Update error count
    currentErrorsDisplay.textContent = mistakes;
    
    // Update progress based on characters typed
    if (currentText.length > 0) {
        const progress = (charIndex / currentText.length) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
}

// Check typing input
function checkTyping() {
    if (!isTyping) return;
    
    // Start timer on first keystroke if not already started
    if (!timer_interval) {
        startTime = new Date();
        timer_interval = setInterval(updateTimer, 1000);
        metrics_interval = setInterval(updateMetrics, 200);
    }
    
    const inputVal = textInput.value;
    const typedChar = inputVal.charAt(inputVal.length - 1);
    
    // Handle backspace
    if (inputVal.length < charIndex) {
        // User pressed backspace, adjust the character index
        if (textDisplay.childNodes[charIndex]) {
            textDisplay.childNodes[charIndex].classList.remove('current');
        }
        
        charIndex = inputVal.length;
        
        // Remove any class from the current character and add 'current'
        if (textDisplay.childNodes[charIndex]) {
            const currentCharSpan = textDisplay.childNodes[charIndex];
            currentCharSpan.classList.remove('correct', 'wrong');
            currentCharSpan.classList.add('current');
            
            // Adjust the character counts
            if (currentCharSpan.classList.contains('correct')) {
                correctChars--;
            } else if (currentCharSpan.classList.contains('wrong')) {
                wrongChars--;
                mistakes--;
            }
        }
        
        return;
    }
    
    // Normal typing flow
    const currentChar = currentText.charAt(charIndex);
    
    if (charIndex < currentText.length) {
        // Remove current class from current character
        if (textDisplay.childNodes[charIndex]) {
            textDisplay.childNodes[charIndex].classList.remove('current');
        }
        
        // Check if typed character matches current character
        if (typedChar === currentChar) {
            textDisplay.childNodes[charIndex].classList.add('correct');
            correctChars++;
        } else {
            textDisplay.childNodes[charIndex].classList.add('wrong');
            mistakes++;
            wrongChars++;
        }
        
        // Move to next character
        charIndex++;
        
        // Add current class to next character
        if (charIndex < currentText.length) {
            textDisplay.childNodes[charIndex].classList.add('current');
        } else {
            // Reached the end of the text
            finishTest();
            return;
        }
    }
    
    // Update metrics in real-time
    updateMetrics();
}

// Finish the typing test
function finishTest() {
    clearInterval(timer_interval);
    clearInterval(metrics_interval);
    textInput.disabled = true;
    isTyping = false;
    
    // Calculate final results
    calculateResults();
    
    // Change app state to finished
    setAppState('finished');
    
    // Enable start button for retry
    startBtn.disabled = false;
    resetBtn.disabled = false;
}

// Calculate and display results
function calculateResults() {
    const timeSpent = parseInt(timeSelect.value) - timeLeft;
    const totalChars = charIndex;
    
    // Calculate WPM: (characters typed / 5) / time in minutes
    const timeInMinutes = timeSpent / 60;
    const wpm = Math.round((totalChars / 5) / (timeInMinutes || 0.001)); // Avoid division by zero
    
    // Calculate accuracy
    const accuracy = totalChars > 0 ? Math.round(((totalChars - mistakes) / totalChars) * 100) : 0;
    
    // Display results
    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy + '%';
    correctCharsDisplay.innerText = correctChars;
    wrongCharsDisplay.innerText = wrongChars;
}

// Reset the typing test
function resetTest() {
    clearInterval(timer_interval);
    clearInterval(metrics_interval);
    timer_interval = null;
    metrics_interval = null;
    
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    correctChars = 0;
    wrongChars = 0;
    textInput.value = '';
    textInput.disabled = true;
    
    // Reset timer display
    timeLeft = parseInt(timeSelect.value);
    timer.innerText = timeLeft;
    
    // Reset progress bar
    progressBar.style.width = '0%';
    
    // Reset real-time metrics
    currentWpmDisplay.textContent = '0';
    currentAccuracyDisplay.textContent = '0%';
    currentErrorsDisplay.textContent = '0';
    
    // Reset results
    wpmDisplay.innerText = '0';
    accuracyDisplay.innerText = '0%';
    correctCharsDisplay.innerText = '0';
    wrongCharsDisplay.innerText = '0';
    
    // Load a new text sample
    updatePromptPreview();
    
    // Reset buttons
    startBtn.disabled = false;
    resetBtn.disabled = true;
    
    // Set app state to ready
    setAppState('ready');
}

// Change theme
function changeTheme() {
    const theme = themeSelect.value;
    document.body.className = theme;
}

// Modal functions
function openModal(e) {
    e.preventDefault();
    aboutModal.style.display = 'block';
}

function closeModalFunc() {
    aboutModal.style.display = 'none';
}

function outsideClick(e) {
    if (e.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
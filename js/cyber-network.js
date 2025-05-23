/**
 * Cybersecurity Network Constellation Animation
 * Creates an interactive network visualization with nodes and connections
 * that resembles a cybersecurity-themed constellation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element for the animation
    const canvas = document.createElement('canvas');
    canvas.id = 'cyber-network';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    // Set canvas size to match window
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Configuration
    const config = {
        nodeCount: 80,                    // Number of nodes
        connectionDistance: 150,          // Maximum distance for connections
        nodeSize: { min: 1, max: 3 },     // Node size range
        nodeColor: '#0084ff',            // Node color (blue)
        lineColor: 'rgba(0, 132, 255, 0.2)', // Line color (blue, transparent)
        speed: { min: 0.1, max: 0.5 },    // Movement speed range
        pulseSpeed: 0.02,                // Pulse animation speed
        highlightChance: 0.1,            // Chance of a node being highlighted
        highlightColor: '#00a8ff'         // Highlight color (brighter blue)
    };

    // Node class
    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (config.nodeSize.max - config.nodeSize.min) + config.nodeSize.min;
            this.speedX = (Math.random() * (config.speed.max - config.speed.min) + config.speed.min) * (Math.random() > 0.5 ? 1 : -1);
            this.speedY = (Math.random() * (config.speed.max - config.speed.min) + config.speed.min) * (Math.random() > 0.5 ? 1 : -1);
            this.highlighted = Math.random() < config.highlightChance;
            this.pulseValue = Math.random() * Math.PI * 2; // Random start for pulse
            this.connections = [];
        }

        update() {
            // Move node
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Update pulse animation
            this.pulseValue += config.pulseSpeed;
            if (this.pulseValue > Math.PI * 2) this.pulseValue = 0;
        }

        draw() {
            // Calculate pulse effect (size oscillation)
            const pulseEffect = Math.sin(this.pulseValue) * 0.5 + 1;
            const currentSize = this.size * pulseEffect;

            // Draw node
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = this.highlighted ? config.highlightColor : config.nodeColor;
            ctx.fill();

            // Draw connections
            this.connections.forEach(node => {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(node.x, node.y);
                ctx.strokeStyle = config.lineColor;
                ctx.stroke();
            });
        }
    }

    // Create nodes
    const nodes = [];
    for (let i = 0; i < config.nodeCount; i++) {
        nodes.push(new Node());
    }

    // Calculate connections between nodes
    function calculateConnections() {
        nodes.forEach(node => {
            node.connections = [];
            nodes.forEach(otherNode => {
                if (node !== otherNode) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < config.connectionDistance) {
                        node.connections.push(otherNode);
                    }
                }
            });
        });
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        // Recalculate connections periodically
        if (Math.random() < 0.05) calculateConnections();

        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        calculateConnections();
    });

    // Initial connection calculation
    calculateConnections();

    // Start animation
    animate();
});
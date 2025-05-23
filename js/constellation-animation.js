/**
 * Enhanced Cybersecurity Constellation Animation
 * Creates an interactive network visualization with nodes and connections
 * that resembles a cybersecurity-themed constellation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element for the animation if it doesn't exist
    let canvas = document.getElementById('cyber-constellation');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'cyber-constellation';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);
    }

    // Set canvas size to match window
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Configuration
    const config = {
        nodeCount: 100,                   // Increased number of nodes
        connectionDistance: 180,          // Maximum distance for connections
        nodeSize: { min: 1, max: 4 },     // Node size range
        nodeColor: '#0084ff',            // Node color (blue)
        lineColor: 'rgba(0, 132, 255, 0.2)', // Line color (blue, transparent)
        speed: { min: 0.1, max: 0.4 },    // Movement speed range
        pulseSpeed: 0.02,                // Pulse animation speed
        highlightChance: 0.15,           // Chance of a node being highlighted
        highlightColor: '#00a8ff',        // Highlight color (brighter blue)
        dataPackets: true,               // Enable data packet animation
        packetCount: 15,                 // Number of data packets
        packetSpeed: { min: 1, max: 3 }   // Packet speed range
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
            this.securityLevel = Math.random(); // Random security level for visual effect
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
            
            // Color based on security level and highlight status
            if (this.highlighted) {
                ctx.fillStyle = config.highlightColor;
                // Add glow effect for highlighted nodes
                ctx.shadowBlur = 15;
                ctx.shadowColor = config.highlightColor;
            } else {
                ctx.fillStyle = config.nodeColor;
                ctx.shadowBlur = 0;
            }
            
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow

            // Draw connections
            this.connections.forEach(node => {
                const distance = Math.sqrt(Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2));
                const opacity = 1 - (distance / config.connectionDistance);
                
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(node.x, node.y);
                ctx.strokeStyle = `rgba(0, 132, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            });
        }
    }

    // Data Packet class for animated data transfer visualization
    class DataPacket {
        constructor() {
            // Select two random connected nodes
            const sourceNodeIndex = Math.floor(Math.random() * nodes.length);
            this.sourceNode = nodes[sourceNodeIndex];
            
            if (this.sourceNode.connections.length > 0) {
                this.targetNode = this.sourceNode.connections[Math.floor(Math.random() * this.sourceNode.connections.length)];
                this.x = this.sourceNode.x;
                this.y = this.sourceNode.y;
                this.active = true;
                this.progress = 0;
                this.speed = Math.random() * (config.packetSpeed.max - config.packetSpeed.min) + config.packetSpeed.min;
                this.size = 2;
                this.color = Math.random() > 0.8 ? '#ff3860' : '#0084ff'; // Occasionally red for 'threat' packets
            } else {
                this.active = false;
            }
        }

        update() {
            if (!this.active) return;
            
            this.progress += 0.01 * this.speed;
            
            if (this.progress >= 1) {
                // Reached destination, reset to a new path
                this.reset();
                return;
            }
            
            // Linear interpolation between source and target
            this.x = this.sourceNode.x + (this.targetNode.x - this.sourceNode.x) * this.progress;
            this.y = this.sourceNode.y + (this.targetNode.y - this.sourceNode.y) * this.progress;
        }

        draw() {
            if (!this.active) return;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        reset() {
            // Select a new random path
            const sourceNodeIndex = Math.floor(Math.random() * nodes.length);
            this.sourceNode = nodes[sourceNodeIndex];
            
            if (this.sourceNode.connections.length > 0) {
                this.targetNode = this.sourceNode.connections[Math.floor(Math.random() * this.sourceNode.connections.length)];
                this.x = this.sourceNode.x;
                this.y = this.sourceNode.y;
                this.active = true;
                this.progress = 0;
                this.speed = Math.random() * (config.packetSpeed.max - config.packetSpeed.min) + config.packetSpeed.min;
                this.color = Math.random() > 0.8 ? '#ff3860' : '#0084ff';
            } else {
                this.active = false;
            }
        }
    }

    // Create nodes
    const nodes = [];
    for (let i = 0; i < config.nodeCount; i++) {
        nodes.push(new Node());
    }

    // Create data packets
    const packets = [];
    if (config.dataPackets) {
        for (let i = 0; i < config.packetCount; i++) {
            packets.push(new DataPacket());
        }
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

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;

    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseActive = true;
        
        // Reset timeout to turn off mouse activity
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            mouseActive = false;
        }, 2000);
    });

    let mouseTimeout;

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
            node.draw();
            
            // Mouse interaction - attract nodes slightly
            if (mouseActive) {
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    const force = 0.2 * (1 - distance / 200);
                    node.x += dx * force * 0.01;
                    node.y += dy * force * 0.01;
                }
            }
        });

        // Update and draw data packets
        if (config.dataPackets) {
            packets.forEach(packet => {
                packet.update();
                packet.draw();
            });
        }

        // Recalculate connections periodically
        if (Math.random() < 0.01) { // 1% chance each frame
            calculateConnections();
        }

        // Continue animation loop
        requestAnimationFrame(animate);
    }

    // Initial connection calculation
    calculateConnections();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start animation
    animate();
});
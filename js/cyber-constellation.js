/**
 * Advanced Cybersecurity Constellation Animation
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
        nodeCount: 150,                   // Increased number of nodes
        connectionDistance: 200,          // Maximum distance for connections
        nodeSize: { min: 1, max: 4 },     // Node size range
        nodeColor: '#0084ff',            // Node color (blue)
        lineColor: 'rgba(0, 132, 255, 0.2)', // Line color (blue, transparent)
        speed: { min: 0.1, max: 0.3 },    // Movement speed range
        pulseSpeed: 0.02,                // Pulse animation speed
        highlightChance: 0.15,           // Chance of a node being highlighted
        highlightColor: '#00a8ff',        // Highlight color (brighter blue)
        dataPackets: true,               // Enable data packet animation
        packetCount: 20,                 // Number of data packets
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
        }
    }

    // Data Packet class for animated packets traveling between nodes
    class DataPacket {
        constructor() {
            // Select random source and destination nodes
            this.sourceIndex = Math.floor(Math.random() * nodes.length);
            let destIndex;
            do {
                destIndex = Math.floor(Math.random() * nodes.length);
            } while (destIndex === this.sourceIndex);
            this.destIndex = destIndex;
            
            // Set starting position at source node
            this.x = nodes[this.sourceIndex].x;
            this.y = nodes[this.sourceIndex].y;
            
            // Calculate direction vector
            this.progress = 0;
            this.speed = Math.random() * (config.packetSpeed.max - config.packetSpeed.min) + config.packetSpeed.min;
            this.size = 2;
            this.color = Math.random() > 0.8 ? '#ff2d55' : '#0084ff'; // Occasionally red for 'threat' packets
            this.completed = false;
        }

        update() {
            if (this.completed) return;
            
            // Update progress along path
            this.progress += this.speed / 100;
            
            if (this.progress >= 1) {
                this.completed = true;
                return;
            }
            
            // Calculate current position along the path
            const sourceNode = nodes[this.sourceIndex];
            const destNode = nodes[this.destIndex];
            
            this.x = sourceNode.x + (destNode.x - sourceNode.x) * this.progress;
            this.y = sourceNode.y + (destNode.y - sourceNode.y) * this.progress;
        }

        draw() {
            if (this.completed) return;
            
            // Draw packet
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        reset() {
            // Select new source and destination nodes
            this.sourceIndex = Math.floor(Math.random() * nodes.length);
            let destIndex;
            do {
                destIndex = Math.floor(Math.random() * nodes.length);
            } while (destIndex === this.sourceIndex);
            this.destIndex = destIndex;
            
            // Reset position and progress
            this.x = nodes[this.sourceIndex].x;
            this.y = nodes[this.sourceIndex].y;
            this.progress = 0;
            this.completed = false;
            this.color = Math.random() > 0.8 ? '#ff2d55' : '#0084ff';
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
                if (node === otherNode) return;
                
                const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2));
                if (distance < config.connectionDistance) {
                    node.connections.push(otherNode);
                }
            });
        });
    }

    // Draw connections between nodes
    function drawConnections() {
        nodes.forEach(node => {
            node.connections.forEach(connectedNode => {
                const distance = Math.sqrt(Math.pow(node.x - connectedNode.x, 2) + Math.pow(node.y - connectedNode.y, 2));
                const opacity = 1 - (distance / config.connectionDistance);
                
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(connectedNode.x, connectedNode.y);
                ctx.strokeStyle = `rgba(0, 132, 255, ${opacity * 0.2})`;
                ctx.lineWidth = opacity * 1.5;
                ctx.stroke();
            });
        });
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;

    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        mouseActive = true;
    });

    canvas.addEventListener('mouseout', function() {
        mouseActive = false;
    });

    // Draw mouse connections
    function drawMouseConnections() {
        if (!mouseActive) return;
        
        nodes.forEach(node => {
            const distance = Math.sqrt(Math.pow(node.x - mouseX, 2) + Math.pow(node.y - mouseY, 2));
            if (distance < config.connectionDistance * 1.5) {
                const opacity = 1 - (distance / (config.connectionDistance * 1.5));
                
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(0, 168, 255, ${opacity * 0.5})`;
                ctx.lineWidth = opacity * 2;
                ctx.stroke();
            }
        });
    }

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
        });
        
        // Recalculate connections periodically
        if (Math.random() < 0.05) { // 5% chance each frame
            calculateConnections();
        }
        
        // Draw connections
        drawConnections();
        
        // Draw nodes on top of connections
        nodes.forEach(node => {
            node.draw();
        });
        
        // Update and draw data packets
        if (config.dataPackets) {
            packets.forEach(packet => {
                packet.update();
                packet.draw();
                
                if (packet.completed) {
                    packet.reset();
                }
            });
        }
        
        // Draw mouse connections
        drawMouseConnections();
        
        // Continue animation loop
        requestAnimationFrame(animate);
    }

    // Initial connection calculation
    calculateConnections();
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        calculateConnections();
    });
});
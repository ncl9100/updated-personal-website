// Skills bubbles functionality
function initializeSkillsBubbles() {
    const bubbles = document.querySelectorAll('.skill-bubble');
    const container = document.querySelector('.skills-container');
    
    // Bubble physics properties
    const bubbleData = [];
    
    bubbles.forEach((bubble, index) => {
        // Random initial position
        const randomX = Math.random() * (container.offsetWidth - 150);
        const randomY = Math.random() * (container.offsetHeight - 60);
        
        // Random velocity for each bubble
        const velocityX = (Math.random() - 0.5) * 2; // -1 to 1
        const velocityY = (Math.random() - 0.5) * 2; // -1 to 1
        
        bubble.style.left = randomX + 'px';
        bubble.style.top = randomY + 'px';
        
        // Store bubble data for animation
        bubbleData.push({
            element: bubble,
            x: randomX,
            y: randomY,
            vx: velocityX,
            vy: velocityY,
            width: 150,
            height: 60
        });
        
        // Click to pop functionality
        bubble.addEventListener('click', function() {
            if (!this.classList.contains('popping')) {
                this.classList.add('popping');
                
                // Regenerate bubble after pop animation
                setTimeout(() => {
                    this.classList.add('hidden');
                    setTimeout(() => {
                        this.classList.remove('popping', 'hidden');
                        // Reset position and velocity
                        const newX = Math.random() * (container.offsetWidth - 150);
                        const newY = Math.random() * (container.offsetHeight - 60);
                        const newVX = (Math.random() - 0.5) * 2;
                        const newVY = (Math.random() - 0.5) * 2;
                        
                        this.style.left = newX + 'px';
                        this.style.top = newY + 'px';
                        
                        // Update bubble data
                        const bubbleIndex = bubbleData.findIndex(b => b.element === this);
                        if (bubbleIndex !== -1) {
                            bubbleData[bubbleIndex].x = newX;
                            bubbleData[bubbleIndex].y = newY;
                            bubbleData[bubbleIndex].vx = newVX;
                            bubbleData[bubbleIndex].vy = newVY;
                        }
                    }, 500);
                }, 500);
            }
        });
    });
    
    // Animation loop for bouncing bubbles
    function animateBubbles() {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        
        bubbleData.forEach(bubble => {
            if (!bubble.element.classList.contains('popping') && !bubble.element.classList.contains('hidden')) {
                // Update position
                bubble.x += bubble.vx;
                bubble.y += bubble.vy;
                
                // Bounce off walls
                if (bubble.x <= 0 || bubble.x >= containerWidth - bubble.width) {
                    bubble.vx = -bubble.vx;
                    bubble.x = Math.max(0, Math.min(containerWidth - bubble.width, bubble.x));
                }
                
                if (bubble.y <= 0 || bubble.y >= containerHeight - bubble.height) {
                    bubble.vy = -bubble.vy;
                    bubble.y = Math.max(0, Math.min(containerHeight - bubble.height, bubble.y));
                }
                
                // Apply position
                bubble.element.style.left = bubble.x + 'px';
                bubble.element.style.top = bubble.y + 'px';
                
                // Add slight rotation based on movement
                const rotation = (bubble.vx * 5) % 360;
                bubble.element.style.transform = `rotate(${rotation}deg)`;
            }
        });
        
        requestAnimationFrame(animateBubbles);
    }
    
    // Start the animation
    animateBubbles();
}

// Export for use in main script
window.initializeSkillsBubbles = initializeSkillsBubbles;

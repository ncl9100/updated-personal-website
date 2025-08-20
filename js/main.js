// Main script to initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Start the typewriter animation
    if (window.typeWriter) {
        window.typeWriter();
    }
    
    // Initialize the skills bubbles
    if (window.initializeSkillsBubbles) {
        window.initializeSkillsBubbles();
    }
});

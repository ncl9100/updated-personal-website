// Typewriter functionality for multiple pages
let typewriterInstances = [];

function initializeTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter-text');
    
    typewriterElements.forEach((element, elementIndex) => {
        // Different texts for different pages
        let text;
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
            text = "I'm Nathan, a computer science and data science student at NYU with a passion for full-stack development and machine learning. I am currently a sophomore at NYU, and I'm excited to share my journey with you!";
        } else if (currentPage.includes('hobbies.html')) {
            text = "When I'm not pulling all nighters in Bobst, you can find me doing these activities!";
        } else {
            // Default text for other pages
            text = "Welcome to my website!";
        }
        
        const instance = {
            element: element,
            text: text,
            index: 0,
            isDeleting: false
        };
        
        typewriterInstances.push(instance);
        animateTypewriter(instance);
    });
}

function animateTypewriter(instance) {
    const currentText = instance.text.substring(0, instance.index);
    instance.element.textContent = currentText;
    
    if (!instance.isDeleting && instance.index < instance.text.length) {
        // Typing
        instance.index++;
        setTimeout(() => animateTypewriter(instance), 50); // Speed of typing
    } else if (instance.isDeleting && instance.index > 0) {
        // Deleting
        instance.index--;
        setTimeout(() => animateTypewriter(instance), 30); // Speed of deleting
    } else {
        // Switch direction
        instance.isDeleting = !instance.isDeleting;
        setTimeout(() => animateTypewriter(instance), 1000); // Pause at start/end
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriter();
});

// Legacy function for backward compatibility
function typeWriter() {
    // This maintains compatibility with the old single-instance approach
    const typewriterText = document.querySelector('.typewriter-text');
    if (typewriterText && typewriterInstances.length === 0) {
        const text = "I'm Nathan, a computer science and data science student at NYU with a passion for full-stack development and machine learning. I am currently a sophomore at NYU, and I'm excited to share my journey with you!";
        const instance = {
            element: typewriterText,
            text: text,
            index: 0,
            isDeleting: false
        };
        typewriterInstances.push(instance);
        animateTypewriter(instance);
    }
}

// Export for use in main script
window.typeWriter = typeWriter;

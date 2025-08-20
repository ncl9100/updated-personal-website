// Slideshow functionality
let currentSlideIndex = 0;
let slideInterval;
let isPaused = false;

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (slides.length > 0) {
        showSlide(currentSlideIndex);
        startAutoSlide();
        setupEventListeners();
    }
});

// Show specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Remove active class from all thumbnails
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // Activate current dot
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    // Activate current thumbnail
    if (thumbnails[index]) {
        thumbnails[index].classList.add('active');
    }
    
    currentSlideIndex = index;
}

// Change slide by direction (-1 for previous, 1 for next)
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    let newIndex = currentSlideIndex + direction;
    
    // Loop around
    if (newIndex >= slides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    
    showSlide(newIndex);
    resetAutoSlide();
}

// Go to specific slide
function currentSlide(index) {
    showSlide(index - 1); // Convert to 0-based index
    resetAutoSlide();
}

// Start auto-rotation
function startAutoSlide() {
    slideInterval = setInterval(() => {
        if (!isPaused) {
            changeSlide(1);
        }
    }, 4000); // Change slide every 4 seconds
}

// Reset auto-rotation timer
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Setup event listeners for pause on hover
function setupEventListeners() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slideshowContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slideshowContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                changeSlide(1);
            } else {
                // Swipe right - previous slide
                changeSlide(-1);
            }
        }
    }
}

// Make functions globally accessible
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;

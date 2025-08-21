document.addEventListener("DOMContentLoaded", () => {
  // --- Form Validation Logic ---
  const form = document.getElementById("homeSearchForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      const location = form.location.value.trim();
      if (location.length > 120) {
        e.preventDefault();
        // A non-blocking notification is better than alert()
        console.warn("Location input is too long.");
      }
    });
  }

  // --- NEW: Image Slider Logic ---
  const sliderWrapper = document.querySelector('.slider-wrapper');
  if (sliderWrapper) {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let slideInterval;

    const showSlide = (index) => {
      // Ensure index is within bounds
      if (index >= slides.length) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = slides.length - 1;
      } else {
        currentIndex = index;
      }

      // Remove active class from all slides
      slides.forEach(slide => slide.classList.remove('active'));
      // Add active class to the current slide
      slides[currentIndex].classList.add('active');
    };

    const nextSlide = () => {
      showSlide(currentIndex + 1);
    };

    const prevSlide = () => {
      showSlide(currentIndex - 1);
    };

    // Start automatic sliding
    const startSlider = () => {
      slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    };

    // Stop automatic sliding (e.g., on hover or manual navigation)
    const stopSlider = () => {
      clearInterval(slideInterval);
    };

    // Event Listeners for buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlider(); // Stop auto-play on manual click
        startSlider(); // Restart timer
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlider(); // Stop auto-play on manual click
        startSlider(); // Restart timer
      });
    }
    
    // Initialize slider
    showSlide(currentIndex);
    startSlider();
  }
});

/* 
========================================================================
   ONE8 ELECTRICAL SOLUTIONS - Animations & Dynamic Text Effects
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing Effect (Hero Tagline)
  const typingTarget = document.getElementById('typing-text');
  if (typingTarget) {
    const textArray = [
      "Professional Electrical Services with Quality, Safety & Trust.",
      "Reliable Residential, Commercial & Industrial Solutions.",
      "Custom Panel Design, Solar Panel Setup & Energy Audits.",
      "Delivering Safe, Reliable, and Smart Automation Systems."
    ];
    let arrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;
    let delayBetweenLines = 2000;

    function type() {
      const currentSentence = textArray[arrayIndex];
      if (isDeleting) {
        typingTarget.textContent = currentSentence.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30; // Faster deleting speed
      } else {
        typingTarget.textContent = currentSentence.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 60; // Normal typing speed
      }

      if (!isDeleting && charIndex === currentSentence.length) {
        isDeleting = true;
        typingSpeed = delayBetweenLines; // Wait before starting delete
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        arrayIndex = (arrayIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before typing next line
      }

      setTimeout(type, typingSpeed);
    }
    
    // Start the typing loop
    setTimeout(type, 1000);
  }

  // 2. Statistics Counter Animation
  const statNumbers = document.querySelectorAll('.stat-num');
  
  if (statNumbers.length > 0) {
    const runCounters = () => {
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const duration = 2000; // Animation duration in ms
        const increment = target / (duration / 16); // 60 FPS
        
        let currentValue = 0;
        const updateCount = () => {
          currentValue += increment;
          if (currentValue < target) {
            stat.textContent = Math.ceil(currentValue);
            requestAnimationFrame(updateCount);
          } else {
            stat.textContent = target;
          }
        };
        updateCount();
      });
    };

    // Trigger count animation when scrolled into viewport
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounters();
            obs.unobserve(entry.target); // Trigger only once
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(statsSection);
    }
  }

  // 3. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 50
    });
  }
});

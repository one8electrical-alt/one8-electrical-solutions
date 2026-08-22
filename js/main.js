/* 
========================================================================
   ONE8 ELECTRICAL SOLUTIONS - Main Global Interactions Script
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Loader Screen Handler
  const loader = document.getElementById('loading-screen');
  const loaderBarFill = document.querySelector('.loader-bar-fill');

  // Fast load simulation fallback just in case window.load takes too long
  let loadProgress = 0;
  const progressInterval = setInterval(() => {
    if (loadProgress < 90) {
      loadProgress += Math.random() * 15;
      if (loadProgress > 90) loadProgress = 90;
      if (loaderBarFill) loaderBarFill.style.width = `${loadProgress}%`;
    }
  }, 100);

  window.addEventListener('load', () => {
    clearInterval(progressInterval);
    if (loaderBarFill) loaderBarFill.style.width = '100%';
    
    setTimeout(() => {
      if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    }, 400);
  });

  // 2. Sticky Navbar & Progress Indicator on Scroll
  const headerWrapper = document.querySelector('.header-wrapper');
  const backToTopBtn = document.querySelector('.float-back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerWrapper.classList.add('scrolled');
    } else {
      headerWrapper.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      if (backToTopBtn) backToTopBtn.classList.add('show');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('show');
    }
  });

  // Back to Top action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Hamburger Menu Drawer Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const icon = hamburger.querySelector('i');
      navMenu.classList.toggle('active');
      
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // If it's a mobile dropdown parent link, toggle the accordion instead of closing menu
        if (window.innerWidth <= 992 && link.parentElement.classList.contains('nav-item-dropdown')) {
          e.preventDefault();
          const parentItem = link.parentElement;
          parentItem.classList.toggle('active');
        } else {
          navMenu.classList.remove('active');
          const icon = hamburger.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  // 4. Dark/Light Mode Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Retrieve existing user setting
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      let theme = 'light';
      if (document.body.classList.contains('dark-mode')) {
        theme = 'dark';
        if (themeIcon) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        }
      } else {
        if (themeIcon) {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
      }
      localStorage.setItem('theme', theme);
    });
  }

  // 5. Active Link Highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuItems = document.querySelectorAll('.nav-menu .nav-item');
  
  menuItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    }
  });
});

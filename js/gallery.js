/* 
========================================================================
   ONE8 ELECTRICAL SOLUTIONS - Project Gallery Filter & Lightbox
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // 1. Gallery Filtering Logic
  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle Active Class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            item.classList.remove('hidden');
            // Re-trigger AOS animations or standard fades
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          } else {
            item.classList.add('hidden');
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
          }
        });
      });
    });
  }

  // 2. Lightbox Logic
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const arrowLeft = document.getElementById('lightbox-left');
  const arrowRight = document.getElementById('lightbox-right');
  const zoomIcons = document.querySelectorAll('.gallery-zoom-icon');
  const imgBoxes = document.querySelectorAll('.gallery-img-box');

  let currentItemsArray = [];
  let currentIndex = 0;

  // Build active items list for navigation (only visible items)
  function updateActiveGalleryList() {
    currentItemsArray = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
  }

  function showImage(index) {
    if (index < 0 || index >= currentItemsArray.length) return;
    currentIndex = index;
    
    const activeItem = currentItemsArray[currentIndex];
    const imgElement = activeItem.querySelector('.gallery-img-box img');
    const titleElement = activeItem.querySelector('.gallery-info-hover h3');
    
    if (lightboxImg && imgElement) {
      lightboxImg.setAttribute('src', imgElement.getAttribute('src'));
    }
    if (lightboxCaption && titleElement) {
      lightboxCaption.textContent = titleElement.textContent;
    }
  }

  function openLightbox(element) {
    updateActiveGalleryList();
    
    const itemContainer = element.closest('.gallery-item');
    currentIndex = currentItemsArray.indexOf(itemContainer);
    
    if (currentIndex !== -1) {
      showImage(currentIndex);
      if (lightbox) {
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
      }
    }
  }

  // Bind clicks on Image box overlays or zoom icons
  imgBoxes.forEach(box => {
    box.addEventListener('click', () => {
      openLightbox(box);
    });
  });

  zoomIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid double click triggers
      openLightbox(icon);
    });
  });

  // Lightbox Navigation Arrows
  if (arrowLeft) {
    arrowLeft.addEventListener('click', (e) => {
      e.stopPropagation();
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = currentItemsArray.length - 1;
      showImage(prevIndex);
    });
  }

  if (arrowRight) {
    arrowRight.addEventListener('click', (e) => {
      e.stopPropagation();
      let nextIndex = currentIndex + 1;
      if (nextIndex >= currentItemsArray.length) nextIndex = 0;
      showImage(nextIndex);
    });
  }

  // Lightbox Close Trigger
  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('show');
      document.body.style.overflow = 'auto'; // Restore background scrolling
    }
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Key navigation for lightbox (Escape to close, arrows to cycle)
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('show')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        arrowLeft.click();
      } else if (e.key === 'ArrowRight') {
        arrowRight.click();
      }
    }
  });
});

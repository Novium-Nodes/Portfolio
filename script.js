/**
 * NoviumNodes Team Portfolio - Pure Vanilla JS Logic
 * Modular, production-ready implementation of high-performance interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Custom Interactive Cursor Glow ---
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    // Positioning the ambient background glow slightly centered on cursor
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });


  // --- 2. Sticky Header Scrolled Effect ---
  const header = document.querySelector('.header');
  const handleScrollHeader = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollHeader);
  handleScrollHeader(); // Initialize on load


  // --- 3. Responsive Mobile Menu Toggler ---
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileNav = () => {
    const isOpen = menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    // Lock body scroll when mobile nav is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuBtn.addEventListener('click', toggleMobileNav);

  // Close menu when clicking a mobile link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // --- 4. Smooth Navigation Scroll & Active Section Highlighting ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update desktop links
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });

        // Update mobile links
        mobileNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px' // Trigger active state when section takes up main viewport
  });

  sections.forEach(section => activeSectionObserver.observe(section));


  // --- 5. Jump to Gallery Toggle Logic ---
  const jumpGalleryBtn = document.getElementById('jumpGalleryBtn');
  const hiddenGallery = document.getElementById('hiddenGallery');

  if (jumpGalleryBtn && hiddenGallery) {
    jumpGalleryBtn.addEventListener('click', () => {
      const isRevealed = hiddenGallery.classList.toggle('revealed');
      
      if (isRevealed) {
        // Toggle active styling (switches color and rotates arrow)
        jumpGalleryBtn.classList.add('active');
        jumpGalleryBtn.innerHTML = `
          Collapse Gallery 
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        `;
        
        // Wait for next painting block to allow DOM to expand heights, then scroll smoothly
        setTimeout(() => {
          hiddenGallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else {
        jumpGalleryBtn.classList.remove('active');
        jumpGalleryBtn.innerHTML = `
          Jump to Gallery 
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        `;

        // Smoothly scroll back to projects header so user is not disoriented by collapse
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }


  // --- 6. Card Hover 3D Tilting Micro-Interactions ---
  const cards = document.querySelectorAll('.project-card, .feature-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate within element
      const y = e.clientY - rect.top;  // y coordinate within element

      // Calculate degrees of rotation based on coordinate delta from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * 6; // Max 6deg
      const rotateY = ((x - centerX) / centerX) * 6; // Max 6deg

      card.style.transform = `perspective(1000px) translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // --- 7. Sleek Contact Form Handler & Submission ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalBtnText = submitBtn.textContent;
      
      // Update UI to submitting state
      submitBtn.disabled = true;
      submitBtn.textContent = 'TRANSMITTING PROTOCOL...';
      
      // Simulate cryptographic protocol transmission latency
      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        // Show elegant success alert banner
        if (formStatus) {
          formStatus.textContent = 'Transmission Secured. Our core Node will peer with you shortly.';
          formStatus.classList.add('success');
          
          // Clear notification after standard latency delay
          setTimeout(() => {
            formStatus.classList.remove('success');
            formStatus.textContent = '';
          }, 6000);
        }
      }, 1500);
    });
  }
});

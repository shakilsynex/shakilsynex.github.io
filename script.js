/* ================================================================
   MOHAMMAD SHAKIL — Premium Cybersecurity Portfolio
   script.js  |  Version 1.0
================================================================ */

'use strict';

/* ================================================================
   1. EMAILJS INITIALIZATION
================================================================ */
(function initEmailJS() {
  emailjs.init('9kkw4ieYN17zA5jxC');
})();

/* ================================================================
   2. DOM READY HELPER
================================================================ */
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/* ================================================================
   3. PRELOADER
================================================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hide');

            preloader.addEventListener('transitionend', function () {
                preloader.remove();
            }, { once: true });

        }, 1900);
    });
}

/* ================================================================
   4. STICKY NAVBAR + SCROLL EFFECTS
================================================================ */
function initNavbar() {
  const header    = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  if (!header) return;

  function onScroll() {
    const scrollY = window.scrollY;

    // Sticky class
    if (scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on init

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ================================================================
   5. MOBILE MENU (HAMBURGER)
================================================================ */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const navMenu    = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks   = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  function openMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('open');
    if (navOverlay) navOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (hamburger.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on overlay click
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ================================================================
   6. ACTIVE NAV LINK ON SCROLL (INTERSECTION OBSERVER)
================================================================ */
function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/* ================================================================
   7. TYPING ANIMATION
================================================================ */
function initTyping() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const phrases = [
    'Cybersecurity Specialist',
    'Social Media Security Expert',
    'Account Recovery Expert',
    'Digital Protection Advisor',
    'Copyright Protection Expert'
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let typingSpeed = 85;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  // Start after a slight delay
  setTimeout(type, 600);
}

/* ================================================================
   8. SCROLL REVEAL (IntersectionObserver)
================================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

        setTimeout(function () {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ================================================================
   9. ANIMATED COUNTERS
================================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  function animateCounter(el) {
    const target    = parseInt(el.getAttribute('data-target'), 10);
    const duration  = 1800;
    const stepTime  = 16;
    const steps     = duration / stepTime;
    const increment = target / steps;
    let current     = 0;

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, stepTime);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

/* ================================================================
   10. SKILL BAR ANIMATION
================================================================ */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (!skillFills.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
        observer.unobserve(fill);
      }
    });
  }, {
    threshold: 0.3
  });

  skillFills.forEach(function (fill) {
    observer.observe(fill);
  });
}

/* ================================================================
   11. PORTFOLIO FILTER
================================================================ */
function initPortfolioFilter() {
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolioGrid');
  const emptyState    = document.getElementById('portfolioEmpty');

  if (!filterBtns.length || !portfolioGrid) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active state
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const cards  = portfolioGrid.querySelectorAll('.portfolio-card');
      let visibleCount = 0;

      cards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        const matches  = filter === 'all' || category === filter;

        if (matches) {
          card.classList.remove('hidden');
          // Re-trigger fade animation
          card.classList.remove('visible');
          setTimeout(function () {
            card.classList.add('visible');
          }, 50);
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Show/hide empty state
      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}

/* ================================================================
   12. LIGHTBOX GALLERY
================================================================ */
function initLightbox() {
  const lightbox        = document.getElementById('lightbox');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxClose   = document.getElementById('lightboxClose');
  const lightboxPrev    = document.getElementById('lightboxPrev');
  const lightboxNext    = document.getElementById('lightboxNext');
  const lightboxImg     = document.getElementById('lightboxImg');
  const lightboxTitle   = document.getElementById('lightboxTitle');
  const lightboxDesc    = document.getElementById('lightboxDesc');
  const lightboxCat     = document.getElementById('lightboxCategory');
  const lightboxCounter = document.getElementById('lightboxCounter');

  if (!lightbox) return;

  let currentIndex       = 0;
  let currentFilterCards = [];

  /**
   * Collect currently-visible portfolio cards
   */
  function getVisibleCards() {
    return Array.from(document.querySelectorAll('.portfolio-card:not(.hidden)'));
  }

  /**
   * Build data object from a card
   */
  function getCardData(card) {
    const img  = card.querySelector('.portfolio-img');
    const over = card.querySelector('.portfolio-overlay-content');
    return {
      src:      img  ? img.getAttribute('src')  : '',
      alt:      img  ? img.getAttribute('alt')   : '',
      title:    over ? (over.querySelector('.portfolio-overlay-title')?.textContent || '') : '',
      desc:     over ? (over.querySelector('.portfolio-overlay-desc')?.textContent  || '') : '',
      category: over ? (over.querySelector('.portfolio-category-badge')?.textContent || '') : ''
    };
  }

  function openLightbox(index) {
    currentFilterCards = getVisibleCards();
    if (!currentFilterCards.length) return;

    currentIndex = ((index % currentFilterCards.length) + currentFilterCards.length) % currentFilterCards.length;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const card = currentFilterCards[currentIndex];
    if (!card) return;

    const data = getCardData(card);

    // Fade out → update → fade in
    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      setTimeout(function () {
        lightboxImg.src     = data.src;
        lightboxImg.alt     = data.alt;
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transition = 'opacity 0.25s ease';
      }, 150);
    }

    if (lightboxTitle)   lightboxTitle.textContent   = data.title;
    if (lightboxDesc)    lightboxDesc.textContent    = data.desc;
    if (lightboxCat)     lightboxCat.textContent     = data.category;
    if (lightboxCounter) lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentFilterCards.length;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentFilterCards.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentFilterCards.length) % currentFilterCards.length;
    updateLightbox();
  }

  // Open lightbox via zoom buttons
  document.addEventListener('click', function (e) {
    const zoomBtn = e.target.closest('.portfolio-zoom-btn');
    if (!zoomBtn) return;

    const card  = zoomBtn.closest('.portfolio-card');
    const cards = getVisibleCards();
    const idx   = cards.indexOf(card);
    openLightbox(idx >= 0 ? idx : 0);
  });

  // Also open on card image click
  document.addEventListener('click', function (e) {
    const img = e.target.closest('.portfolio-img');
    if (!img) return;
    const card  = img.closest('.portfolio-card');
    const cards = getVisibleCards();
    const idx   = cards.indexOf(card);
    openLightbox(idx >= 0 ? idx : 0);
  });

  // Controls
  if (lightboxClose)   lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxNext)    lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev)    lightboxPrev.addEventListener('click', showPrev);

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  showNext();
    if (e.key === 'ArrowLeft')   showPrev();
  });

  // Touch/Swipe support
  let touchStartX = 0;

  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showNext();
      else          showPrev();
    }
  }, { passive: true });
}

/* ================================================================
   13. RIPPLE EFFECT ON BUTTONS
================================================================ */
function initRipple() {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.ripple');
    if (!btn) return;

    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;

    btn.appendChild(ripple);
    ripple.addEventListener('animationend', function () {
      ripple.remove();
    });
  });
}

/* ================================================================
   14. EMAILJS CONTACT FORM
================================================================ */
function initContactForm() {
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const formError   = document.getElementById('formError');

  if (!form || !submitBtn) return;

  // ---- Validation helpers ----
  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add('error');
    if (error) error.textContent = message;
    return false;
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.remove('error');
    if (error) error.textContent = '';
  }

  function validateForm() {
    let valid = true;

    // Full Name
    const name = document.getElementById('fullName');
    clearError('fullName', 'nameError');
    if (!name || name.value.trim().length < 2) {
      showError('fullName', 'nameError', 'Please enter your full name (at least 2 characters).');
      valid = false;
    }

    // Email
    const email   = document.getElementById('email');
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    clearError('email', 'emailError');
    if (!email || !emailRx.test(email.value.trim())) {
      showError('email', 'emailError', 'Please enter a valid email address.');
      valid = false;
    }

    // Subject
    const subject = document.getElementById('subject');
    clearError('subject', 'subjectError');
    if (!subject || subject.value.trim().length < 3) {
      showError('subject', 'subjectError', 'Please enter a subject (at least 3 characters).');
      valid = false;
    }

    // Message
    const message = document.getElementById('message');
    clearError('message', 'messageError');
    if (!message || message.value.trim().length < 10) {
      showError('message', 'messageError', 'Please enter a message (at least 10 characters).');
      valid = false;
    }

    return valid;
  }

  // Live input clearing
  ['fullName', 'email', 'subject', 'message'].forEach(function (id) {
    const input = document.getElementById(id);
    const errId = id + 'Error';
    if (input) {
      input.addEventListener('input', function () {
        clearError(id, errId);
      });
    }
  });

  // ---- Form submit ----
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    // UI: loading state
    const btnText   = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    submitBtn.disabled = true;
    if (btnText)   btnText.style.display   = 'none';
    if (btnLoader) btnLoader.style.display = 'inline-flex';
    if (formSuccess) formSuccess.style.display = 'none';
    if (formError)   formError.style.display   = 'none';

    // Prepare template params
    const templateParams = {
      from_name:  document.getElementById('fullName').value.trim(),
      from_email: document.getElementById('email').value.trim(),
      phone:      document.getElementById('phone').value.trim() || 'Not provided',
      subject:    document.getElementById('subject').value.trim(),
      message:    document.getElementById('message').value.trim()
    };

    emailjs.send('service_k1bpsb8', 'template_bero54c', templateParams)
      .then(function () {
        // Success
        if (formSuccess) formSuccess.style.display = 'flex';
        form.reset();
        // Scroll to notification
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      })
      .catch(function (err) {
        console.error('EmailJS error:', err);
        if (formError) formError.style.display = 'flex';
      })
      .finally(function () {
        // Restore button
        submitBtn.disabled = false;
        if (btnText)   btnText.style.display   = '';
        if (btnLoader) btnLoader.style.display = 'none';
        // Auto-hide notifications after 6s
        setTimeout(function () {
          if (formSuccess) formSuccess.style.display = 'none';
          if (formError)   formError.style.display   = 'none';
        }, 6000);
      });
  });
}

/* ================================================================
   15. SMOOTH SCROLL FOR ANCHOR LINKS
================================================================ */
function initSmoothScroll() {
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ================================================================
   16. FOOTER YEAR
================================================================ */
function initFooterYear() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ================================================================
   17. LAZY LOADING IMAGES (Fallback for older browsers)
================================================================ */
function initLazyLoad() {
  // Modern browsers support loading="lazy" natively.
  // This provides a fallback via IntersectionObserver for older ones.
  if ('loading' in HTMLImageElement.prototype) return;

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (!lazyImages.length) return;

  const imgObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        imgObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(function (img) {
    imgObserver.observe(img);
  });
}

/* ================================================================
   18. CARD HOVER TILT (subtle 3D effect — service & testimonial cards)
================================================================ */
function initCardTilt() {
  const cards = document.querySelectorAll('.service-card, .testimonial-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;

      // Max tilt: 6 degrees
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) *  4;

      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });

    card.addEventListener('mouseenter', function () {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

/* ================================================================
   19. INITIALIZE ALL MODULES
================================================================ */
ready(function () {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initActiveNav();
  initTyping();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initPortfolioFilter();
  initLightbox();
  initRipple();
  initContactForm();
  initSmoothScroll();
  initFooterYear();
  initLazyLoad();
  initCardTilt();

  // Trigger scroll reveal on elements already in view
  window.dispatchEvent(new Event('scroll'));
});
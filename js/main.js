/**
 * CakestoryCbe — Demo Website
 * Main JavaScript
 *
 * Contains:
 * - Mobile navigation toggle
 * - Smooth scroll nav highlight / shrink
 * - Contact form validation & submission (demo)
 * - Scroll-reveal animations
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     DOM REFERENCES
     ============================================================ */

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = navLinks.querySelectorAll('a');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const allSections = document.querySelectorAll('section[id]');

  /* ============================================================
     MOBILE NAV TOGGLE
     ============================================================ */

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.contains('nav__links--open');
      navLinks.classList.toggle('nav__links--open', !isOpen);
      navToggle.classList.toggle('nav__toggle--open', !isOpen);
      navToggle.setAttribute('aria-expanded', !isOpen);
    });

    navLinkItems.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav__links--open');
        navToggle.classList.remove('nav__toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================================
     SCROLL HANDLER — Nav shadow & active link
     ============================================================ */

  function updateActiveLink() {
    var scrollY = window.pageYOffset;
    var currentId = '';

    allSections.forEach(function (section) {
      var sectionTop = section.offsetTop - 120;
      var sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============================================================
     SCROLL-REVEAL ANIMATIONS
     ============================================================ */

  var revealElements = document.querySelectorAll(
    '.course-card, .pricing-card, .testimonial-card, .instructor-card, .stat'
  );

  revealElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ============================================================
     CONTACT FORM — Demo submission
     ============================================================ */

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstName = document.getElementById('firstName').value.trim();
      var email = document.getElementById('email').value.trim();

      if (!firstName || !email) {
        showFormFeedback('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showFormFeedback('Please enter a valid email address.', 'error');
        return;
      }

      showFormFeedback(
        'Thanks, ' + firstName + '! This is a demo — your message was not actually sent. In production, connect this form to your backend or email service.',
        'success'
      );

      contactForm.reset();
    });
  }

  function showFormFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.style.display = 'block';
    formFeedback.style.color = type === 'success' ? 'var(--color-success)' : '#d14343';
    formFeedback.style.fontWeight = '500';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

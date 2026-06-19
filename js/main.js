/**
 * CakestoryCbe — Main JavaScript
 * Scroll-triggered reveals, nav behavior, contact form
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Scroll Reveal (Intersection Observer) ---- */
  var revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ---- Nav ---- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navLinkItems = navLinks.querySelectorAll('a');
  var allSections = document.querySelectorAll('section[id]');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.contains('nav__links--open');
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

  function updateActiveLink() {
    var scrollY = window.pageYOffset;
    var currentId = '';
    allSections.forEach(function (section) {
      var top = section.offsetTop - 120;
      if (scrollY >= top && scrollY < top + section.offsetHeight) {
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

  /* ---- Contact Form ---- */
  var contactForm = document.getElementById('contactForm');
  var formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstName = document.getElementById('firstName').value.trim();
      var email = document.getElementById('email').value.trim();

      if (!firstName || !email) {
        showFeedback('Please fill in all required fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      showFeedback(
        'Thanks, ' + firstName + '! This is a demo — your message was not actually sent. In production, connect this form to your backend.',
        'success'
      );
      contactForm.reset();
    });
  }

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.style.display = 'block';
    formFeedback.style.color = type === 'success' ? 'var(--color-success)' : '#d14343';
    formFeedback.style.fontWeight = '500';
  }
});
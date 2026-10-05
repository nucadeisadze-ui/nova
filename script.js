/**
 * NexusAI - Modern Landing Page Logic & Interactivity
 * Features:
 *  - Responsive Mobile Navigation & Accessibility
 *  - Smooth Scrolling with Active Section Highlighting
 *  - Interactive Hero Terminal Simulation & Live Metrics
 *  - Interactive Feature Cards Spotlight Tracking
 *  - Robust Form Validation with Loading State & Toast System
 *  - Scroll-triggered Navbar & Back-to-Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  if (mobileToggle && navMenu) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : mobileToggle.getAttribute('aria-expanded') !== 'true';
      mobileToggle.setAttribute('aria-expanded', String(isExpanded));
      mobileToggle.classList.toggle('active', isExpanded);
      navMenu.classList.toggle('open', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', () => toggleMenu());

    // Close mobile menu when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    });

    // Close when clicking outside of nav menu
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Navbar Background on Scroll & Back-to-Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top-btn');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar blur background toggle
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Smooth Scrolling & Active Section Highlighting
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove('active'));
        if (matchingLink) {
          matchingLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // Handle smooth scroll clicks with header offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Hero Visual Mockup: Typing Simulator & Dynamic Metrics
  // --------------------------------------------------------------------------
  const terminalText = document.getElementById('interactive-terminal-text');
  const metricLatency = document.getElementById('metric-latency');
  const metricThroughput = document.getElementById('metric-throughput');

  const prompts = [
    'Orchestrating autonomous customer triage swarm...',
    'Optimizing token memory cache across 18 edge nodes...',
    'Executing cross-database zero-latency vector embeddings...',
    'Auto-remediating API schema drift without human intervention...',
    'Dispatching parallel sub-agent reasoning loops in 4.2ms...'
  ];

  let promptIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;

  function typeTerminalText() {
    if (!terminalText) return;

    const currentPrompt = prompts[promptIndex];

    if (isDeleting) {
      terminalText.textContent = currentPrompt.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 25;
    } else {
      terminalText.textContent = currentPrompt.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 50;
    }

    if (!isDeleting && charIndex === currentPrompt.length) {
      // Pause at end of line
      isDeleting = true;
      typingSpeed = 2200;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      promptIndex = (promptIndex + 1) % prompts.length;
      typingSpeed = 400;
    }

    setTimeout(typeTerminalText, typingSpeed);
  }

  // Start typing simulation after slight initial delay
  setTimeout(typeTerminalText, 800);

  // Fluctuating real-time metrics in hero
  if (metricLatency && metricThroughput) {
    setInterval(() => {
      // Latency fluctuation between 6.8ms and 9.4ms
      const randomLatency = (6.8 + Math.random() * 2.6).toFixed(1);
      metricLatency.textContent = `${randomLatency} ms`;

      // Throughput fluctuation between 13,800 and 15,200
      const randomThroughput = Math.floor(13800 + Math.random() * 1400).toLocaleString();
      metricThroughput.textContent = `${randomThroughput}/s`;
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 5. Feature Cards: Mouse Spotlight Effect
  // --------------------------------------------------------------------------
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --------------------------------------------------------------------------
  // 6. Toast Notification Manager
  // --------------------------------------------------------------------------
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, icon = '⚡', duration = 4000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 7. Contact Form Validation & Submission Interaction
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-counter');
  const submitBtn = document.getElementById('contact-submit-btn');
  const successBanner = document.getElementById('form-success-banner');

  // Character counter for message textarea
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / 500`;
    });
  }

  // Email format regex validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.trim());
  };

  // Helper to set field error state
  const setFieldError = (inputEl, groupId, errorId, hasError, customMsg) => {
    const group = document.getElementById(groupId);
    const errorEl = document.getElementById(errorId);

    if (group && errorEl) {
      if (hasError) {
        group.classList.add('has-error');
        if (customMsg) errorEl.textContent = customMsg;
      } else {
        group.classList.remove('has-error');
      }
    }
  };

  // Real-time error removal on input
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        setFieldError(nameInput, 'group-name', 'error-name', false);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value)) {
        setFieldError(emailInput, 'group-email', 'error-email', false);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length >= 15) {
        setFieldError(messageInput, 'group-message', 'error-message', false);
      }
    });
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;

      // Validate Name
      const nameValue = nameInput ? nameInput.value.trim() : '';
      if (!nameValue || nameValue.length < 2) {
        setFieldError(nameInput, 'group-name', 'error-name', true, 'Please provide your full name (minimum 2 characters).');
        hasErrors = true;
      } else {
        setFieldError(nameInput, 'group-name', 'error-name', false);
      }

      // Validate Email
      const emailValue = emailInput ? emailInput.value.trim() : '';
      if (!emailValue || !isValidEmail(emailValue)) {
        setFieldError(emailInput, 'group-email', 'error-email', true, 'Please provide a valid work email address.');
        hasErrors = true;
      } else {
        setFieldError(emailInput, 'group-email', 'error-email', false);
      }

      // Validate Message
      const messageValue = messageInput ? messageInput.value.trim() : '';
      if (!messageValue || messageValue.length < 15) {
        setFieldError(messageInput, 'group-message', 'error-message', true, 'Please write a message with at least 15 characters.');
        hasErrors = true;
      } else {
        setFieldError(messageInput, 'group-message', 'error-message', false);
      }

      if (hasErrors) {
        showToast('Please resolve the highlighted form errors.', '⚠️');
        return;
      }

      // Simulated Async Submission
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        // Successful response
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }

        if (successBanner) {
          successBanner.style.display = 'flex';
        }

        // Show toast
        showToast('Message sent! An AI architect will contact you shortly.', '🚀');

        // Reset form inputs
        contactForm.reset();
        if (charCounter) charCounter.textContent = '0 / 500';

        // Scroll smoothly to success banner if needed
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto hide success banner after 10 seconds
        setTimeout(() => {
          if (successBanner) {
            successBanner.style.display = 'none';
          }
        }, 10000);
      }, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 8. Newsletter Subscription Handler
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();

      if (!isValidEmail(email)) {
        showToast('Please enter a valid email for the newsletter.', '⚠️');
        return;
      }

      newsletterEmail.value = '';
      if (newsletterFeedback) {
        newsletterFeedback.textContent = '✓ Subscribed to NexusAI digest!';
        setTimeout(() => {
          newsletterFeedback.textContent = '';
        }, 5000);
      }

      showToast('Thank you for subscribing to NexusAI updates!', '📫');
    });
  }

  // --------------------------------------------------------------------------
  // 9. Dynamic Year Update
  // --------------------------------------------------------------------------
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

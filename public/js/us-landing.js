(function () {
  const nav = document.querySelector('.landing-nav');
  const menuButton = document.querySelector('.landing-header__menu');
  const mobileCta = document.getElementById('mobile-cta');
  const hero = document.getElementById('home');

  const revealElements = document.querySelectorAll('[data-reveal]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = Number(el.getAttribute('data-delay') || 0);
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  if (!prefersReducedMotion) {
    revealElements.forEach((item) => observer.observe(item));
  } else {
    revealElements.forEach((item) => item.classList.add('is-visible'));
  }

  if (mobileCta) {
    document.body.classList.add("has-landing-mobile-cta");

    const updateStickyButton = () => {
      if (!hero) return;

      const heroRect = hero.getBoundingClientRect();
      const shouldHide = heroRect.top < -220 && window.innerWidth < 768;
      mobileCta.classList.toggle('is-hidden', !shouldHide);
    };

    updateStickyButton();
    window.addEventListener('scroll', updateStickyButton, { passive: true });
    window.addEventListener('resize', updateStickyButton);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
})();

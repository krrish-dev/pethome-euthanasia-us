document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  const phoneHref = "tel:+17609120848";

  const closeMenu = () => {
    if (!toggle || !links) {
      return;
    }
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  if (toggle && links) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!links.classList.contains("is-open")) {
        return;
      }
      if (!nav) {
        closeMenu();
        return;
      }
      if (!nav.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }

  if (nav) {
    const setScrolled = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }

  if (!document.querySelector(".floating-call-cta")) {
    const callCta = document.createElement("a");
    callCta.className = "floating-call-cta";
    callCta.href = phoneHref;
    callCta.setAttribute("aria-label", "Call now (760) 912-0848");
    callCta.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      <span>Call now (760) 912-0848</span>
    `;

    document.body.appendChild(callCta);
    document.body.classList.add("has-floating-call-cta");
  }

  const footerBottom = document.querySelector(".footer__bottom");
  if (footerBottom && !footerBottom.querySelector(".site-credit")) {
    const siteCredit = document.createElement("p");
    siteCredit.className = "site-credit";
    siteCredit.append("Designed and developed with ♥ by ");

    const companyLink = document.createElement("a");
    companyLink.href = "https://krrish.it/en/";
    companyLink.target = "_blank";
    companyLink.rel = "noopener noreferrer";
    companyLink.textContent = "Krrish.it";

    siteCredit.appendChild(companyLink);
    footerBottom.appendChild(siteCredit);
  }

  const fadeElements = document.querySelectorAll(".fade-in-up");
  if (fadeElements.length > 0 && "IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeElements.forEach((element) => fadeObserver.observe(element));
  } else {
    fadeElements.forEach((element) => element.classList.add("visible"));
  }
});
document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar.offsetHeight;

  const navLinks = document.querySelectorAll(".main-nav__link");
  
  // Smooth scroll for internal navigation (same page sections)
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      // Internal link within the same page
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        const targetElement = document.querySelector(this.getAttribute("href"));
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }

        // Update active class
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Close the mobile menu after clicking a link
        if (window.innerWidth <= 480) {
          mainNav.classList.remove("active");
          hamburger.classList.remove("active");
          document.body.style.overflow = ""; // Re-enable body scroll
          overlay.style.display = "none";
        }
      });
    }
    // External links, including those with hashes to other pages, are left untouched
  });

  // Smooth scroll to section if URL contains a hash on page load (only for index.html)
  const isIndexPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
  if (isIndexPage && window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      // Delay to ensure all elements are loaded
      window.addEventListener("load", () => {
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      });
    }
  }

  function createParallaxEffect(elementSelector, isTransform = false) {
    const element = document.querySelector(elementSelector);
    if (!element) return;

    let startOffset = 0;
    let isFirstIntersection = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isFirstIntersection) {
              startOffset = entry.boundingClientRect.top + window.scrollY;
              isFirstIntersection = false;
            }
            window.addEventListener("scroll", parallaxScroll);
          } else {
            window.removeEventListener("scroll", parallaxScroll);
          }
        });
      },
      { threshold: 0 }
    );

    function parallaxScroll() {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const parallaxSpeed = 0.1;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrollProgress = window.scrollY - startOffset;

        if (isTransform) {
          element.style.transform = `translateY(-${scrollProgress * parallaxSpeed}px)`;
        } else {
          element.style.backgroundPositionY = `-${scrollProgress * parallaxSpeed}px`;
        }
      }
    }

    observer.observe(element);
  }

  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  const handleScroll = throttle(function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      navbar.style.transform = `translateY(-${navbarHeight}px)`;
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  }, 100);

  window.addEventListener("scroll", handleScroll);

  createParallaxEffect(".hero__background", true);
  createParallaxEffect(".roots__background");
  createParallaxEffect(".vision__background");
  createParallaxEffect(".focus__background");

  // Mobile Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.querySelector(".main-nav");
  const overlay = document.getElementById("overlay");

  hamburger.addEventListener("click", function () {
    const isActive = hamburger.classList.toggle("active");
    mainNav.classList.toggle("active");

    // Toggle body scroll
    if (isActive) {
      document.body.style.overflow = "hidden";
      hamburger.setAttribute("aria-expanded", "true");
      overlay.style.display = "block";
    } else {
      document.body.style.overflow = "";
      hamburger.setAttribute("aria-expanded", "false");
      overlay.style.display = "none";
    }
  });

  // Close the menu when clicking on the overlay
  overlay.addEventListener("click", function () {
    mainNav.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
    overlay.style.display = "none";
  });

  // Allow keyboard navigation for the hamburger menu
  hamburger.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hamburger.click();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar.offsetHeight;

  const navLinks = document.querySelectorAll(".main-nav__link");
  
  // Smooth scroll for internal navigation (same page sections)
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // If the link is for scrolling to a section within the same page
      if (this.hash !== "") {
        e.preventDefault(); // Prevent default anchor behavior

        // Use scrollIntoView for smooth scrolling
        const targetElement = document.querySelector(this.hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        // If it's a normal link (e.g., external pages like team.html)
        // Allow the default behavior (navigate to the page)
        window.location.href = this.href;
      }

      // Add the active class to the clicked link
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

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
          element.style.transform = `translateY(-${
            scrollProgress * parallaxSpeed
          }px)`;
        } else {
          element.style.backgroundPositionY = `-${
            scrollProgress * parallaxSpeed
          }px`;
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

  igniteAmbitionLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    const igniteAmbitionSection = document.getElementById('ignite-ambition');
    
    igniteAmbitionSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

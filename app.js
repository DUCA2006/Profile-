// =====================================
// NELSON PROFILE — INTERACTIONS & APP.JS
// =====================================

// 1. GENERAL SCROLL REVEAL

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 100}ms`;
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("show");
  });
}


// 2 & 3. SAFE MOBILE NAVIGATION & CLOSE ON CLICK

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    
    // Fallback text check if using symbol toggles
    if (menuToggle.textContent.includes("☰") || menuToggle.textContent.includes("✕")) {
      menuToggle.textContent = isOpen ? "✕" : "☰";
    }
  });

  document.querySelectorAll(".nav-links a, .nav-links-mobile a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      
      if (menuToggle.textContent.includes("✕")) {
        menuToggle.textContent = "☰";
      }
    });
  });
}


// 4 & 6. COPYRIGHT YEAR (Global Helper)

function updateCopyrightYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

updateCopyrightYear();


// 5. SAFE PROFILE IMAGE ERROR CHECK

const profileImage = document.querySelector(".profile-image");

if (profileImage) {
  profileImage.addEventListener("error", () => {
    console.warn(
      "Profile photo not found. Make sure nelson.jpg is in the project folder."
    );
  });
}


// =====================================
// PARTICLE TRANSITION EFFECT
// =====================================

const pageLinks = document.querySelectorAll(".page-link");

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Respect accessibility preferences
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    event.preventDefault();

    const destination = link.getAttribute("href");
    const rect = link.getBoundingClientRect();

    // Prevent multiple transitions
    if (document.body.classList.contains("page-leaving")) {
      return;
    }

    document.body.classList.add("page-leaving");

    // Create the transition layer
    const transitionLayer = document.createElement("div");
    transitionLayer.className = "particle-transition";

    document.body.appendChild(transitionLayer);

    // Create the card particles
    const particleCount = 42;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");
      particle.className = "scatter-particle";

      const size = Math.random() * 9 + 4;

      // Start particles around the selected card
      const startX = rect.left + Math.random() * rect.width;
      const startY = rect.top + Math.random() * rect.height;

      // Scatter them in different directions
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 260 + 90;

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;

      particle.style.setProperty("--move-x", `${moveX}px`);
      particle.style.setProperty("--move-y", `${moveY}px`);

      particle.style.animationDelay = `${Math.random() * 180}ms`;

      transitionLayer.appendChild(particle);
    }

    // Animate the selected card
    link.classList.add("card-scattering");

    // Reveal the transition layer
    requestAnimationFrame(() => {
      transitionLayer.classList.add("active");
    });

    // Navigate after the particles scatter
    setTimeout(() => {
      window.location.assign(destination);
    }, 850);
  });
});


// =====================================
// PAGE ENTRANCE EFFECT
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");
  updateCopyrightYear();
});


// =====================================
// DETAIL PAGE SCROLL REVEAL
// =====================================

const detailSections = document.querySelectorAll(
  ".detail-story, .detail-bottom, .journey-panel"
);

if (detailSections.length > 0) {
  if ("IntersectionObserver" in window) {
    const detailObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("detail-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    detailSections.forEach((section) => {
      section.classList.add("detail-reveal");
      detailObserver.observe(section);
    });
  } else {
    detailSections.forEach((section) => {
      section.classList.add("detail-visible");
    });
  }
}

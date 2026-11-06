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



// =============================================
// NELSON PROFILE — CREATIVITY INTERACTIONS
// =============================================

(() => {

  // Only run on the Creativity page
  if (!document.body.classList.contains("creative-hub")) {
    return;
  }


  // 1. EXPANDABLE MARKETING PILLARS

  const pillarButtons = document.querySelectorAll(".pillar-expand");

  pillarButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const card = button.closest(".pillar-card");
      const isExpanded = card.classList.toggle("expanded");

      button.setAttribute("aria-expanded", String(isExpanded));

      button.querySelector("span").textContent =
        isExpanded ? "−" : "+";

      button.firstChild.textContent =
        isExpanded ? "Close concept " : "Explore concept ";

    });

  });


  // 2. INTERACTIVE CAMPAIGN LAB

  const labTabs = document.querySelectorAll(".lab-tab");
  const labContent = document.getElementById("labContent");

  const campaignContent = {

    insight: {
      number: "01 / CONSUMER INSIGHT",
      heading: "People buy more than products. They buy experiences.",
      description:
        "The campaign starts with the idea that hydration is part of many everyday routines. Connecting the product with relatable moments gives the communication a human context."
    },

    concept: {
      number: "02 / CREATIVE CONCEPT",
      heading: "Refresh Your Moment.",
      description:
        "The campaign positions PUREFLOW around moments when people want to feel refreshed. The message is short, memorable and flexible enough for different advertising formats."
    },

    execution: {
      number: "03 / CAMPAIGN EXECUTION",
      heading: "Take the idea where the audience is.",
      description:
        "The campaign could use short social videos, outdoor posters, product photography, campus activations and digital advertisements. Each channel should communicate the same central idea."
    },

    measurement: {
      number: "04 / CAMPAIGN MEASUREMENT",
      heading: "A creative idea must also be evaluated.",
      description:
        "Possible performance measures include campaign reach, engagement, brand awareness, product enquiries and sales conversion. The appropriate measures depend on the campaign objectives."
    }

  };


  labTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

      const selected = tab.dataset.lab;
      const content = campaignContent[selected];

      if (!content || !labContent) return;

      labTabs.forEach((item) => {
        item.classList.remove("active");
      });

      tab.classList.add("active");

      labContent.innerHTML = `
        <span>${content.number}</span>
        <h4>${content.heading}</h4>
        <p>${content.description}</p>
      `;

    });

  });


  // 3. MARKETING KNOWLEDGE QUIZ

  const quizOptions = document.querySelectorAll(".quiz-option");
  const quizFeedback = document.getElementById("quizFeedback");

  let quizAnswered = false;

  quizOptions.forEach((option) => {

    option.addEventListener("click", () => {

      if (quizAnswered) return;

      quizAnswered = true;

      const isCorrect =
        option.dataset.correct === "true";

      if (isCorrect) {

        option.classList.add("correct");

        quizFeedback.textContent =
          "Excellent! Understanding the audience and defining the marketing problem should come before selecting creative execution. Research gives the campaign a meaningful direction.";

      } else {

        option.classList.add("incorrect");

        quizFeedback.textContent =
          "Not quite. The correct answer is B. A strong campaign begins with understanding its audience and identifying the marketing problem before choosing designs or advertisements.";

      }

      quizOptions.forEach((item) => {

        item.disabled = true;

        if (item.dataset.correct === "true") {
          item.classList.add("correct");
        }

      });

    });

  });


  // 4. CREATIVE PAGE SCROLL REVEAL

  const revealSections = document.querySelectorAll(
    ".creative-section, .inspiration-card, .pillar-card, .process-step"
  );

  if ("IntersectionObserver" in window) {

    const creativeObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("detail-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealSections.forEach((element) => {

      element.classList.add("detail-reveal");

      creativeObserver.observe(element);

    });

  } else {

    revealSections.forEach((element) => {
      element.classList.add("detail-visible");
    });

  }


  // 5. AUTOMATIC COPYRIGHT YEAR

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 6. SMOOTH NAVIGATION

  document.querySelectorAll(
    '.creative-nav a[href^="#"], .creative-hero a[href^="#"]'
  ).forEach((link) => {

    link.addEventListener("click", (event) => {

      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

})();

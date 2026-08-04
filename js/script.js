"use strict";

const root = document.documentElement;
const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.querySelector(".theme-toggle");
const backToTop = document.querySelector(".back-to-top");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);

  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }
}

const storedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
setTheme(storedTheme || preferredTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
}

function closeMenu() {
  if (!menuToggle || !navMenu) return;
  menuToggle.classList.remove("active");
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  body.classList.remove("nav-open");
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("nav-open", isOpen);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

const currentFile = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link").forEach((link) => {
  const linkFile = link.getAttribute("href")?.split("#")[0];
  if (linkFile === currentFile) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

function handleScroll() {
  const scrolled = window.scrollY > 18;
  header?.classList.toggle("scrolled", scrolled);
  backToTop?.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const typingTarget = document.querySelector("[data-typing]");
if (typingTarget) {
  const words = JSON.parse(typingTarget.dataset.typing || "[]");
  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeText() {
    if (!words.length) return;
    const currentWord = words[wordIndex];

    characterIndex += deleting ? -1 : 1;
    typingTarget.textContent = currentWord.slice(0, characterIndex);

    let delay = deleting ? 42 : 78;

    if (!deleting && characterIndex === currentWord.length) {
      deleting = true;
      delay = 1350;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 250;
    }

    window.setTimeout(typeText, delay);
  }

  typeText();
}

document.querySelectorAll("[data-counter]").forEach((counter) => {
  const target = Number(counter.dataset.counter || 0);
  const suffix = counter.dataset.suffix || "";

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const start = performance.now();
        const duration = 1000;

        function updateCounter(now) {
          const progress = Math.min((now - start) / duration, 1);
          counter.textContent = `${Math.floor(progress * target)}${suffix}`;
          if (progress < 1) requestAnimationFrame(updateCounter);
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counterObserver.observe(counter);
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category?.split(" ") || [];
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const messageField = document.querySelector("#message");
const messageCount = document.querySelector("#messageCount");

if (messageField && messageCount) {
  const updateCount = () => {
    messageCount.textContent = String(messageField.value.length);
  };
  messageField.addEventListener("input", updateCount);
  updateCount();
}

function showFieldError(fieldName, message) {
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (error) error.textContent = message;
}

function clearFormErrors() {
  document.querySelectorAll(".field-error").forEach((error) => {
    error.textContent = "";
  });
}

function validateContactForm(formData) {
  clearFormErrors();
  let isValid = true;
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (name.length < 2) {
    showFieldError("name", "Please enter at least 2 characters.");
    isValid = false;
  }

  if (!emailPattern.test(email)) {
    showFieldError("email", "Please enter a valid email address.");
    isValid = false;
  }

  if (subject.length < 3) {
    showFieldError("subject", "Please enter a clear subject.");
    isValid = false;
  }

  if (message.length < 20) {
    showFieldError("message", "Please write at least 20 characters.");
    isValid = false;
  }

  return isValid;
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);

    if (!validateContactForm(formData)) {
      formStatus.className = "form-status show error";
      formStatus.textContent = "Please correct the highlighted fields.";
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.className = "form-status";
    formStatus.textContent = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Message could not be sent.");

      formStatus.className = "form-status show success";
      formStatus.textContent = "Thank you! Your message has been sent successfully.";
      contactForm.reset();
      if (messageCount) messageCount.textContent = "0";
    } catch (error) {
      formStatus.className = "form-status show error";
      formStatus.textContent =
        "The form service could not send your message. Please email me directly at faahim180@gmail.com.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

const yearElements = document.querySelectorAll("[data-current-year]");
yearElements.forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

// ==================== Initialize AOS ====================
AOS.init({
  duration: 1000,
  offset: 100,
  easing: "ease-in-out",
  once: false,
  mirror: true,
});

// ==================== Navbar Scroll Effect ====================
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// ==================== Meteor Animation ====================
function createMeteors() {
  const meteorContainer = document.querySelector(".meteor-container");

  function createMeteor() {
    const meteor = document.createElement("div");
    meteor.classList.add("meteor");

    // Random starting position
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Random size (1-3px)
    const size = Math.random() * 2 + 1;
    meteor.style.width = size + "px";
    meteor.style.height = size + "px";

    // Random animation duration (2-5 seconds)
    const duration = Math.random() * 3 + 2;
    meteor.style.left = x + "%";
    meteor.style.top = y + "%";
    meteor.style.animationDuration = duration + "s";

    // Random delay (0-3 seconds)
    const delay = Math.random() * 3;
    meteor.style.animationDelay = delay + "s";

    meteorContainer.appendChild(meteor);

    // Remove meteor after animation
    setTimeout(() => {
      meteor.remove();
    }, (duration + delay) * 1000);
  }

  // Create meteors continuously
  setInterval(createMeteor, 800);

  // Create initial meteors
  for (let i = 0; i < 5; i++) {
    createMeteor();
  }
}

// Start meteors when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createMeteors);
} else {
  createMeteors();
}

// ==================== Download CV ====================
function downloadCV() {
  const fileUrl = "/assets/CV-ArafilAzmi.pdf";

  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = "Arafil_Azmi_CV.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showNotification("CV sedang diunduh...", "success");
}

// ==================== Contact Form ====================
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Mengirim...`;

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showNotification(
            "Pesan berhasil dikirim! Terima kasih telah menghubungi saya.",
            "success"
          );
          contactForm.reset();

          // Reload after 2 sec
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          showNotification(data.message || "Gagal mengirim pesan!", "error");

          // Enable kembali
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Kirim Pesan`;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showNotification("Terjadi kesalahan saat mengirim pesan!", "error");

        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Kirim Pesan`;
      });
  });
});

// ==================== Notification System ====================
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show`;
  notification.setAttribute("role", "alert");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;

  const typeIcon = {
    success: "check-circle",
    error: "exclamation-circle",
    info: "info-circle",
    warning: "warning",
  };

  notification.innerHTML = `
        <i class="fas fa-${typeIcon[type]}"></i>
        <span class="ms-2">${message}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// ==================== Page Load Animation ====================
window.addEventListener("load", function () {
  // Fade in effect on page load
  document.body.style.animation = "fadeIn 0.5s ease";
});

// Add fade-in animation
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ==================== Mouse Follow Effect ====================
document.addEventListener("mousemove", function (e) {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
});

// ==================== Intersection Observer for Performance ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// ==================== Parallax Effect ====================
let ticking = false;

window.addEventListener("scroll", function () {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  parallaxElements.forEach((element) => {
    const speed = element.getAttribute("data-parallax") || 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });

  ticking = false;
}

// ==================== Modal Enhancement ====================
// Add smooth transitions to modals
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("show.bs.modal", function (e) {
    this.style.animation = "fadeIn 0.3s ease";
  });
});

// ==================== Form Input Enhancement ====================
document.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    this.parentElement.classList.remove("focused");
  });
});

// ==================== Keyboard Navigation ====================
document.addEventListener("keydown", function (e) {
  // Press 'h' to go to home
  if (e.key === "h" && !e.ctrlKey && !e.metaKey) {
    if (
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA"
    ) {
      document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
    }
  }

  // Press 'c' to go to contact
  if (e.key === "c" && !e.ctrlKey && !e.metaKey) {
    if (
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA"
    ) {
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    }
  }
});

// ==================== Performance Optimization ====================
// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img.lazy")
    .forEach((img) => imageObserver.observe(img));
}

// ==================== Additional Utilities ====================
// Smooth scroll to top button
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add utility classes
function addUtilityClasses() {
  // Add utility for showing/hiding elements based on scroll position
  const elements = document.querySelectorAll("[data-show-on-scroll]");

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  elements.forEach((el) => elementObserver.observe(el));
}

// Initialize utilities
document.addEventListener("DOMContentLoaded", addUtilityClasses);

// ==================== Console Message ====================
console.log(
  "%c🚀 Welcome to Arafil Azmi Portfolio!",
  "color: #00d4ff; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cBuilt with Node.js & Express | Modern Web Development",
  "color: #0099cc; font-size: 12px;"
);

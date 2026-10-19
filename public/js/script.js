// ==================== Initialize AOS ====================
document.addEventListener("DOMContentLoaded", function () {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      offset: 60,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  initNavbarScroll();
  initProjectFilters();
  initContactForm();
  initMeteors();
});

// ==================== Navbar Scroll & Active Link ====================
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNavLink();
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Close mobile navbar on link click
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navCollapse = document.querySelector(".navbar-collapse");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navCollapse && navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  let current = "";
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// ==================== Project Category Filters ====================
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      projectItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          item.classList.remove("filter-hidden");
        } else {
          item.classList.add("filter-hidden");
        }
      });

      // Refresh AOS positions
      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    });
  });
}

// ==================== Meteor Effect ====================
function initMeteors() {
  const meteorContainer = document.querySelector(".meteor-container");
  if (!meteorContainer) return;

  function createMeteor() {
    const meteor = document.createElement("div");
    meteor.classList.add("meteor");

    const x = Math.random() * 100;
    const y = Math.random() * 80;
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 3 + 2.5;
    const delay = Math.random() * 2;

    meteor.style.width = size + "px";
    meteor.style.height = size + "px";
    meteor.style.left = x + "%";
    meteor.style.top = y + "%";
    meteor.style.animationDuration = duration + "s";
    meteor.style.animationDelay = delay + "s";

    meteorContainer.appendChild(meteor);

    setTimeout(() => {
      meteor.remove();
    }, (duration + delay) * 1000);
  }

  // Create initial meteors
  for (let i = 0; i < 4; i++) {
    createMeteor();
  }

  // Add continuously
  setInterval(createMeteor, 1200);
}

// ==================== Download CV ====================
function downloadCV() {
  const fileUrl = "/assets/CV-ArafilAzmi.pdf";
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = "CV-Arafil-Azmi.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showNotification("Memulai pengunduhan CV...", "success");
}

// ==================== Contact Form ====================
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const submitBtn = contactForm.querySelector("button[type='submit']");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Mengirim Pesan...`;

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        showNotification(
          "Pesan berhasil terkirim! Terima kasih telah menghubungi saya.",
          "success"
        );
        contactForm.reset();
      } else {
        showNotification(data.message || "Gagal mengirim pesan.", "error");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      showNotification("Terjadi kesalahan koneksi saat mengirim pesan.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

// ==================== Notification Toast ====================
function showNotification(message, type = "info") {
  const existingNotice = document.querySelector(".custom-notification");
  if (existingNotice) existingNotice.remove();

  const notification = document.createElement("div");
  notification.className = `custom-notification alert alert-${type === "error" ? "danger" : type} alert-dismissible fade show`;
  notification.setAttribute("role", "alert");
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    max-width: 450px;
    background: rgba(18, 24, 38, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    backdrop-filter: blur(12px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border-radius: 12px;
  `;

  const iconClass =
    type === "success"
      ? "fa-check-circle text-success"
      : type === "error"
      ? "fa-exclamation-circle text-danger"
      : "fa-info-circle text-info";

  notification.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="fas ${iconClass} me-2 fs-5"></i>
      <span class="flex-grow-1">${message}</span>
      <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }
  }, 4500);
}

// ==================== Console Welcome ====================
console.log(
  "%c🚀 Arafil Azmi - Portfolio Website",
  "color: #6366f1; font-size: 14px; font-weight: bold;"
);

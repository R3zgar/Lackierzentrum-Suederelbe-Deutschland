// This line code for testing connection JavaScript file
console.log("Hello World!");

///////////////////////////////////////////////////////////
// Set current year-automatiqly change year every 1 janvier to current year

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scrool to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// this code for the social links, for open in the different window
document.addEventListener("DOMContentLoaded", function () {
  const socialLinks = document.querySelectorAll(".social-links a");

  socialLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      window.open(this.href, "_blank");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const towingService = document.querySelector(".towing-service");

  function checkScroll() {
    const position = towingService.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (position < windowHeight - 100) {
      towingService.classList.add("show");
    }
  }

  window.addEventListener("scroll", checkScroll);
});

document.addEventListener("DOMContentLoaded", function () {
  const mapLink = document.getElementById("mapLink");
  const latitude = 53.4629;
  const longitude = 9.795;

  mapLink.addEventListener("click", function (event) {
    event.preventDefault();

    if (navigator.userAgent.match(/iPhone|iPad|Mac/i)) {
      window.location.href = `maps://maps.apple.com/?q=${latitude},${longitude}`;
    } else if (navigator.userAgent.match(/Android/i)) {
      window.location.href = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
    } else {
      window.location.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
  });
});

// this code for the external links <a> Elements

document.addEventListener("DOMContentLoaded", function () {
  const footerLinks = document.querySelectorAll(
    ".footer-link",
    "a[href^='/impressum.html']"
  );

  footerLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetUrl = this.href;
      window.location.href = targetUrl;
    });
  });
});

// the code for photo modal
document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery-item img");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  const images = Array.from(galleryImages).map((img) => img.src);

  // open modal when click image
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", function () {
      currentIndex = index;
      openModal();
    });
  });

  function openModal() {
    modal.style.display = "flex";
    modalImg.src = images[currentIndex];
  }

  function closeModal() {
    modal.style.display = "none";
  }

  nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex];
  });

  prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex];
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // swipe for touchable outils
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    if (touchEndX < touchStartX - 50) {
      currentIndex = (currentIndex + 1) % images.length;
      modalImg.src = images[currentIndex];
    }
    if (touchEndX > touchStartX + 50) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      modalImg.src = images[currentIndex];
    }
  }
});

//////////////////////////////////////////////////////////////
// this code for EmailJS contat forum system
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("0UZMSd_IeSkZh_a5T");

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      const serviceID = "service_gcd7909"; // EmailJS Service ID
      const templateID = "template_qcku3tt"; // EmailJS Template ID

      // Get user's first name
      const userName = document.getElementById("full-name").value.trim();

      // Collect form data
      const params = {
        "full-name": userName,
        "last-name": document.getElementById("last-name").value,
        "phone-number": document.getElementById("phone-number").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      emailjs
        .send(serviceID, templateID, params)
        .then((response) => {
          console.log("Email sent successfully:", response);
          showStickySuccessMessage(userName); // Pass userName correctly
          document.getElementById("contact-form").reset(); // Reset form
        })
        .catch((error) => {
          console.error("EmailJS Error:", error); // Log error for debugging
          showStickyErrorMessage();
        });
    });
});

// ✅ Fixed function: Pass `userName` as a parameter
function showStickySuccessMessage(userName) {
  showStickyMessage(
    `<ion-icon name="checkmark-circle-outline" class="icon-success"></ion-icon> 
    <strong>${userName},</strong> Ihre Anfrage wurde erfolgreich übermittelt. <br> 
    Unser Team hat Ihre Anfrage erhalten und wird sich zeitnah mit Ihnen in Verbindung setzen.`,
    "success"
  );
}

function showStickyErrorMessage() {
  showStickyMessage(
    `<ion-icon name="close-circle-outline" class="icon-error"></ion-icon> 
    <strong>Fehler!</strong> Ihre Anfrage konnte nicht übermittelt werden. <br> 
    Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.`,
    "error"
  );
}

function showStickyMessage(message, type) {
  // Remove previous message if it exists
  const existingMessage = document.querySelector(".sticky-alert");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message box
  const messageBox = document.createElement("div");
  messageBox.className = `sticky-alert ${type}`;
  messageBox.innerHTML = `
    <p>${message}</p>
    <button class="close-btn" onclick="this.parentElement.remove()">×</button>
  `;

  // Append message below sticky menu
  document.querySelector(".header").after(messageBox);

  // Automatically remove after 9 seconds
  setTimeout(() => {
    messageBox.remove();
  }, 9000);
}

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/

"use strict";
//////////////////////////// variable selecting  ///////////////////////////////////////////////
// element
const cookieMessage = document.createElement("div");
const featuresImg = document.querySelectorAll(".features__img");
const header = document.querySelector(".header");
const logo = document.querySelector(".header__logo");
const modal = document.querySelector(".modal");
const modalInput = document.querySelectorAll(".modal__input");
const modalSuccsess = document.querySelector(".modal__succsess");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav__list");
const navLink = document.querySelectorAll(".nav__link");
const operationBox = document.querySelectorAll(".operations__box");
const operationsWrapper = document.querySelector(".operations__wrapper");
const overlay = document.querySelector(".modal__overlay");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slider__slide");
// buttons
const closeIcon = document.querySelector(".menu-btn__close");
const dots = document.querySelector(".dots");
const dot = document.querySelectorAll(".dots__dot");
const menuBtn = document.querySelector(".menu-btn");
const menuIcon = document.querySelector(".menu-btn__menu");
const modalClose = document.querySelector(".modal-btn__close");
const modalSubmit = document.querySelector(".modal-btn__submit");
const openAccount = document.querySelectorAll(".open-account");
const operationsBtnBox = document.querySelector(".operations__btn-box");
const operationsBtn = document.querySelectorAll(".operations__btn");
const sliderNext = document.querySelector(".slider__btn--next");
const sliderPrevious = document.querySelector(".slider__btn--previous");
// sections
const sections = document.querySelectorAll(".section");
const hero = document.querySelector(".hero");

//////////////////////////// Mobile menu  ///////////////////////////////////////////////
// closing menu function
const closeMenu = function () {
  nav.classList.remove("clicked");
  menuIcon.classList.remove("hidden");
  closeIcon.classList.add("hidden");
};
// toggle menu
menuBtn.addEventListener("click", function () {
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
  nav.classList.toggle("clicked");
});

// close menu with click outside of menu
document.querySelector("main").addEventListener("click", closeMenu);

//////////////////////////// Modal  ///////////////////////////////////////////////

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
};
// close modal
[modalClose, overlay].forEach((item) =>
  item.addEventListener("click", closeModal)
);
// open modal
openAccount.forEach((item) =>
  item.addEventListener("click", function () {
    modal.classList.remove("hidden");
    modalInput.forEach((item) => {
      item.classList.remove("not-valid");
      item.value = "";
      modalSuccsess.classList.remove("active");
    });
  })
);

// submitting
//// Validation Functions /////
const notValidFunc = function (e) {
  e.classList.add("not-valid");
  valid = false;
};
const validFunc = function (e) {
  e.classList.remove("not-valid");
  valid = true;
};
// Name and last name validation
let valid = false;
function nameValidation(n, e) {
  if (n.length < 3 || n.length > 25) {
    notValidFunc(e);
  } else {
    validFunc(e);
  }
}
// email validation
function emailValidation(email, e) {
  var emailRegex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
  var emailValid = email.match(emailRegex);
  if (!emailValid) {
    notValidFunc(e);
  } else {
    validFunc(e);
  }
}

modalInput.forEach((item) => {
  item.addEventListener("input", function (e) {
    if (e.target.id === "email") emailValidation(e.target.value, e.target);
    else nameValidation(e.target.value, e.target);
  });
});

modalSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  modalInput.forEach((item) => {
    if (item.value === "") valid = false;
  });
  if (valid) {
    modalSuccsess.classList.add("active");
    setTimeout(closeModal, 1000);
  }
});

//////////////////////////// cookie message  ///////////////////////////////////////////////
// for practicing create element in js
cookieMessage.classList.add("cookie-message");
cookieMessage.innerHTML =
  "We use cookies for improved functionality and analytics.<button class='cookie-btn'>Got it</button>";
// append as last child
hero.append(cookieMessage);

const cookieBtn = document.querySelector(".cookie-btn");
cookieBtn.addEventListener("click", function () {
  cookieMessage.remove();
});
//////////////////////////// Header Hover Effect  ///////////////////////////////////////////////
header.addEventListener("mouseover", function (e) {
  // target the nav__link
  if (e.target.classList.contains("nav__link")) {
    // target active nav__link
    const link = e.target;
    // chosing all nav__link siblings
    const siblings = link.closest(".header").querySelectorAll(".nav__link");
    // add active class
    link.classList.add("hovered--active");
    // make all siblings and logo not active
    [logo, ...siblings].forEach((item) => {
      if (item != link) {
        item.classList.add("hovered--not-active");
      }
    });
  }
});
header.addEventListener("mouseout", function (e) {
  // remove all not active class when hover is done
  [logo, ...navLink].forEach((item) =>
    item.classList.remove("hovered--not-active")
  );
});

//////////////////////////// Navigation Scroll  ///////////////////////////////////////////////
// add event listener to common parent
navList.addEventListener("click", function (e) {
  e.preventDefault();
  // determine what element originated the event
  const id = e.target.getAttribute("href");
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); // ? for validating if href is valid
});
//////////////////////////// Sticky header  ///////////////////////////////////////////////
const stickyNav = function (entries, ovbserver) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("sticky");
    hero.classList.add("jump-up");
  } else {
    header.classList.remove("sticky");
    hero.classList.remove("jump-up");
  }
};
const headerHight = -header.getBoundingClientRect().height + "px";
const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: headerHight,
});
heroObserver.observe(hero);
//////////////////////////// Sections reveal  ///////////////////////////////////////////////
const reveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.15,
});
sections.forEach(function (sec) {
  sectionObserver.observe(sec);
  sec.classList.add("section-hidden");
});
//////////////////////////// Lazy Load  ///////////////////////////////////////////////
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // adding srcset for make responsive
  entry.target.srcset = entry.target.dataset.srcset;
  // adding sizes for make responsive
  entry.target.sizes = entry.target.dataset.sizes;
  // removing lazy-load class after complete loading
  entry.target.addEventListener("load", function () {
    this.classList.remove("lazy-load");
  });
  // removing data- attributes
  ["data-src", "data-srcset", "data-sizes"].forEach((item) =>
    entry.target.removeAttribute(item)
  );
  // stop observing
  observer.unobserve(entry.target);
};
const lazyLoad = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.15,
  rootMargin: "100px",
});
featuresImg.forEach((item) => lazyLoad.observe(item));
//////////////////////////// Slider  ///////////////////////////////////////////////
const sliderfunc = function () {
  let currentSlide = 0;
  const maxSlide = slides.length;
  // functions
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const activateDot = function (slide) {
    dot.forEach((d) => d.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  const init = function () {
    goToSlide(0);
    activateDot(0);
  };

  // At begining
  init();

  // Next
  const next = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  sliderNext.addEventListener("click", next);
  // Previous
  const previous = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  sliderPrevious.addEventListener("click", previous);

  // keyboard
  document.addEventListener("keydown", function (e) {
    e.key === "ArrowRight" && next();
    e.key === "ArrowLeft" && previous();
  });

  // Dots

  dots.addEventListener("click", function (e) {
    const { slide } = e.target.dataset;
    if (!e.target.classList.contains("dots__dot")) return;
    goToSlide(slide);
    activateDot(slide);
  });
};
sliderfunc();
//////////////////////////// Partial elements and functions  ///////////////////////////////////////////////
// read more
// using bubbling phase
operationsWrapper.addEventListener("click", function (e) {
  if (e.target.classList.contains("operations__read-more")) {
    const id = e.target.dataset.more;
    document.querySelector(".operations__box--" + id).classList.toggle("more");
  }
});

// close (modal and menu) with Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeMenu();
    closeModal();
  }
});
//////////////////////////// Operation Tab change  ///////////////////////////////////////////////
operationsBtnBox.addEventListener("click", function (e) {
  const tabId = e.target.closest(".operations__btn")?.dataset.tab;
  // Guard clause
  if (!tabId) return;
  // remove all active classes from operations__box and buttons
  operationBox.forEach((item) =>
    item.classList.remove("operations__box--active")
  );
  operationsBtn.forEach((item) =>
    item.classList.remove("operations__btn--active")
  );
  // active tab
  document
    .querySelector(`.operations__box--${tabId}`)
    .classList.add("operations__box--active");

  document
    .querySelector(`.operations__btn--${tabId}`)
    .classList.add("operations__btn--active");
});

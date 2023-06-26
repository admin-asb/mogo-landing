"use strict";

const nav = document.querySelector("nav");
const links = document.querySelector(".nav_link");
const intro = document.querySelector(".intro");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");

/////////////////////////////////////////////////////////////////////////////////////
// Page navigation

document.querySelector(".nav").addEventListener("click", function (e) {
  //   console.log(e.target);
  e.preventDefault();

  if (e.target.classList.contains("nav_link")) {
    // console.log("LINK");
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link
      .closest(".header_inner")
      .querySelectorAll(".nav_link");
    const logo = link.closest(".header_inner").querySelector(".header_logo");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
        el.classList.remove("active");
      } else {
        el.classList.add("active");
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation
const navHeight = header.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) header.classList.add("header--fixed");
  else header.classList.remove("header--fixed");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(intro);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add("section--hidden");
// });

// Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelector(".btn");
const btnCloseModal = document.querySelector(".close-modal");

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

btnOpenModal.addEventListener("click", openModal);

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide=${i}></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  createDots();
  activateDot(0);
  goToSlide(0);
};
init();

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

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

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
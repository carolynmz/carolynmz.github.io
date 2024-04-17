const minmax = (value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => Math.min(max, Math.max(min, value));

const backgroundContainer = document.querySelector(".background");
const heroContainer = document.querySelector("section.hero");
const scrollIcon = document.querySelector(".icon-scroll");

const updateScrollThings = () => {
  // Background blur
  const endMark = 0.5;
  const topMark = 0.1;
  const {height, top} = heroContainer.getBoundingClientRect();
  const progress = minmax((-top * (1 - topMark)) / (height * endMark), 0, 1);
  backgroundContainer.style.setProperty("--background-blur-progress", progress);

  // scroll-mark
  scrollIcon.classList[-top < 32 ? "remove" : "add"]("hidden");
};
document.addEventListener("readystatechange", updateScrollThings);
window.addEventListener("load", updateScrollThings);
window.addEventListener("scroll", updateScrollThings);

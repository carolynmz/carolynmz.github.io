const minmax = (value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => Math.min(max, Math.max(min, value));

const backgroundContainer = document.querySelector(".background");
const heroContainer = document.querySelector(".js-hero");
const scrollIcon = document.querySelector(".icon-scroll");

const formBackgroundHolder = document.querySelector(".form-background-holder");
const formBackground = document.querySelector(".form-background");

const updateScrollThings = () => {
  if (backgroundContainer && heroContainer) {
    // Background blur
    const endMark = 0.5;
    const topMark = 0.1;
    const {height, top} = heroContainer.getBoundingClientRect();
    const progress = minmax((-top * (1 - topMark)) / (height * endMark), 0, 1);
    backgroundContainer.style.setProperty("--background-blur-progress", progress);

    // scroll-mark
    scrollIcon.classList[-top < 32 ? "remove" : "add"]("hidden");
  }

  if (formBackground) {
    // Background blur
    const endMark = 0.5;
    const topMark = 0.2;
    const {top} = formBackgroundHolder.getBoundingClientRect();
    const {height} = formBackground.getBoundingClientRect();
    const progress = minmax((-top * (1 - topMark)) / (height * endMark), 0, 1);
    formBackground.style.setProperty("--background-blur-progress", progress);
    console.log(`top: ${top.toFixed(0)}, height: ${height.toFixed(0)}`)
    formBackgroundHolder.style.height = `${height}px`;
    formBackgroundHolder.style.marginTop = `${height / 2}px`;
    formBackground.style.transition = "none";
    if (top <= 0) {
      formBackground.style.position = "fixed";
      formBackground.style.transform = "none";
    } else {
      formBackground.style.position = "fixed";
      formBackground.style.transform = `translateY(${top / 1.5}px)`;
    }
  }
};
document.addEventListener("readystatechange", updateScrollThings);
window.addEventListener("load", updateScrollThings);
window.addEventListener("scroll", updateScrollThings);

window.addEventListener("submit", async event => {
  const form = event.target;
  if (!form) {
    return;
  }
  event.preventDefault();
  try {
    form.classList.add("loading");
    await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      mode: "no-cors",
    });
    form.classList.remove("loading");
  } catch (e) {
    alert("Сталась посилка при надсиланні форми");
    console.error(e);
  }
  form.classList.remove("loading");
  form.classList.add("success");
});

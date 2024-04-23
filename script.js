const minmax = (value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => Math.min(max, Math.max(min, value));
const prgrs = (value, from, to, extrapolate_from = 0, extrapolate_to = 1) => minmax((value - from) / (to - from), 0, 1) * (extrapolate_to - extrapolate_from) + extrapolate_from;

const backgroundContainer = document.querySelector(".background");
const heroContainer = document.querySelector(".js-hero");
const scrollIcon = document.querySelector(".icon-scroll");

const formBackgroundHolder = document.querySelector(".form-background-holder");
const formBackground = document.querySelector(".form-background");
const finalBlock = document.querySelector(".js-final-block");

const updateScrollThings = () => {
  if (backgroundContainer && heroContainer) {
    // Background blur
    const topMark = 0.1;
    const endMark = 0.5;
    const {height, top} = heroContainer.getBoundingClientRect();
    let progress = prgrs(-top, height * topMark, height * endMark);
    backgroundContainer.style.setProperty("--background-blur-progress", progress);

    // scroll-mark
    scrollIcon.classList[-top < 32 ? "remove" : "add"]("hidden");
  }

  if (formBackground) {
    // Background blur
    const topMark = -0.5;
    const endMark = -0.2;
    const finalMark = 0.5;
    const {top} = formBackgroundHolder.getBoundingClientRect();
    const {top: finalBlockTop} = finalBlock.getBoundingClientRect();
    const {height} = formBackground.getBoundingClientRect();
    let progress = prgrs(-top, height * topMark, height * endMark);
    if (finalBlockTop < height * finalMark) {
      progress = prgrs(finalBlockTop, 0, height * finalMark);
    }
    formBackground.style.setProperty("--background-blur-progress", progress);

    formBackground.style.opacity = prgrs(top, height * 1.5, height * 0.95);

    formBackgroundHolder.style.height = `${height / 8}px`;
    formBackgroundHolder.style.marginTop = `${height / 2}px`;
    formBackground.style.transition = "none";
    if (top <= 0) {
      formBackground.style.position = "fixed";
      formBackground.style.transform = "none";
    } else {
      formBackground.style.position = "fixed";
      formBackground.style.transform = `translateY(${minmax(top / 1.5, 0, height * 2)}px)`;
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

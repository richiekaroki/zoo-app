function getObserver() {
  if (!getObserver.instance) {
    getObserver.instance = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.scrollDelay || "0", 10);
            const direction = el.dataset.scrollDirection || "up";

            setTimeout(() => {
              el.classList.add("scroll-revealed");
              el.style.setProperty("--scroll-dir", direction);
            }, delay);

            getObserver.instance.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
  }
  return getObserver.instance;
}

getObserver.instance = null;

export const scrollReveal = {
  mounted(el, binding) {
    const direction = binding.value?.direction || "up";
    const delay = binding.value?.delay || 0;

    el.dataset.scrollDirection = direction;
    el.dataset.scrollDelay = delay;
    el.classList.add("scroll-reveal");

    getObserver().observe(el);
  },
  unmounted(el) {
    getObserver().unobserve(el);
  },
};

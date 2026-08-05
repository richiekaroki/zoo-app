import { ref, onMounted, onUnmounted } from "vue";

export function useCountUp(target, duration = 2000) {
  const current = ref(0);
  const suffix = target.replace(/[0-9]/g, "");
  const numericTarget = parseInt(target, 10);
  let animationFrame = null;

  function animate(startTime) {
    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    current.value = Math.round(eased * numericTarget);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(() => animate(startTime));
    }
  }

  function start() {
    animationFrame = requestAnimationFrame((ts) => animate(ts));
  }

  onMounted(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    const el = document.querySelector("[data-count-up]");
    if (el) observer.observe(el);
  });

  onUnmounted(() => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });

  return { current, suffix };
}

import { ref, watch, onMounted } from "vue";

const theme = ref("light");
const isSystemDark = ref(false);
let mediaQuery = null;

function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
}

function getSystemPreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useDarkMode() {
  onMounted(() => {
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    isSystemDark.value = mediaQuery.matches;

    const saved = localStorage.getItem("wamzoo-theme");
    if (saved) {
      theme.value = saved;
    } else {
      theme.value = getSystemPreference();
    }
    applyTheme(theme.value);

    mediaQuery.addEventListener("change", (e) => {
      isSystemDark.value = e.matches;
      if (!localStorage.getItem("wamzoo-theme")) {
        theme.value = e.matches ? "dark" : "light";
        applyTheme(theme.value);
      }
    });
  });

  watch(theme, (val) => {
    applyTheme(val);
  });

  function toggleTheme() {
    theme.value = theme.value === "dark" ? "light" : "dark";
    localStorage.setItem("wamzoo-theme", theme.value);
  }

  function setTheme(t) {
    theme.value = t;
    localStorage.setItem("wamzoo-theme", t);
  }

  function resetToSystem() {
    localStorage.removeItem("wamzoo-theme");
    theme.value = getSystemPreference();
    applyTheme(theme.value);
  }

  return { theme, isSystemDark, toggleTheme, setTheme, resetToSystem };
}

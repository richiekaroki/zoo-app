import { ref } from "vue";

const toasts = ref([]);
let nextId = 0;

export function useToast() {
  function show({ message, type = "info", duration = 4000, title = "" }) {
    const id = nextId++;
    const toast = { id, message, type, title, visible: true };
    toasts.value.push(toast);

    if (duration > 0) {
      setTimeout(() => remove(id), duration);
    }
    return id;
  }

  function remove(id) {
    const toast = toasts.value.find((t) => t.id === id);
    if (toast) {
      toast.visible = false;
      setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id);
      }, 300);
    }
  }

  function success(message, opts = {}) {
    return show({ message, type: "success", ...opts });
  }

  function error(message, opts = {}) {
    return show({ message, type: "error", duration: 6000, ...opts });
  }

  function info(message, opts = {}) {
    return show({ message, type: "info", ...opts });
  }

  function warning(message, opts = {}) {
    return show({ message, type: "warning", duration: 5000, ...opts });
  }

  return { toasts, show, remove, success, error, info, warning };
}

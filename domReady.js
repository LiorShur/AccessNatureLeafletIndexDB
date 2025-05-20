// domReady.js
export function onDOMReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      requestAnimationFrame(() => {
        setTimeout(callback, 50);
      });
    });
  } else {
    requestAnimationFrame(() => {
      setTimeout(callback, 50);
    });
  }
}

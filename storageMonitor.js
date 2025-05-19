// storageMonitor.js

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function getStorageStatus() {
  const estimate = await navigator.storage?.estimate?.();
  const usage = estimate?.usage || 0;
  const quota = estimate?.quota || 0;

  const localStorageUsage = Object.keys(localStorage).reduce((sum, key) => {
    const value = localStorage.getItem(key);
    return sum + key.length + (value?.length || 0);
  }, 0);

  return {
    indexedDB: {
      usage,
      quota
    },
    localStorage: {
      usage: localStorageUsage,
      quota: 5 * 1024 * 1024 // 5MB default max
    }
  };
}

function renderStoragePanel(containerId = "storageStatus") {
  let el = document.getElementById(containerId);
  if (!el) {
    el = document.createElement("div");
    el.id = containerId;
    el.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      font-family: monospace;
      font-size: 12px;
      padding: 10px;
      border-radius: 6px;
      z-index: 9999;
      white-space: pre-line;
    `;
    document.body.appendChild(el);
  }

  async function update() {
    const status = await getStorageStatus();
    el.textContent =
      `🗃 IndexedDB: ${formatBytes(status.indexedDB.usage)} / ${formatBytes(status.indexedDB.quota)}\n` +
      `💾 LocalStorage: ${formatBytes(status.localStorage.usage)} / ${formatBytes(status.localStorage.quota)}`;
  }

  update();
  return setInterval(update, 5000); // Returns interval ID
}

export { renderStoragePanel, getStorageStatus };

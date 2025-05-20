// initApp.js
import { initMap } from './map.js';
import { renderStoragePanel } from './storageMonitor.js';
import { setControlButtonsEnabled, setTrackingButtonsEnabled } from './uiUtils.js';
import { loadSavedSessions } from './sessionManager.js';

export function initApp() {
  console.log("🚀 Initializing Access Nature App...");

  renderStoragePanel(); // floating storage panel

  loadSavedSessions(); // populate session list

  // Safe Leaflet initialization
  initMap(() => {
    console.log("🗺 Map initialized");
    setControlButtonsEnabled(true);
    setTrackingButtonsEnabled(true);
  });
}

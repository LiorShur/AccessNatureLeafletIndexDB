export function setControlButtonsEnabled(enabled) {
  const ids = [
    "startBtn", "resetBtn", "prepareAndExportBtn", "exportAllRoutesBtn",
    "exportDataBtn", "exportPDFBtn", "exportGPXBtn", "toggleArchivePanelBtn",
    "clearArchiveBtnBtn", "closeHistoryBtn", "clearAllSessionsBtn",
    "clearAllAppDataBtn", "loadSessionBtn"
  ];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.disabled = !enabled;
      el.style.opacity = enabled ? "1" : "0.5";
      el.style.pointerEvents = enabled ? "auto" : "none";
    }
  });
}

export function setTrackingButtonsEnabled(enabled) {
  const btnIds = ["startBtn", "pauseBtn", "stopBtn"];
  btnIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = !enabled;
  });
}
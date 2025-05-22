// db.js – IndexedDB Utility for Access Nature

const DB_NAME = "NatureTrackerDB";
const DB_VERSION = 2; // ⬅️ Bump this to trigger `onupgradeneeded`

// Consistent naming across app and DB
const STORE_NAMES = {
  SESSIONS: "sessions",
  BACKUPS: "backups",
  MEDIA: "media",
  ARCHIVE: "archive" // ✅ This must match the store used in your app
};

// === Open IndexedDB and initialize stores ===
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains(STORE_NAMES.SESSIONS)) {
        db.createObjectStore(STORE_NAMES.SESSIONS, { keyPath: "id", autoIncrement: true });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.BACKUPS)) {
        db.createObjectStore(STORE_NAMES.BACKUPS);
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.MEDIA)) {
        db.createObjectStore(STORE_NAMES.MEDIA, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.ARCHIVE)) {
        db.createObjectStore(STORE_NAMES.ARCHIVE, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

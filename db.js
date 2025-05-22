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
// === Generic helper functions ===

async function dbPut(storeName, value, key = null) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = key !== null ? store.put(value, key) : store.put(value);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbGet(storeName, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbGetAll(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbDelete(storeName, key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function dbClear(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function dbAdd(storeName, value, key = null) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = key ? store.add(value, key) : store.add(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

function dbClearStore(storeName) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}

function dbGetMedia(id) {
  return dbGet(STORE_NAMES.MEDIA, id).then(record => {
    if (!record) throw new Error(Media not found: ${id});
    return record.data;
  });
}

export {
  STORE_NAMES,
  dbPut,
  dbGet,
  dbGetAll,
  dbDelete,
  dbClear,
  dbAdd,
  dbClearStore,
  dbGetMedia
};

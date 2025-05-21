let map = null;
let marker = null;

export function initMap(callback) {
  if (map && map.remove) map.remove();

  map = L.map('map').setView([0, 0], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  marker = L.marker([0, 0]).addTo(map).bindPopup("Start").openPopup();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setTimeout(() => {
        map.setView(userLocation, 17);
        marker.setLatLng(userLocation);
      }, 150);
    });
  }

  if (callback) callback();
}

export function getMap() {
  return map;
}

export function getMapInstance() {
  return mapInstance;
}

export function getMarker() {
  return marker;
}

export function getMarkerInstance() {
  return MarkerInstance;
}


var heatmapData = [
  new google.maps.LatLng(37.074, 37.339),
  new google.maps.LatLng(37.074, 37.337),
  new google.maps.LatLng(37.074, 37.335),
  new google.maps.LatLng(37.074, 37.333),
  new google.maps.LatLng(37.074, 37.331),
  new google.maps.LatLng(37.074, 37.329),
  new google.maps.LatLng(37.074, 37.327),
  new google.maps.LatLng(37.077, 37.339),
  new google.maps.LatLng(37.077, 37.337),
  new google.maps.LatLng(37.077, 37.335),
  new google.maps.LatLng(37.077, 37.333),
  new google.maps.LatLng(37.077, 37.331),
  new google.maps.LatLng(37.077, 37.329),
  new google.maps.LatLng(37.077, 37.327)
];

let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

async function initMap(): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 37, lng: 37 },
    zoom: 8,
  });

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData
  });
  heatmap.setMap(map);

  const image = "./scooter'.png";
  const scooterMarker = new google.maps.Marker({
    position: { lat: -33.89, lng: 151.274 },
    map,
    icon: image,
  });

  
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter()!);
    }
  });
}

function handleLocationError(
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}




initMap();
export {};

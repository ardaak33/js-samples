
var heatmapData = [
{location:new google.maps.LatLng(37.07663065783867, 37.33056655817415),weight:115},
{location:new google.maps.LatLng(37.07741815406587, 37.32980481084957),weight:125},
{location:new google.maps.LatLng(37.07657073932061, 37.33180037425767),weight:131},
{location:new google.maps.LatLng(37.07735823616272, 37.33098498275759),weight:155},
{location:new google.maps.LatLng(37.07778622014642, 37.33145705152079),weight:135},
{location:new google.maps.LatLng(37.07833403612035, 37.33153215336949),weight:133},
{location:new google.maps.LatLng(37.07575755464026, 37.33010521823263),weight:128},
{location:new google.maps.LatLng(37.07671625565642, 37.32963314950775),weight:135},
{location:new google.maps.LatLng(37.07600579088824, 37.33168235709454),weight:132},
{location: new google.maps.LatLng(37.076322504917755, 37.33275524064728),weight:145}
];

let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

async function initMap(): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 37.07, lng: 37.3 },
    zoom: 14,
  });

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData
  });
  heatmap.setMap(map);
  heatmap.set("radius", 40);


  const image = "./scooter'.png";
  const scooterMarker1 = new google.maps.Marker({
    position: { lat: 37.07669913610292, lng: 37.33134976316552 },
    map,
    icon: image,
  });
  const scooterMarker2 = new google.maps.Marker({
    position: { lat: 37.076433782505966, lng: 37.32941857279826},
    map,
    icon: image,
  });
  const scooterMarker3 = new google.maps.Marker({
    position: { lat: 37.07749519129968, lng:37.33158579761951},
    map,
    icon: image,
  });
  const locationMarker = new google.maps.Marker({
    position: { lat: 37.076756771271185, lng:37.33071931923576},
    map,
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

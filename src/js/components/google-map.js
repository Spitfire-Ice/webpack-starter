const GoogleMap = (function initial() {
  /* eslint-disable */
  const handleGoogleMaps = () => {
    function initialize() {
      const styleArray = [{
        featureType: 'all',
        stylers: [{
          saturation: -80,
        }],
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          hue: '#00ffee',
        }, {
          saturation: 50,
        }],
      }, {
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [{
          visibility: 'off',
        }],
      }];

      const NewYork = new google.maps.LatLng(41.850, -73.961);
      const map = new google.maps.Map(document.getElementById('map'), {
        center: NewYork,
        styles: styleArray,
        scrollwheel: false,
        zoom: 6,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
        scaleControl: false,
      });

      const coordInfoWindow = new google.maps.InfoWindow();
      coordInfoWindow.setContent(createInfoWindowContent(NewYork, map.getZoom()));
      coordInfoWindow.setPosition(NewYork);
      coordInfoWindow.open(map);

      map.addListener('zoom_changed', () => {
        coordInfoWindow.setContent(createInfoWindowContent(NewYork, map.getZoom()));
        coordInfoWindow.open(map);
      });

      const TILE_SIZE = 256;

      function createInfoWindowContent(latLng, zoom) {
        const scale = 1 << zoom;

        const worldCoordinate = project(latLng);

        const pixelCoordinate = new google.maps.Point(
          Math.floor(worldCoordinate.x * scale),
          Math.floor(worldCoordinate.y * scale),
        );

        const tileCoordinate = new google.maps.Point(
          Math.floor(worldCoordinate.x * scale / TILE_SIZE),
          Math.floor(worldCoordinate.y * scale / TILE_SIZE),
        );

        return [
          '277 Bedford Avenue, <br> Brooklyn, NY 11211, <br> New York, USA',
        ].join('<br>');
      }

      function project(latLng) {
        let siny = Math.sin(latLng.lat() * Math.PI / 180);

        siny = Math.min(Math.max(siny, -0.9999), 0.9999);

        return new google.maps.Point(
          TILE_SIZE * (0.5 + latLng.lng() / 360),
          TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)),
        );
      }
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  };

  return {
    init() {
      handleGoogleMaps();
    },
  };
}());

$(document).ready(() => {
  GoogleMap.init();
});

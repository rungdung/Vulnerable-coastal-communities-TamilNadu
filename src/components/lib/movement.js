// Geospatial librarie
import * as turf from "@turf/turf";
import maplibre from "maplibre-gl";
// Pans and zooms to next story point
export function moveTo( coords, zoom, pitch=60, bearing=30,  layer, map) {
  map.flyTo({
    center: coords,
    zoom: zoom,
    pitch: pitch, // pitch in degrees
    bearing: bearing, // bearing in degrees
    speed: 0.6,
    curve: 1.3,
    easing: function (t) {
      return t;
    },
  });
  if(layer){
    map.setLayoutProperty(layer, "visibility", "visible");
  }
}

// Scatter effect to illustrate scale and disorient user
// Scatter effect to illustrate scale and disorient user
export function makeGrid(map) {
  // If layer does not exist, calculate and display
  let layer = map.getSource("atRiskVillages100mts");
  const features = map.querySourceFeatures("atRiskVillages100mts", {
    sourceLayer: layer.sourceLayer,
  });

  const geojsonLayer = {
    type: "FeatureCollection",
    features: features.map((feature) => {
      return {
        type: "Feature",
        properties: feature.properties,
        geometry: feature.geometry,
      };
    }),
  };

  // function to use turf.transformTranslate to move to targetPosition
  function moveToPos(currentGeometry, startPosition, endPosition) {
    const distance = turf.distance(startPosition, endPosition);
    const direction = turf.bearing(startPosition, endPosition);

    turf.transformTranslate(currentGeometry, distance, direction, {
      mutate: true,
    });
  }

  // Iterates through each feature and assigns a random position
  turf.geomEach(
    geojsonLayer,
    function (
      currentGeometry,
      featureIndex,
      featureProperties,
      featureBBox,
      featureId
    ) {
      let startPosition = turf.centerOfMass(currentGeometry);

      // Get the map bounds
      const bounds = map.getBounds();
      // Extract the bounds coordinates
      const { lng: west, lat: south } = bounds.getSouthWest();
      const { lng: east, lat: north } = bounds.getNorthEast();
      // Generate a random position within the bounds
      const targetPosition = turf.randomPosition([west, south, east, north]);
      moveToPos(currentGeometry, startPosition, targetPosition);
      //console.log(currentGeometry);
    }
  );

  // Disable previous layer and add as new layer
  map.setLayoutProperty("atRiskVillages100mts", "visibility", "none");
  map.addSource("atRiskVillages100mtsScattered", {
    type: "geojson",
    data: geojsonLayer,
  });
  map.addLayer({
    id: "atRiskVillages100mtsScattered",
    type: "fill",
    source: "atRiskVillages100mtsScattered"
    });
  
  map.addLayer({
    id: "atRiskVillage100mtsLineScatteredLine",
    type: "line",
    source: "atRiskVillages100mtsScattered",
    paint: {
      "line-color": "black",
      "line-width": 3,
      "line-opacity": 0.5,
    },
  });

  map.on("click", "atRiskVillages100mtsScattered", function (e) {
    map.flyTo({
      center: e.lngLat,
      zoom: 12,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
  });
  const popup = new maplibre.Popup();
  map.on("mouseenter", "atRiskVillages100mtsScattered", function (e) {
    map.getCanvas().style.cursor = "pointer";
    
    popup
      .setLngLat(e.lngLat)
      .setHTML(
        e.features[0].properties.name +
          "<br> Total Population: " +
          e.features[0].properties.tot_p
      )
      .addTo(map);
  });
  map.on("mouseleave", "atRiskVillages100mtsScattered", function () {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
  
  //map.getSource("atRiskVillages100mts").setData(geojsonLayer);
  // Style the layer
}

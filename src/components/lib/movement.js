// Geospatial librarie
import * as turf from "@turf/turf";

// Pans and zooms to next story point
export function moveTo( coords, zoom, layer, map) {
  map.flyTo({
    center: coords,
    zoom: zoom,
    pitch: 60, // pitch in degrees
    bearing: 30, // bearing in degrees
    speed: 0.5,
    curve: 1,
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
  console.log("Scatter activating"
  )
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

  // Updates the source with the new data
  map.getSource("atRiskVillages100mts").setData(geojsonLayer);
  // Style the layer
}

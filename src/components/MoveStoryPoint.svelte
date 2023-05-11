<script>
  import Header from "./Header.svelte";
  import maplibre from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  // Geospatial librarie

  import * as turf from "@turf/turf";

  var title;
  var subtitle;
  export let map;

  // Displayes interarctive text on top of the map for narrative storytelling
  let titles = [
    "Impact on vulnerable coastal communities in TamilNadu due to climate change",
    "These are villages in coastal tamilnadu that are vulnerable",
    "This is the hazard line demarcated by NCSCM and GoI",
  ];
  let subtitles = [
    "An ongoing effort",
    " These villages are 100 mts from the Hazard Line demarcated by NCSCM and GoI",
    "Notice the intersections between the CRZ No Development Zone and the Hazard Line",
  ];
  let coords = [
    [78.486328, 10.297698],
    [78.486328, 10.297698],
    [78.486328, 10.297698],
  ];
  // Layer to enable
  let layer = ["fishersSettlement", "villageText", "NDZline"];
  let zoom = [7, 7, 10];

  let currentIndex = 0;

  function moveTo() {
    currentIndex = (currentIndex + 1) % titles.length;
    map.flyTo({
      center: coords[currentIndex],
      zoom: zoom[currentIndex],
      pitch: 60, // pitch in degrees
      bearing: 30, // bearing in degrees
      speed: 0.5,
      curve: 1,
      easing: function (t) {
        return t;
      },
    });

    map.setLayoutProperty(layer[currentIndex], "visibility", "visible");
  }

  function makeGrid() {
    // turf
    // to animate geojson features to split up
    console.log("test");
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

    turf.geomEach(
      geojsonLayer,
      function (
        currentGeometry,
        featureIndex,
        featureProperties,
        featureBBox,
        featureId
      ) {
        //console.log(currentGeometry);
        console.log(featureIndex)
        //=featureProperties
        //=featureBBox
        //=featureId
      }
    );
  }
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
</svelte:head>

<main>
  <div class="container-class">
    <Header>
      <span slot="title">{titles[currentIndex]}</span>
      <span slot="subtitle">{subtitles[currentIndex]}</span>
    </Header>
    <!-- button to move to the next story -->
    <div id="button-container" class="mt-4">
      <button id="moveButton" class="Button" on:click={moveTo}>
        Move to next point
      </button>

      <button id="gridButton" class="Button" on:click={makeGrid}>
        Make Grid
      </button>
    </div>
  </div>
</main>

<style>
  .container-class {
    font-family: "Averia Serif Libre", cursive;
    position: absolute;
    top: 2em;
    left: 1em;
    width: auto;
    max-width: 50vw;
    padding: 0rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    margin: 1rem;
  }

  .Button {
    background-color: black; /* Parchment yellow */
    border: none;
    color: white;
    padding: 0.5em 1em;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
</style>

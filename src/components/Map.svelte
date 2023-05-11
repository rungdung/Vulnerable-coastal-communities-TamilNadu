<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";

  import maplibre from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";
  import MapboxDraw from "@mapbox/mapbox-gl-draw";
  import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

  import { loadLayers } from "./lib/layers.js";
  import { ScaleOut } from "svelte-loading-spinners";

  import Legend from "./Legend.svelte";
  import MoveStoryPoint from "./MoveStoryPoint.svelte";

  let map;
  let mapContainer;
  let loadStatus = false;

  onMount(() => {
    // New Map object
    map = new maplibre.Map({
      container: mapContainer,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [78.486328, 10.297698],
      pitch: 60, // pitch in degrees
      bearing: 30, // bearing in degrees
      zoom: 7,
      maxZoom: 10,
      minZoom: 3,
    }).addControl(new maplibre.AttributionControl({
    customAttribution: "ML Infomap. (2013) Tamil Nadu, India: Village Socio-Demographic and Economic Census Data, 2001 | CRZ data from National Centre for Sustainable Coastal Management"
    }));;

    // // Draw control
    // var Draw = new MapboxDraw();
    // map.addControl(Draw, "bottom-left");

    // Add layers once map loads
    map.on("load", () => {
      loadLayers(map);
      // events
      const popup = new maplibre.Popup();
      map.on("mouseenter", "atRiskVillages100mts", function (e) {
        map.getCanvas().style.cursor = "pointer";
        popup
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.name + "<br> Total Population: " + e.features[0].properties.tot_p)
          .addTo(map);
      });
      map.on("mouseleave", "atRiskVillages100mts", function () {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
      map.on("click", "atRiskVillages100mts", function (e) {
        map.flyTo({
          center: e.lngLat,
          zoom: 12,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      });
    });

    map.on("idle", function () {
      loadStatus = true;
    });
  });

  onDestroy(() => {
    map.remove();
  });
</script>

<div id="map" bind:this={mapContainer} />
<Legend {map} />
<MoveStoryPoint {map} />
{#if loadStatus == false}
  <span id="loading-icon" class="content-centre">
    <ScaleOut
      id="loading-icon"
      size="100"
      color="#0f4456"
      unit="px"
      duration="1s"
    />
  </span>
{/if}

<style>
  #map {
    position: absolute;
    height: 100vh;
    width: 100%;
  }

  #loading-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

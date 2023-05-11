<script>
  import { onMount } from "svelte";

  export let map;
  let toggleableLayerIds = ["hazardLine", "CRZboundary", "atRiskVillages100mts", "fishersSettlement", "NDZline", "DEM80cm", "DEM150cm"];

  const toggleLayer = (e) => {
    const clickedLayer = e.target.textContent.trim();
    console.log(clickedLayer);
    e.preventDefault();
    e.stopPropagation();

    const visibility = map.getLayoutProperty(clickedLayer, "visibility");

    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "none");
    } else {
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
    }
  };

  onMount(() => {
    toggleableLayerIds = toggleableLayerIds.filter(
      (id) => !document.getElementById(id)
    );
  });
</script>

<div id="menu">
  {#each toggleableLayerIds as id}
    <a
      href="#"
      on:click={toggleLayer}
    >
    {id}
    </a>
  {/each}
</div>

<nav id="menu" />
<div id="map" />

<style>
  #menu {
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    border-radius: 3px;
    width: auto;
    border: 1px solid rgba(0, 0, 0, 0.4);
    margin: 2em;
    font-family: "Open Sans", sans-serif;
  }

  #menu a {
    font-size: 13px;
    color: #404040;
    display: block;
    margin: 0;
    padding: 0;
    padding: 10px;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    text-align: center;
  }

  #menu a:last-child {
    border: none;
  }

  #menu a:hover {
    background-color: #f8f8f8;
    color: #404040;
  }

  #menu a.active {
    background-color: #3887be;
    color: #ffffff;
  }

  #menu a.active:hover {
    background: #3074a4;
  }
</style>

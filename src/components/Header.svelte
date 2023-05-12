<script>
  // Displayes interarctive text on top of the map for narrative storytelling]
  import { fade } from 'svelte/transition';


</script>
<!-- <section id="header">
  <h1 class="text-4xl  font-bold">
    Impact on vulnerable coastal communities in TamilNadu due to climate change
  </h1>
  <p class="text-xl">
    An ongoing effort
  </p>
</section> -->

<div id="text">
  <h1 transition:fade class="text-4xl  font-bold">
    <slot name="title">
    </slot>
  </h1>
  <p transition:fade class="text-xl">
    <slot name="subtitle">
    </slot>
  </p>
  <div id="Buttons">
    <slot name="buttons">
    </slot>
  </div>
</div>

<style>
#text, #header{
  height: 100vh;
}
</style>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
</svelte:head>
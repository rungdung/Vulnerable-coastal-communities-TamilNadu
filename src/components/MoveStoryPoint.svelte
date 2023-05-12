<script>
  // Movement functions
  import { moveTo, makeGrid } from "./lib/movement.js";

  // StoryTelling
  import Header from "./Header.svelte";
  import readYaml from "read-yaml";
  import Scrolly from "./Scrolly.svelte";
  import storyPoints from "../storyPoints.yaml";
  import jsYaml from "js-yaml";
  let value;

  // Import from parent file
  export let map;

  // Transitions
  import { slide } from "svelte/transition";
  import { fade } from "svelte/transition";

  // Watch for changes in the scrollPosition variable "value"
  // Trigger the moveTo function when value changes or activate other options
  let previousValue = value;
  $: {
    if (previousValue !== value) {
      let storyPoint = storyPoints[value];

      moveTo(
        storyPoint["coords"],
        storyPoint["zoom"],
        storyPoint["layer"],
        map
      );

      if(storyPoint['options']){
        Object.values(storyPoint['options']).forEach(option => {
          if(option['activateScatter']){
            makeGrid(map)
          }
        })
      }
      previousValue = value;
    }
  }
</script>

<main>
  <section id="scroll">
    <div class="container-class">
      <Scrolly bind:value>
        {#each Object.values(storyPoints) as storyPoint}
          <Header>
            <span slot="title" transition:slide>
              {storyPoint["title"]}
            </span>
            <span slot="subtitle" transition:slide>
              {storyPoint["subtitle"]}
            </span>
          </Header>
        {/each}
      </Scrolly>
    </div>
  </section>
</main>

<style>
  #scroll {
    height: 100vh;
    position: absolute;
    overflow: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  #scroll:-webkit-scrollbar {
    display: none;
  }
  .container-class {
    font-family: "Averia Serif Libre", cursive;
    position: relative;
    z-index: 5;
    width: auto;
    max-width: 50vw;
    padding: 3rem;
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

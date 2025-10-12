<template>
  <div id="app">
    <h1>Eco Monitoring Dashboard</h1>
    <EcoTable :selectedCountry="selectedCountry" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import EcoTable from "./components/EcoTable.vue";

  export default defineComponent({
    name: "App",
    components: { EcoTable },
    setup() {
      const selectedCountry = ref("Ukraine");
      const onCountrySelected = (country: string) => {
        selectedCountry.value = country;
      };
      return { selectedCountry, onCountrySelected };
    }
  });
</script>

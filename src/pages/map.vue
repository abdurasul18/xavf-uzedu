<script setup lang="ts">
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import uzbekistanMapData from "./uzb.json";
import { Chart } from "highcharts-vue";

// Initialize the Highcharts Map module
HighchartsMap(Highcharts);
Highcharts.maps["countries/nl/nl-all-all"] = uzbekistanMapData;

const chartOptions = ref({});
let keyIndex = ref(0);
onMounted(async () => {
  const world = await fetch(
    "https://code.highcharts.com/mapdata/custom/world.topo.json"
  ).then((response) => response.json());

  const topology = await fetch(
    "https://code.highcharts.com/mapdata/countries/it/it-all.topo.json"
  ).then((response) => response.json());

  // Prepare random-like demo data
  const data = topology.objects.default.geometries.map((g:any, i:any) => [
    g.properties["hc-key"],
    i % 10,
  ]);

  chartOptions.value = {
    chart: {
      map: uzbekistanMapData,
    },

    title: {
      text: "Highcharts Maps basic demo",
    },

    subtitle: {
      text:
        'Source map: <a href="https://code.highcharts.com/mapdata/countries/uz/uz-all.topo.json">Uzbekistan</a>',
    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "bottom",
      },
    },

    colorAxis: {
      min: 0,
    },

    series: [
      {
        states: {
          inactive: {
            enabled: false,
          },
        },
        name: "Background map",
        mapData: world,
        affectsMapView: false,
        borderColor: "rgba(0, 0, 0, 0)",
        nullColor: "rgba(196, 196, 196, 0.2)",
      },
      {
        name: topology.title || "Map",
        mapData: topology,
        data,
      },
    ],
  };
  keyIndex.value++;
});
</script>
<template>
  <div>
    <Chart :options="chartOptions" :key="keyIndex"></Chart>
  </div>
</template>

<style scoped>
div {
  height: 500px;
}
</style>

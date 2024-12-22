<script lang="ts" setup>
import {
  generateHighChartColumnOpt,
  generateHighChartPieOpt,
} from "./utils/chartOptions";
import highchart from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
import { Chart, ChartProps } from "highcharts-vue";
import VariablePie from "highcharts/modules/variable-pie.js";

highcharts3d(highchart);
VariablePie(highchart);
import { DocumentService, IStat } from "/@src/services/docs";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let keyIndex = ref(0);
let loading = ref(false);
let data = ref<IStat[]>([]);

async function getData() {
  try {
    loading.value = true;
    let res = await DocumentService.getStat();
    data.value = res.data.data.map((el: any) => {
      return {
        ...el,
        count: +el.count,
      };
    });
    keyIndex.value++;
  } finally {
    loading.value = false;
  }
}
let chartOpt = computed(() => {
  let labels = ["O'rta", "Quyi", "Yuqori"];
  let lev1 = data.value.find((el) => el.rate == 100)?.count || 0;
  let lev2 = data.value.find((el) => el.rate == 200)?.count || 0;
  let lev3 = data.value.find((el) => el.rate == 300)?.count || 0;
  return generateHighChartPieOpt(" ", [
    {
      name: "Quyi",
      y: lev1,
      z: 95,
    },
    {
      name: "O`rta",
      y: lev2,
      z: 118,
    },
    {
      name: "Yuqori",
      y: lev3,
      z: 131,
    },
  ]);
});
let chartOpt2 = computed(() => {
  let labels = ["O'rta", "Quyi", "Yuqori"];
  let lev1 = data.value.find((el) => el.rate == 100)?.count || 0;
  let lev2 = data.value.find((el) => el.rate == 200)?.count || 0;
  let lev3 = data.value.find((el) => el.rate == 300)?.count || 0;
  return generateHighChartColumnOpt("", labels, [lev1, lev2, lev3]);
});
onMounted(() => {
  getData();
});
</script>
<template>
  <div>
    <AppTitle>Statistika</AppTitle>
    <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
      <div
        class="rounded-[20px] h-[136px] flex flex-col justify-between p-5 bg-success bg-opacity-10"
      >
        <div class="flex justify-between items-center">
          <div class="text-success text-sm">Quyi</div>
          <div><img src="/img/svg/stat-done.svg" alt="" /></div>
        </div>
        <div class="text-3xl">
          <n-number-animation
            locale="ru"
            :from="0"
            :to="data.find((el) => el.rate == 100)?.count || 0"
          />
        </div>
      </div>
      <div
        class="rounded-[20px] h-[136px] flex flex-col justify-between p-5 bg-[#FF9500] bg-opacity-10"
      >
        <div class="flex justify-between items-center">
          <div class="text-[#FF9500] text-sm">O'rta</div>
          <div><img src="/img/svg/stat-process.svg" alt="" /></div>
        </div>
        <div class="text-3xl">
          <n-number-animation
            locale="ru"
            :from="0"
            :to="data.find((el) => el.rate == 200)?.count || 0"
          />
        </div>
      </div>

      <div
        class="rounded-[20px] h-[136px] flex flex-col justify-between p-5 bg-danger bg-opacity-10"
      >
        <div class="flex justify-between items-center">
          <div class="text-danger text-sm">Yuqori</div>
          <div><img src="/img/svg/stat-expired.svg" alt="" /></div>
        </div>
        <div class="text-3xl">
          <n-number-animation
            locale="ru"
            :from="0"
            :to="data.find((el) => el.rate == 300)?.count || 0"
          />
        </div>
      </div>
    </div>
    <div class="mt-12 grid md:grid-cols-2 gap-4">
      <n-card class="" :bordered="true">
        <div class="flex justify-center"><Chart :options="chartOpt" :key="keyIndex"></Chart></div>
      </n-card>
      <n-card class="" :bordered="true">
        <div class="flex justify-center"><Chart :options="chartOpt2" :key="keyIndex"></Chart></div>
      </n-card>
    </div>
  </div>
</template>
<style lang="scss">
.highcharts-credits {
  display: none;
}
</style>

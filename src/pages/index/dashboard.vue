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
import { useI18n } from "vue-i18n";
import { IRegion } from "/@src/services/region";
import { useApiService } from "/@src/composable/getList";
import { CategoryService, ICategory } from "/@src/services/category";
import { DashboarService, IStat } from "/@src/services/dashboard";
const { t } = useI18n();
let keyIndex = ref(0);
let category_id = ref();
const { list: categoryList, fetchData: getCategory } = useApiService<ICategory>(
  CategoryService.getList
);
onMounted(() => {
  getCategory();
});
watch(
  () => categoryList.value,
  (v) => {
    if (v.length) {
      category_id.value = v[0].id;
    }
  }
);
let loading = ref(false);
let data = ref<IStat[]>([]);
let region = ref<IRegion | null>(null);
let params = computed(() => {
  return {
    category_id: category_id.value || "",
    region_id: region.value?.id || "",
  };
});
watch(
  () => params.value,
  () => {
    getData();
  },
  { deep: true }
);
async function getData() {
  try {
    loading.value = true;
    let res = await DashboarService.getStat(params.value);
    data.value = res.data.data;
    keyIndex.value++;
  } finally {
    loading.value = false;
  }
}
let lev1 = computed(() => data.value.filter((el) => el.rate < 61).length);
let lev2 = computed(
  () => data.value.filter((el) => el.rate >= 61 && el.rate < 81).length
);
let lev3 = computed(() => data.value.filter((el) => el.rate >= 81).length);
let chartOpt = computed(() => {
  let labels = ["O'rta", "Quyi", "Yuqori"];

  return generateHighChartPieOpt(" ", [
    {
      name: "Quyi",
      y: lev1.value,
      z: 95,
    },
    {
      name: "O`rta",
      y: lev2.value,
      z: 118,
    },
    {
      name: "Yuqori",
      y: lev3.value,
      z: 131,
    },
  ]);
});

onMounted(() => {
  getData();
});

function setRegion(val: IRegion) {
  region.value = val;
}
</script>
<template>
  <n-spin :show="loading">
    <AppTitle>Statistika</AppTitle>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="col-span-full">
        <n-tabs
          class="c-tabs"
          type="segment"
          animated
          size="large"
          v-if="category_id"
          v-model:value="category_id"
        >
          <n-tab-pane v-for="item in categoryList" :name="item.id">
            <template #tab> {{ item.name }} </template>
          </n-tab-pane>
        </n-tabs>
      </div>
      <div class="col-span-full">
        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
          <div
            class="rounded-[20px] h-[136px] flex flex-col justify-between p-5 bg-success bg-opacity-10"
          >
            <div class="flex justify-between items-center">
              <div class="text-success text-sm">Quyi</div>
              <div><img src="/img/svg/stat-done.svg" alt="" /></div>
            </div>
            <div class="text-3xl">
              <n-number-animation locale="ru" :from="0" :to="lev1" />
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
              <n-number-animation locale="ru" :from="0" :to="lev2" />
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
              <n-number-animation locale="ru" :from="0" :to="lev3" />
            </div>
          </div>
        </div>
      </div>
      <div class="h-full md:flex flex-col items-center justify-center hidden">
        <n-scrollbar class="w-full" x-scrollable>
          <div class="wrap-svg">
            <div style="transform: scale(0.6); margin-top: -80px">
              <UzbekistanSvg @update-region="setRegion" />
            </div>
          </div>
        </n-scrollbar>
      </div>
      <n-card class="" :bordered="true">
        <div class="text-xl font-semibold">
          {{ region?.name }}
        </div>
        <div class="flex justify-center">
          <Chart :options="chartOpt" :key="keyIndex"></Chart>
        </div>
      </n-card>
    </div>
  </n-spin>
</template>
<style lang="scss">
.highcharts-credits {
  display: none;
}
@media (max-width: 768px) {
  .wrap-svg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    overflow: hidden;
  }
}
</style>

<script lang="ts" setup>
import { RegionService } from "../../services/region";
let props = defineProps<{
  schema?: any;
}>();
let loading = ref(false);
let list = ref([]);
async function getList() {
  try {
    loading.value = true;
    let res = await RegionService.getRegions();
    list.value = res.data.data;
  } finally {
    loading.value = false;
  }
}
onMounted(getList);
</script>
<template>
  <n-select
    filterable
    :options="list"
    :loading="loading"
    clearable
    remote
    value-field="id"
    label-field="name"
    class="c-select"
    :status="schema?.$error ? 'error' : ''"
    v-bind="$attrs"
  />
</template>
<style lang="scss">
.select-tooltip * {
  color: #fff !important;
}
</style>

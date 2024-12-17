<script lang="ts" setup>
import { PriceService } from '/@src/services/price';
let props = defineProps<{
  schema?: any;
}>();
let loading = ref(false);
let list = ref([]);
async function getList() {
  try {
    loading.value = true;
    let res = await PriceService.getList();
    list.value = res.data.results;
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
    value-field="price"
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

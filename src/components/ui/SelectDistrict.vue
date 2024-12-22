<script lang="ts" setup>
import { RegionService } from "../../services/region";
let props = defineProps<{
  schema?: any;
  regionId: any;
}>();
let loading = ref(false);
let list = ref([]);
watch(() => props.regionId, getList);
async function getList() {
  if (!props.regionId) return;
  try {
    loading.value = true;
    let res = await RegionService.getDistricts(props.regionId);
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
    size="large"
    :status="schema?.$error ? 'error' : ''"
    v-bind="$attrs"
  />
</template>
<style lang="scss">
.select-tooltip * {
  color: #fff !important;
}
</style>

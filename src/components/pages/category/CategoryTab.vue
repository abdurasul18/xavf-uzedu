<script lang="ts" setup>
import { CategoryService, ICategory } from "/@src/services/category";
let props = defineProps<{
  value?: any;
}>();
let emits = defineEmits(["update:value"]);
let compVal = computed({
  get: () => props.value,
  set: (val) => emits("update:value", val),
});
let list = ref<ICategory[]>([]);
async function getList() {
  try {
    let res = await CategoryService.getList();
    list.value = res.data.data;
    compVal.value = props.value || String(list.value[0].id);
  } finally {
  }
}
onMounted(() => {
  getList();
});
</script>
<template>
  <!-- <n-tabs
    class="c-tabs max-w-[500px]"
    type="segment"
    animated
    size="large"
    v-model:value="compVal"
  >
    <n-tab-pane :name="String(item.id)" v-for="item in list" :key="item.id">
      <template #tab> {{ item.name }} </template>
    </n-tab-pane>
  </n-tabs> -->

  <n-radio-group v-model:value="compVal" name="category" size="medium">
    <n-radio-button v-for="item in list" :key="item.id" :value="String(item.id)">
      {{ item.name }}
    </n-radio-button>
  </n-radio-group>
</template>
<style lang="scss"></style>

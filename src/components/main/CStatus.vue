<script lang="ts" setup>
let props = defineProps<{
  rate: 100 | 200 | 300;
}>();
</script>
<template>
  <n-tag v-if="rate == 100" type="info" round secondary v-bind="$attrs"> Quyi </n-tag>
  <n-tag v-else-if="rate == 200" type="warning" round secondary v-bind="$attrs">
    O'rta
  </n-tag>
  <n-tag v-else-if="rate == 300" type="error" round secondary v-bind="$attrs">
    Yuqori
  </n-tag>
</template>
<style lang="scss" scoped></style>

<script lang="ts" setup>
let props = defineProps<{
  schema?: any;
}>();
</script>
<template>
  <n-select
    filterable
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
<style lang="scss"></style>

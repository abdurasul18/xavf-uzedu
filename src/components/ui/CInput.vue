<script lang="ts" setup>
let props = withDefaults(
  defineProps<{
    placeholder?: string;
    schema?: any;

  }>(),
  {
    placeholder: " ",
  }
);
</script>
<template>
  <n-input
    class="c-input py-1"
    size="large"
    round
    clearable
    :placeholder="placeholder"
     :status="schema?.$error ? 'error' : ''"
    v-bind="$attrs"
  />
</template>
<style lang="scss">
.c-input {
  padding-top: 0;
  &.n-input.n-input--round {
    border-radius: 12px;
  }
  &.n-input.n-input--disabled .n-input__placeholder {
    @apply text-main text-opacity-50;
  }
}
</style>

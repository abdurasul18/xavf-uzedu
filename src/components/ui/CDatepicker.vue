<script lang="ts" setup>
let props = withDefaults(
  defineProps<{
    placeholder?: string;
    schema?: any;
    value: any;
  }>(),
  {
    placeholder: " ",
  }
);
let emits = defineEmits(["update:value"]);
let compVal = computed({
  get: () => props.value || null,
  set: (val) => {
    emits("update:value", val);
  },
});
</script>
<template>
  <n-date-picker
    class="c-datepicker"
    v-model:formatted-value="compVal"
    type="date"
    :actions="null"
    :format="'yyyy-MM-dd'"
    value-format="yyyy-MM-dd'"
    v-maska="'####-##-##'"
    :status="schema?.$error ? 'error' : 'success'"
    :first-day-of-week="0"
    clearable
    ref="datepickerRef"
    v-bind="$attrs"
  />
</template>
<style lang="scss">
.c-datepicker {
  .n-input {
    border-radius: 12px;
    padding: 3px;
  }
  .n-input.n-input--disabled .n-input__placeholder {
    @apply text-main text-opacity-50;
  }
}
</style>

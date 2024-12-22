<script lang="ts" setup>
let props = withDefaults(
  defineProps<{
    show: boolean;
    title?: string;
  }>(),
  {}
);
let emits = defineEmits(["update:show"]);
let showComp = computed<boolean>({
  get: () => props.show,
  set: (value) => emits("update:show", value),
});
</script>
<template>
  <n-modal v-model:show="showComp" class="c-modal2">
    <n-card v-bind="$attrs">
      <template #header> {{ title }} </template>
      <template #header-extra>
        <CIconButton @click="showComp = false" icon="times" />
      </template>
      <div >
        <slot></slot>
      </div>
    </n-card>
  </n-modal>
</template>
<style lang="scss">
.c-modal2 {
  &.n-card {
    border-radius: 24px;
    .n-card-header__main {
      @apply text-grey-900;
      font-size: 28px;
      font-weight: 600;
    }
  }
}
</style>

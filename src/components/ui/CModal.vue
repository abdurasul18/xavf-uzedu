<script lang="ts" setup>
let emits = defineEmits(["close"]);
let props = defineProps<{
  error?: boolean;
  warning?: boolean;
}>();
</script>
<template>
  <n-modal v-bind="$attrs" :auto-focus="false">
    <div class="max-w-[400px] w-full">
      <div
        class="success-gradient rounded-t-[32px] p-8 pb-16"
        :class="{ 'erorr-bg': error, 'warning' : warning }"
      >
        <div class="flex justify-between">
          <div class="text-xl text-white">
            <slot name="header"></slot>
          </div>
          <img
            @click="emits('close')"
            class="cursor-pointer"
            src="/img/svg/x-icon.svg"
            alt=""
          />
        </div>
        <div class="text-white text-sm mt-3">
          <slot name="description"> </slot>
        </div>
      </div>

      <div class="p-8 bg-white rounded-[32px] -mt-8">
        <slot name="content"> </slot>
      </div>
    </div>
  </n-modal>
</template>
<style>
.erorr-bg {
  background: #d63c59 !important;
}
.warning {
  background: #f5a623 !important;
}
</style>

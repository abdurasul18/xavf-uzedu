<script lang="ts" setup>
let props = defineProps<{
  text: string;
}>();
let show = ref(false);
</script>
<template>
  <div class="flex w-max items-center">
    <div v-if="show" class="flex items-center gap-1">
      {{ text }} <CIconButton @click="show = false" icon="lock" size="small" />
    </div>
    <div v-else class="flex items-center gap-1" style="letter-spacing: -2px">
      <span v-for="i in text">*</span>
      <CIconButton @click="show = true" icon="eye" size="small" />
    </div>
  </div>
</template>
<style lang="scss"></style>

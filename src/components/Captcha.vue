<script setup lang="ts">
import { RecaptchaV2 } from "vue3-recaptcha-v2";
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
let emits = defineEmits(["verified"]);
const handleWidgetId = (widgetId: number) => {};
const handleErrorCallback = () => {};
const handleExpiredCallback = () => {};
const handleLoadCallback = (response: unknown) => {
  emits("verified", response);
};
onMounted(() => {
  if (import.meta.env.MODE=='development' ) {
   emits("verified", true); // Automatically verify in development mode
  }
});
</script>

<template>
   <div class="my-2">
    <RecaptchaV2
      :sitekey="SITE_KEY"
      @widget-id="handleWidgetId"
      @error-callback="handleErrorCallback"
      @expired-callback="handleExpiredCallback"
      @load-callback="handleLoadCallback"
    />
   </div>
</template>

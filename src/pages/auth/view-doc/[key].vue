<script lang="ts" setup>
let key = useRoute().params.key;
let viewDocRef = ref();
onMounted(() => {
  viewDocRef.value.view(key);
});
</script>
<template>
  <ViewDoc ref="viewDocRef" page-mode/>
</template>
<style lang="scss"></style>

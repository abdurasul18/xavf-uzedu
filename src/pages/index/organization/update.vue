<script lang="ts" setup>
let update_id = ref(String(useRoute().query.update_id || ""));
</script>
<template>
  <AddUpOrganization mode="update" :id="update_id" />
</template>
<style lang="scss"></style>

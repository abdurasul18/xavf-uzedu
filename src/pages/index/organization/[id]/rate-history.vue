<script lang="ts" setup>
import { IRateHistory, OrganizationService } from "/@src/services/organization";

const route = useRoute();
let routeId = computed(() => String(route.params.id || ""));
let loading = ref(false);
let data = ref<IRateHistory[]>([]);
async function getData() {
  try {
    loading.value = true;
    let res = await OrganizationService.rateHistory(routeId.value);
    data.value = res.data.data;
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  getData();
});
</script>
<template>
  <n-spin :show="loading">
    <n-scrollbar style="height: calc(100vh - 200px)">
      <n-timeline v-if="data.length">
        <n-timeline-item
          v-for="(item, index) in data"
          :type="item.action == 100 ? 'success' : 'error'"
        >
          <template #header>
            {{ item.createdBy.last_name }} {{ item.createdBy.first_name }}
            {{ item.createdBy.middle_name }}
          </template>
          <div class="grid gap-1 max-w-[500px]">
            <div class="text-lg font-semibold">{{ item.criterion.name }} - ({{ item.criterion.rate }})</div>
            <div v-if="item.file">
              <FileShow :data="item.file" />
            </div>
            <div class="w-max text-blue-500" v-if="item.action == 100">Qo'shildi</div>
            <div class="w-max text-error" v-else-if="item.action == 200">O'chirildi</div>
          </div>
          <template #footer>{{ item.created_at }}</template>
        </n-timeline-item>
      </n-timeline>
      <AppNotFound v-else />
    </n-scrollbar>
  </n-spin>
</template>
<style lang="scss">
.c-shadow {
  box-shadow: 0 0 10px 0 rgba(183, 183, 183, 0.2);
}
</style>

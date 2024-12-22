<script lang="ts" setup>
import { IOrganization, OrganizationService } from "/@src/services/organization";

const route = useRoute();
let routeId = computed(() => String(route.params.id || ""));
let loading = ref(false);
let data = ref<IOrganization>();
async function getData() {
  try {
    loading.value = true;
    let res = await OrganizationService.getById(routeId.value);
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
  <div>
    <AppTitle> {{ data?.title }} </AppTitle>
    <div class="grid grid-cols-4 router-tab " style="">
      <RouterLink class="router-tab-item" :to="`/organization/${routeId}/detail`">
        Tashkilot ma'lumotlari
      </RouterLink>
      <RouterLink class="router-tab-item" :to="`/organization/${routeId}/check`">
        Tekshiruvlar
      </RouterLink>
      <RouterLink class="router-tab-item" :to="`/organization/${routeId}/rate`"
        >Baholash</RouterLink
      >
      <RouterLink class="router-tab-item" :to="`/organization/${routeId}/rate-history`"
        >Baholash tarixi</RouterLink
      >
    </div>
    <div class="mt-5">
      <RouterView :data="data" />
    </div>
  </div>
</template>
<style lang="scss">
.router-tab {
  @apply bg-white p-1 rounded-lg border border-grey-100;
  .router-tab-item {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    @media (max-width: 768px) {
      padding: 5px 10px;
      line-height: 1;
      font-size: 12px;
    }
    &.router-link-active {
      background-color: #f3f4f6;
    }
  }
}
</style>

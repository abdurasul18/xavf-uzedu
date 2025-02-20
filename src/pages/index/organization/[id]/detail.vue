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
  <n-spin :show="loading">
    <n-card class="base-card text-sm c-shadow" :bordered="false">
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <div class="text-grey-500 mb-[2px]">Nomi</div>
          <div class="font-semibold">
            {{ data?.title }}
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">Litsenziya raqami</div>
          <div class="font-semibold">
            {{ data?.license_number }}
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">Litsenziya berilgan vaqt</div>
          <div class="font-semibold">
            {{ data?.license_date?.split(" ")?.[0] }}
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">INN</div>
          <div class="font-semibold">
            {{ data?.inn }}
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">Viloyat</div>
          <div class="font-semibold">
            {{ data?.region?.name }}
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">Tuman</div>
          <div class="font-semibold">
            {{ data?.district?.name }}
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">Manzil</div>
          <div class="font-semibold">
            {{ data?.address }}
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">Faoliyat manzillari</div>
          <div class="font-semibold">
            <ul>
              <li v-for="item in data?.organization_addresses">{{ item.name }}</li>
            </ul>
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">Direktor</div>
          <div class="font-semibold">
            {{ data?.director_fio }}
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">Kontakt</div>
          <div class="font-semibold text-blue-500">
            {{ data?.director_contact }}
          </div>
        </div>
        <div>
          <div class="text-grey-500 mb-[2px]">Turi</div>
          <n-tag round>
            {{ data?.category.name }}
          </n-tag>
        </div>
      </div>
    </n-card>
  </n-spin>
</template>
<style lang="scss">
.c-shadow {
  box-shadow: 0 0 10px 0 rgba(183, 183, 183, 0.2);
}
</style>

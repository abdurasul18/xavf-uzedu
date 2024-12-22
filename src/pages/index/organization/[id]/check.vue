<script lang="ts" setup>
import { OrganizationService, ICheck } from "/@src/services/organization";
const route = useRoute();
let routerId = computed(() => {
  return String(route.params.id || "");
});
let list = ref<ICheck[]>([]);
let loading = ref(false);
async function getData() {
  try {
    loading.value = true;
    let res = await OrganizationService.getCheckList(routerId.value);
    list.value = res.data.data;
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  getData();
});
let addShow = ref(false);
</script>
<template>
  <n-spin :show="loading">
    <div class="grid gap-4">
      <div class="flex justify-end">
        <CButton @click="addShow = true" icon="plus"> Qo'shish </CButton>
      </div>
      <div class="grid gap-4">
        <n-card v-for="item in list" class="base-card text-sm c-shadow" :bordered="false">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <div class="text-grey-500 mb-[2px]">Tekshiruv boshlanish sanasi</div>
              <div class="font-semibold">
                {{ item?.start_date }}
              </div>
            </div>
            <div>
              <div class="text-grey-500 mb-[2px]">Tekshiruv tugash sanasi</div>
              <div class="font-semibold">
                {{ item?.finish_date }}
              </div>
            </div>
            <div>
              <div class="text-grey-500 mb-[2px]">Izoh</div>
              <div class="font-semibold">
                {{ item?.reason }}
              </div>
            </div>
            <div v-if="item.file">
              <div class="text-grey-500 mb-[8px]">Fayl</div>
              <FileShow :data="item.file" :deletable="false" />
            </div>
          </div>
        </n-card>
      </div>
      <AppNotFound v-if="!list.length" />
    </div>
    <CModal2 v-model:show="addShow" class="max-w-[500px]" title="Qoʻshish">
      <AddUpCheck
        @close="addShow = false"
        @success="
          addShow = false;
          getData();
        "
        :organization_id="routerId"
        mode="create"
      />
    </CModal2>
  </n-spin>
</template>
<style lang="scss">
.c-shadow {
  box-shadow: 0 0 10px 0 rgba(183, 183, 183, 0.2);
}
</style>

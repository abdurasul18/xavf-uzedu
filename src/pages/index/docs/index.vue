<script lang="ts" setup>
import { useToast } from "vue-toast-notification";
import { DocumentService, IDocument } from "/@src/services/docs";
const toast = useToast();
const { t } = useI18n();
let loading = ref(false);
let list = ref<IDocument[]>([]);
let total = ref(0);
const route = useRoute();
const router = useRouter();
let page = ref(Number(route.query.page || 1));
let per_page = ref(Number(route.query.per_page || 10));
const params = computed(() => {
  return {
    page: page.value,
    per_page: per_page.value,
  };
});
watch(
  () => params.value,
  () => {
    getList();
    router.replace({
      query: { page: page.value, per_page: per_page.value },
    });
  },
  { deep: true }
);
async function getList() {
  try {
    loading.value = true;
    let res = await DocumentService.getList(params.value);
    list.value = res.data.data;
    total.value = res.data.meta.totalCount;
  } finally {
    loading.value = false;
  }
}
onMounted(getList);
//
let viewDocRef = ref();
function viewDoc(item: IDocument) {
  viewDocRef.value.view(item.key);
}
</script>
<template>
  <div>
    <CLoader :active="loading">
      <div class="pb-4 border-b border-secondary">
        <n-scrollbar>
          <div style="height: calc(100vh - 220px)">
            <table class="my-table">
              <thead>
                <tr>
                  <td class="text-left" style="line-height: 1;">№</td>
                  <td class="text-left" style="line-height: 1;">Tashkilot nomi</td>
                  <td class="text-left" style="line-height: 1;">Tekshiruv sanasi</td>
                  <td class="text-left" style="line-height: 1;">Yetkazilgan zarar miqdori (m3)</td>
                  <td class="text-left" style="line-height: 1;">Hudud</td>
                  <td class="text-left" style="line-height: 1;">Buyruq</td>
                  <td class="text-left" style="line-height: 1;">Xavf darajasi</td>
                </tr>
              </thead>
              <tbody v-if="list.length">
                <tr
                  v-for="(item, index) in list"
                  @click="viewDoc(item)"
                  class="cursor-pointer"
                >
                  <td>{{ $paginate(index, page, per_page) }}</td>
                  <td>{{ item.title }}</td>
                  <td>{{ item?.start_date }}</td>
                  <td>{{ item.amount }}</td>
                  <td>{{ item.region.name }} {{ item.district.name }}</td>
                  <td>{{ item.order_number }}/ {{ item.order_date }}</td>
                  <td><CStatus :rate="item.rate"/></td>
                </tr>
              </tbody>
              <AppNotFound v-else mode="table" />
            </table>
          </div>
        </n-scrollbar>
        <n-pagination
          class="mt-2"
          v-model:page="page"
          v-model:page-size="per_page"
          :page-count="Math.ceil(total / per_page)"
          show-size-picker
          :page-sizes="[5, 10, 20, 30, 40]"
        />
      </div>
    </CLoader>
    <ViewDoc ref="viewDocRef" />
  </div>
</template>
<style lang="scss">
.my-table {
  width: 100%;
  tbody {
    tr {
      transition: all 0.3s;
      &:hover {
        background-color: #f2f3f5;
        td:first-child {
          border-radius: 40px 0 0 40px;
        }
        td:last-child {
          border-radius: 0 40px 40px 0;
        }
      }
    }
  }
  td {
    padding: 10px;
  }
}
</style>

<script lang="ts" setup>
import { useModal } from "naive-ui";
import { useApiService } from "/@src/composable/getList";
import { OrganizationService, IOrganization } from "/@src/services/organization";
import { confirmDelete } from "/@src/composable/helpers";
import { toastSuccess } from "/@src/plugins/toast";
const modal = useModal();
const route = useRoute();
let category_id = ref(String(route.query.category_id || "") || "");

let paramsAdd = computed(() => {
  return {
    query: {
      category_id: category_id.value,
    },
    body: {},
  };
});
const {
  loading,
  list,
  fetchData,
  search,
  page,
  per_page,
  total,
} = useApiService<IOrganization>(OrganizationService.getList, paramsAdd);
onMounted(fetchData);

async function deleteItem(item: IOrganization) {
  let isConfirmed = await confirmDelete(modal);
  if (isConfirmed) {
    await OrganizationService.delete(item.id);
    fetchData();
    toastSuccess();
  }
}
</script>
<template>
  <div>
    <AppTitle> Tashkilotlar </AppTitle>

    <div class="flex justify-between gap-4 pt-1">
      <CategoryTab v-model:value="category_id" />
      <CButton
        @click="$router.push(`/organization/add?category_id=${category_id}`)"
        icon="plus"
        >Qo'shish</CButton
      >
    </div>
    <div class=" mt-5">
      <CLoader :active="loading">
        <n-scrollbar x-scrollable>
          <table class="c-table  action-mode">
            <thead>
              <tr>
                <th>№</th>
                <th>Nomi</th>
                <th>Viloyat</th>
                <th>Tuman</th>
                <th>Manzil</th>
                <th>INN</th>
                <th>Litsenziya</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="list.length">
              <tr v-for="(item, index) in list">
                <td>{{ $paginate(index, page, per_page) }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.region?.name }}</td>
                <td>{{ item.district?.name }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.inn }}</td>
                <td>
                  {{ item.license_number }}/{{ item.license_date?.split(" ")?.[0] }}
                </td>
                <td>
                  <div class="flex gap-1 justify-end">
                    <CActionIcon
                    class="info-svg"
                      @click="$router.push(`/organization/update?update_id=${item.id}`)"
                      icon="edit"
                    />
                    <CActionIcon class="error-svg" @click="deleteItem(item)" type="error" icon="delete" />
                  </div>
                </td>
              </tr>
            </tbody>
            <AppNotFound v-else mode="table" />
          </table>
        </n-scrollbar>
        <n-pagination
          class="mt-2"
          v-model:page="page"
          v-model:page-size="per_page"
          :page-count="Math.ceil(total / per_page)"
          show-size-picker
          :page-sizes="[5, 10, 20, 30, 40]"
        />
      </CLoader>
    </div>
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

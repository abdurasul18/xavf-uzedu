<script lang="ts" setup>
import { useModal } from "naive-ui";
import { useApiService } from "/@src/composable/getList";
import { OrganizationService, IOrganization } from "/@src/services/organization";
import { confirmDelete } from "/@src/composable/helpers";
import { toastSuccess } from "/@src/plugins/toast";
const modal = useModal();
const route = useRoute();
let category_id = ref(String(route.query.category_id || ""));
let name = ref(String(route.query.name || ""));
let inn = ref(String(route.query.inn || ""));
let region_id = ref(Number(route.query.region_id || "") || null);
let district_id = ref(Number(route.query.district_id || "") || null);

let paramsAdd = computed(() => {
  return {
    query: {
      category_id: category_id.value,
      name: name.value,
      inn: inn.value,
      region_id: region_id.value,
      district_id: district_id.value,
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

function getStatusRate(rate: number) {
  if (!rate) {
    return;
  } else if (rate <= 60) {
    return "success";
  } else if (rate <= 80) {
    return "warning";
  } else {
    return "error";
  }
}
</script>
<template>
  <div>
    <AppTitle> Tashkilotlar </AppTitle>

    <div class="flex flex-col md:flex-row justify-between gap-4 pt-1">
      <CategoryTab v-model:value="category_id" size="large" class="pt-1" />
      <CButton
        @click="$router.push(`/organization/add?category_id=${category_id}`)"
        icon="plus"
        >Qo'shish</CButton
      >
    </div>
    <div class="grid md:grid-cols-4 mt-2 gap-4">
      <CInput v-model:value="name" placeholder="Nomi" />
      <CInput v-model:value="inn" placeholder="INN" />
      <SelectRegion v-model:value="region_id" placeholder="Viloyat" />
      <SelectDistrict
        v-model:value="district_id"
        :regionId="region_id!"
        placeholder="Tuman"
      />
    </div>
    <div class="mt-5">
      <CLoader :active="loading">
        <n-scrollbar x-scrollable>
          <table class="c-table action-mode">
            <thead>
              <tr>
                <th>№</th>
                <th>Nomi</th>
                <th>Viloyat</th>
                <th>Tuman</th>
                <th>Manzil</th>
                <th>INN</th>
                <th>Litsenziya</th>
                <th>Ball</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="list.length">
              <tr v-for="(item, index) in list" :class="getStatusRate(item.rate)">
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
                  <n-tag v-if="item.rate" round :type="getStatusRate(item.rate)">
                    <n-number-animation
                      :from="0"
                      :to="item.rate"
                      :active="true"
                      :precision="0"
                      locale="ru-RU"
                    />
                  </n-tag>
                </td>
                <td>
                  <div class="flex justify-end">
                    <CActionIcon
                      icon="eye"
                      @click="$router.push(`/organization/${item.id}/detail`)"
                    />
                    <CActionIcon
                      class="info-svg"
                      @click="$router.push(`/organization/update?update_id=${item.id}`)"
                      icon="edit"
                    />
                    <CActionIcon
                      class="error-svg"
                      @click="deleteItem(item)"
                      type="error"
                      icon="delete"
                    />
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
table {
  tr {
    &.success {
      background-color: #d4edc6;
      td {
        // border-color: #65d12b;
      }
      &:hover {
        background-color: #d4edc6;
      }
    }
    &.warning {
      background-color: #f9f9aa;
      td {
        // border-color: #ded344;
      }
      &:hover {
        background-color: #f9f9aa;
      }
    }
    &.error {
      background-color: #fde2e4;
      td {
        // border-color: #cb0e1b;
      }
      &:hover {
        background-color: #fde2e4;
      }
    }
  }
}
</style>

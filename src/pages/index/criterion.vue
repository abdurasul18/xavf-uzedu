<route lang="yaml">
  meta:
    roles: [100]
</route>
<script lang="ts" setup>
import { useModal } from "naive-ui";
import { useApiService } from "/@src/composable/getList";
import { CriterionService, ICriterion } from "/@src/services/criterion";
import { confirmDelete } from "/@src/composable/helpers";
import { toastSuccess } from "/@src/plugins/toast";
const modal = useModal();
const route = useRoute();

let category_id = ref(String(route.query.category_id || ""));

const paramsAdd = computed(() => {
  return {
    query: {
      category_id: category_id.value,
    },
  };
});
const {
  loading,
  list,
  fetchData,
  page,
  per_page,
  total,
} = useApiService<ICriterion>(CriterionService.getList, paramsAdd);
onMounted(fetchData);
let currentItem = ref<ICriterion>();
let mode = ref<"create" | "update">("create");
let addShow = ref(false);

async function deleteItem(item: ICriterion) {
  let isConfirmed = await confirmDelete(modal);
  if (isConfirmed) {
    await CriterionService.delete(item.id);
    fetchData();
    toastSuccess();
  }
}
let search = ref("");
let filteredList = computed(() => {
  return list.value.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.value.toLowerCase()) ||
      item.category?.name.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});
</script>
<template>
  <div>
    <AppTitle> Kriteriyalar </AppTitle>
    <div class="flex justify-between gap-4 pt-1 flex-col md:flex-row">
      <div class="flex flex-col md:flex-row gap-2">
        <CInput
          v-model:value="search"
          size="large"
          class="max-w-[300px]"
          placeholder="Qidiruv"
        />
        <CategoryTab class="pt-1" v-model:value="category_id" size="large" />
      </div>
      <CButton
        @click="
          addShow = true;
          mode = 'create';
        "
        icon="plus"
        >Qo'shish</CButton
      >
    </div>
    <div class="mt-8">
      <CLoader :active="loading">
        <table class="base-table">
          <thead>
            <tr>
              <th class="w-[80px]">№</th>
              <th>Nomi</th>
              <th>Ball</th>
              <th>Kategoriya</th>
              <th class="w-[120px]">Amallar</th>
            </tr>
          </thead>
          <tbody v-if="filteredList.length">
            <tr v-for="(item, index) in filteredList">
              <td>{{ $paginate(index, page, per_page) }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.rate }}</td>
              <td>{{ item.category?.name }}</td>
              <td>
                <div class="flex gap-2 justify-end">
                  <CIconButton
                    @click="
                      currentItem = item;
                      mode = 'update';
                      addShow = true;
                    "
                    icon="edit"
                  />
                  <CIconButton @click="deleteItem(item)" type="error" icon="delete" />
                </div>
              </td>
            </tr>
          </tbody>
          <AppNotFound v-else mode="table" />
        </table>
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
    <CModal2
      v-model:show="addShow"
      class="max-w-[400px]"
      :title="mode == 'create' ? 'Qoʻshish' : 'Tahrirlash'"
    >
      <AddUpCriterion
        @close="addShow = false"
        @success="
          addShow = false;
          fetchData();
        "
        :item="currentItem"
        :mode="mode"
      />
    </CModal2>
  </div>
</template>
<style lang="scss"></style>

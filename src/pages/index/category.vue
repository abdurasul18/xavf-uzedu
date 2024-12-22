<script lang="ts" setup>
import { useModal } from "naive-ui";
import { useApiService } from "/@src/composable/getList";
import { CategoryService, ICategory } from "/@src/services/category";
import { confirmDelete } from "/@src/composable/helpers";
import { toastSuccess } from "/@src/plugins/toast";
const modal = useModal();
const { loading, list, fetchData, search, page, per_page } = useApiService<ICategory>(
  CategoryService.getList
);
onMounted(fetchData);

let currentItem = ref<ICategory>();
let mode = ref<"create" | "update">("create");
let addShow = ref(false);

async function deleteItem(item: ICategory) {
  let isConfirmed = await confirmDelete(modal);
  if (isConfirmed) {
    await CategoryService.delete(item.id);
    fetchData();
    toastSuccess();
  }
}
</script>
<template>
  <div>
    <AppTitle> Kategoriya </AppTitle>
    <div class="flex justify-between gap-4 pt-1">
      <CInput
        v-model:value="search"
        size="large"
        class="max-w-[300px]"
        placeholder="Qidiruv"
      />
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
              <th class="w-[120px]">Amallar</th>
            </tr>
          </thead>
          <tbody v-if="list.length">
            <tr v-for="(item, index) in list">
              <td>{{ $paginate(index, page, per_page) }}</td>
              <td>{{ item.name }}</td>
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
      </CLoader>
    </div>
    <CModal2 v-model:show="addShow" class="max-w-[400px]" title="Qo'shish">
      <AddUpCategory
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

<script lang="ts" setup>
import { useModal } from "naive-ui";
import { useApiService } from "/@src/composable/getList";
import { UserService, IUser } from "/@src/services/user";
import { confirmDelete } from "/@src/composable/helpers";
import { toastSuccess } from "/@src/plugins/toast";
const modal = useModal();
const route = useRoute();
let name = ref(route.query.name || null);
let role = ref(route.query.role || null);
let paramsAdd = computed(() => {
  return {
    query: {
      name: name.value || "",
      role: role.value || "",
    },
    body: {},
  };
});
const { loading, list, fetchData, search, page, per_page, total } = useApiService<IUser>(
  UserService.getList,
  paramsAdd
);
onMounted(fetchData);

let currentItem = ref<IUser>();
let mode = ref<"create" | "update">("create");
let addShow = ref(false);

async function deleteItem(item: IUser) {
  let isConfirmed = await confirmDelete(modal);
  if (isConfirmed) {
    await UserService.delete(item.id);
    fetchData();
    toastSuccess();
  }
}
//
const roleOptions = [
  { id: 100, name: "Admin" },
  { id: 200, name: "Respublika" },
  { id: 300, name: "Hudud" },
];
</script>
<template>
  <div>
    <AppTitle> Foydanaluvchilar </AppTitle>
    <div class="flex flex-col md:flex-row justify-between gap-4 pt-1">
      <div class="flex flex-col md:flex-row gap-4">
        <CInput
          v-model:value="name"
          size="large"
          class="max-w-[300px]"
          placeholder="Qidiruv"
        />
        <CSelect placeholder="Roli" v-model:value="role" :options="roleOptions" />
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
        <n-scrollbar x-scrollable>
          <table class="my-table2">
            <thead>
              <tr>
                <th class="text-left">№</th>
                <th class="text-left">Login</th>
                <th class="text-left">FIO</th>
                <th class="text-left">Roli</th>
                <th class="text-left">Hudud</th>
                <th class="text-right">Amallar</th>
              </tr>
            </thead>
            <tbody v-if="list.length">
              <tr v-for="(item, index) in list">
                <td>{{ $paginate(index, page, per_page) }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.last_name }} {{ item.first_name }} {{ item.middle_name }}
                  <div v-if="item.pin"> <HideText :text="item.pin"/> </div>
                </td>
                <td>
                  <n-tag round>
                    {{
                      item.role == 100
                        ? "Admin"
                        : item.role == 200
                        ? "Respublika"
                        : "Hudud"
                    }}
                  </n-tag>
                </td>
                <td>
                  {{ item.region?.name }}
                </td>
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
    <CModal2
      v-model:show="addShow"
      class="max-w-[800px]"
      :title="mode == 'create' ? 'Qoʻshish' : 'Tahrirlash'"
    >
      <AddUpUser
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
<style lang="scss">
.my-table2 {
  width: 100%;
  th {
    padding: 10px;
    border-bottom: 1px solid #e2e8f0;
    background: #f2f3f5;
  }
  td {
    padding: 10px;
    border-bottom: 1px solid #e2e8f0;
  }
}
</style>

<script lang="ts" setup>
import { useApiService } from "/@src/composable/getList";
import { toastSuccess } from "/@src/plugins/toast";
import { ICriterion, CriterionService } from "/@src/services/criterion";
import { FileService } from "/@src/services/file";
import { IOrganization, OrganizationService } from "/@src/services/organization";
const route = useRoute();
let routeId = computed(() => String(route.params.id || ""));

let data = ref<IOrganization>();
let loading = ref(false);
let crIds = ref<string[]>([]);
async function getData() {
  try {
    loading.value = true;
    let res = await OrganizationService.getById(routeId.value);
    data.value = res.data.data;
    crIds.value =
      res.data.data?.organizationCriterions?.map((el) => el.criterion.id) || [];
  } finally {
    loading.value = false;
  }
}

let crLoading = ref(false);
let crList = ref<ICriterion[]>([]);
async function getCrList() {
  try {
    crLoading.value = true;
    let query = {
      per_page: 1000,
      category_id: data.value?.category?.id || "",
    };
    let res = await CriterionService.getList(query);
    crList.value = res.data.data;
  } finally {
    crLoading.value = false;
  }
}
onMounted(async () => {
  await getData();
  getCrList();
});
//
let editShow = ref(false);
let acceptShow = ref(false);
let files = ref([]);
let noFile = ref(false);
let sendLoading = ref(false);
async function send() {
  try {
    sendLoading.value = true;
    let resFile: any;
    if (files.value?.length) {
      resFile = await FileService.upload(files.value[0]);
    }
    let payload = {
      organization_id: data.value?.id,
      criteria: crIds.value.map((el) => {
        return {
          criterion_id: el,
          file_id: data.value?.organizationCriterions?.some((v) => v.criterion.id == el)
            ? null
            : resFile?.data?.data?.id,
        };
      }),
    };
    let res = await OrganizationService.rate(payload);
    toastSuccess();
    getData();
    acceptShow.value = false;
    editShow.value = false;
    files.value = [];
    noFile.value = false;
  } finally {
    sendLoading.value = false;
  }
}

let total = computed(() => {
  return data.value?.organizationCriterions?.reduce((acc, el) => {
    return acc + +el.criterion.rate;
  }, 0);
});
</script>
<template>
  <n-spin :show="crLoading || loading">
    <div class="flex justify-between">
      <div class="text-2xl font-semibold">
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="total"
          :active="true"
          :precision="0"
          locale="ru-RU"
        />
        ball
      </div>
      <div class="flex justify-end gap-2 mb-4">
        <CButton v-if="!editShow" @click="editShow = true" icon="edit" size="small">
          Tahrirlash
        </CButton>
        <template v-else>
          <CButton @click="editShow = false" icon="times" type="default" size="small">
            Bekor qilish
          </CButton>
          <CButton @click="acceptShow = true" icon="check" type="success" size="small">
            Saqlash
          </CButton>
        </template>
      </div>
    </div>

    <div class="base-card">
      <n-scrollbar style="height: calc(100vh - 300px)">
        <n-checkbox-group
          v-if="editShow"
          v-model:value="crIds"
          :disabled="!editShow"
          style="display: flex; flex-direction: column"
          class="col-checkbox"
        >
          <n-space vertical>
            <n-checkbox
              size="large"
              v-for="item in crList"
              :value="item.id"
              :label="`${item.name} (${item.rate} ball)`"
            />
          </n-space>
        </n-checkbox-group>
        <n-list hoverable v-else>
          <n-list-item v-for="item in crList">
            <div class="flex gap-4 items-start">
              <template
                v-if="
                  data?.organizationCriterions?.some((el) => el?.criterion?.id == item.id)
                "
              >
                <CIcon style="flex-shrink: 0;" name="check" class="error-svg" />
                <div class="text-error">{{ item.name }} - <strong>({{ item.rate }})</strong></div>
              </template>

              <template v-else>
                <CIcon style="flex-shrink: 0;" name="minus" />

                <div>{{ item.name }} - <strong>({{ item.rate }})</strong></div>
              </template>
            </div>
          </n-list-item>
        </n-list>
      </n-scrollbar>
    </div>

    <!--  -->
    <CModal2 v-model:show="acceptShow" class="max-w-[500px]" title="Asos yuklang">
      <div class="grid gap-4">
        <div>
          <DropFile v-model:value="files" :notMultiple="true" />
        </div>
        <div>
          <n-checkbox
            v-model:checked="noFile"
            @update:checked="files = []"
            label="Fayl yuklamasdan davom etish"
            size="large"
          />
        </div>
        <div class="flex justify-end">
          <CButton
            @click="send"
            :loading="sendLoading"
            :disabled="!files.length && !noFile"
          >
            Saqlash
          </CButton>
        </div>
      </div>
    </CModal2>
  </n-spin>
</template>
<style lang="scss">
.no-disabled-style {
  .n-checkbox.n-checkbox--disabled .n-checkbox-box {
    background: var(--n-color) !important;
  }
  .n-checkbox.n-checkbox--disabled .n-checkbox__label {
    color: var(--n-text-color) !important;
  }
}
.col-checkbox {
  width: 100%;
  .n-checkbox {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    width: 100%;
    border-bottom: 1px solid rgba(239, 239, 245, 1);
    &:hover {
      background-color: rgba(243, 243, 245, 1);
    }
    .n-checkbox__label {
      max-width: 500px;
    }
  }
}
</style>

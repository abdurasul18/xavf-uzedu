<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { useToast } from "vue-toast-notification";
import * as _ from "lodash";
import { IOrgByInn, OrganizationService } from "/@src/services/organization";
import { convertDateFormat } from "/@src/utils/date";
let props = defineProps<{
  id?: string;
  mode: "create" | "update";
}>();
let loading = ref(false);
onMounted(async () => {
  if (props.mode == "update" && props.id) {
    try {
      let res = await OrganizationService.getById(props.id);
      for (const key in form.value) {
        if (key in res.data.data) {
          if (key === "license_date") {
            form.value[key] = res.data.data[key].split(" ")[0];
          } else if (key == "category_id") {
            form.value[key] = String((res.data.data as any)[key]);
          } else {
            (form.value as any)[key] = (res.data.data as any)[key];
          }
        }
      }
    } finally {
    }
  }
});
const toast = useToast();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
let form = ref({
  title: "",
  license_number: "",
  license_date: "",
  inn: "",
  address: "",
  category_id: String(route.query.category_id || ""),
  region_id: "",
  district_id: "",
  direction_contact: "",
  direction_fio: "",
  organization_addresses: [{ name: "" }],
});

const rules = {
  title: { required },
  license_number: { required },
  license_date: { required },
  address: { required },
  category_id: { required },
  region_id: { required },
  district_id: { required },
  direction_contact: {},
  direction_fio: {},
  inn: { required, minLength: minLength(9) },
};
const v$ = useVuelidate(rules, form);
//

async function validate() {
  let result = await v$.value.$validate();
  return result;
}
let sendLoading = ref(false);
async function send() {
  if (!(await validate()) || sendLoading.value) return;
  try {
    sendLoading.value = true;
    let payload = { ...form.value };
    if (props.mode == "create") {
      await OrganizationService.create(payload);
    } else {
      await OrganizationService.update(props.id!, payload);
    }
    toast.success(t("success.done"));
    await router.push("/organization");
  } finally {
    sendLoading.value = false;
  }
}
//
let dataLoading = ref(false);
let show = ref(false);
let data = ref<IOrgByInn[]>([]);
watch(
  () => form.value.inn,
  (v) => {
    if (v.length === 9) {
      getData();
    }
    if (v.length < 9) {
      show.value = false;
      data.value = [];
    }
  }
);
async function getData() {
  dataLoading.value = true;
  try {
    let res = await OrganizationService.getData(form.value.inn);
    data.value = res.data.data;
    show.value = true;
  } finally {
    dataLoading.value = false;
  }
}
function setData(item: IOrgByInn) {
  form.value.title = item.name;
  form.value.address = item.activity_addresses[0].address;
  form.value.license_date = convertDateFormat(item.registration_date)
  form.value.license_number = item.register_number;
  form.value.organization_addresses = item.activity_addresses.map((i) => ({ name: i.address }));
  show.value = false;
}
//
</script>
<template>
  <n-spin :show="loading">
    <div class="text-left pb-7 border-b border-secondary">
      <AppTitle class="text-3xl">Tashkilot qo'shish</AppTitle>
    </div>
    <div class="pb-7 border-b border-secondary">
      <div class="grid md:grid-cols-3 mt-3 gap-5">
        <div class="col-span-full">
          <CategoryTab v-model:value="form.category_id" />
        </div>
        <div>
          <div class="mb-2 text-sm">INN <span class="text-danger">*</span></div>
          <div class="flex gap-2">
            <n-popover placement="bottom-start" trigger="focus" v-model:show="show" raw>
              <template #trigger>
                <CInput
                  v-maska="'#########'"
                  :schema="v$.inn"
                  placeholder=""
                  v-model:value="form.inn"
                  :loading="dataLoading"
                />
              </template>
              <n-scrollbar style="max-height: 300px">
                <n-list hoverable clickable class="max-w-[300px] md:max-w-[500px]">
                  <n-list-item @click="setData(item)" v-for="item in data">
                    <div class="font-semibold">{{ item.name }}</div>
                    <div class="text-sm"> {{ item.activity_types?.map?.(el=>el.name_uz).join(", ") }} </div>
                  </n-list-item>
                </n-list>
              </n-scrollbar>
            </n-popover>

            <CIconButton icon="info" @click="getData()" :loading="dataLoading" />
          </div>
        </div>

        <div>
          <div class="mb-2 text-sm">
            Tashkilot nomi <span class="text-danger">*</span>
          </div>
          <CInput :schema="v$.title" placeholder="" v-model:value="form.title" />
        </div>
        <div>
          <div class="mb-2 text-sm">
            Litsenziya raqami <span class="text-danger">*</span>
          </div>
          <CInput
            :schema="v$.license_number"
            placeholder=""
            v-model:value="form.license_number"
          />
        </div>
        <div>
          <div class="mb-2 text-sm">
            Litsenziya berilgan sana <span class="text-danger">*</span>
          </div>
          <CDatepicker
            :schema="v$.license_date"
            placeholder=""
            v-model:value="form.license_date"
          />
        </div>

        <div>
          <div class="mb-2 text-sm">
            {{ $t("field.region") }} <span class="text-danger">*</span>
          </div>
          <SelectRegion v-model:value="form.region_id" :schema="v$.region_id" />
        </div>
        <div>
          <div class="mb-2 text-sm">
            {{ $t("field.district") }} <span class="text-danger">*</span>
          </div>
          <SelectDistrict
            :regionId="form.region_id"
            v-model:value="form.district_id"
            :schema="v$.district_id"
          />
        </div>
        <div>
          <div class="mb-2 text-sm">Manzil <span class="text-danger">*</span></div>
          <CInput :schema="v$.address" placeholder="" v-model:value="form.address" />
        </div>
        <div>
          <div class="mb-2 text-sm">Direktor FIO</div>
          <CInput
            :schema="v$.direction_fio"
            placeholder=""
            v-model:value="form.direction_fio"
          />
        </div>
        <div>
          <div class="mb-2 text-sm">Telefon raqami</div>
          <CInput
            :schema="v$.direction_contact"
            placeholder=""
            v-model:value="form.direction_contact"
          />
        </div>
        <div class="">
          <div class="mb-2 text-sm">Faoliyat manzillari</div>
          <div class="grid gap-4">
            <div
              class="flex gap-1"
              v-for="(item, index) in form.organization_addresses"
              :key="index"
            >
              <CInput class="w-full" placeholder="" v-model:value="item.name" />
              <CIconButton
                type="info"
                v-if="index === form.organization_addresses.length - 1"
                @click="form.organization_addresses.push({ name: '' })"
                icon="plus"
              />
              <CIconButton
                v-else-if="form.organization_addresses.length > 1"
                @click="form.organization_addresses.splice(index, 1)"
                type="error"
                icon="delete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-7">
      <div class="flex justify-end items-center">
        <CButton dark :disabled="sendLoading" @click="send" :loading="sendLoading">
          <img class="mr-2" src="/img/link.png" alt="" />
          Saqlash
        </CButton>
      </div>
    </div>
    <!--  -->
  </n-spin>
</template>
<style lang="scss"></style>

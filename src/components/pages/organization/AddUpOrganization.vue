<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { DocumentService, ICriterion } from "../../../services/docs";
import { useToast } from "vue-toast-notification";
import * as _ from "lodash";
import { OrganizationService } from "/@src/services/organization";
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
          <div class="mb-2 text-sm">INN <span class="text-danger">*</span></div>
          <CInput
            v-maska="'#########'"
            :schema="v$.inn"
            placeholder=""
            v-model:value="form.inn"
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

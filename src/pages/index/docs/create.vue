<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { DocumentService, ICriterion } from "../../../services/docs";
import { useToast } from "vue-toast-notification";
import * as _ from "lodash";

const toast = useToast();
const { t } = useI18n();
const router = useRouter();
let form = ref({
  region_id: "",
  district_id: "",
  title: "",
  start_date: "",
  order_date: "",
  order_number: "",
  amount: "",
  files: [],
  criterionIds: [],
  description: "",
  inn: "",
});

const rules = {
  region_id: { required },
  district_id: { required },
  title: { required },
  start_date: { required },
  order_date: { required },
  order_number: { required },
  amount: { required },
  files: {},
  description: { required },
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
  acceptShow.value = true;
}
let rate = ref(0);

async function confirm() {
  try {
    sendLoading.value = true;
    let payload = { ...form.value, rate: rate.value };
    await DocumentService.createDoc(payload);
    toast.success(t("success.done"));
    await router.push("/docs");
  } finally {
    sendLoading.value = false;
  }
}
//
let criterions = ref<ICriterion[]>([]);

async function getCriterions() {
  try {
    let res = await DocumentService.getCriterion();
    criterions.value = res.data.data;
  } finally {
  }
}
onMounted(getCriterions);
let groupByCr = computed(() => {
  let data = _.groupBy(
    criterions.value.map((el) => {
      return {
        ...el,
        category_name: el.category.name,
      };
    }),
    "category_name"
  );
  return data;
});
//
let acceptShow = ref(false);
</script>
<template>
  <div>
    <div class="text-left pb-7 border-b border-secondary">
      <AppTitle class="text-3xl mb-3">Dalolatnoma yaratish</AppTitle>
    </div>
    <div class="pb-7 border-b border-secondary">
      <div class="grid md:grid-cols-3 mt-5 gap-5">
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
          <div class="mb-2 text-sm">
            O'rganish o'tkazilgan maktab <span class="text-danger">*</span>
          </div>
          <CInput :schema="v$.title" placeholder="" v-model:value="form.title" />
        </div>
        <div>
          <div class="mb-2 text-sm">
            O'rganish o'tkazilgan sana <span class="text-danger">*</span>
          </div>
          <CDatepicker
            placeholder=""
            v-model:value="form.start_date"
            :schema="v$.start_date"
          />
        </div>
        <div>
          <div class="mb-2 text-sm">Buyruq raqami <span class="text-danger">*</span></div>
          <CInput
            placeholder=""
            v-model:value="form.order_number"
            :schema="v$.order_number"
          />
        </div>
        <div>
          <div class="mb-2 text-sm">Buyruq sanasi <span class="text-danger">*</span></div>
          <CDatepicker
            placeholder=""
            v-model:value="form.order_date"
            :schema="v$.order_date"
          />
        </div>
        <div class="col-span-full">
          <div class="mb-2 text-sm">
            O'rganish o'tkazuvchilar<span class="text-danger">*</span>
          </div>
          <CInput
            type="textarea"
            rows="3"
            :schema="v$.description"
            placeholder=""
            v-model:value="form.description"
          />
        </div>
        <div>
          <div class="mb-2 text-sm">
            Yetkazilgan zarar miqdori (m<sup>3</sup>) <span class="text-danger">*</span>
          </div>
          <CInput
            type="number"
            :schema="v$.amount"
            placeholder=""
            v-model:value="form.amount"
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
      </div>
      <n-checkbox-group v-model:value="form.criterionIds">
        <div class="mt-5 grid gap-4">
          <n-card v-for="(value, key) in groupByCr">
            <div class="font-semibold text-lg mb-4">{{ key }}</div>
            <n-space item-style="display: flex;" align="center">
              <n-checkbox
                v-for="val in value"
                :value="val.id"
                :label="`${val.name}-(${val.rate} ball)`"
              />
            </n-space>
          </n-card>
          <DropFile class="max-w-[500px]" v-model:value="form.files" />
        </div>
      </n-checkbox-group>
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
    <CModal :show="acceptShow" @close="acceptShow = false">
      <template #header> Xavf darajasi </template>
      <template #content>
        <div class="">
          <n-radio-group v-model:value="rate" size="large">
            <n-space vertical>
              <n-radio style="font-size: 18px" :value="100" label="Quyi" />
              <n-radio style="font-size: 18px" :value="200" label="O'rtacha" />
              <n-radio style="font-size: 18px" :value="300" label="Yuqori" />
            </n-space>
          </n-radio-group>
        </div>

        <CButton
          @click="confirm"
          :loading="sendLoading"
          style="width: 100%"
          class="mt-4"
          :disabled="!rate || sendLoading"
          dark
          round
          >{{ $t("actions.save") }}</CButton
        >
      </template>
    </CModal>
  </div>
</template>
<style lang="scss">
.upload-content-1 {
  background-image: linear-gradient(45deg, #e0ebff, #e1fae5);
  position: relative;
  overflow: hidden;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    background-image: url("/img/svg/bg-circle.svg");
    background-size: cover;
    width: 200px;
    height: 200px;
    background-repeat: no-repeat;
    z-index: -1;
  }
}
</style>

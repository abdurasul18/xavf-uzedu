<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { CategoryService, ICategory } from "/@src/services/category";
import { toastSuccess } from "/@src/plugins/toast";
import { useApiService } from "/@src/composable/getList";
import { CriterionService } from "/@src/services/criterion";
let emits = defineEmits(["success", "close"]);
let props = withDefaults(
  defineProps<{
    item?: any;
    mode: "create" | "update";
  }>(),
  {
    mode: "create",
  }
);
onMounted(() => {
  if (props.mode == "update") {
    form.value.name = props.item?.name || "";
    form.value.rate = props.item?.rate || "";
    form.value.category_id = props.item?.category_id || "";
  }
});
let form = ref({
  name: "",
  rate: "",
  category_id: "",
});
const rules = {
  name: { required },
  rate: { required },
  category_id: { required },
};
const v$ = useVuelidate(rules, form.value);
async function validate() {
  return await v$.value.$validate();
}

let addLoading = ref(false);
async function save() {
  if (await validate()) {
    let payload = {
     ...form.value,
    };
    try {
      addLoading.value = true;
      if (props.mode == "create") {
        await CriterionService.create(payload);
      } else {
        await CriterionService.update(props.item.id, payload);
      }
      emits("success");
      toastSuccess();
    } finally {
      addLoading.value = false;
    }
  }
}

//
const {
  loading: categoryLoading,
  list: categoryList,
  fetchData: getCategory,
} = useApiService<ICategory>(CategoryService.getList);
onMounted(getCategory);
</script>

<template>
  <div>
    <div class="grid gap-4">
      <div>
        <p class="mb-2">Nomi</p>
        <CInput v-model:value="form.name" :schema="v$.name" />
      </div>
      <div>
        <p class="mb-2">Ball</p>
        <CInput v-maska="'####'" v-model:value="form.rate" :schema="v$.rate" />
      </div>
      <div>
        <p class="mb-2">Kategoriya</p>
        <CSelect
          v-model:value="form.category_id"
          :options="categoryList"
          :loading="categoryLoading"
          :schema="v$.category_id"
        />
      </div>
    </div>
    <div class="mt-5">
      <div class="flex justify-end">
        <CButton type="default" @click="emits('close')"> Bekor qilish</CButton>
        <CButton @click="save" class="ml-4" :loading="addLoading"> Saqlash</CButton>
      </div>
    </div>
  </div>
</template>

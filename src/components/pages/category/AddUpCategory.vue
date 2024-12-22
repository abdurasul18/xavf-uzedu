<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { CategoryService } from "/@src/services/category";
import { toastSuccess } from "/@src/plugins/toast";
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
  }
});
let form = ref({
  name: "",
});
const rules = {
  name: { required },
};
const v$ = useVuelidate(rules, form.value);
async function validate() {
  return await v$.value.$validate();
}

let addLoading = ref(false);
async function save() {
  if (await validate()) {
    let payload = {
      name: form.value.name,
    };
    try {
      addLoading.value = true;
      if (props.mode == "create") {
        await CategoryService.create(payload);
      } else {
        await CategoryService.update(props.item.id, payload);
      }
      emits("success");
      toastSuccess();
    } finally {
      addLoading.value = false;
    }
  }
}
</script>

<template>
  <div>
    <div class="grid gap-4">
      <div>
        <p class="mb-2">Nomi</p>
        <CInput v-model:value="form.name" :schema="v$.name" />
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

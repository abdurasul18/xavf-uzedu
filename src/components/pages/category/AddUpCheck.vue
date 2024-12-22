<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { OrganizationService } from "/@src/services/organization";
import { toastSuccess } from "/@src/plugins/toast";
let emits = defineEmits(["success", "close"]);
let props = withDefaults(
  defineProps<{
    item?: any;
    organization_id: string;
    mode: "create" | "update";
  }>(),
  {
    mode: "create",
  }
);
onMounted(() => {
  if (props.mode == "update") {
    form.value.start_date = props.item?.start_date || "";
    form.value.finish_date = props.item?.finish_date || "";
    form.value.reason = props.item?.reason || "";
  }
});
let form = ref({
  start_date: "",
  finish_date: "",
  reason: "",
  file: "",
});
const rules = {
  start_date: { required },
  finish_date: { required },
  reason: { required },
  file: {},
};
const v$ = useVuelidate(rules, form.value);
async function validate() {
  return await v$.value.$validate();
}

let files = ref([]);
let addLoading = ref(false);
async function save() {
  if (await validate()) {
    let payload = {
     ...form.value,
     organization_id: props.organization_id,
     file : files.value?.[0] || null
    };
    try {
      addLoading.value = true;
      if (props.mode == "create") {
        await OrganizationService.createCheck(payload);
      } else {
        // await OrganizationService.update(props.item.id, payload);
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
        <p class="mb-2">Tekshiruv boshlanish sanasi</p>
        <CDatepicker v-model:value="form.start_date" :schema="v$.start_date" />
      </div>
      <div>
        <p class="mb-2">Tekshiruv  tugash sanasi</p>
        <CDatepicker v-model:value="form.finish_date" :schema="v$.finish_date" />
      </div>
      <div>
        <p class="mb-2">Izoh</p>
        <CInput type="textarea" v-model:value="form.reason" :schema="v$.reason" />
      </div>
      <div>
        <DropFile v-model:value="files" :notMultiple="true"/>
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

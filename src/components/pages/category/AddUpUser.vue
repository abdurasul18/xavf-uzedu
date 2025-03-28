<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { toastSuccess } from "/@src/plugins/toast";
import { UserService } from "/@src/services/user";
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
    for (const key in form.value) {
      if (key in props.item) {
        (form.value as any)[key] = props.item[key] || "";
      }
    }
  }
});
let form = ref({
  username: "",
  password: "",
  password_confirm: "",
  pin : "",
  role: 300 as 100 | 200 | 300, // 100 = Republic , 300 = Region ,100 = Admin
  first_name: "",
  last_name: "",
  middle_name: "",
  region_id: "", // required if Role == Region
});
const rules = computed(() => {
  return {
    username: { required },
    password: { required },
    role: { required }, // 100 = Republic , 300 = Region ,100 = Admin
    first_name: { required },
    last_name: { required },
    middle_name: {  },
    pin: {  },
    password_confirm: { check: (value: string) => value == form.value.password },
    region_id: { required: form.value.role == 300 ? required : false }, // required if Role == Region
  };
});
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
        await UserService.create(payload);
      } else {
        await UserService.update(props.item.id, payload);
      }
      emits("success");
      toastSuccess();
    } finally {
      addLoading.value = false;
    }
  }
}
const roleOptions = [
  { id: 100, name: "Admin" },
  { id: 200, name: "Respublika" },
  { id: 300, name: "Hudud" },
];
</script>

<template>
  <div>
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <p class="mb-2">Familyasi</p>
        <CInput v-model:value="form.last_name" :schema="v$.last_name" />
      </div>
      <div>
        <p class="mb-2">Ismi</p>
        <CInput v-model:value="form.first_name" :schema="v$.first_name" />
      </div>
      <div>
        <p class="mb-2">Otasining ismi</p>
        <CInput v-model:value="form.middle_name" :schema="v$.middle_name" />
      </div>
      <div>
        <p class="mb-2">PINFL</p>
        <CInput v-model:value="form.pin" :schema="v$.pin" />
      </div>
      <div>
        <p class="mb-2">Roli</p>
        <CSelect v-model:value="form.role" :schema="v$.role" :options="roleOptions" />
      </div>
      <div v-if="form.role == 300">
        <p class="mb-2">Hudud</p>
        <SelectRegion v-model:value="form.region_id" :schema="v$.region_id" />
      </div>
      <div>
        <p class="mb-2">Login</p>
        <CInput v-model:value="form.username" :schema="v$.username" />
      </div>
      <div>
        <p class="mb-2">Parol</p>
        <CInput
          type="password"
          show-password-on="click"
          v-model:value="form.password"
          :schema="v$.password"
        />
      </div>
      <div>
        <p class="mb-2">Parolni tasdiqlang</p>
        <CInput
          type="password"
          show-password-on="click"
          v-model:value="form.password_confirm"
          :schema="v$.password_confirm"
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

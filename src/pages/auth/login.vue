<script lang="ts" setup>
import { useToast } from "vue-toast-notification";
import { AuthService } from "../../services/auth";
import { useAuthStore } from "../../store/auth";
import ApiService from "/@src/services/api";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
const { login } = useAuthStore();
const toast = useToast();
let showSign = ref(false);
let loading = ref(false);
const router = useRouter();
let form = ref({
  username: "",
  password: "",
});
const rules = {
  username: { required },
  password: { required },
};
const v$ = useVuelidate(rules, form);
async function validate() {
  return await v$.value.$validate();
}
async function success() {
  if (!(await validate())) return;
  try {
    loading.value = true;
    let res = await AuthService.login(form.value);
    login(res.data.data);
    ApiService.setHeader();
    await router.push("/dashboard");
    return;
  } catch (e: any) {
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <div class="bg-white">
    <div class="grid grid-cols-12 min-h-screen h-full p-4 sm:p-9">
      <div
        class="col-span-7 h-full bg-no-repeat bg-contain hidden xl:block bg-grey-50 rounded-lg"
        style="background-image: url('/notebook.png')"
      ></div>
      <div class="col-span-12 xl:col-span-5 flex flex-col justify-between relative p-4 md:p-0 rounded-xl bg-gray-50 md:bg-white">
       
        <div class="flex flex-col h-full justify-center">
          <div class="flex justify-center xl:mt-12">
            <!-- <img class="max-w-[250px]" src="/img/logo2.svg" /> -->
          </div>
          <div class="text-center mt-2 2xl:mt-12">
            <div class="flex justify-center xl:mt-12">
              <img class="max-w-[300px]" src="/img/logo2.svg" />
            </div>
          </div>
          <div class="w-full sm:w-[435px] mx-auto mt-7 2xl:mt-14">
            <div>
              <p class="mb-2">Foydalanuvchi nomi (login)</p>
              <CInput
                :label="$t('field.login')"
                icon="user"
                v-model:value="form.username"
                :schema="v$.username"
                @keyup.enter="login"
                :medium="false"
              />
            </div>
            <div class="flex flex-col mt-4 2xl:mt-5">
              <p class="mb-2">Parol</p>
              <CInput
                class=""
                :label="$t('field.password')"
                type="password"
                show-password-on="click"
                icon="lock"
                v-model:value="form.password"
                :schema="v$.password"
                :medium="false"
                @keyup.enter="success"
              >
              </CInput>
            </div>
            <CButton @click="success" :loading="loading" class="mt-5 2xl:mt-14 w-full"
              >Kirish</CButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

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
  <div class="site-wrapper h-screen">
    <main class="site-main">
      <div class="relative">
        <div class="container relative z-10">
          <div class="grid grid-cols-12">
            <div class="col-span-12 xl:col-span-7 2xl:col-span-6 xl:text-main">
              <div class="px-0 2xl:px-10 mt-10">
                <div class="flex gap-4">
                  <img src="/img/gerb.png" alt="" />
                  <div class="font-semibold text-3xl mt-10">
                    Агентство Культурного Наследия Республики Узбекистан
                  </div>
                </div>
                <div class="grid gap-4 mt-12 max-w-[400px]">
                  <div class="text-xl">{{ $t("info.login") }}</div>
                  <div>
                    <p class="mb-1">Username</p>
                    <CInput v-model:value="form.username" :schema="v$.username" />
                  </div>
                  <div>
                    <p class="mb-1">Password</p>
                    <CInput
                      v-model:value="form.password"
                      :schema="v$.password"
                      type="password"
                      show-password-on="click"
                    />
                  </div>
                  <div class="flex mt-4">
                    <CButton
                      :loading="loading"
                      :disabled="loading"
                      @click="success"
                      style="width: 100%"
                      dark
                      >{{ $t("actions.login") }}</CButton
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden xl:block container-fluid absolute top-10 right-0 left-0">
          <div class="grid grid-cols-12">
            <div class="col-span-7 2xl:col-span-6"></div>
            <div class="col-span-5 2xl:col-span-6">
              <img
                class="relative object-cover rounded-2xl 2xl:-right-5 right-0 ml-auto right-0 h-[650px]"
                src="/img/main.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    <Signature
      v-model:show="showSign"
      :isOnlyChallenge="true"
      @success="success"
      :loading="loading"
    />
  </div>
</template>
<style lang="scss">
.site-main {
  @media (max-width: 1280px) {
    background-image: url("/img/main.png");
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 32px;
  }
}
</style>

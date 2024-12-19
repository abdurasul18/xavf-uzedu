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
  <div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="flex w-3/4 max-w-[1200px] h-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Left Side: Login Form -->
      <div class="w-1/2 p-8 flex flex-col justify-center">
        <div class="flex mb-12 gap-4">
          <img class="w-20" src="/logo.svg" />
          <h2 class="text-3xl font-bold text-gray-700">
            O‘zbekiston Respublikasi maktabgacha va maktab ta'limi vazirligi
          </h2>
        </div>
        <div class="space-y-4">
          <!-- Username -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-600"
              >Username</label
            >
            <CInput v-model:value="form.username" :schema="v$.username" />
          </div>
          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-600"
              >Password</label
            >
            <CInput
              v-model:value="form.password"
              :schema="v$.password"
              @keyup.enter="success"
              type="password"
              show-password-on="click"
            />
          </div>

          <!-- Submit Button -->
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

      <!-- Right Side: Image -->
      <div
        class="w-1/2 bg-cover bg-center"
        style="background-image: url('/notebook.png')"
      >
        <div class="flex items-center justify-center h-full bg-blue-900 bg-opacity-50">
          <h3 class="text-white text-2xl font-semibold text-center px-6">
            <!-- Empowering Education for a Brighter Future -->
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

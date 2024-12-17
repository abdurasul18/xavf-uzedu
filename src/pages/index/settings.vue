<script lang="ts" setup>
import { useAuthStore } from "../../store/auth";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import { AccountService } from "../../services/account";
const { t } = useI18n();
const { user } = toRefs(useAuthStore());
const { getUser } = useAuthStore();
const toast = useToast();
let loading = ref(false);
onMounted(getUserData);
async function getUserData() {
  try {
    loading.value = true;
    await getUser();
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <CLoader :active="loading">
    <div
      class="bg-secondary p-5 rounded-[20px] flex items-center justify-between w-full mt-2"
    >
      <div class="flex items-center">
        <n-avatar class="ml-6 bg-blue-600 text-2xl" round :size="60">
          {{ user?.first_name?.[0] }}
        </n-avatar>
        <div class="ml-4">
          <div class="text-xl">{{ user?.last_name }}</div>
          <div class="text-sm thin-font opacity-40">
            {{ user?.first_name }}
          </div>
        </div>
      </div>
      <CButton @click="getUserData"> {{ $t("actions.refresh") }} </CButton>
    </div>
    <div class="mt-8">
      <div class="">
        <div class="grid grid-cols-2">
          <div class="border-b border-secondary pb-3 pt-2">
            <div class="thin-text mb-1 text-xs">Familyasi</div>
            <div>{{ user?.last_name }}</div>
          </div>
          <div class="border-b border-secondary pb-3 pt-2">
            <div class="thin-text mb-1 text-xs">Ismi</div>
            <div>{{ user?.first_name }}</div>
          </div>

          <div class="border-b border-secondary pb-3 pt-2">
            <div class="thin-text mb-1 text-xs">Holati</div>
            <div>{{ user?.status }}</div>
          </div>
        </div>
      </div>
    </div>
  </CLoader>
</template>
<style lang="scss" scoped></style>

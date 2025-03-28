<script setup lang="ts">
import ApiService from "../../services/api";
import { AuthService } from "../../services/auth";
import { useAuthStore } from "../../store/auth";
const { login, logout } = useAuthStore();
let route = useRoute();
let router = useRouter();
async function loginByOneId() {
  let { state, code } = route.query as any;
  if (state && code) {
   try {
    let res = await AuthService.loginOneID({ state, code });
    login(res.data.data);
    ApiService.setHeader();
    await router.push("/dashboard");
   }
   catch {
    logout();
    router.push("/auth/login");
   }
  } else {
    logout();
    router.push("/auth/login");
  }
}

onMounted(() => {
  loginByOneId();
});
</script>

<template>
  <n-spin :show="true" :size="80" description="Loading...">
    <n-card class="h-screen"> </n-card>
  </n-spin>
</template>

<style lang="scss"></style>

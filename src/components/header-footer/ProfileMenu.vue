<script lang="ts" setup>
import { useAuthStore } from "../../store/auth";
const { logout } = useAuthStore();
const { user } = toRefs(useAuthStore());
const router = useRouter();
function signOut() {
  logout();
  router.push("/auth/login");
}
</script>
<template>
  <div v-bind="$attrs">
    <RouterLink to="/" class="flex items-center mb-10 ml-4">
      <img class="max-w-[220px]" src="/img/logo2.svg" alt="" />
    </RouterLink>
    <ul class="menu-link-wrap">
      <li>
        <RouterLink
          to="/dashboard"
          class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
        >
          <img class="mr-4" src="/img/svg/dashboard.svg" alt="" />
          <span>Bosh sahifa</span>
        </RouterLink>
      </li>
      <li v-if="user?.role === 100">
        <RouterLink
          to="/category"
          class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
        >
         <CIcon class="mr-4" name="category"/>
          <span>Ta'lim tashkilotlari turi</span>
        </RouterLink>
      </li>
      <li v-if="user?.role === 100">
        <RouterLink
          to="/criterion"
          class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
        >
        <CIcon class="mr-4" name="check"/>
          <span>Kriteriyalar</span>
        </RouterLink>
      </li>
      <li >
        <RouterLink
          to="/organization"
          class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
        >
        <CIcon class="mr-4" name="department"/>
          <span>Ta'lim tashkilotlari</span>
        </RouterLink>
      </li>

      <li v-if="user?.role === 100"> 
        <RouterLink
          to="/user"
          class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
        >
        <CIcon class="mr-4" name="users"/>
          <span>Foydalanuvchilar</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/settings"
          class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
        >
          <img class="mr-4" src="/img/svg/settings.svg" alt="" />
          <span>{{ $t("settings.title") }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
  <a
    href="javascript:void(0)"
    @click="signOut"
    class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-4"
  >
    <img class="mr-4" src="/img/svg/logout.svg" alt="" />
    <span>{{ $t("actions.logout") }}</span>
  </a>
</template>
<style lang="scss" scoped></style>

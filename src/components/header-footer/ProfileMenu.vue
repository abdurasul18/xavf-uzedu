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
      <img src="/img/svg/gerb-dark.svg" alt="" />
      <div class="ml-3">
        <div>Агентство Культурного наследия</div>
        <div class="text-xs thin-text">Республики Узбекистан</div>
      </div>
    </RouterLink>
    <ul class="max-w-56 menu-link-wrap">
      <li>
        <RouterLink
          to="/dashboard"
          class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
        >
          <img class="mr-4" src="/img/svg/dashboard.svg" alt="" />
          <span>{{ $t("request.dashboard") }}</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/docs"
          class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
        >
          <img class="mr-4" src="/img/svg/stat.svg" alt="" />
          <span>Hujjatlar</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/docs/create"
          class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
        >
          <img class="mr-4" src="/img/svg/arrow-round.svg" alt="" />
          <span>Hujjatlar yaratish</span>
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
    class="max-w-56 flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-4"
  >
    <img class="mr-4" src="/img/svg/logout.svg" alt="" />
    <span>{{ $t("actions.logout") }}</span>
  </a>
</template>
<style lang="scss" scoped></style>

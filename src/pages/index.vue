<script lang="ts" setup>
import { useAuthStore } from "../store/auth";
const { getUser } = useAuthStore();
const { user } = toRefs(useAuthStore());
onMounted(getUser);
let menuShow = ref(false);
const router = useRouter();
</script>
<template>
  <div class="profile-wrapper grid grid-cols-12 h-screen">
    <div
      class="menu-wrapper hidden 2xl:flex 2xl:col-span-3 pt-7 px-3 h-full flex-col justify-between"
    >
      <ProfileMenu />
    </div>
    <div
      class="content-wrapper col-span-12 2xl:col-span-9 h-screen flex flex-col justify-between"
    >
      <div class="flex justify-between items-center p-7">
        <div class="text-3xl" id="appTitle"></div>
        <div class="flex justify-end gap-4">
          <div class="flex justify-end items-center shrink-0">
            <div class="text-right">
              <div>{{ user?.first_name }} {{ user?.last_name }}</div>
            </div>
            <n-avatar class="ml-6 bg-blue-600 text-xl" round :size="48">
              {{ user?.first_name?.[0] }}
            </n-avatar>
          </div>
          <button @click="menuShow = true" class="2xl:hidden">
            <img class="w-8" src="/img/svg/humberger.svg" alt="" />
          </button>
        </div>
      </div>
      <n-scrollbar class="pb-5">
        <div class="flex flex-col-reverse 2xl:flex-row 2xl:justify-between">
          <div class="px-4 w-full">
            <RouterView> </RouterView>
          </div>
        </div>
      </n-scrollbar>
    </div>
    <n-drawer
      :width="300"
      v-model:show="menuShow"
      :default-width="502"
      :placement="'left'"
    >
      <n-drawer-content>
        <div class="menu-wrapper pt-7 h-full flex-col justify-between">
          <ProfileMenu style="height: calc(100vh - 120px)" />
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<style lang="scss">
.menu-link-wrap {
  .router-link-exact-active {
    @apply bg-secondary;
  }
}
// .n-scrollbar-content {
//   height: 100%;
// }
@media (min-width: 1360px) {
  .profile-scrollbar {
    height: calc(100vh - 80px);
  }
}
.n-scrollbar-rail__scrollbar {
  margin-right: -4px;
}
</style>

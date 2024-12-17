<script lang="ts" setup>
let menuShow = ref(false);
const menus = ref([
  {
    title: "Контакты",
    link: "/",
  },
  {
    title: "О проекте",
    link: "/",
  },
  {
    title: "Язык системы",
    link: "/",
  },
]);
</script>
<template>
  <header class="py-10">
    <div class="container-fluid relative">
      <div class="flex justify-end items-center relative z-10">
        <ul class="hidden md:flex justify-end items-center relative z-10">
          <li class="mx-3" v-for="item in menus">
            <RouterLink :to="item.link" class="text-sm text-white">
              {{ item.title }}</RouterLink
            >
          </li>
        </ul>
        <div class="flex justify-between w-full md:w-auto">
          <button @click="menuShow = true" class="md:hidden">
            <img class="w-8" src="/img/svg/humberger.svg" alt="" />
          </button>
          <CButton to="/profile">Войти в систему </CButton>
        </div>
      </div>
    </div>
    <n-drawer :width="300" v-model:show="menuShow" :placement="'left'">
      <n-drawer-content>
        <div class="menu-wrapper pt-7 h-full flex-col justify-between">
          <div v-bind="$attrs">
            <RouterLink to="/profile" class="flex items-center mb-10 ml-4">
              <img src="/img/svg/gerb-dark.svg" alt="" />
              <div class="ml-3">
                <div>Агентство Культурного наследия</div>
                <div class="text-xs thin-text">Республики Узбекистан</div>
              </div>
            </RouterLink>
            <ul class="max-w-56 menu-link-wrap">
              <li>
                <RouterLink
                  v-for="item in menus"
                  :to="item.link"
                  class="flex items-center px-4 py-[10px] rounded-2xl hover:bg-secondary mb-1"
                >
                  <span>{{ item.title }}</span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </header>
</template>
<style lang="scss" scoped></style>

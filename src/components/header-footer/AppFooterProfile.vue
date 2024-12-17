<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
let langShow = ref(false);
function switchLang(lang: string) {
  langShow.value = false;
  locale.value = lang;
  localStorage.setItem("locale", lang);
}
</script>
<template>
  <footer class="px-7 pt-4 pb-7 flex items-center justify-between">
    <div></div>
    <ul class="flex items-center text-sm">
      <li class="ml-7">
        <a href="">  {{ $t("footer.oferta") }} </a>
      </li>
      <li class="ml-7">
        <a href="">  {{ $t("footer.help") }} </a>
      </li>
      <li class="mt-3 lg:my-0 sm:ml-3 md:ml-7">
        <a href="javascript:void(0);" @click="langShow = true"> {{ $t('footer.lang') }} </a>
      </li>
    </ul>
    <n-modal v-model:show="langShow">
    <n-card
      style="max-width: 400px"
      @close="langShow = false"
      closable
      :title="$t('lang.choose')"
    >
      <!-- Lang switch modal -->
      <div class="grid grid-cols-2 mb-4">
        <n-button
          :type="locale == 'uz' ? 'success' : ''"
          size="large"
          @click="switchLang('uz')"
          >{{ $t("lang.uz") }}</n-button
        >
        <n-button
          :type="locale == 'ru' ? 'success' : ''"
          size="large"
          @click="switchLang('ru')"
        >
          {{ $t("lang.ru") }}
        </n-button>
      </div>
    </n-card>
  </n-modal>
  </footer>
</template>
<style lang="scss" scoped></style>

<script setup lang="ts">
import { ruRU, dateRuRU, NLocale, NDateLocale, dateTrTR } from "naive-ui";
import { uzLt } from "./locale/naive/uzLt";
const { t, locale, messages } = useI18n();
let currentLocale = locale.value as "uz" | "ru" | "lt" | "eng";

let currentNaiveLocale = computed<{
  locale: NLocale | null;
  dateLocale: NDateLocale | null;
}>(() => {
  if (currentLocale == "ru") {
    return {
      locale: ruRU,
      dateLocale: dateRuRU,
    };
  } else if (currentLocale == "lt") {
    return {
      locale: uzLt,
      dateLocale: dateRuRU,
    };
  } else {
    return {
      locale: uzLt,
      dateLocale: dateRuRU,
    };
  }
});
</script>

<template>
  <n-config-provider
    :locale="currentNaiveLocale?.locale"
    :date-locale="currentNaiveLocale?.dateLocale"
  >
    <n-message-provider>
      <n-notification-provider placement="bottom-right">
        <RouterView />
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style></style>

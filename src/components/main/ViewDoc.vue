<script lang="ts" setup>
import { generate } from "../generate/generate";
import { DocumentService, IDocument } from "/@src/services/docs";
let props = defineProps<{
  pageMode?: boolean;
}>();
let show = ref(false);
let loading = ref(false);
let base64 = ref("");
let tabID = ref("document");
let document = ref<IDocument>();
async function view(key: string) {
  try {
    loading.value = true;
    show.value = true;
    let res = await DocumentService.getDocByKey(key);
    document.value = res.data.data;
    let html = generate(res.data.data);
    let res2 = await DocumentService.viewPdf(html);
    base64.value = res2.data.pdf;
  } catch {
    document.value = undefined;
    base64.value = "";
  } finally {
    loading.value = false;
  }
}

defineExpose({
  view,
});
let width = window.innerWidth > 1000 ? 1000 : window.innerWidth;
</script>
<template>
  <Component :is="pageMode ? 'div' : 'n-drawer'" :width="width" v-model:show="show">
    <n-card class="h-screen">
      <template #header>
        <div class="flex justify-between">
          {{ document?.title }}
          <n-button type="error" ghost @click="show = false"> Yopish </n-button>
        </div>
      </template>
      <n-spin :show="loading">
        <n-tabs type="segment" animated v-model:value="tabID">
          <n-tab-pane name="document" tab="Hujjat">
            <embed
              width="100%"
              v-if="base64"
              :src="`data:application/pdf;base64,${base64}`"
              :style="`min-height:calc(100vh - 140px); background-color: #ffffff`"
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
            />
          </n-tab-pane>
          <n-tab-pane name="basis" tab="Ilova">
            <FileShow class="mb-2" v-for="item in document?.files" :data="item" />
          </n-tab-pane>
        </n-tabs>
      </n-spin>
    </n-card>
  </Component>
</template>
<style lang="scss"></style>

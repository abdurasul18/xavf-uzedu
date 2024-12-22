<script lang="ts" setup>
import { IFile } from "/@src/services/organization";
import { imgFormat, videoFormat } from "/@src/utils/file-formats";

let props = defineProps<{
  data: IFile;
  deletable?: boolean;
}>();
let emits = defineEmits(["delete"]);
const baseUrl = import.meta.env.VITE_API_IMG_URL;
let extension = computed(() => {
  return props.data.name.split(".").pop()?.toLowerCase() || "";
});
let fileType = computed(() => {
  if (imgFormat.includes(extension.value)) {
    return "image";
  } else if (videoFormat.includes(extension.value)) {
    return "video";
  } else if (extension.value == "pdf") {
    return "pdf";
  } else {
    return "other";
  }
});
let showPdf = ref(false);
function showOrDownload() {
  if (fileType.value == "pdf" || fileType.value == "video") {
    showPdf.value = true;
  } else if (fileType.value == "image") {
    return;
  } else {
    download();
  }
}
function download() {
  let link = document.createElement("a") as HTMLAnchorElement;
  link.download = `${props.data.name || "file"}`;
  link.href = `${baseUrl}/${props.data.path}`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function getSize(size: number) {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "KB", "MB", "GB", "TB"][i]
  );
}
</script>
<template>
  <div
    class="p-4 rounded-2xl bg-white border broder-grey-100 flex justify-between items-center gap-4 mb-4"
  >
    <div class="flex items-center">
      <div class="cursor-pointer mr-4 rounded-xl overflow-hidden" @click="showOrDownload">
        <div
          class="flex items-center justify-center bg-[#FFEDED] w-12 h-12"
          v-if="fileType == 'pdf'"
        >
          <img src="/@src/assets/pdf.png" alt="" />
        </div>
        <div
          class="flex items-center justify-center bg-blue-50 w-12 h-12"
          v-else-if="fileType == 'image'"
        >
          <n-image v-if="data.path" :src="$withBaseUrl(data.path)" />
        </div>
        <div class="flex items-center justify-center bg-blue-50 w-12 h-12" v-else>
          <CIcon class="info-svg" name="file" />
        </div>
      </div>
      <div class="text-sm">
        <div class="font-semibold">{{ data.name }}</div>
        <div class="text-grey-500">{{ getSize(data.size) }}</div>
      </div>
    </div>
    <div class="flex justify-end items-center gap-2">
      <CIconButton icon="download" @click="download" />
      <CIconButton v-if="deletable" type="error" icon="delete" @click="emits('delete', data.id)" />
    </div>
  </div>

  <CModal2 class="max-w-[1000px]" v-model:show="showPdf" :title="data.name">
    <iframe
      width="100%"
      :src="`${$baseUrl}/${data.path}`"
      style="min-height: 80vh; background-color: #ffffff"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
    />
  </CModal2>
</template>
<style lang="scss"></style>

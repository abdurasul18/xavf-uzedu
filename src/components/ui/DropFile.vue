<script setup lang="ts">
let props = withDefaults(
  defineProps<{
    value: any;
    notMultiple?: boolean;
    accept?: string;
  }>(),
  {
    accept: ".doc, .docx, .pdf",
  }
);
let emits = defineEmits(["update:value"]);
let fileRef = ref<HTMLInputElement>();
function onAddFile(e: any) {
  let isAcceptable = true;
  Array.from(e.target.files).forEach((e: any) => {
    let extension = e.name?.split?.(".")?.pop?.();
    let extensions = props.accept
      .split(", ")
      .map((el: string) => el.replace("image/", "").replace(".", ""));
    if (!extensions.some((el: string) => el?.toLowerCase() == extension?.toLowerCase())) {
      isAcceptable = false;
    }
  });
  if (isAcceptable) {
    files.value = [...files.value, ...Array.from(e.target.files)];
  } else {
    if (fileRef.value) fileRef.value.value = "";
  }

  if (fileRef.value) fileRef.value.value = "";
}

let files = computed({
  get() {
    return props.value;
  },
  set(val) {
    emits("update:value", val);
  },
});
function addMore() {
  fileRef.value?.click();
}
let inputId = Math.random().toString(36).substring(7);
function getSize(size: number) {
  let sizeKb = size / 1024;
  if (sizeKb / 1024 >= 0.5) {
    return `${(sizeKb / 1024).toFixed(2)} MB`;
  } else {
    return sizeKb.toFixed(2) + " KB";
  }
}
</script>

<template>
  <div>
    <label :for="inputId" v-show="!files.length">
      <div class="mb-4">
        <svg
          width="86"
          height="86"
          viewBox="0 0 86 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M62 23H34.54L30.84 17.45C30.65 17.17 30.34 17 30.01 17H14C13.45 17 13 17.45 13 18V62C13 62.55 13.45 63 14 63H62C62.55 63 63 62.55 63 62V24C63 23.45 62.55 23 62 23Z"
            fill="#D7D9E0"
          />
          <path
            d="M58 27H18C17.4477 27 17 27.4477 17 28V62C17 62.5523 17.4477 63 18 63H58C58.5523 63 59 62.5523 59 62V28C59 27.4477 58.5523 27 58 27Z"
            fill="white"
          />
          <path
            d="M72.8104 31.42C72.6204 31.16 72.3204 31 72.0004 31H24.0004C23.5704 31 23.1904 31.28 23.0504 31.68L13.0504 61.68C12.9504 61.99 13.0004 62.32 13.1904 62.58C13.3804 62.84 13.6804 63 14.0004 63H62.0004C62.4304 63 62.8104 62.72 62.9504 62.32L72.9504 32.32C73.0504 32.01 73.0004 31.68 72.8104 31.42Z"
            fill="#EDEDF1"
          />
          <path
            d="M62 69C68.0751 69 73 64.0751 73 58C73 51.9249 68.0751 47 62 47C55.9249 47 51 51.9249 51 58C51 64.0751 55.9249 69 62 69Z"
            fill="#00AAFF"
          />
          <path
            d="M62.7103 52.2901C62.3203 51.9001 61.6903 51.9001 61.3003 52.2901L57.3003 56.2901C56.9103 56.6801 56.9103 57.3101 57.3003 57.7001C57.6903 58.0901 58.3203 58.0901 58.7103 57.7001L61.0003 55.4101V63.0001C61.0003 63.5501 61.4503 64.0001 62.0003 64.0001C62.5503 64.0001 63.0003 63.5501 63.0003 63.0001V55.4101L65.2903 57.7001C65.4903 57.9001 65.7403 57.9901 66.0003 57.9901C66.2603 57.9901 66.5103 57.8901 66.7103 57.7001C67.1003 57.3101 67.1003 56.6801 66.7103 56.2901L62.7103 52.2901Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="font-semibold">Fayl yuklash</div>
      <div class="text-grey-500">Faylni bu yerga tashlang yoki bosib yuklang</div>
      <div class="text-sm text-grey-500">({{ accept }})</div>
      <input
        @change="onAddFile"
        class="file"
        type="file"
        :id="inputId"
        :multiple="!notMultiple"
        ref="fileRef"
        :accept="accept"
      />
    </label>
    <div v-if="files.length">
      <div class="mt-4">
        <div class="border-b border-grey-100" v-for="(item, index) in files">
          <div
            class="flex justify-between items-center uploaded-file hover:bg-gray-50 p-1"
          >
            <div class="flex items-center">
              <div
                class="flex items-center justify-center rounded-xl bg-blue-50 mr-4 w-12 h-12"
              >
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 10C3.5 6.22876 3.5 4.34315 4.7448 3.17157C5.98959 2 7.99306 2 12 2H12.7727C16.0339 2 17.6645 2 18.7969 2.79784C19.1214 3.02643 19.4094 3.29752 19.6523 3.60289C20.5 4.66867 20.5 6.20336 20.5 9.27273V11.8182C20.5 14.7814 20.5 16.2629 20.0311 17.4462C19.2772 19.3486 17.6829 20.8491 15.6616 21.5586C14.4044 22 12.8302 22 9.68182 22C7.88275 22 6.98322 22 6.26478 21.7478C5.10979 21.3424 4.19875 20.4849 3.76796 19.3979C3.5 18.7217 3.5 17.8751 3.5 16.1818V10Z"
                    stroke="#00aaff"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.5 12C20.5 13.8409 19.0076 15.3333 17.1667 15.3333C16.5009 15.3333 15.716 15.2167 15.0686 15.3901C14.4935 15.5442 14.0442 15.9935 13.8901 16.5686C13.7167 17.216 13.8333 18.0009 13.8333 18.6667C13.8333 20.5076 12.3409 22 10.5 22"
                    stroke="#00aaff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 7H15"
                    stroke="#00aaff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 11H11"
                    stroke="#00aaff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="text-sm">
                <div class="font-semibold one-lie">
                  {{ item.name?.substring?.(0, 30) + "..." }}
                </div>
                <div class="text-grey-500">{{ getSize(item.size) }}</div>
              </div>
            </div>
            <svg
              @click="files.splice(index, 1)"
              class="cursor-pointer"
              width="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5L5 19M5 5L19 19"
                stroke="#6B758C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <n-button v-if="!notMultiple" @click="addMore" class="w-full mt-4">
          yuklash
        </n-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
label {
  min-height: 126px;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  box-sizing: content-box;
  margin-bottom: 15px;
  @apply border border-dashed border-main border-opacity-40;
  cursor: pointer;
  input {
    position: absolute;
    opacity: 0;
    inset: 0;
    cursor: pointer;
  }

  &:hover {
    &::after {
      content: "";
      position: absolute;
      inset: -3px;
      border-radius: 12px;
      @apply border border-dashed border-main border-opacity-40;
    }
  }
}
</style>

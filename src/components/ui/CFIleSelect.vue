<script lang="ts" setup>
interface PropsType {
  schema?: any;
  value: any;
}
let props = withDefaults(defineProps<PropsType>(), {
  schema: {},
  placeholder: " ",
});
let emits = defineEmits(["update:value"]);
let modelValue = computed({
  get() {
    return props.value;
  },
  set(val) {
    emits("update:value", val);
  },
});
function change(e: any) {
  modelValue.value = e?.target?.files?.[0] || "";
}
let inputRef = ref<HTMLInputElement | null>(null);
</script>
<template>
  <div>
    <CButton v-if="!modelValue?.name" @click="inputRef?.click()"> {{ $t("actions.chooseFile") }} </CButton>
    <p v-if="schema?.$error" class="text-red-600 ml-4 mt-2">{{ $t("info.uploadFileDescription") }}</p>
    <input ref="inputRef" type="file" class="hidden" @change="change" />
    <n-tag v-if="modelValue?.name" closable @close="modelValue = ''" type="info">
      {{ $minimalizeText(modelValue?.name, 30) }}
    </n-tag>
  </div>
</template>
<style lang="scss" scoped></style>

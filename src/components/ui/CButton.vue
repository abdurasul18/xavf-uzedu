<script lang="ts" setup>
let props = defineProps<{
  to?: string;
  dark?: boolean;
  secondary?: boolean;
  loading?: boolean;
}>();
</script>
<template>
  <button
    v-if="!props.to"
    class="c-button"
    :class="{ 'c-button-dark': props.dark, 'c-button-secondary': props.secondary }"
    v-bind="$attrs"
    :disabled="props.loading"
  >
    <svg
      v-if="loading"
      class="mr-2 w-8"
      version="1.1"
      id="loader-1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 50 50"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
    >
      <path
        fill="#000"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <slot></slot>
  </button>
  <RouterLink
    v-else
    :to="props.to"
    class="c-button"
    :class="{ 'c-button-dark': props.dark, 'c-button-secondary': props.secondary }"
    v-bind="$attrs"

  >
    <svg
      v-if="loading"
      class="mr-2 w-8"
      version="1.1"
      id="loader-1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 50 50"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
    >
      <path
        fill="#000"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <slot></slot>
  </RouterLink>
</template>
<style>

.c-button.c-button-dark {
  background: rgb(25, 25, 31);
  color: #fff;
}
.c-button.c-button-secondary {
  @apply bg-secondary;
}
.c-button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>

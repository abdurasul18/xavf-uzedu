<script lang="ts" setup>
import { useAuthStore } from "../../store/auth";
const { getUser } = useAuthStore();
const { user } = toRefs(useAuthStore());
onMounted(getUser);
let menuShow = ref(false);
const router = useRouter();
onMounted(async () => {
    await router.push("/dashboard");
  
});
</script>
<template></template>
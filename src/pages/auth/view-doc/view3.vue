<script lang="ts" setup>
import { jsPDF } from "jspdf";
import { generate } from "/@src/components/generate/generate";
const doc = new jsPDF();
onMounted(() => {
  let wrap = document.createElement("div");
  wrap.innerHTML = generate();
  doc.html(wrap, {
    callback: function (doc) {
      doc.save("sample.pdf"); // Save the PDF
    },
    x: 10,
    y: 10,
  });
});
</script>
<template>
  <embed
    class="h-screen"
    :src="'data:application/pdf;base64,' + pdf"
    type="application/pdf"
    width="100%"
    height="100%"
  />
</template>
<style lang="scss"></style>

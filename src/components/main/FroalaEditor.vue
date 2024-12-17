<script setup lang="ts">
import { computed, ref } from "vue";

import "froala-editor/css/froala_editor.pkgd.min.css";
// allowJS
import FroalaEditor from "froala-editor/js/froala_editor.pkgd.min.js";
let editor = ref();
let props = defineProps<{
  value: string;
  id?: string;
  landscape?: boolean;
  width?: string;
  viewMode?: boolean;
  hasVideo?: boolean;
}>();
let emits = defineEmits(["update:value"]);
let text = computed({
  get() {
    return props.value;
  },
  set(val) {
    emits("update:value", val);
  },
});
let showTranslate = ref(false);
let showPlaceAdd = ref(false);
FroalaEditor.DefineIcon("customTab", { NAME: "customTab", SVG_KEY: "star" });

function initFroala() {
  editor.value = null;
  editor.value = new FroalaEditor(`#${props.id}`, {
    tableStyles: {
      class1: "No borders",
    },
    embedlyScriptPath: "",
    imageInsertButtons: ["imageUpload", "|", "imageByURL"],
    htmlAllowedEmptyTags : ["span"],
    language: "ru",
    events: {
      "image.beforeUpload": function (files: any) {
        let editor = this as any;
        if (files.length > 0) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            let result = e.target.result;
            editor.image.insert(result, {}, {}, editor.image.get());
          };
          reader.readAsDataURL(files[0]);
        }
        editor.popups.hideAll();
        return false;
      },
      keyup: function () {
        text.value = (this as any).html.get();
      },
      click: function () {
        text.value = (this as any).html.get();
      },
      "commands.before": function () {},
      "commands.after": function () {
        text.value = (this as any).html.get();
      },
      "paste.after": function () {
        text.value = (this as any).html.get();
      },
      "html.set": function () {
        text.value = (this as any).html.get();
      },
      initialized: function () {
        // Define custom button
        FroalaEditor.DefineIcon("tabIcon", { NAME: "arrow-right", SVG_KEY: "indent" });
        FroalaEditor.RegisterCommand("customTab", {
          title: "Indent Text",
          icon: "tabIcon",
          focus: false,
          undo: true,
          refreshAfterCallback: false,
          callback: function () {
            
            editor.value?.selection?.restore?.();
            editor.value?.html?.insert(
              "<span style='width:32pt;display:inline-block;'></span>"
            );
          },
          refresh: function ($btn: any) {
            const selection = this.selection.element();
            // Check if the first child has the correct text-indent style
            if (
              selection &&
              selection.firstElementChild &&
              window.getComputedStyle(selection.firstElementChild).width === "32pt"
            ) {
              $btn[0].classList.add("fr-active"); // Activate button
            } else {
              $btn[0].classList.remove("fr-active"); // Deactivate button
            }
          },
        });
      },
    },
    documentReady: true,
    fontSize: [
      "3",
      "4",
      "6",
      "8",
      "9",
      "10",
      "11",
      "12",
      "14",
      "16",
      "18",
      "22",
      "24",
      "30",
      "36",
      "48",
      "60",
      "72",
      "96",
    ],
    fontFamilyDefaultSelection: "Arial",
    // imageUploadRemoteUrls: false,
    toolbarButtons:  [
          "fullscreen",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "textColor",
          "backgroundColor",
          "fontFamily",
          "fontSize",
          "lineHeight",
          "|",
          "paragraphFormat",
          "align",
          "formatOL",
          "formatUL",
          "insertTable",
          "html",
          "|",
          "specialCharacters",
          "trackChanges",
          "customTab",
        ],
     
    charCounterCount: false,
    tabSpaces: 4,
    height: 600,
    fontSizeUnit: "pt",
    placeholderText: "",
    fontFamily: {
      Eastman: "Eastman",
      "Times New Roman, sans-serif": "Times New Roman",
      Arial: "Arial",
    },
    fontFamilySelection: true,
  });
}

onMounted(() => {
  initFroala();
});
onUnmounted(() => {
  editor.value = null;
});
//
const places = [
  {
    name: "START_DATE	",
    code: "START_DATE	",
    value: "<span id='START_DATE'>________</span>&nbsp",
  },
  {
    name: "END_DATE",
    code: "END_DATE",
    value: "<span id='END_DATE'>________</span>&nbsp",
  },
  {
    name: "DISMISSAL",
    code: "DISMISSAL",
    value: "<span id='DISMISSAL'>________</span>&nbsp",
  },
];

function addPlace(val: string) {
  editor.value?.selection?.restore?.();
  editor.value?.html?.insert(val);
  showPlaceAdd.value = false;
}
watch(
  () => showPlaceAdd.value,
  async (v) => {
    await nextTick();
    let el = document.querySelector(".n-modal-container");
    if (v) {
      el?.classList.add("z-larger");
    } else {
      el?.classList.remove("z-larger");
    }
  }
);
</script>
<template>
  <div
    class="no-licence"
    style="position: relative !important"
    :class="{
      landscape: props.landscape,
      'view-mode': props.viewMode,
      isLarge: props.width,
    }"
  >
    <div class="wrap-editor">
      <textarea :value="props.value" :id="props.id"></textarea>
    </div>
  </div>
  <n-modal v-model:show="showTranslate" :auto-focuse="false">
    <n-card style="max-width: 800px">
      <Translate />
      <div class="f-end mt-5">
        <n-button @click="showTranslate = false"> {{ $t("actions.close") }} </n-button>
      </div>
    </n-card>
  </n-modal>
  <n-modal v-model:show="showPlaceAdd">
    <n-card
      style="max-width: 450px; min-height: 200px"
      @close="showPlaceAdd = false"
      closable
    >
      <div class="f-center">
        <button v-for="item in places" @click="addPlace(item.value)" class="place-item">
          <span> {{ item.name }}</span>
        </button>
      </div>
    </n-card>
  </n-modal>
</template>
<style lang="scss">
.fr-box.fr-fullscreen .fr-wrapper {
  background: #efefef;
}
.z-larger {
  z-index: 99999999999999999999999999999 !important;
}
.fr-popup.fr-active {
  z-index: 9999999999999999999999999 !important;
}
.place-item {
  width: 120px !important;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 20px 10px;
  cursor: pointer;
  background: transparent;
  box-shadow: 0px 3px 6px 0px rgba(157, 185, 205, 0.25);
  border: 1px solid var(--fade-grey-dark-3);
  border-radius: 8px;
}
.isLarge .fr-box.fr-document .fr-wrapper .fr-element {
  padding: 1cm !important;
  width: v-bind(width) !important;
}
.doc-editor {
  .fr-wrapper {
    height: calc(100vh - 200px) !important;
  }
}
.eastman {
  .fr-element * {
    font-family: "Eastman";
  }
}
.fr-element tr:nth-child(even) td {
  background: transparent;
}
.view-mode {
  .fr-element {
    pointer-events: none !important;
  }
}
.fr-box.fr-basic.fr-top .fr-wrapper {
  &::-webkit-scrollbar {
    width: 10px !important;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px !important;
    background: rgb(0 0 0 / 20%) !important;
  }
}
.landscape .fr-box.fr-document .fr-wrapper .fr-element {
  min-height: 21cm !important;
  width: 30cm !important;
  padding-left: 2cm !important;
}

.is-dark {
  .fr-toolbar.fr-top {
    background: var(--dark-sidebar-light-10);

    * {
      // color: var(--bla) !important;
      color: #000 !important;
      // fill: var(--light-text) !important;
      fill: #000 !important;
    }

    button:hover {
      background: var(--dark-sidebar-light-5);
    }
  }
  .fr-box.fr-document .fr-wrapper {
    background: var(--dark-sidebar-light-8);
  }
}

.fr-element {
  p {
    color: #000;
    font-family: inherit;
  }
  * {
    font-family: inherit;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #000;
  }
}

.is-dark {
  div {
    color: #000;
  }
  .fr-element {
    p {
      color: #000;
    }
    strong {
      color: #000;
    }
    b {
      color: #000;
    }
    span {
      color: #000;
    }
    td {
      color: #000;
    }
  }
}
.fr-box.fr-basic .fr-element {
  max-height: initial !important;
}

.vertical-heading p {
  writing-mode: vertical-lr;
  -webkit-writing-mode: vertical-lr;
  -ms-writing-mode: vertical-lr;
  filter: flipH() flipV();
  margin: 0 auto;
}

@media (min-width: 992px) {
  #landscape .fr-box.fr-document .fr-wrapper .fr-element {
    min-height: 21cm !important;
    width: 26cm !important;
  }
}

.fr-element {
  [contenteditable="false"] {
    cursor: none !important;
    user-select: none !important;
    pointer-events: none !important;
  }
}

//
.fr-element .doc-top {
  text-align: right;
  max-width: 300px;
  margin-left: auto !important;
  font-weight: bold;
}

.fr-toolbar.fr-top {
  z-index: 1;
}

.wrap-editor {
  position: relative;
}

.sign-content {
  position: absolute;
  top: 2cm;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12pt;

  .qr {
    width: 50px;
    height: 50px;
    margin-bottom: 15px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// hide no-lisense
div.fr-wrapper > div > a {
  opacity: 0;
  pointer-events: none;
}

[data-cmd="fontSize"] {
  span {
    width: 40px !important;
  }
}

.mock-editor {
  position: absolute;
  top: 30px;
  left: 44px;
  right: 47px;
  overflow-y: clip;
  pointer-events: none;
}

.list {
  user-select: none;
  position: absolute;
  left: 0;
  right: 0;

  // border-bottom: 1px dotted var(--ck-color-base-border);
  .page-order {
    position: absolute;
    right: -25px;
    top: 0px;
    background: #c1c1c1;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    pointer-events: none;
  }
}

$page: 25.5cm;
$page1: 27cm;

.list:nth-of-type(1) {
  top: $page1;
}

@for $i from 2 through 50 {
  .list:nth-of-type(#{$i}) {
    top: calc($page1 + $page * ($i - 1));
  }
}

.fr-element {
  position: relative;
  overflow-y: clip !important;
}

.fr-wrapper {
  border-left: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-right: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-radius: 0px 0px 4px 4px !important;
}

.fr-toolbar {
  border-left: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-right: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-top: 1px solid rgba(0, 0, 0, 0.38) !important;
  border-radius: 4px 4px 0px 0px !important;
}

.fr-element * {
  margin: 0px !important;
  // font-size: 14pt;
}
.fr-box.fr-document .fr-wrapper .fr-element hr {
  height: 2px;
}
.fr-second-toolbar {
  display: none !important;
}

.fr-quick-insert {
  display: none !important;
}

.fr-sticky-on {
  position: absolute !important;
  /* display: none !important; */
}

.fr-element {
  /* padding: 1cm !important; */
}

.fr-popup {
  z-index: 1052 !important;
}

.fr-box.fr-basic .fr-element.fr-view {
  font-family: "Times New Roman", Georgia, Serif;
  font-size: 18px;
  color: #444444;
}

.fr-element {
  padding: 2cm 1cm 2cm 3cm !important;
}

#landscape .fr-element {
  padding: 2cm 1.5cm 2cm 2cm !important;
}

.class1 td,
.class1 th {
  border: none !important;
}

.abz {
  text-indent: 35px;
}

.text-j {
  text-align: justify;
}

.sec-m {
  margin: 10px 0 !important;
}

// ip doc
.ip-doc table * {
  font-size: 12pt !important;
  word-break: break-word !important;
}

.ip-doc td,
.ip-doc th {
  padding: 5px !important;
  text-align: center;
}

.ip-doc th {
  border: 1px solid #ddd;
}
</style>

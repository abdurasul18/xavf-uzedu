<script setup lang="ts">
import { ddmmyyyy } from "../../utils/date";
import AppSettings from "../../core/settings.json";
import { AuthService } from "../../services/auth";
import { useToast } from "vue-toast-notification";


const $toast = useToast();
export interface ICert {
  CN: string;
  O: string;
  PINFL: string;
  T: string;
  TIN: string;
  UID: string;
  alias: string;
  disk: string;
  name: string;
  path: string;
  serialNumber: string;
  type: string;
  validFrom: string;
  validTo: string;
}

var EIMZO_MAJOR = 3;
var EIMZO_MINOR = 37;
const errorCAPIWS =
  "Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.";
const errorBrowserWS =
  "Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.";
const errorUpdateApp =
  'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
const errorWrongPassword = "Пароль неверный.";

const props = withDefaults(
  defineProps<{
    selectedDoc?: any;
    withComment?: boolean;
    show: boolean;
    isOnlyChallenge?: boolean;
    loading?: boolean;
  }>(),
  {}
);
const emits = defineEmits(["success", "update:show"]);
let comment = ref("");
let keysList = ref<ICert[]>([]);
let loading = ref(false);
let selectedKey = ref<ICert>();
let loadingButton = ref(false);
let signModal = ref(false);
let modalTitle = ref("");
let dataToSignIfNot = ref(null);
let challangeData = ref();
let dataToSign = ref(null);
let isShowedError = ref(false);
function showError(e: any) {
  if (e.isTrusted && !isShowedError.value) {
    $toast.warning("E-IMZO o'rnatilmagan");
    isShowedError.value = false;
  } else {
    $toast.error(e);
  }
}
onMounted(() => {
  appLoad();
});
async function sendToBackendSignedData(signedData: any) {
  try {
    const payload = {
      signedContent: signedData,
      inn: selectedKey.value?.TIN,
      pnfl: selectedKey.value?.PINFL,
    };
    if (props.withComment) {
      emits("success", {
        ...payload,
        comment: comment.value,
      });
    } else {
      emits("success", payload);
    }
  } catch (error) {}
}

async function openSignModal(item: any) {
  selectedKey.value = item;
  modalTitle.value = item.serialNumber + " - " + item.CN;
  if (dataToSign.value === null) {
    await signByEimzo();
  }
}
function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function clearCookie(name: string) {
  document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function setCookie(cname: any, cvalue: any) {
  var now = new Date();
  var time = now.getTime();
  time += 3600 * 6000;
  now.setTime(time);
  let expires = "expires=" + now.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
async function signByEimzo() {
  loadingButton.value = true;
  let data = challangeData.value?.challenge;
  if (!props.isOnlyChallenge) {
    data = JSON.stringify({
      ...props.selectedDoc,
      challenge: challangeData.value?.challenge,
    });
  }
  const promise = new Promise((resolve, reject) => {
    let keyId = getCookie("keyId-" + selectedKey.value?.TIN);
    if (keyId == "") {
      EIMZOClient.loadKey(
        selectedKey.value,
        function (id: string) {
          EIMZOClient.createPkcs7(
            id,
            data,
            null,
            function (pkcs7: string) {
              setCookie("keyId-" + selectedKey.value?.TIN, id);
              resolve(pkcs7);
            },
            function (e: string, r: string) {
              reject("error");
              loadingButton.value = false;
              if (r) {
                if (r.indexOf("BadPaddingException") != -1) {
                  showError(errorWrongPassword);
                } else {
                  showError(r);
                }
              } else {
                (document.getElementById("keyId") as any).innerHTML = "";
                showError(errorBrowserWS);
              }
              if (e) wsError(e);
            }
          );
        },
        function (e: string, r: string) {
          reject("error");
          loadingButton.value = false;
          if (r) {
            if (r.indexOf("BadPaddingException") != -1) {
              showError(errorWrongPassword);
            } else {
              showError(r);
            }
          } else {
            showError(errorBrowserWS);
          }
          if (e) {
            wsError(e);
          }
        }
      );
    } else {
      EIMZOClient.createPkcs7(
        keyId,
        data,
        null,
        function (pkcs7: string) {
          resolve(pkcs7);
        },
        function (e: string, r: string) {
          reject("error");
          loadingButton.value = false;
          if (r) {
            clearCookie("keyId-" + selectedKey.value?.TIN);
            if (r.indexOf("BadPaddingException") != -1) {
              showError(errorWrongPassword);
            } else {
              showError(r);
            }
          } else {
            // document.getElementById("keyId").innerHTML = "";
            showError(errorBrowserWS);
          }
          if (e) wsError(e);
        }
      );
    }
  });
  try {
    let res = await promise;
    sendToBackendSignedData(res);
  } catch {
    showError("Server error...");
  } finally {
    signModal.value = false;
    loadingButton.value = false;
  }
}
async function getData() {
  await openSignModal(selectedKey.value);
}
async function uiCreateItem(itmkey: string, vo: any) {
  var now = new Date();
  // vo.expired = dates.compare(now, vo.validTo) > 0;
  var itm = document.createElement("option");
  itm.value = itmkey;
  itm.text = vo.CN;
  if (!vo.expired) {
  } else {
    itm.style.color = "gray";
    itm.text = itm.text + " (срок истек)";
  }
  keysList.value.push(vo);
  itm.setAttribute("vo", JSON.stringify(vo));
  itm.setAttribute("id", itmkey);
  return itm;
}
async function uiLoadKeys() {
  EIMZOClient.listAllUserKeys(
    function (o: any, i: string) {
      var itemId = "itm-" + o.serialNumber + "-" + i;
      return itemId;
    },
    function (itemId: string, v: string) {
      return uiCreateItem(itemId, v);
    },
    function (items: any, firstId: string) {
      //vm.uiFillCombo(items);
      //vm.uiComboSelect(firstId);
    },
    function (e: any, r: any) {
      showError(errorCAPIWS);
    }
  );
}
function appLoad() {
  loading.value = true;
  EIMZOClient.API_KEYS = AppSettings.api_keys;
  EIMZOClient.checkVersion(
    function (major: string, minor: string) {
      var newVersion = EIMZO_MAJOR * 100 + EIMZO_MINOR;
      var installedVersion = parseInt(major) * 100 + parseInt(minor);
      if (installedVersion < newVersion) {
        loading.value = false;
        showError(errorUpdateApp);
      } else {
        EIMZOClient.installApiKeys(
          function () {
            loading.value = false;
            uiLoadKeys();
          },
          function (e: any, r: any) {
            loading.value = false;
            if (r) {
              showError(r);
            } else {
              wsError(e);
            }
          }
        );
      }
    },
    function (e: any, r: any) {
      loading.value = false;
      if (r) {
        showError(r);
      } else {
        showError(e);
      }
    }
  );
}
function wsError(e: any) {}
let loadingChallange = ref(false);
async function keySelected(e: any) {
  selectedKey.value = e;
  try {
    loadingChallange.value = true;
    let res = await AuthService.getChallenge();
    challangeData.value = res.data;
    await getData();
  } catch {
  } finally {
    loadingChallange.value = false;
  }
}
let showSign = computed({
  get() {
    return props.show;
  },
  set(val) {
    emits("update:show", val);
  },
});
</script>
<template>
  <n-modal v-model:show="showSign">
    <n-card
      @close="showSign = false"
      :closable="true"
      style="max-width: 600px"
      title="Kalitni tanlang"
    >
      <CLoader translucent :active="props.loading">
        <div class="p-3" style="min-height: 300px">
          <div>
            <div class="grid grid-cols-12">
              <div class="col-span-12" v-if="withComment">
                <p class="">{{ $t("field.comment") }}</p>
                <textarea
                  v-model="comment"
                  class="textarea"
                  style="min-height: 50px"
                ></textarea>
              </div>
              <div class="col-span-12" v-for="(item, index) in keysList" :key="index">
                <VLoader
                  :translucent="true"
                  :active="
                    loadingButton && item.serialNumber == selectedKey?.serialNumber
                  "
                >
                  <n-card
                  class="mb-4"
                    :style="
                      new Date(item.validTo).getTime() < Date.now()
                        ? `border-color:var(--danger)`
                        : ''
                    "
                  >
                    <n-alert
                      class="mb-2"
                      v-if="new Date(item.validTo).getTime() < Date.now()"
                      type="error"
                      style="width: 100%"
                    >
                      Sertifikat amal qilish muddati tugagan!
                    </n-alert>
                    <div class="grid grid-cols-12 gap-4">
                      <div class="col-span-12 text-success">{{ item.CN }}</div>

                      <div class="col-span-4">
                        <label class="name"> STIR </label>
                        <div>{{ item.TIN }}</div>
                      </div>
                      <div class="col-span-4">
                        <label class="name"> JSHSHIR </label>
                        <div>{{ item.PINFL }}</div>
                      </div>
                      <div class="col-span-4">
                        <label class="name"> Sertifikat raqami</label>
                        <div>{{ item.serialNumber }}</div>
                      </div>
                      <div class="col-span-4">
                        <label class="name"> Tashkilot</label>
                        <div>{{ item.O || "-" }}</div>
                      </div>
                      <div class="col-span-8">
                        <label class="name"> Sertifikatning amal qilish muddati</label>
                        <div>
                          {{ ddmmyyyy(item?.validFrom as any) }} dan
                          {{ ddmmyyyy(item.validTo as any) }} gacha
                        </div>
                      </div>
                      <div class="col-span-12 flex justify-end">
                        <!-- :disabled="(+ new Date(item.validTo) < Date.now())" -->
                        <!--  :disabled=" new Date(item.validTo).getTime() < Date.now()" -->

                        <n-button
                          v-if="new Date(item.validTo).getTime() >= Date.now()"
                          @click="keySelected(item)"
                          type="info"
                          :loading="
                            loadingChallange &&
                            item.serialNumber == selectedKey?.serialNumber
                          "
                          >Ushbu kalitni tanlang</n-button
                        >
                      </div>
                    </div>
                  </n-card>
                </VLoader>
              </div>
            </div>
          </div>
        </div>
      </CLoader>
    </n-card>
  </n-modal>
</template>
<style lang="scss" scoped>
.name {
  font-weight: bold;
}
</style>

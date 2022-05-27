<template>
  <n-spin :show="storeListPagination.loading">
    <n-card>
      <n-space>
        <n-form inline :show-label="false" @keyup.enter="searchStoreSign">
          <n-form-item>
            <n-input
              placeholder="请输入门店名称"
              v-model:value="searchStoreName"
            ></n-input>
          </n-form-item>
          <n-form-item>
            <n-button @click="searchStoreSign">搜索</n-button>
          </n-form-item>
        </n-form>
      </n-space>
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>门店名称</th>
            <th>门店编号</th>
            <th>盘点弹窗</th>
            <th>收货弹窗</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(storeItem, itemIndex) in stores" :key="storeItem.allotID">
            <td>{{ storeItem.allotName }}</td>
            <td>{{ storeItem.allotID }}</td>
            <td>{{ storeItem.isCancelCheck ? "关闭" : "开启" }}</td>
            <td>{{ storeItem.isCancelReceive ? "关闭" : "开启" }}</td>
            <td>
              <n-button @click="showSetStoreModal(itemIndex)">设置</n-button>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-empty v-if="stores.length === 0" description="无数据"> </n-empty>
      <n-space justify="center">
        <n-space justify="end" item-style="margin-top:20px;">
          <n-pagination
            :page-size="storeListPagination.perPage"
            :page="storeListPagination.page"
            :item-count="storeListPagination.total"
            @update:page="switchStoreListPage"
          />
        </n-space>
      </n-space>
      <n-modal
        title="门店设置"
        v-model:show="showStoreSetModal"
        preset="card"
        :style="{ width: '40vw' }"
        size="huge"
        :bordered="false"
      >
        <n-form v-if="setStore">
          <n-form-item label="盘点弹窗">
            <n-switch
              @update:value="changeStoreInventoryStatus"
              v-model:value="setStore.isCancelCheck"
              :unchecked-value="1"
              :checked-value="0"
            ></n-switch>
          </n-form-item>
          <n-form-item label="收货弹窗">
            <n-switch
              @update:value="changeStoreReceiptStatus"
              v-model:value="setStore.isCancelReceive"
              :unchecked-value="1"
              :checked-value="0"
            ></n-switch>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button :disabled="disabledCloseModal" @click="closeSetStoreModal"
              >关闭</n-button
            >
          </n-space>
        </template>
      </n-modal>
    </n-card>
  </n-spin>
</template>

<script lang="ts" setup>
import storeApi from "@/api/storeApi";
import type { TStore } from "@/types/storeTypes";
import { onMounted, reactive, ref } from "vue";
import { useMessage } from "naive-ui";
const NMessage = useMessage();

const storeListPagination = reactive({
  perPage: 10,
  page: 1,
  total: 0,
  loading: false,
});
const stores = ref<TStore[]>([]);
const searchStoreName = ref<string>("");
function getStores() {
  if (storeListPagination.loading) {
    return;
  }
  storeListPagination.loading = true;
  storeApi
    .list(
      storeListPagination.page,
      storeListPagination.perPage,
      searchStoreName.value
    )
    .then(({ rows, total }) => {
      stores.value = rows;
      storeListPagination.total = total;
    })
    .finally(() => {
      storeListPagination.loading = false;
    });
}
function searchStoreSign() {
  storeListPagination.loading = false;
  storeListPagination.page = 1;
  storeListPagination.total = 0;
  stores.value = [];
  getStores();
}
function switchStoreListPage(page: number) {
  if (storeListPagination.loading) {
    return;
  }
  storeListPagination.page = page;
  getStores();
}

const showStoreSetModal = ref<boolean>(false);
const setStore = ref<TStore>(null);
const disabledCloseModal = ref<boolean>(false);
function showSetStoreModal(rowIndex: number) {
  setStore.value = stores.value[rowIndex];
  showStoreSetModal.value = true;
}
function changeStoreInventoryStatus(checked: number) {
  const loading = NMessage.loading("");
  disabledCloseModal.value = true;
  storeApi
    .updateStoreSet(
      setStore.value.allotID,
      checked,
      setStore.value.isCancelReceive,
      setStore.value.allotName
    )
    .then(() => {
      NMessage.success("设置成功");
      setStore.value.isCancelCheck = checked as 0 | 1;
    })
    .catch(() => {
      NMessage.success("设置失败");
    })
    .finally(() => {
      disabledCloseModal.value = false;
      loading.destroy();
    });
}
function changeStoreReceiptStatus(checked: number) {
  const loading = NMessage.loading("");
  disabledCloseModal.value = true;
  storeApi
    .updateStoreSet(
      setStore.value.allotID,
      setStore.value.isCancelCheck,
      checked,
      setStore.value.allotName
    )
    .then(() => {
      NMessage.success("设置成功");
      setStore.value.isCancelReceive = checked as 0 | 1;
    })
    .catch(() => {
      NMessage.success("设置失败");
    })
    .finally(() => {
      disabledCloseModal.value = false;
      loading.destroy();
    });
}
function closeSetStoreModal() {
  showStoreSetModal.value = false;
}

onMounted(() => {
  getStores();
});
</script>

<style scoped></style>

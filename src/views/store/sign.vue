<template>
  <n-card>
    <n-spin :show="storeListPagination.loading">
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
            <th>下单时间</th>
            <th>订单号</th>
            <th>签名</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="storeItem in stores" :key="storeItem.allotID" style="height:133px;">
            <td>{{ storeItem.allotName }}</td>
            <td>{{ storeItem.billDate }}</td>
            <td>{{ storeItem.billNo }}</td>
            <td>
              <n-image
                :src="storeItem.signUrl"
                width="160"
                height="100"
                object-fit="contain"
                :alt="`${storeItem.allotName}的签收图`"
                style="border: 1px solid #eee"
                v-if="storeItem.signUrl"
              ></n-image>
              <section v-else>未签收</section>
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
    </n-spin>
  </n-card>
</template>

<script lang="ts" setup>
import storeApi from "@/api/storeApi";
import type { TStoreSign } from "@/types/storeTypes";
import { onMounted, reactive, ref } from "vue";

const storeListPagination = reactive({
  perPage: 10,
  page: 1,
  total: 0,
  loading: false,
});
const stores = ref<TStoreSign[]>([]);
const searchStoreName = ref<string>("");
function getStoreSign() {
  if (storeListPagination.loading) {
    return;
  }
  storeListPagination.loading = true;
  storeApi
    .getStoreSign(
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
  getStoreSign();
}
function switchStoreListPage(page: number) {
  if (storeListPagination.loading) {
    return;
  }
  storeListPagination.page = page;
  getStoreSign();
}

onMounted(() => {
  getStoreSign();
});
</script>

<style scoped></style>

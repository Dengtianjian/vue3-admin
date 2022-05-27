<template>
  <n-card>
    <n-spin :show="driverListPagination.loading">
      <n-space justify="end" item-style="margin-bottom:20px;">
        <n-button type="primary" @click="addNewDriver" :loading="driverFormSaving">新 增</n-button>
      </n-space>
      <n-table :bordered="false">
        <thead>
          <tr>
            <th>司机姓名</th>
            <th>账号</th>
            <th>性别</th>
            <!-- <th>手机号码</th> -->
            <th>注册时间</th>
            <th>状态</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(driverItem, itemIndex) in drivers" :key="itemIndex">
            <td>{{ driverItem.nickName }}</td>
            <td>{{ driverItem.userName }}</td>
            <td>{{ driverItem.sex === "0" ? "男" : "女" }}</td>
            <!-- <td>{{ driverItem.phonenumber || "-" }}</td> -->
            <td>{{ driverItem.createTime }}</td>
            <td>
              <n-switch @update:value="driverStatusUpdate(driverItem, $event)" checked-value="0" unchecked-value="1"
                :value="driverItem.status">
                <template #checked>正常</template>
                <template #unchecked>停用</template>
              </n-switch>
            </td>
            <td width="120px">
              <n-button-group size="tiny">
                <n-button quaternary @click="displaySelectStoreModal(itemIndex)">配送门店</n-button>
                <n-button quaternary @click="editDriverInfo(itemIndex)">编辑</n-button>
                <n-button quaternary type="error" @click="removeDriver(itemIndex)" :loading="driverItem.deleting">移除
                </n-button>
              </n-button-group>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-empty v-if="drivers.length === 0" description="无数据"></n-empty>
      <n-space justify="end" item-style="margin-top:20px;">
        <n-pagination :page-size="driverListPagination.perPage" :page="driverListPagination.page"
          :item-count="driverListPagination.total" @update:page="switchPage" />
      </n-space>
    </n-spin>
  </n-card>
  <n-modal v-model:show="showEditDriverModal" preset="card" :style="{ width: '40vw' }" :title="modalTitle" size="huge"
    :bordered="false">
    <n-form ref="editDriverFormRef" :model="editDriverForm" :rules="editDriverFormRules" @keyup.enter="saveDriver">
      <n-form-item label="司机姓名" required path="nickName">
        <n-input v-model:value="editDriverForm.nickName" placeholder="请输入司机姓名" clearable></n-input>
      </n-form-item>
      <n-form-item label="账号" required path="userName">
        <n-input v-model:value="editDriverForm.userName" placeholder="请输入司机账号" clearable></n-input>
      </n-form-item>
      <!-- <n-form-item label="手机号码" required path="phone">
        <n-input
          v-model:value="editDriverForm.phone"
          placeholder="请输入司机联系手机号码"
          clearable
        ></n-input>
      </n-form-item>-->
      <n-form-item label="密码" path="password">
        <n-input v-model:value="editDriverForm.password" placeholder="请输入司机账号密码" type="password"></n-input>
      </n-form-item>
      <!-- <n-form-item label="角色" required path="roles">
        <n-select
          v-model:value="editDriverForm.roles"
          clearable
          :options="roleOptions"
          placeholder="请选择用户角色"
          :disabled="rolesLoading"
        ></n-select>
      </n-form-item>-->
      <n-form-item label="性别" required path="sex">
        <n-radio-group v-model:value="editDriverForm.sex">
          <n-space>
            <n-radio v-for="(optionLabel, sexOption) in sexs" :key="sexOption" :value="sexOption">{{ optionLabel }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
    </n-form>
    <template #footer>
      <n-space justify="end">
        <n-button @click="cancelEditDriver">取消</n-button>
        <n-button type="primary" @click="saveDriver" :loading="driverFormSaving || rolesLoading"
          :disabled="rolesLoading">保存</n-button>
      </n-space>
    </template>
  </n-modal>
  <n-modal v-model:show="showSelectStoreModal" preset="card" :style="{ width: '60vw' }" title="门店列表" size="huge"
    :bordered="false" @after-leave="resetStoreList">
    <n-space>
      <n-form inline :show-label="false" @keyup.enter="searchStore">
        <n-form-item>
          <n-input placeholder="请输入门店名称" v-model:value="searchStoreName"></n-input>
        </n-form-item>
        <n-form-item>
          <n-button @click="searchStore" :loading="storeListPagination.loading">搜索</n-button>
        </n-form-item>
      </n-form>
    </n-space>
    <section class="store-list">
      <n-table :bordered="false">
        <thead>
          <tr>
            <th>门店名称</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(storeItem, itemIndex) in stores" :key="storeItem.allotID">
            <td>{{ storeItem.allotName }}</td>
            <td width="120px">
              <n-checkbox :checked="storeItem.selected" @update:checked="selectStore(itemIndex, $event)"></n-checkbox>
            </td>
          </tr>
        </tbody>
      </n-table>
    </section>
    <n-space justify="end" item-style="margin-top:20px;">
      <n-pagination :page-size="storeListPagination.perPage" :page="storeListPagination.page"
        :item-count="storeListPagination.total" @update:page="switchStoreListPage" />
    </n-space>
    <template #footer>
      <n-space justify="end">
        <n-button @click="cancelBoundStore">取消</n-button>
        <n-button type="primary" @click="confirmBoundStore" :loading="driverFormSaving"
          :disabled="storeListPagination.loading">确定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import driverApi from "@/api/driverApi";
import roleApi from "@/api/roleApi";
import storeApi from "@/api/storeApi";
import type { TDriver } from "@/types/driversTypes";
import type { TRole } from "@/types/roleTypes";
import type { TStore } from "@/types/storeTypes";
import {
  useMessage,
  type FormInst,
  type FormItemRule,
  type FormRules,
} from "naive-ui";
import { computed, onMounted, reactive, ref, watch } from "vue";
const NMessage = useMessage();

const editDriverForm = reactive<{
  userId: number;
  nickName: string;
  userName: string;
  phone: string;
  password: string;
  sex: "0" | "1" | string;
  roles: number;
}>({
  userId: null,
  nickName: "",
  userName: "",
  phone: "",
  password: "",
  sex: "0",
  roles: 2,
});
function validatorPassword(rule: FormItemRule, value: string): boolean {
  if (editDriverForm.userId) {
    return true;
  }
  if (value.length > 0) return true;
  return false;
}
const editDriverFormRules: FormRules = reactive({
  nickName: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入司机姓名",
  },
  userName: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入司机账号",
  },
  phone: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入司机手机号码",
  },
  password: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入司机账号密码",
    validator: validatorPassword,
  },
  // roles: {
  //   required: true,
  //   trigger: ["blur"],
  //   message: "请选择用户角色",
  // },
});
const sexs: Record<"0" | "1", string> = {
  "0": "男",
  "1": "女",
};
const editDriverIndex = ref<number>(null);
const driverFormSaving = ref<boolean>(false);
const editDriverFormRef = ref<FormInst | null>(null);
const showEditDriverModal = ref<boolean>(false);
const drivers = ref<
  (TDriver & {
    deleting: boolean;
  })[]
>([]);
const driverListPagination = reactive({
  page: 1,
  perPage: 15,
  total: 0,
  loading: false,
});
function switchPage(page: number) {
  driverListPagination.page = page;
  getDrivers();
}
function getDrivers() {
  if (driverListPagination.loading) return;
  driverListPagination.loading = true;
  driverApi
    .list(driverListPagination.page, driverListPagination.perPage)
    .then(({ rows, total }) => {
      if (rows.length === 0) return;

      driverListPagination.total = total;
      drivers.value = rows.filter((driverItem) => {
        return driverItem.admin === false;
      }) as (TDriver & {
        deleting: boolean;
      })[];
    })
    .finally(() => {
      driverListPagination.loading = false;
    });
}

function addNewDriver() {
  showEditDriverModal.value = true;
}
function editDriverInfo(rowIndex: number) {
  editDriverIndex.value = rowIndex;
  const driverInfo = drivers.value[rowIndex];
  editDriverForm.userId = driverInfo.userId;
  editDriverForm.nickName = driverInfo.nickName;
  editDriverForm.userName = driverInfo.userName;
  editDriverForm.phone = driverInfo.phonenumber;
  editDriverForm.sex = driverInfo.sex;

  editDriverForm.roles = driverInfo.roleIds[0] ?? null;

  showEditDriverModal.value = true;
}
function removeDriver(rowIndex: number) {
  const driver = drivers.value[rowIndex];
  if (driver.deleting) return;
  driver.deleting = true;

  driverApi
    .remove(driver.userId.toString())
    .then(() => {
      NMessage.success("移除成功");
      drivers.value.splice(rowIndex, 1);
    })
    .catch(({ msg }) => {
      NMessage.error(msg);
    })
    .finally(() => {
      driver.deleting = false;
    });
}
function cancelEditDriver() {
  showEditDriverModal.value = false;
}
const modalTitle = computed(() => {
  if (editDriverIndex.value === null) {
    return "新增司机";
  }
  return "编辑司机信息";
});
watch(
  () => showEditDriverModal.value,
  (newV) => {
    if (newV === false) {
      editDriverIndex.value = null;
      editDriverForm.userName = "";
      editDriverForm.nickName = "";
      editDriverForm.sex = "0";
      editDriverForm.phone = "";
      editDriverForm.password = "";
      editDriverForm.userId = 0;
    } else {
      if (editDriverForm.userId) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 是存在该属性的
        editDriverFormRules.password.required = false;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 是存在该属性的
        editDriverFormRules.password.required = true;
      }
    }
  }
);
function saveDriver() {
  if (driverFormSaving.value) return;
  editDriverFormRef.value.validate().then(() => {
    driverFormSaving.value = true;
    new Promise((resolve, reject) => {
      if (editDriverIndex.value === null) {
        driverApi
          .add({
            userName: editDriverForm.userName,
            nickName: editDriverForm.nickName,
            phonenumber: editDriverForm.phone,
            sex: editDriverForm.sex,
            password: editDriverForm.password,
            status: "0",
            allotIds: [],
            roleIds: [2],
          })
          .then((res) => {
            NMessage.success("新增成功");
            cancelEditDriver();
            getDrivers();
            resolve(res);
          })
          .catch(reject);
      } else {
        driverApi
          .edit({
            userId: editDriverForm.userId,
            userName: editDriverForm.userName,
            nickName: editDriverForm.nickName,
            phonenumber: editDriverForm.phone,
            sex: editDriverForm.sex,
            password: editDriverForm.password,
            roleIds: [2]
          })
          .then((res) => {
            NMessage.success("保存成功");
            drivers.value[editDriverIndex.value].userName = editDriverForm.userName;
            drivers.value[editDriverIndex.value].nickName = editDriverForm.nickName;
            drivers.value[editDriverIndex.value].phonenumber = editDriverForm.phone;
            drivers.value[editDriverIndex.value].sex = editDriverForm.sex as "0" | "1";
            resolve(res);
          })
          .catch(reject);
      }
    })
      .catch(({ msg }) => {
        NMessage.error(msg);
      })
      .finally(() => {
        driverFormSaving.value = false;
        showEditDriverModal.value = false;
      });
  });
}
function driverStatusUpdate(driverItem: TDriver, status: "1" | "0") {
  driverApi
    .edit({
      userId: driverItem.userId,
      status,
    })
    .then(() => {
      NMessage.success("变更成功");
      driverItem.status = status;
    })
    .catch(({ msg }) => {
      NMessage.error(msg);
    });
}

const stores = ref<
  (TStore & {
    selected: boolean;
  })[]
>([]);
const showSelectStoreModal = ref<boolean>(false);
const storeListPagination = reactive({
  page: 1,
  perPage: 10,
  total: 0,
  loading: false,
});
let toDriver: TDriver = null;
let selectedStoreId = new Set<number>();
const searchStoreName = ref<string>("");
function displaySelectStoreModal(rowIndex: number) {
  toDriver = drivers.value[rowIndex];
  if (toDriver.allotIds) {
    toDriver.allotIds.forEach((storeId) => {
      selectedStoreId.add(storeId);
    });
    refreshStoreSelectStatus();
  }
  showSelectStoreModal.value = true;
}
function refreshStoreSelectStatus() {
  // if (!toDriver) return;

  stores.value.forEach((storeItem) => {
    if (selectedStoreId.has(storeItem.allotID)) {
      storeItem.selected = true;
    } else {
      storeItem.selected = false;
    }
  });
}
function switchStoreListPage(page: number) {
  storeListPagination.page = page;
  getStores();
}
function selectStore(itemIndex: number, checked: boolean) {
  const store = stores.value[itemIndex];
  if (checked) {
    selectedStoreId.add(store.allotID);
    store.selected = true;
  } else {
    selectedStoreId.delete(store.allotID);
    store.selected = false;
  }
}
function getStores() {
  if (storeListPagination.loading) return;
  storeListPagination.loading = true;
  storeApi
    .list(
      storeListPagination.page,
      storeListPagination.perPage,
      searchStoreName.value
    )
    .then(async ({ rows, total }) => {
      rows.forEach((storeItem) => {
        storeItem["selected"] = false;
      });
      stores.value = rows as (TStore & {
        selected: boolean;
      })[];
      storeListPagination.total = total;
      refreshStoreSelectStatus();
    })
    .finally(() => {
      storeListPagination.loading = false;
    });
}
function confirmBoundStore() {
  driverApi
    .edit({
      userId: toDriver.userId,
      userName: toDriver.userName,
      nickName: toDriver.nickName,
      phonenumber: toDriver.phonenumber,
      sex: toDriver.sex,
      password: toDriver.password,
      status: "0",
      allotIds: Array.from(selectedStoreId),
    })
    .then(() => {
      toDriver.allotIds = Array.from(selectedStoreId);
      NMessage.success("绑定成功");
    })
    .catch(({ msg }) => {
      NMessage.error(msg);
    })
    .finally(() => {
      cancelBoundStore();
    });
}
function cancelBoundStore() {
  showSelectStoreModal.value = false;
}
function resetStoreList() {
  selectedStoreId.clear();
  toDriver = null;
  storeListPagination.page = 1;
  getStores();
  refreshStoreSelectStatus();
}
function searchStore() {
  storeListPagination.loading = false;
  storeListPagination.page = 1;
  storeListPagination.total = 0;
  getStores();
}

const roles = ref<TRole[]>([]);
const roleOptions = ref([]);
const rolesLoading = ref<boolean>(true);
function getRoles() {
  // if (rolesLoading.value) return;
  rolesLoading.value = true;
  roleApi
    .list()
    .then((res) => {
      roles.value = res.rows;
      res.rows.forEach((roleItem) => {
        roleOptions.value.push({
          label: roleItem.roleName,
          value: roleItem.roleId,
        });
      });
    })
    .finally(() => {
      rolesLoading.value = false;
    });
}

onMounted(() => {
  getDrivers();
  getStores();
  // getRoles();
  setTimeout(getRoles, 2000);
});
</script>

<style scoped>
.store-list {
  height: 48vh;
  overflow: hidden auto;
}

@media only screen and (min-height:800px) {
  .store-list {
    height: unset;
  }
}

@media only screen and (max-height:570px) {
  .store-list {
    height: 35vh;
  }
}
</style>

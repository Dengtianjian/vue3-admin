<template>
  <div class="container">
    <main class="login">
      <h2>登录</h2>
      <n-form
        ref="loginFormRef"
        :show-label="false"
        @keyup.enter="login"
        :model="loginModel"
        :rules="loginFormRules"
      >
        <n-form-item path="account">
          <n-input
            v-model:value="loginModel.account"
            type="text"
            placeholder="请输入账号"
            autofocus
            min="1"
          />
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="loginModel.password"
            type="password"
            placeholder="请输入账号的密码"
            min="1"
          />
        </n-form-item>
        <n-form-item :show-label="true">
          <n-button
            block
            type="primary"
            @click.prevent="login"
            :loading="loging"
            >登录</n-button
          >
        </n-form-item>
      </n-form>
    </main>
    <YFooter class="footer" />
  </div>
</template>

<script lang="ts" setup>
import { YFooter } from "#/index";
import type { FormInst, FormRules, FormValidationError } from "naive-ui";
import { ref } from "vue";
import { useMessage } from "naive-ui";
import userService from "@/service/userService";
import { useRouter } from "vue-router";
const NMessage = useMessage();
const R = useRouter();

const loginFormRules = ref<FormRules>({
  account: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入账号",
  },
  password: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入账号密码",
  },
});

const loginModel = ref({
  account: "",
  password: "",
});

const loging = ref<boolean>(false);
const loginFormRef = ref<FormInst | null>(null);
function login() {
  if (loging.value) return;
  loging.value = true;
  loginFormRef.value
    .validate()
    .then(() => {
      userService
        .accountLogin(loginModel.value.account, loginModel.value.password)
        .then(({ token, account }) => {
          R.replace("/management");
          NMessage.success("欢迎回来~");
        })
        .catch(() => {
          NMessage.error("登录失败");
        });
    })
    .catch((errors: FormValidationError) => {
      // console.log(errors);
    })
    .finally(() => {
      loging.value = false;
    });
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: var(--background-color);
}
.login {
  padding: 10px 20px;
  width: 350px;
  background-color: white;
}
.login > h2 {
  margin-bottom: 40px;
  text-align: center;
}
.container > .footer {
  position: absolute;
  bottom: 10px;
}
</style>

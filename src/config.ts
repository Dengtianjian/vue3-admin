const defaultConfig = {
  siteName: "管理后台",
  apiUrl: "",
  version: "Alpha-0.1.1-20220527"
}

const production = {
  apiUrl: "http://127.0.0.1"
}

const development = {
  apiUrl: "http://127.0.0.1",
  // ...production //* 临时使用
}

const env: string = import.meta.env.MODE;
const configs = {
  development,
  production
}

export default {
  ...defaultConfig,
  ...configs[env]
} as {
  apiUrl: string,
  version: string,
  siteName: string
};
const defaultConfig = {
  siteName: "管理后台",
  apiUrl: "",
  version: "Alpha-0.1.4-20220412"
}

const production = {
  apiUrl: "https://api.driver.yuanyunest.cn:88"
}

const development = {
  apiUrl: "http://192.168.31.159:8887",
  ...production //* 临时使用
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
import type components from "naive-ui/es/components.d";

declare module 'vue' {
  export interface GlobalComponents {
    NButton: typeof components['NButton'],
    NCard: typeof import("naive-ui/es/card/index")['NCard'],
    NAffix: typeof import("naive-ui/es/affix/index")['NAffix'],
    NAvatar: typeof import("naive-ui/es/avatar/index")['NAvatar'],
    NSpace: typeof import("naive-ui/es/space/index")['NSpace'],
    NScrollbar: typeof import("naive-ui/es/scrollbar/index")['NScrollbar'],
    NTable: typeof import("naive-ui/es/table/index")['NTable'],
    NPagination: typeof import("naive-ui/es/pagination/index")['NPagination'],
    NModal: typeof import("naive-ui/es/modal/index")['NModal'],
    NImage: typeof import("naive-ui/es/image/index")['NImage'],
    NSwitch: typeof import("naive-ui/es/switch/index")['NSwitch'],
    NSpin: typeof import("naive-ui/es/spin/index")['NSpin'],
    NSelect: typeof import("naive-ui/es/select/index")['NSelect']
  }
}

export { }
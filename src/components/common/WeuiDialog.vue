<template lang="jade">
div
    .weui_mask
    .weui_dialog
        .weui_dialog_hd
            strong.weui_dialog_title {{ item.title }}
        .weui_dialog_bd {{ item.content }}
        .weui_dialog_ft
            .weui_btn_dialog.default(style="width:50%;float:left") 取消
            .weui_btn_dialog.primary(@click="sure", dstyle="width:50%;float:right") 确定
</template>

<script>
export default {
    name: 'weuiDialog',
    props: ['item'],
    data () {
        return {
            status: false,
        }
    },
    methods: {
        sure () {
            this.$emit('transfer', false)
        }
    }
}
</script>

<style scoped>
.weui_dialog{
}
</style>

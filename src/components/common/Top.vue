<template lang="jade">
div
    .weui_mask_transition.weui_fade_toggle#mask(style="display: block", v-show="status")
    .header
        .header-left(href="javascript:history.back()") 亿豪房产
        button.navbar-toggle.collapsed(@click="show")
            span.icon-bar
            span.icon-bar
            span.icon-bar
        .weui_actionsheet.weui_actionsheet_toggle#weui_actionsheet(v-show="status")
            .weui_actionsheet_menu
                .weui_actionsheet_cell 首页
                .weui_actionsheet_cell 我要买房
                .weui_actionsheet_cell 我要租房
                .weui_actionsheet_cell 卖房登记
                .weui_actionsheet_cell 租房登记
                .weui_actionsheet_cell 我有需求
                .weui_actionsheet_cell 查看需求
            .weui_actionsheet_action
                .weui_actionsheet_cell(@click="show") 取消
</template>

<script>
export default {
    name: 'top',
    data () {
        return {
            status: false,
        }
    },
    methods: {
        show () {
            this.status = !this.status;
        }
    }
}
</script>

<style scoped>
.header {
    background-color: #f8f8f8;
    padding:12px 20px;
    margin-bottom: 20px;
    border: 1px solid #f8f8f8;
}
.header-left{
    width:40%;
    font-size:19px;
    font-weight:bold;
    color: #5e5e5e;
    display:inline-block;
    background-color: transparent
}
button{
    display:inline-block;
    height:30px;
}
.navbar-toggle {
    position: relative;
    float: right;
    padding: 7px 8px;
    margin-bottom: 8px;
    background-color: transparent;
    background-image: none;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
}
.navbar-toggle>span:not(:first-child){
    margin-top:3px;
}
.icon-bar{
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 1px;
    background:#a8a8a8;
}
</style>

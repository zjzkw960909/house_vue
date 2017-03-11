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
    section.search
        input#search-input.form-control(placeholder="今天浏览:{ times }次,赶快来搜索房源...", autocomplete="off",spellcheck="false",autocorrect="off",tabindex="1")
        i.fa.fa-search(style="color:#ccc")
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
.search{
    margin:0 auto;
    position:relative;
    width:92%;
}
.search i{
    font-size:20px;
    position:absolute;
    right:20px;
    top:7px;
}
#search-input{
    border-radius:23px;
}
.form-control{
    display:block;
    color:#555;
    background-color:#fff;
    border:1px solid #ccc;
}
input{
    font-family:inherit
}
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
.form-control {
    display: block;
    width: 100%;
    height: 34px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
}

.form-control:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}

.form-control::-moz-placeholder {
    color: #999;
    opacity: 1
}

.form-control:-ms-input-placeholder {
    color: #999
}

.form-control::-webkit-input-placeholder {
    color: #999
}

.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control {
    background-color: #eee;
    opacity: 1
}

.form-control[disabled],fieldset[disabled] .form-control {
    cursor: not-allowed
}

textarea.form-control {
    height: auto
}

input[type=search] {
    -webkit-appearance: none
}
</style>

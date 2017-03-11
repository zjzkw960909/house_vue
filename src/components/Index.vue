<template lang="jade">
div
    Top
    section.search
        input#search-input.form-control(placeholder="今天浏览:{ times }次,赶快来搜索房源...", autocomplete="off",spellcheck="false",autocorrect="off",tabindex="1")
        i.fa.fa-search(style="color:#ccc")
    nav.navlist
        a(href="#/sell-list") 
            i.icon.icon1()
            |  售房查询
        a(href="#/rent-list") 
            i.icon.icon2
            |  租房查询
        a(href="#/want") 
            i.icon.icon3 
            |  我有需求
        a(href="#/reg/sell") 
            i.icon.icon4 
            |  卖房登记
        a(href="#/reg/rent") 
            i.icon.icon5 
            |  租房登记
        a(href="#/want-show") 
            i.icon.icon6 
            |  查看需求
    .middle
    section.detail(style="margin-top:10px;clear:left")
        .title
            span.margin-auto 二手房出售
        index-list(:item="location", :name="sell[0].name", :icon="sell[0].icon")
        index-list(:item="price", :name="sell[1].name", :icon="sell[1].icon")
        index-list(:item="apartment", :name="sell[2].name", :icon="sell[2].icon")
    section.detail(style="margin-top:10px;clear:left")
        .title 
            span.margin-auto 二手房出租
        index-list(:item="location", :name="sell[0].name", :icon="sell[0].icon")
        index-list(:item="price1", :name="sell[1].name", :icon="sell[1].icon")
        index-list(:item="apartment", :name="sell[2].name", :icon="sell[2].icon")
</template>

<script>
import Top from './common/Top.vue'
import IndexList from './common/IndexList.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'index',
    components: {Top, IndexList},
    data () {
        return {
            sell: [
                {name: "location", icon: "fa-map-marker"},
                {name: "price", icon: "fa-jpy"},
                {name: "apartment", icon: "fa-tint"},
            ]
        }
    },
    computed: mapGetters({
        location: 'allLocation',
        apartment: 'allApartment',
        price: 'sellPrice',
        price1: 'rentPrice',
    }),
    created () {
        this.$store.dispatch('getLocation'),
        this.$store.dispatch('getApartment'),
        this.$store.dispatch('getSellPrice')
        this.$store.dispatch('getRentPrice')
    },
    methods: {
        test() {
            console.log(this)
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-brand{
    font-family:'microsoft yahei';
    font-size:20px;
    font-weight:bold;
}

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
.middle{
    height:15px;
    background-color:#eee;
     margin-top:180px;
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
.navlist{
    padding:20px;
}
.navlist a i{
    display:block;
    height:65px;
    width:60px;
    margin: 0 auto 6px;
}
.navlist a{
    float:left;
    display:block;
    color:#545454;
    width:33.3%;
    text-align:center;
    position:relative;
    padding-bottom:6px
}
.icon1{
    background-position:0 0px;
}

.icon2{
    background-position:-63px 0px;
}

.icon3{
    background-position:-126px 0px;
}


.icon4{
    background-position:0 68px;
}

.icon5{
    background-position:-126px 69px;
}

.icon6{
    background-position:-190px 4px;
}        
.title{
    width:120px;
    background-color:#75C751;
    border-radius:8px;
    padding:8px;
    text-align:center
}
.title span {
    color:#fff;
    font-weight:bold;
    text-align:center
}
.detail{
}
.detail a{
    display:inline-block;
    font-size:17px;
    line-height:30px;
    color:#000;
    padding:3px 6px;
}
a:focus, a:hover{
    color:#000;
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

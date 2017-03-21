<template lang="jade">
div
    Top
    section.detail
        search-options(v-on:choose_ani="out_choose", :name='location.name', :title="location.title")
        search-options(v-on:choose_ani="out_choose", :name='apartment.name', :title="apartment.title")
        search-options(v-on:choose_ani="out_choose", :name='price.name', :title="price.title")
    transition(name='fade')
        .choose-content(v-show="status")
            .choose-area
                ul
                    li(v-for="(v, k) in item.data", @click="choose", value="1") {{ v[name] }}
    ul.house-list
        li.common(style="padding:.4655em", v-for="(v, k) in sellList") 
            a(href)
                .item-thumb
                    img(:src="JSON.parse(v.pic)[0]")
                .content
                    p.title.over {{ v.location + v.address }}
                    .size.over {{ v.size }}平方米
                        span.tag.btn-danger(style="color:#EF4F4F;border:1px solid #EF4F4F;float:right;font-size:15px;", v-show="v.price") {{ v.price }}万元
                    .common
                        span.tag.btn-succ(v-show="v.apartment") {{ v.apartment }}
                        span.tag.btn-primay(v-show="v.hot") {{ v.hot }}
                        span.tag.btn-warning(v-show="v.mine") {{ v.mine }}
        
</template>

<script>
function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}
import Top from './common/Top.vue'
import SearchOptions from './common/SearchOptions.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'sell',
    components: {Top, SearchOptions},
    data () {
        return {
            status: 0,
            item: {},
            name: '',
        }
    },
    computed: mapGetters({
        location: 'dealLocation',
        apartment: 'dealApartment',
        price: 'dealSellPrice',
        price1: 'rentPrice',
        sellList: 'sellList'
    }),
    methods: {
        choose (e) {
            let text = trim(e.target.textContent),
                hash = location.hash.split('/');
            if (this.name === 'location') {
                location.href = '#/sell/' + text + '/' + hash[3] + '/' + hash[4];
            }
            if (this.name === 'apartment') {
                location.href = '#/sell/' + hash[2] + '/' + text + '/' + hash[4];
            }
            if (this.name === 'price') {
                location.href = '#/sell/' + hash[2] + '/' + hash[3] + '/' + text;
            }
            this.status = 0;
        },
        out_choose (e) {
            if (this.item == this[e]) {
                this.status = !this.status;
            } else {
                this.item = this[e];
                this.name = this[e].name;
                this.status = 1;
            }
        },
    },
    created () {
        this.$route.path.split('/');
        this.$store.dispatch('getSellList', {location: 0, apartment: 0, price: 0, page: 1}),
        this.$store.dispatch('getLocation'),
        this.$store.dispatch('getApartment'),
        this.$store.dispatch('getSellPrice')
        this.$store.dispatch('getRentPrice')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.over{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}
.tag{
    display: inline-block;
    border: 1px solid;
    text-align: center;
    padding: 0 4px;
    line-height: 14px;
    margin-right: 3px;
    font-size: 10px;
    -webkit-border-radius: 1px;
    border-radius: 1px
}
.btn-succ {
    border-color: #01a901;
    color: #01a901
}
.btn-primay {
    border-color: #0a8db3;
    color: #0a8db3
}
.btn-warning {
    border-color: #e78b02;
    color: #e78b02
}
.detail{
    z-index:3;
    margin-top:10px;
    background-color:#f8f8f8;
    border:1px solid #e8e8e8;
    width:100%;
    padding: 6px 0;
    float:left;
}
.choose-content{
    float:left;
    padding:0;
    width:100%;
    position:relative;
    z-index:1000
}
.choose-area li {
    background-color:#f8f8f8;
    padding:5px 15px;
    font-size:15px;
    border-bottom:1px solid #e8e8e8
}
li {
    list-style-type:none;
}
.choose-area li:first-child {
}
.house-list{
    display: block;
    padding: .15625rem 0;
    width: 100%;
    background-color: #fff;
    float:left;
    position:absolute;
    margin-top:50px;
}
.house-list a{
    width: 100%;
    display: block;
    height:80px;
    overflow:hidden;
}
.common{
}
.item-thumb img{
    height:75px;
    width:100px;
}
.item-thumb{
    height:100%;
    float:left;
}
.content {
    width:60%;
    float:left;
    margin-left:15px;
}
.content .size{
    color:#aaa; font-size:14px; margin-top:5px;
    margin-left:3px;
}

.price {
    float:right;
}
span{
    margin-left:5px;
}
.house-list .title{
    font-size:16px; 
    font-weight:bold; 
    color:#000; 
    width:100%;
}
</style>

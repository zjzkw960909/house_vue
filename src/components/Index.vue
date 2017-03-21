<template lang="jade">
div
    Top
    nav.navlist
        a(href="#/sell/0/0/0") 
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
        index-list(v-for="(item, index) in sell", :key="index", :item="item.item", :icon="item.icon", :name="item.name", :type="item.type")
    section.detail(style="margin-top:10px;clear:left")
        .title 
            span.margin-auto 二手房出租
</template>

<script>
var solveData = (sell, name, items, icon) => {
    let temp = {};
    if (name === 'location') {
        temp.name = 'location';
        temp.item = items.map((v) => {
            v.href = `#/sell/${v['location']}/0/0`;
            return v;
        });
    }
    if (name === 'apartment') {
        temp.name = 'apartment';
        temp.item = items.map((v) => {
            v.href = `#/sell/0/${v['apartment']}/0`;
            return v;
        });
    }
    if (name === 'price') {
        temp.name = 'price';
        temp.item = items((v) => {
            v.href = `#/sell/0/0/${v['price']}`;
            return v;
        });
    }
    temp.type = 'href';
    temp.icon = icon;
    sell.push(temp);

}
import Top from './common/Top.vue'
import IndexList from './common/IndexList.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'index',
    components: {Top, IndexList},
    data () {
        return {
            sell: [],
        }
    },
    /*computed: mapGetters({
        location: 'allLocation',
        apartment: 'allApartment',
        price: 'sellPrice',
        price1: 'rentPrice',
    }),*/
    created () {
        let http = this.$http, tempSell = [];
        http.get('/api/location').then((res) => {
            solveData(tempSell, 'location', res.body.data, "fa-map-marker");
            return http.get('/api/apartment');
        }).then((res) => {
            solveData(tempSell, 'apartment', res.body.data, "fa-jpy");
            this.sell = tempSell;
        }, (err) => {
            console.log(err)
        });
        /*this.$store.dispatch('getLocation'),
        this.$store.dispatch('getApartment'),
        this.$store.dispatch('getSellPrice')
        this.$store.dispatch('getRentPrice')*/
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

.middle{
    height:15px;
    background-color:#eee;
     margin-top:180px;
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
</style>

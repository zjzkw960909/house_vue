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
}
.choose-area li {
    background-color:#f8f8f8;
    list-style-type:none;
    padding:5px 15px;
    font-size:15px;
    border-bottom:1px solid #e8e8e8
}

.choose-area li:first-child {
}

</style>

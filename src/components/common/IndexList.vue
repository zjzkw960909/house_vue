<template lang="jade">
    .out
        .left
            i.fa(:class="icon")
        .mid
            a(v-for="(v, k) in test", :href="v.href") {{ v[name] }} 
        .right(@click="showSellWhere")
            i.fa.fa-angle-up(v-show="status")
            transition(name="fade")
                i.fa.fa-angle-down(v-show="!status")
</template>
<script>
import { mapGetters } from 'vuex'
import _ from 'underscore'
export default {
    name: 'indexList',
    props: ['item', 'name', 'icon'],
    data () {
        return {
            status: 1
        }
    },
    computed: {
        test () {
            if (this.item.length) {
                let name = this.name;
                return _.map(this.item, (v) => {
                    if (name === 'location') {
                        v['href'] = '#/sell/' + v[name] + '/0/0';
                    }
                    if (name === 'apartment') {
                        v['href'] = '#/sell/0/' + v[name] + '/0';
                    }
                    if (name === 'price') {
                        v['href'] = '#/sell/0/0/' + v[name];
                    }
                    return v;
                });
            }
        }
    },
    methods: {
        showSellWhere (e) {
            let $out = e.target.parentElement.parentElement;
            if (!this.status) {
                $out.style.height =  '';
            } else {
                $out.style.height =  '100%';
            }
            this.status = !this.status;
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fullHeight{
    height:100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.out a{
    display:inline-block;
    font-size:17px;
    line-height:30px;
    color:#000;
    padding:3px 6px;
}
.out i {
    font-size:30px; 
    color:#75C751;
}
.out {
    width:100%;
    height:36px;
    overflow:hidden;
    padding:8px;
    float:left;
}
.out .left{
    display:inline-block;
    float:left;
    width:10%   
}
.out .mid{
    display:inline-block;
    float:left;
    width:75%
}
.out .right{
    display:inline-block;
    float:right;
    width:10%   
}
</style>

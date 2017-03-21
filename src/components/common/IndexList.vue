<template lang="jade">
    .out
        .left
            i.fa(:class="icon")
        .mid(v-if="type == 'href'")
            a(v-for="(v, k) in item", :href="v.href") {{ v[name] }} 
        .mid(v-if="type == 'span'", @click="chooseWhere")
            span(v-show="!showAll") {{ first || item[0][name]}} 
            span(v-show="showAll", v-for="(v, k) in item") {{ v[name] }} 
        .right(@click="showSellWhere")
            i.fa.fa-angle-up(v-show="status")
            transition(name="fade")
                i.fa.fa-angle-down(v-show="!status")
</template>
<script>
export default {
    name: 'indexList',
    props: ['item', 'name', 'icon', 'type'],
    data () {
        return {
            status: 1,
            showAll: 0,
            first: '',
        }
    },
    computed: {
    },
    methods: {
        hideStatus (e) {
            let $out = e.target.parentElement.parentElement;
            if (!this.status) {
                $out.style.height =  '';
            } else {
                $out.style.height =  '100%';
            }
            this.status = !this.status;
        },
        showSellWhere (e) {
            if (this.type === 'span') {
                this.showAll = !this.showAll;   
            }
            this.hideStatus(e);
        },
        chooseWhere (e) {
            this.first = e.target.textContent.split(' ').join('');
            this.showAll = !this.showAll;   
            this.hideStatus(e);
            let temp = {name: this.name, value: this.first};
            this.$store.dispatch('changeWantPost', temp);
        },
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
.out a,span{
    display:inline-block;
    font-size:17px;
    line-height:30px;
    color:#000;
    padding:3px 6px;
}
.out span {
    float:right !important;
    font-size: 14px !important;
}
.out i {
    font-size:26px; 
    color:#75C751;
}
.out {
    width:100%;
    height:30px;
    overflow:hidden;
    padding:5px;
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

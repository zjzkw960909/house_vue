<template lang="jade">
div
    .want_one
        .left
            i.fa.fa-map-marker
        .mid
            input.price(ref="input", :type="item.type", v-on:blur="pushData", :placeholder="placeholder") 
        .right
            i.fa.fa-hand-o-left.rightI(value="0")
</template>
<script>
export default {
    name: 'input',
    props: ['item', 'value', 'placeholder'],
    data () {
        return {
        }
    },
    methods: {
        pushData (e) {
            let temp = {name: this.item.name, value: e.target.value};
            this.$store.dispatch('changeWantPost', temp);
        }
    },
    watch: {
    },
    created () {
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.want_one .left{
    width:20%;
    display:inline-block;
}
.want_one .right{
    width:20%;
    display:inline-block;
}
.want_one .mid{
    width:60%;
    padding-right:0;
    padding-top:2px;
    display:inline-block;
}
.want_one {
    border-bottom:1px solid #eee;
    padding:5px;
}
.want_one .price {
    font-size:16px;
    line-height:36px;
    text-align:right;
    border:0px;
    width:100%;
    height:100%
}
i {
    font-size:26px; 
    color:#75C751;
}
.rightI {
    margin-left:25px;;

}

</style>

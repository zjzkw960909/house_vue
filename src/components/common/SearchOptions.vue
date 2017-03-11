<template lang="jade">
div
    .choose
        p.caption(@click="choose_ani")
            span.location( value="0",)  {{ params }}
            span.arrow-down(value="0")
</template>
<script>
import _ from 'underscore'
import { mapState } from 'vuex'
function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}
function dealParam(that) {
    let params = that.$route.params;
    that.params = params[that.name];
    if (that.name === 'location' && that.params - 0 === 0) {
        that.params = '区域';
    }
    if (that.name === 'apartment' && that.params - 0 === 0) {
        that.params = '户型';
    }
    if (that.name === 'price' && that.params - 0 === 0) {
        that.params = '价位'
    }
}
export default {
    name: 'searchOptions',
    props: ['item', 'name', 'title'],
    data () {
        return {
            status: 0,
            params: '',
            obj: {},
        }
    },
    methods: {
        choose_ani () {
            this.status = !this.status;
            this.$emit('choose_ani', this.name);//将数据回调给父组件
        },
    },
    watch: {
        '$route' (to, from) {
            dealParam(this);
        }
    },
    created () {
        dealParam(this);
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.choose{
    width:33.33333333%;
    float:left;
}
.arrow-down{
    width:0px;
    height:0px;
    border-left:6px solid transparent;
    border-right:6px solid transparent;
    border-top:6px solid #a8a8a8;
    display:inline-block;
    margin-bottom:2px; 
    margin-left:11px;
    margin-bottom:.02em;
}
.choose p {
    text-align:center;
    border-right:1px solid #ccc;
}
.choose-content{
    padding:5px 15px;
    width:100%;
}
.choose-area li {
    margin-top:4px;
    padding-top:5px;
    padding-bottom:8px;
    font-size:14px;
}

.choose-area li:last-child {
    border-bottom:0px;
}

</style>

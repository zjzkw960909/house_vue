<template lang="jade">
div
    Top
    .title
        span.margin-auto 需求登记
    .want_out
        common-input(v-for="(v, k) in list", :item="v", :placeholder="v.placeholder", :key="k")
    .bd(style="padding:20px;background-color:rgb(241,241,241)")
        p(style="color:#888;font-size:14px;margin-top:5px;line-height:18px") 我们会第一时间在亿豪房产实体店和亿豪房产App上进行发布，如果您非常着急，可以联系我们，我们会在实体店和App上将您的房源进行置顶。
        a.weui_btn.weui_btn_warn(style="margin-top:15px;margin-bottom:25px", href="tel:13732285128") 联系我们
        a.weui_btn.weui_btn_primary(style="margin-top:15px;margin-bottom:25px", @click="reg") 免费发布房源
    weui-dialog(@transfer="changeShow", v-show="show", :item="item")
</template>

<script>
import Top from './common/Top.vue'
import CommonInput from './common/Input.vue'
import WeuiDialog from './common/WeuiDialog.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'want',
    components: {Top, CommonInput, WeuiDialog},
    data () {
        return {
            item: {},
            show: false,
            list: [
                {
                    name: 'way',
                    placeholder: '您想买房还是租房',
                    type: 'text'
                }, 
                {
                    name: 'apartment',
                    placeholder: '输入您想要的户型',
                    type: 'text'
                }, 
                {
                    name: 'address',
                    placeholder: '您想在那块区域居住',
                    type: 'text'
                },
                {
                    name: 'price',
                    placeholder: '您心中的价位',
                    type: 'text'
                }, 
                {
                    name: 'other',
                    placeholder: '您的其他需求', 
                    type: 'text'
                    
                },
                {
                    name: 'phone',
                    placeholder: '请输入您的联系方式',
                    type: 'number'
                }, 
                {
                    name: 'name',
                    placeholder: '您的称呼',
                    type: 'text'
                }
            ]
        }
    },
    computed: mapGetters({
        postData: 'getWantPost',
    }),
    methods: {
        changeShow (data) {
            this.show = data;
        },
        reg (e) {
            this.$http.post('/api/want', this.postData).then((res) => {
                this.item = {
                    title: '您的需求已登记',
                    content: '我们已经了解您的需求,会帮您挑选合适您的房源.',
                    confirm: false,
                };  
                this.show = true;
            }, (res) => {
            
            });
        }
    },
    created () {
        this.$store.dispatch('reset')
        this.$store.dispatch('getApartment')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
    margin:15px 0;
    width:140px;
    background-color:#75C751;
    border-radius:8px;
    padding:3px 5px;
    text-align:center;
}
.title span {
    color:#fff;
    font-weight:bold;
    text-align:center
}
.want_out{
    border-bottom:2px solid #ccc;border-top:2px solid #ccc;
    padding:0px 12px
}
.want_out .left{
    width:20%;
    display:inline-block;
}
.want_out .right{
    width:20%;
    display:inline-block;
}
.want_out .mid{
    width:60%;
    padding-right:0;
    padding-top:2px;
    display:inline-block;
}
.want_one {
    border-bottom:1px solid #eee;
    padding:5px;
}
i {
    font-size:26px; 
    color:#75C751;
}
.rightI {
    margin-left:25px;;

}
</style>

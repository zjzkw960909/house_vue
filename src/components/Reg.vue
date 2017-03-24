<template lang="jade">
div
    Top
    .title
        span.margin-auto 出售房屋登记
    .want_out
        index-list(v-for="(item, index) in sell", :key="index", :item="item.item", :icon="item.icon", :name="item.name", :type="item.type")
        common-input(v-for="(v, k) in list", :item="v", :placeholder="v.placeholder", :key="k")
        .img
            form(type="multipart/form-data")
                input.photo(accept=".gif,.jpeg,.jpg,.png", type="file", id="file1", multiple="true",name="file1", @change="photo")
            i.fa.fa-picture-o
            button.btn.btn-default(@click="upload") +
            p(v-if="!pic",) 点击照片删除照片
            #preview(v-if="pic", each="{ v,k in pic }")
                .image
                    img(style="width:50px; height:40px",src="{ v }")

    .bd(style="padding:20px;background-color:rgb(241,241,241)")
        p(style="color:#888;font-size:14px;margin-top:5px;line-height:18px") 我们会第一时间在亿豪房产实体店和亿豪房产App上进行发布，如果您非常着急，可以联系我们，我们会在实体店和App上将您的房源进行置顶。
        a.weui_btn.weui_btn_warn(style="margin-top:15px;margin-bottom:25px", href="tel:13732285128") 联系我们
        a.weui_btn.weui_btn_primary(style="margin-top:15px;margin-bottom:25px", @click="reg") 免费发布房源
    weui-dialog(@transfer="changeShow", v-show="show", :item="item")
</template>

<script>
var solveData = (sell, name, items, icon) => {
    let temp = {};
    temp.name = name;
    if (name === 'location') {
        items.unshift({location: '区域选择'});
    }
    if (name === 'apartment') {
        items.unshift({apartment: '户型选择'});
    }
    temp.item = items;
    temp.icon = icon;
    temp.type = 'span';
    sell.push(temp);
}
import Top from './common/Top.vue'
import CommonInput from './common/Input.vue'
import IndexList from './common/IndexList.vue'
import WeuiDialog from './common/WeuiDialog.vue'
import _ from 'underscore'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'want',
    components: {Top, CommonInput, WeuiDialog, IndexList},
    data () {
        return {
            item: {},
            sell: [],
            pic: '',
            show: false,
            list: [
                {
                    name: 'address',
                    placeholder: '请输入具体地址和信息',
                    type: 'text'
                },
                {
                    name: 'floor',
                    placeholder: '请输入房屋楼层',
                    type: 'text'
                },
                {
                    name: 'size',
                    placeholder: '请输入平方面积',
                    type: 'number'
                },
                {
                    name: 'price',
                    placeholder: '请输入您心目中的价位',
                    type: 'number'
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
        upload (e) {
            e.target.parentElement.childNodes[0].childNodes[0].click()
        },
        photo (e) {
            let data = new FormData();
            let files = e.target.files;
　　　　　　
            if( files ) {
                _.each(files, (v) => {
                    data.append('file', v);
                });
            }
            this.$http.post('/api/photo', data).then((res) => {
                this.pic.push(res.path);
                this.pic = _.flatten(this.pic);
            });
        },
        reg (e) {
            this.$http.post('/api/sellReg', this.postData).then((res) => {
                
            }, (res) => {
            
            });
        }
    },
    mounted() {
    },
    created () {
        let http = this.$http, tempSell = [];
        this.$store.dispatch('reset')
        http.get('/api/location').then((res) => {
            solveData(tempSell, 'location', res.body.data, "fa-map-marker");
            return http.get('/api/apartment');
        }).then((res) => {
            solveData(tempSell, 'apartment', res.body.data, "fa-jpy");
            this.sell = tempSell;
        }, (err) => {
            console.log(err)
        });
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img{
    padding:4px;
}
.photo{
    margin-top:6px;display:none
}
.fa-picture-o{
    font-size:24px; margin-top:10px;margin-left:4px;color:#75C751
}
.img button{
    color:#75C751;font-size:24px; font-weight:bold;border:1px dashed #75C751;padding:0px 12px;float:right;background:#fff;margin-top:5px
}
.img p{
    float:right;font-size:14px;width:46%;margin-top:6px;margin-right:4px;color:#aaa
}
.img #preview{
    float:right;margin-top:2px
}
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

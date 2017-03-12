import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

export default {
    getLocation (cb) {
        Vue.http.get('/api/location', {page:1}).then((res) => {
            cb(res.data.data);
        });
    },
    getApartment (cb) {
        Vue.http.get('/api/apartment', {page:1}).then((res) => {
            cb(res.data.data);
        });
    },
    getRentPrice (cb) {
        let price = [{price: '500以下'}, {price: '500-1000'}, {price: '1000-1500'}, {price: '1500-3000'}, {price: '3000-5000'}, {price: '5000以上'}];
        cb(price);
    },
    getSellPrice (cb) {
        let price = [{price: '50万以下'}, {price: '50-100万'}, {price: '100-150万'}, {price: '150万以上',}];
        cb(price);
    },
    getSellList (cb, post) {
        Vue.http.post('/api/findSellOne', post).then((res) => {
            cb(res.data.data);
        });
    }
}



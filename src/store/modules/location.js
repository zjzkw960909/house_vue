import api from '../../api/data.js'
import _ from 'underscore'
import * as types from '../mutation-types.js'

const state = {
    location: [],
    sellPrice: '',
    rentPrice: '',
}

const getters = {
    allLocation: state => state.location,
    sellPrice: state => state.sellPrice,
    rentPrice: state => state.rentPrice,
    dealLocation: state => {
        let location = _.clone(state.location);
        location.unshift({location: '区域'});
        let temp = {
            data: location,
            name: 'location',
            title: '区域',
        };
        return temp;
    },
    dealSellPrice: state => {
        let sellPrice = _.clone(state.sellPrice);
        sellPrice.unshift({price: '价位'});
        let temp = {
            data: sellPrice,
            name: 'price',
            title: '价位',
        };
        return temp;
    }
}

const actions = {
    getLocation ({commit}) {
        api.getLocation(data => {
            commit(types.GET_LOCATION, data);
        })
    },
    getSellPrice ({commit}) {
        api.getSellPrice(data => {
            commit(types.GET_SELL_PRICE, data);
        })
    },
    getRentPrice ({commit}) {
        api.getRentPrice(data => {
            commit(types.GET_RENT_PRICE, data);
        })
    },
}

const mutations = {
    [types.GET_LOCATION] (state, res) {
        state.location = res;
    },
    [types.GET_SELL_PRICE] (state, res) {
        state.sellPrice = res;
    },
    [types.GET_RENT_PRICE] (state, res) {
        state.rentPrice = res;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}

import api from '../../api/data.js'
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

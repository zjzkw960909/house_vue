import api from '../../api/data.js'
import _ from 'underscore'
import * as types from '../mutation-types.js'

const state = {
    sellList: {},
}

const getters = {
    sellList: state => state.sellList,
}

const actions = {
    getSellList ({commit}, post) {
        api.getSellList(data => {
            commit(types.GET_SELL_LIST, data);
        }, post)
    },

}

const mutations = {
    [types.GET_SELL_LIST] (state, res) {
        state.sellList = res;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}

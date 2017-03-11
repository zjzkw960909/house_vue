import api from '../../api/data.js'
import * as types from '../mutation-types.js'

const state = {
    apartment: [],
}

const getters = {
    allApartment: state => state.apartment,
}

const actions = {
    getApartment ({commit}) {
        api.getApartment(data => {
            commit(types.GET_APARTMENT, data);
        })
    },
}

const mutations = {
    [types.GET_APARTMENT] (state, res) {
        state.apartment = res;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}

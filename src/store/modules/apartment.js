import api from '../../api/data.js'
import * as types from '../mutation-types.js'
import _ from 'underscore'

const state = {
    apartment: [],
}

const getters = {
    allApartment: state => state.apartment,
    dealApartment: state => {
        let apartment = state.apartment;
        apartment.unshift({apartment: '所有户型'});
        let temp = {
            data: apartment,
            name: 'apartment',
            title: '户型',
        };
        return temp;
    },
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

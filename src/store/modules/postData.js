import _ from 'underscore'

const state = {
    wantPost: {},
}

const getters = {
    getWantPost: state => state.wantPost,
}

const actions = {
    changeWantPost ({commit}, data) {
        commit('CHANGE_WANT_POST', data)
    },
    reset ({commit}) {
        commit('RESET')
    }
}

const mutations = {
    ['CHANGE_WANT_POST'] (state, res) {
        state.wantPost[res.name] = res.value;
    },
    ['RESET'] (state) {
        state.wantPost = {};
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

import data from '../api/data'
export const getLocation = ({ commit }, props) => {
    data.getLocation((data) => {
        commit('get_location', data);
    });
}


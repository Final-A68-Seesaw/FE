import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions"
import { MainApi } from "../../api/mainApi";

const GET_SEARCH = 'GET_SEARCH'

const getSearch = createAction(GET_SEARCH, (search) => search)

const initialState = {
    list: [],
}

const getSearchDB = (searchData) => {
    return (dispatch, getState, { history }) => {
        MainApi.getsearch(searchData)
            .then((res) => {
                dispatch(getSearch(res.data))
                history.push(`/searchresult`)
            })
            .catch((err) => console.log(err))
    }
}

export default handleActions(
    {
        [GET_SEARCH]: (state, action) => produce(state, (draft) => {
            console.log(action.payload)
        }),
    },
    initialState
);

const actionCreators = {
    getSearch,
    getSearchDB,
};

export { actionCreators };

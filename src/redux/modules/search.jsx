import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions"
import { dictApi } from "../../api/dictApi";
import { MainApi } from "../../api/mainApi";

const GET_SEARCH = 'GET_SEARCH'
const CARD_SCRAP = 'CARD_SCRAP'

const getSearch = createAction(GET_SEARCH, (search) => search)
const cardScrap = createAction(CARD_SCRAP, (search) => search)

const initialState = {
    list: [],
}

const getSearchDB = (searchData) => {
    return (dispatch, getState, { history }) => {

        MainApi.getsearch(searchData)
            .then((res) => {
                dispatch(getSearch(res.data.postSearchList))
            })
            .catch((err) => console.log(err))
    }
}

const scrapSearchDB = (scrap, postId) => {
    return (dispatch, getState, { history }) => {
        dictApi.scrapDict(postId).then((res) => {
            dispatch(cardScrap({ postId, scrapStatus: res.data }));
        });
    };
};

export default handleActions(
    {
        [GET_SEARCH]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload
        }),

        [CARD_SCRAP]: (state, action) => produce(state, (draft) => {
            let index = state.list.findIndex((v) => {
                return v.postId == action.payload.postId;
            });

            draft.list[index].scrapStatus = action.payload.scrapStatus.scrapStatus;
            draft.list[index].scrapCount = action.payload.scrapStatus.scrapCount;
        }),
    },
    initialState
);

const actionCreators = {
    getSearch,
    getSearchDB,
    cardScrap,
    scrapSearchDB,
};

export { actionCreators };

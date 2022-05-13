import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions"
import { TroubleApi } from "../../api/troubleApi";



const GET_TROU = 'GETTROU'
const ADD_TROU = 'ADDTROU'
const SET_TROU = 'SETTROU'
const DEL_TROU = 'DELTROU'

const GET_TR_DETAIL = 'GETDETAIL'

const getTrou = createAction(GET_TROU, (trouble) => trouble)
const addTrou = createAction(ADD_TROU, (trouble) => trouble)
const setTrou = createAction(SET_TROU, (trouble) => trouble)
const delTrou = createAction(DEL_TROU, (trouble) => trouble)

const getDetail = createAction(GET_TR_DETAIL, (trouble) => trouble)



const initialState = {
    list: [],
    detail: null,
}


const getTrouDB = () => {
    return (dispatch, getState, { history }) => {
        TroubleApi.troubleget()
            .then((res) => dispatch(getTrou(res.data)))
    }
}

const addTrouDB = (data) => {
    return (dispatch, getState, { history }) => {

        let formData = new FormData()

        formData.append(
            "troubleRequestDto",
            new Blob(
                [
                    JSON.stringify({
                        title: data.title,
                        contents: data.contents,
                        question: data.question,
                        answer: data.answer,
                        tagName: data.tagName,
                    }),
                ],
                {
                    type: "application/json",
                }
            )
        );

        if (data.files.length !== 0) {
            data.files.map((e) => {
                return formData.append("files", e);
            });
        }

        TroubleApi.troublepost(formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
}

const setTrouDB = (data) => {
    return (dispatch, getState, { history }) => {

        TroubleApi.troublepost(data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err.response))
    }
}

const getTrouDetailDB = (id) => {
    return (dispatch, getState, { history }) => {
        TroubleApi.troubledetailget(id)
            .then((res) => dispatch(getDetail(res.data)))
    }
}



export default handleActions(
    {
        [GET_TROU]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload
        }),

        [ADD_TROU]: (state, action) => produce(state, (draft) => {
            console.log(action.payload)
            // draft.list = action.payload
        }),

        [SET_TROU]: (state, action) => produce(state, (draft) => {
            console.log(action.payload)
            // draft.list = action.payload
        }),

        [DEL_TROU]: (state, action) => produce(state, (draft) => {
            console.log(action.payload)
            // draft.list = action.payload
        }),

        [GET_TR_DETAIL]: (state, action) => produce(state, (draft) => {
            draft.detail = { ...action.payload }
        }),
    },
    initialState
);

const actionCreators = {
    getTrou,
    addTrou,
    setTrou,
    delTrou,
    getDetail,

    getTrouDB,
    addTrouDB,
    setTrouDB,
    getTrouDetailDB,
};

export { actionCreators };
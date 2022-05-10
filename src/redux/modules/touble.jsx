import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions"
import { TroubleApi } from "../../api/troubleApi";



const GET_TROU = 'GETTROU'
const ADD_TROU = 'ADDTROU'
const DEL_CHAR = 'DELTROU'

const getTrou = createAction(GET_TROU, (trouble) => trouble)
const addTrou = createAction(ADD_TROU, (trouble) => trouble)
const delTrou = createAction(DEL_CHAR, (trouble) => trouble)



const initialState = {
    list: [],
}


const getTrouDB = () => {
    return (dispatch, getState, { history }) => {
        TroubleApi.troubleget()
        .then((res) => dispatch(getTrou(res.data)))
    }
}



export default handleActions(
    {
        [GET_TROU]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload
        }),
    },
    initialState
);

const actionCreators = {
    getTrou,
    addTrou,
    delTrou,
    getTrouDB,
};

export { actionCreators };

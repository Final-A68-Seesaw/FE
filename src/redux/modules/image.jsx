import { createAction } from "redux-actions"
import produce from "immer";
import { handleActions } from "redux-actions";

const GETIMG = 'GETIMG'
const ADDIMG = 'ADDIMG'
const DELIMG = 'DELIMG'
const CLEARIMG = 'CLEARIMG'

const getimg = createAction(GETIMG, (image) => image)
const addimg = createAction(ADDIMG, (image) => image)
const delimg = createAction(DELIMG, (image) => image)
const clrimg = createAction(CLEARIMG, (image) => image)

const initialState = {
    imagelist: [],
    newimagelist: [],
}

export default handleActions(
    {
        [GETIMG]: (state, action) => produce(state, (draft) => {
            console.log(action.payload);
            draft.imagelist = action.payload
        }),
        [ADDIMG]: (state, action) => produce(state, (draft) => {
            if (action.payload)
                draft.newimagelist.push(action.payload)
        }),
        [DELIMG]: (state, action) => produce(state, (draft) => {
            if (action.payload >= state.imagelist.length)
                draft.newimagelist = state.newimagelist.filter((v, i) => (i + state.imagelist.length) !== action.payload)
            else
                draft.imagelist = state.imagelist.filter((v, i) => i !== action.payload)
        }),
        [CLEARIMG]: (state, action) => produce(state, (draft) => {
            draft.imagelist = []
            draft.newimagelist = []
        }),
    },
    initialState
);

const actionCreators = {
    getimg,
    addimg,
    delimg,
    clrimg,
}

export { actionCreators }
import { fromJS } from 'immutable';
import * as types from '../constants/view-constants';

const initialViewState = fromJS({
    show: false,
    codeData: {},
})

export const viewReducer = (state=initialViewState, action) => {
    switch(action.type){
        case types.SET_CODE_DATA:
            return state.set('codeData', fromJS(action.data));
        case types.SET_SHOW:
            return state.set('show', action.data);
        default:
            return state;
    }
}
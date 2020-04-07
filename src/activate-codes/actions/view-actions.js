import * as types from '../constants/view-constants';

export const setShow = data => {
    return {
        type: types.SET_SHOW,
        data: data,
    }
}

export const setCodeData = data => {
    return {
        type: types.SET_CODE_DATA,
        data: data,
    }
}
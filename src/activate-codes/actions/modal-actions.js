import * as types from '../constants/modal-constants';

export const setType = data => {
    return {
        type: types.SET_TYPE,
        data: data,
    }
}

export const setName = name => {
    return {
        type: types.SET_NAME,
        name: name,
    }
}

export const setLoading = data => {
    return {
        type: types.SET_LOADING,
        data: data,
    }
}

export const setShow = show => {
    return {
        type: types.SET_SHOW,
        show: show,
    }
}

export const setModelData = data => {
    return {
        type: types.SET_MODEL_DATA,
        data: data,
    }
}

export const setGenerateCodeLoading = data =>{
    return {
        type: types.SET_GENERATE_CODE_LOADING,
        data: data,
    }
}

export const fetchCode = (num) => {
    return {
        type: types.FETCH_CODE,
        num: num,
    }
}

export const setCode = data => {
    return {
        type: types.SET_CODE,
        data: data,
    }
}

export const fetchAddModelData = data => {
    return {
        type: types.FETCH_ADD_MODAL_DATA,
        data: data,
    }
}

export const fetchUpdateModelData = data => {
    return {
        type: types.FETCH_UPDATE_MODAL_DATA,
        data: data,
    }
}
export const setDeviceOptions = data => {
    return {
        type: types.SET_DEVICE_OPTIONS,
        data: data,
    }
}

export const fetchDeviceOptions = data => {
    return {
        type: types.FETCH_DEVICE_OPTIONS,
        data: data,
    }
}

export const setDeviceChildren = (code,dataList) => {
    return {
        type: types.SET_DEVICE_CHILDREN,
        code: code,
        dataList: dataList,
    }
}

export const fetchProductTypes = (code) => {
    return {
        type: types.FETCH_PRODUCT_TYPES,
        code: code,
    }
}

export const showEditModal = data => {
    return {
        type: types.SHOW_EDIT_MODAL,
        data: data,
    }
}

export const setPermissionOptions = data => {
    return {
        type: types.SET_PERMISSION_OPTIONS,
        data: data,
    }
}

export const fetchPermissionOptions = data => {
    return {
        type: types.FETCH_PERMISSION_OPTIONS,
        data: data,
    }
}

export const fetchDeleteCode = data => {
    return {
        type: types.FETCH_DELETE_CODE,
        data: data,
    }
}
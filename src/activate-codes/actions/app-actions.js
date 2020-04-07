import * as types from '../constants/app-constants';

export function setTableList(table_list){
    return {
        type: types.SET_TABLE_LIST,
        table_list: table_list,
    }
}

export function setTableListLoading(loading){
    return {
        type: types.SET_TABLE_LIST_LOADING,
        loading: loading,
    }
}

export function setPagination(pagination){
    return {
        type: types.SET_PAGINATION,
        pagination: pagination,
    }
}

export function setSearchFilter(filter){
    return {
        type: types.SET_SEARCH_FILTER,
        filter: filter,
    }
}

export function setTableFilter(filter){
    return {
        type: types.SET_TABLE_FILTER,
        filter: filter,
    }
}

export function setOrder(order){
    //console.log('action order', order)
    return {
        type: types.SET_ORDER,
        order: order,
    }
}

export function setShowFormModal(value){
    return {
        type: types.SET_SHOW_FORM_MODAL,
        value: value,
    }
}

export function refreshTableList(pagination, params){
    return {
        type: types.REFRESH_TABLE_LIST,
        params: params,
        pagination: pagination,
    }
}

import { fromJS } from 'immutable';
import * as types from '../constants/app-constants';

export const initialPagination = {
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '1000'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `Total: ${total}`,
}

export const initialOrder = {
    created_at: { name:'created_at', dir:'desc'}
}

const inintialState = fromJS({
    table_list: [],
    table_list_loading: false,
    pagination: initialPagination,
    searchFilter: {},
    tableFilter: {},
    order: initialOrder,
    showVersionFormModal: false,
});

export const appReducer = (
    state=inintialState,
    action
) => {
    //console.log('reducer action', action)
    switch( action.type ) {
        case types.SET_TABLE_LIST:
            return state.set('table_list', fromJS(action.table_list));
        case types.SET_TABLE_LIST_LOADING:
            return state.set('table_list_loading', action.loading);
        case types.SET_PAGINATION:
            return state.set('pagination', fromJS(action.pagination));
        case types.SET_SEARCH_FILTER:
            return state.set('searchFilter', fromJS(action.filter));
        case types.SET_TABLE_FILTER:
            return state.set('tableFilter', fromJS(action.filter));
        case types.SET_ORDER:
            //console.log('reducer order', action.order)
            return state.set('order', fromJS(action.order));
        case types.SET_SHOW_FORM_MODAL:
            return state.set('showFormModal', action.value);
        default:
            return state;
    }
}

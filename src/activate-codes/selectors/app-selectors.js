import { createSelector } from 'reselect';

export const tableListSelector = (state) => state.get('table_list');
export const paginationSelector = (state) => state.get('pagination');
export const searchFilterSelector = (state) => state.get('searchFilter');
export const tableFilterSelector = (state) => state.get('tableFilter');
export const orderSelector = state => state.get('order');
export const tableListLoadingSelector = state => state.get('table_list_loading');
export const showFormModalSelector = state => state.get('showFormModal');

export const filterSelector = createSelector(
    [searchFilterSelector, tableFilterSelector],
    (sf, tf) => Object.assign({}, sf.toJS(), tf.toJS())
);

export const tableListFetchParamsSelector = createSelector(
    [paginationSelector, filterSelector, orderSelector],
    (pager, filter, order) => {
        return {
            current: pager.get('current'),
            pageSize: pager.get('pageSize'),
            order: order.toJS(),
            filter: filter,
        }
    }
);

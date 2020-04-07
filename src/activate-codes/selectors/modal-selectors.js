import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const typeSelector = state => state.get('type');
export const nameSelector = state => state.get('name');
export const loadingSelector = state => state.get('loading');
export const showSelector = state => state.get('show');
export const modelDataSelector = state => state.get('modelData');

export const modalDataSelector = createSelector(
    [typeSelector, nameSelector, showSelector, loadingSelector],
    (type, name, show, loading) => {
        return fromJS({
            type: type,
            name: name,
            show: show,
            loading: loading,
        })
    }
);

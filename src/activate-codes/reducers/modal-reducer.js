import { fromJS } from 'immutable';
import * as types from '../constants/modal-constants';

export const initialModelData = {
    id: '',
    code: '',
    permission_code: '',
    code_expire: '',
    feature_expire: "0",
    feature_expire_date: "",
    receiver_max: 1,
    sender_max: 1,
    receiver_used: 0,
    sender_used: 0,
    is_trial: '0',
    status: '10',
    permission_id: '',
    note: '',
};

const inintialState = fromJS({
    type: 'add',
    name: 'Add New Code',
    show: false,
    loading: false,
    modelData: initialModelData,

    generate_code_loading: false,
    permissionOptions: g.permissionOptions,
});

export const modalReducer = (
    state=inintialState,
    action
) => {
    //console.log('reducer action', action)
    switch( action.type ) {
        case types.SET_NAME:
            return state.set('name', action.name);
        case types.SET_TYPE:
            return state.set('type', action.data);
        case types.SET_LOADING:
            return state.set('loading', action.data);
        case types.SET_SHOW:
            return state.set('show', action.show);
        case types.SET_MODEL_DATA:
            return state.set('modelData', fromJS(action.data));
        case types.SET_GENERATE_CODE_LOADING:
            return state.set('generate_code_loading', action.data);
        case types.SET_CODE:
            return state.setIn(['modelData', 'code'], action.data);
        case types.SET_DEVICE_OPTIONS:
            return state.set('deviceOptions', fromJS(action.data));
        case types.SET_DEVICE_CHILDREN:
            return state.setIn([
                'deviceOptions',
                state.get('deviceOptions').findIndex(item=>item.get('value')==action.code),
                'children'
            ], fromJS(action.dataList));
        case types.SET_PERMISSION_OPTIONS:
            return state.set('permissionOptions', fromJS(action.data))
        default:
            return state;
    }
}

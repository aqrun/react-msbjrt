import { takeLatest, delay } from 'redux-saga';
import { take,call,put, fork } from 'redux-saga/effects';

import * as types from '../constants/modal-constants';
import * as appActions from '../actions/app-actions';
import * as appServices from '../services/app-services';
import * as modalActions from '../actions/modal-actions';

//refresh version list
function* fetchCodeWorker(action){
    try{
        yield put(modalActions.setGenerateCodeLoading(true));
        const res = yield call(appServices.fetchCode, action.num);
        // console.log('res', res);
        yield put(modalActions.setCode(res.code));
        $('body').trigger('set_code_data', res.code);
        // //console.log(res);
        yield put(modalActions.setGenerateCodeLoading(false));
    }catch(err){
        yield put(modalActions.setGenerateCodeLoading(false));
        antd.message.error(err.msg);
        console.log('fetch code error', err);
    }
}

function* fetchAddModelDataWorker(action){
    try{
        yield put(modalActions.setLoading(true));
        const res = yield call(appServices.fetchAddActivateCode, action.data);
        //console.log('res', res);
        $('body').trigger('refresh');
        
        //console.log(res);
        yield put(modalActions.setLoading(false));
        yield put(modalActions.setShow(false));
        antd.message.success('Add success');
    }catch(err){
        yield put(modalActions.setLoading(false));
        yield put(modalActions.setShow(false));
        antd.message.error(err.msg);
        console.log('fetch code error', err);
    }
}

function* fetchUpdateModelDataWorker(action){
    try{
        yield put(modalActions.setLoading(true));
        const res = yield call(appServices.fetchUpdateActivateCode, action.data);
        console.log('res', res);
        $('body').trigger('refresh');
        //console.log(res);
        antd.message.success('Update success');
        yield put(modalActions.setLoading(false));
        yield put(modalActions.setShow(false));
    }catch(err){
        yield put(modalActions.setLoading(false));
        //yield put(modalActions.setShow(false));
        antd.message.error(err.msg);
        console.log('fetch update data error', err);
    }
}

function* fetchDeviceOptionsWorker(action){
    try{
        yield put(modalActions.setGenerateCodeLoading(true));
        const res = yield call(appServices.fetchDeviceList, action.data);
        console.log('res', res);
        yield put(modalActions.setCode(res.code));
        
        //console.log(res);
        yield put(modalActions.setGenerateCodeLoading(false));
    }catch(err){
        yield put(modalActions.setGenerateCodeLoading(false));
        console.log('fetch code error', err);
    }
}

export function* fetchProductTypesWorker(action){
    try{
        yield put(modalActions.setLoading(true));
        const res = yield call(appServices.fetchProductTypes, action.code);
        //console.log('res', res);
        yield put(modalActions.setDeviceChildren(action.code, res.list));
        
        //console.log(res);
        yield put(modalActions.setLoading(false));
    }catch(err){
        yield put(modalActions.setLoading(false));
        console.log('fetch code error', err);
    }
}

export function* showEditModalWorker(action){
    try{

        yield put(modalActions.setModelData(action.data));
        yield put(modalActions.setType(types.TYPE_EDIT));
        yield put(modalActions.setName('Activate Code Edit'));        
        //const res = yield call(appServices.fetchProductTypes, action.data.device);
        //console.log('res', res);
        //yield put(modalActions.setDeviceChildren(action.data.device, res.list));
        $('body').trigger('form_modal_set_value', action.data)
        yield put(modalActions.setShow(true))

    }catch(err){
        //yield put(modalActions.setGenerateCodeLoading(false));
        console.log('fetch code error', err);
    }
}

export function* fetchPermissionOptionsWorker(action){
    try{
        yield put(modalActions.setLoading(true));
        const res = yield call(appServices.fetchPermissionOptions, action.data);
        yield put(modalActions.setPermissionOptions(res.list));
        yield put(modalActions.setLoading(false));
    }catch(err){
        yield put(modalActions.setLoading(false));
        console.log('fetch code error', err);
    }
}

export function* fetchDeleteCodeWorker(action){
    try{
        //yield put(modalActions.setLoading(true));
        const res = yield call(appServices.fetchDeleteCode, action.data);
        $('body').trigger('refresh');
        //yield put(modalActions.setLoading(false));
        antd.message.success('Delete success');
    }catch(err){
        antd.message.error(err.msg?err.msg:'Delete failed');
        //yield put(modalActions.setLoading(false));
        console.log('fetch code error', err);
    }
}


export function* watchFetchCode(){
    yield takeLatest(types.FETCH_CODE, fetchCodeWorker);
}

export function* watchFetchAddModelData(){
    yield takeLatest(types.FETCH_ADD_MODAL_DATA, fetchAddModelDataWorker);
}

export function* watchFetchUpdateModelData(){
    yield takeLatest(types.FETCH_UPDATE_MODAL_DATA, fetchUpdateModelDataWorker);
}

export function* watchFetchDeviceOptions(){
    yield takeLatest(types.FETCH_DEVICE_OPTIONS, fetchDeviceOptionsWorker);
}

export function* watchFetchProductTypes(){
    yield takeLatest(types.FETCH_PRODUCT_TYPES, fetchProductTypesWorker);
}

export function* watchShowEditModal(){
    yield takeLatest(types.SHOW_EDIT_MODAL, showEditModalWorker);
}

export function* watchFetchPermissionOptions(){
    yield takeLatest(types.FETCH_PERMISSION_OPTIONS, fetchPermissionOptionsWorker);
}

export function* watchFetchDeleteCode(){
    yield takeLatest(types.FETCH_DELETE_CODE, fetchDeleteCodeWorker)
}

export default [
    fork(watchFetchCode),
    fork(watchFetchAddModelData),
    fork(watchFetchUpdateModelData),
    fork(watchFetchDeviceOptions),
    fork(watchShowEditModal),
    fork(watchFetchPermissionOptions),
    fork(watchFetchDeleteCode),
];

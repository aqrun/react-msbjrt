import { takeLatest, delay } from 'redux-saga';
import { take,call,put, fork } from 'redux-saga/effects';

import * as appTypes from '../constants/app-constants';
import * as appActions from '../actions/app-actions';
import * as appServices from '../services/app-services';

//refresh version list
function* refreshTableListWorker(action){
    try{
        yield put(appActions.setTableListLoading(true));
        const res = yield call(appServices.fetchTableList, action.params);
        let pager = Object.assign({}, action.pagination, {
            total: parseInt(res.recordsFiltered)
        })
        yield put(appActions.setPagination(pager));
        yield put(appActions.setTableList(res.data));
        
        //console.log(res);
        yield put(appActions.setTableListLoading(false));
    }catch(err){
        yield put(appActions.setTableListLoading(false));
        console.log('table list refresh error', err);
    }
}

function* filterDeviceCheckedChangeWroker(action){
    try{
        //console.log('actions', action)
        yield put(appActions.setProductTypeList({}));
        if(action.device_code=='') return;
        //已经存在
        if(typeof g.product_types_list[action.device_code] != 'undefined'){
            yield put(appActions.setProductTypeList(g.product_types_list[action.device_code]))
        }else{
            //不存在从服务器获取
            //yield put(showDeviceLoading());
            //console.log('not exists!')
            //yield call(delay, 1000);
            const res = yield call(appServices.fetchProductTypes, action.device_code);
            if(res.result == 1){
                g.product_types_list[action.device] = res.list;
                yield put(appActions.setProductTypeList(res.list));
            }
            // console.log('response', res);
            //yield put(hideDeviceLoading());
        }
    }catch(err){
        console.log('eeeeeeee', err);
        //yield put(hideDeviceLoading());
    }
}

export function* watchRefreshTableList(){
    yield takeLatest(appTypes.REFRESH_TABLE_LIST, refreshTableListWorker);
}

export default [
    fork(watchRefreshTableList),
];

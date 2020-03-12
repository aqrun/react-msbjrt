import { takeLatest, delay, take,call,put,fork } from 'redux-saga/effects'

import * as agentTypes from '../constants/agent-constants'
import * as agentActions from '../actions/agent-actions'
import * as agentServices from '../services/agent-services'

function* addResourcesWorker(action:any)
{   
    // console.log('saga action', action)
    try{
        // 显示正在加载
        // 向服务器发送添加
        const res = yield call(agentServices.fetchAddResources, action.data)
        console.log('res', res)
        // 更新到页面
        //@ts-ignore
        yield put(agentActions.addResource({
            id: action.data.id,
            data: res.data
        }))
        //隐藏正在加载
    }catch(err){
        // 隐藏加载
        console.log('add resource error', err)
    }
}

function* fetchTableListWorker(action:any)
{
    let current = action.data.current
    let pageSize = action.data.pageSize
    try{
        yield put(agentActions.setTableListLoading(true))
        // 向服务器发送
        const res = yield call(agentServices.fetchTableList, action.data)
        console.log('res', res)
        
        current = res.current
        pageSize = res.pageSize

        //@ts-ignore
        yield put(agentActions.setTableList(res.data))
        yield put(agentActions.setPagination({
            current: current,
            pageSize: pageSize,
            total: res.total,
        }))
        yield put(agentActions.setTableListLoading(false))
    }catch(err){
        yield put(agentActions.setTableListLoading(false))
        // 隐藏加载
        console.log('add resource error', err)
    }
}

export function* watchAddResources(){
    yield takeLatest(agentTypes.FETCH_ADD_RESOURCE, addResourcesWorker)
}

export function* watchFetchTableList(){
    yield takeLatest(agentTypes.FETCH_TABLE_LIST, fetchTableListWorker)
}

export default [
    fork(watchAddResources),
    fork(watchFetchTableList)
]
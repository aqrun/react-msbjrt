import * as types from '../constants/agent-constants'

import { IResource } from '../reducers/agent-reducer'

export function addResource(data:any){
    return {
        type: types.ADD_RESOURCE,
        data
    }
}

/**
 * 
 * @param data {
 *   id,
 *   resourceId
 * }
 */
export function deleteResource(data:any)
{
    return {
        type: types.DELETE_RESOURCE,
        data
    }
}

/**
 * 
 * @param data {id:123, dataStr: 'afdsf,bb,cc'}
 */
export function fetchAddResource(data:any){
    console.log('action data', data)
    return {
        type: types.FETCH_ADD_RESOURCE,
        data:data 
    }
}

export function fetchDeleteResource(id:number|string){
    return {
        type: types.FETCH_DELETE_RESOURCE,
        id: id
    }
}

/**
 * 
 * @param data {
 *   current: number,
 *   pageSize: number
 * }
 */
export function fetchTableList(data: any){
    return {
        type: types.FETCH_TABLE_LIST,
        data:data
    }
}

export function setTableList(data: any){
    return {
        type: types.SET_TABLE_LIST,
        data:data
    }
}

export function setTableListLoading(data:any){
    return {
        type: types.SET_TABLE_LIST_LOADING,
        data:data
    }
}

export function setPagination(data:any){
    return {
        type: types.SET_PAGINATION,
        data:data,
    }
}


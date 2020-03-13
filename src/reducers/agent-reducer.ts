import { fromJS, Map } from 'immutable'
import * as types from '../constants/agent-constants'


export interface IResource {
    id: number|string,
    name: string
}

export const initialPagination = {
    current: 0,
    pageSize: 10,
    total: 30,
}

interface IAgent{
    id: string|number, 
    name:string, status:string, ip: string,
    folder: string, deny: number, icon:string,
    resources:IResource[]
}

const initData:IAgent[] = []

const inintialState = fromJS({
    table_list: initData,
    table_list_loading: false,
    pagination: initialPagination,
});

export const agentReducer = (
    state=inintialState,
    action:any
):Map<any,any> => {
    //console.log('reducer action', action)
    switch( action.type ) {
        case types.ADD_RESOURCE:
            //console.log('reducer add_resource')
            const {id, data} = action.data
            let tableList = state.get('table_list')
            const aindex = tableList.findIndex((item:any) => item.get('id') === id)
            const newState = state.updateIn(['table_list',aindex, 'resources'], 
                (arr:[])=>arr.concat(fromJS(data)))
            //let win:any = window
            //win.s = newState
            //console.log(newState.toJS())
            return newState
        case types.DELETE_RESOURCE:
            // action = {id: 1, resourceId:1}
            const id1 = action.data.id
            const resourceId = action.data.resourceId
            let tableList1 = state.get('table_list')
            const index1 = tableList1.findIndex((item:any) => item.get('id') === id1)
            const resources = tableList1.getIn([index1, 'resources'])
            const newResources = resources.filter((item:any)=>item.get('id')!==resourceId)
            return state.setIn(['table_list',index1, 'resources'], newResources)
        case types.SET_TABLE_LIST:
            const newState2 = state.updateIn(['table_list'], (arr:[])=>{
                return arr.concat(fromJS(action.data))
            })
            return newState2
        case types.SET_TABLE_LIST_LOADING:
            return state.set('table_list_loading', action.data)
        case types.SET_PAGINATION:
            const pager = state.get('pagination').toJS()
            let newState3 = state.set('pagination', fromJS(Object.assign({}, pager, action.data)))
            //let win:any = window
            //win.gstate = newState3.toJS()
            //console.log('更新后', newState3.getIn(['pagination', 'current']))
            return newState3
        default:
            return state;
    }
}
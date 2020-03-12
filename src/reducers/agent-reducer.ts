import { fromJS, Map } from 'immutable'
import * as types from '../constants/agent-constants'


export interface IResource {
    id: number|string,
    name: string
}

export const initialPagination = {
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '1000'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total:any) => `Total: ${total}`,
}

const initData = [
    {
        id: 1, name: 'bjstdmngbgr08.xxx.com', status:'idle', ip: '192.168.1.102',
        folder: '/var/lib/curise-agent', deny: 1, icon:'windows',
        resources:[
            {id: 1, name: 'firefox'},
            {id: 2, name: 'safari'}
        ]
    },
    {
        id: 2, name: 'bjstdmngbgr08.xxx.com', status:'idle', ip: '192.168.1.102',
        folder: '/var/lib/curise-agent', deny: 1,icon:'windows',
        resources:[
            {id: 1, name: 'firefox'},
            {id: 2, name: 'safari'}
        ]
    },
    {
        id: 3, name: 'bjstdmngbgr08.xxx.com', status:'building', ip: '192.168.1.102',
        folder: '/var/lib/curise-agent', deny: 0,icon:'ubuntu',
        resources:[]
    },
    {
        id: 4, name: 'bjstdmngbgr08.xxx.com', status:'building', ip: '192.168.1.102',
        folder: '/var/lib/curise-agent', deny: 0,icon:'suse',
        resources:[
            {id: 1, name: 'firefox'},
            {id: 2, name: 'safari'}
        ]
    }
]

const inintialState = fromJS({
    table_list: initData,
    table_list_loading: false,
    pagination: initialPagination,
    showVersionFormModal: false,
    name: 'agent xxxx'
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
        default:
            return state;
    }
}
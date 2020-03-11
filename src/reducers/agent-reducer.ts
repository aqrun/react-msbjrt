import { fromJS, Map } from 'immutable'
import * as types from '../constants/agent-constants'

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
        folder: '/var/lib/curise-agent', deny: 0,icon:'debian',
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
        
        default:
            return state;
    }
}
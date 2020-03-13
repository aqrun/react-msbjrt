import React, {useEffect, useRef} from 'react'
import {Map } from 'immutable'
import { useSelector, connect, useStore } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RootState } from '../../reducers'
import { bindActionCreators } from 'redux'
import {generateIcon} from '../../icons'
import useWindowScrollBottom from '../../utils/useWindowScrollBottom'

import {Item} from './componetns/item'
import * as agentActions from '../../actions/agent-actions'

import './style.scss'
const LoadingSvg = generateIcon('loading')

interface IProps{
    table_list: Map<any, any>,
    agentActions: any,
    pagination: any,
    table_list_loading: boolean
}
let init = false
let eventBind = false

const Agent = (props:IProps) => {
    let pager = props.pagination.toJS()
    const pagerRef = useRef(null) as any
    pagerRef.current = pager
    const tableListLoadingRef = useRef(0) as any
    tableListLoadingRef.current = props.table_list_loading
    //const pagerRef = useRef(pager)
    //pagerRef.current = pager
    //@ts-ignore
    let listSize = props.table_list.size
    ///
    useWindowScrollBottom(bindScrollDown)
    /* const store = useStore()
    const state = store.getState()
    const agentState = state.agent */
    // @ts-ignore
    //console.log('pager=========', agentState.get('pagination').toJS())
    function loadTableList(current:number, pageSize:number){
        console.log('start load', pager)
        props.agentActions.fetchTableList({
            current:current, pageSize:pageSize
        })
    }
    
    function loadMoreHandle(){
        loadTableList(pager.current+1, pager.pageSize)
    }

    function bindScrollDown(){
        if(!tableListLoadingRef.current && listSize<pagerRef.current.total){
            console.log('callback state not change:', pagerRef.current)
            loadTableList(pagerRef.current.current+1, pagerRef.current.pageSize)
        }
    }

    useEffect(() => {
        //console.log('pager ...............', pager)
        //changeMainContainerHeight()
        if(!init){
            init = true
            loadTableList(pager.current+1, pager.pageSize)
        }
        
    })
    
    let loadingCls = 'iconw loading'
    let loadingText = 'Load More'
    if(props.table_list_loading){
        loadingCls = 'iconw loading show'
        loadingText = 'Loading...'
    }

    let loadMore = (<div className="li">
        <div className="load_more" onClick={loadMoreHandle}>
            <div className="tx">
                <span className="tx">{loadingText}</span>
                <span className={loadingCls}>
                    <LoadingSvg />
                </span>
            </div>
        </div>
    </div>)
    let noMore = (<div className="li">
        <div className="load_more">
            <div className="tx">No more data to load</div>
        </div>
    </div>)
    let bottomElement = loadMore
    if(listSize>=pager.total){
        bottomElement = noMore
    }

    return(
        <div className="agent-ul" id="agent-ul">
            {props.table_list.map(item =><Item 
                data={item} 
                key={'agi_' + item.get('id')}
                agentActions={props.agentActions}
                />)
            }
            {bottomElement}
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    let { agent } = state
    //console.log('state', state)
    return {
        table_list: agent.get('table_list'),
        pagination: agent.get('pagination'),
        table_list_loading: agent.get('table_list_loading')
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        agentActions: bindActionCreators({...agentActions}, dispatch)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Agent))
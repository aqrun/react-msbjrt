import React from 'react'
import {Map } from 'immutable'
import { useSelector, connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RootState } from '../../reducers'

import {Item} from './componetns/item'

interface IProps{
    table_list: Map<any, any>
}

const Agent = (props:IProps) => {
    
    return(
        <div className="agent-ul">
            {props.table_list.map(item =><Item data={item} key={'agi_' + item.get('id')}/>)}
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    let { agent } = state
    //console.log('state', state)
    return {
        table_list: agent.get('table_list')
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {

    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Agent))
import React from 'react'
import {Map } from 'immutable'
import { useSelector, connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RootState } from '../../reducers'
import { bindActionCreators } from 'redux'

import {Item} from './componetns/item'
import * as agentActions from '../../actions/agent-actions'

import './style.scss'

interface IProps{
    table_list: Map<any, any>,
    agentActions: any
}

const Agent = (props:IProps) => {
    
    return(
        <div className="agent-ul">
            {props.table_list.map(item =><Item 
                data={item} 
                key={'agi_' + item.get('id')}
                agentActions={props.agentActions}
                />)
            }
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
        agentActions: bindActionCreators({...agentActions}, dispatch)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Agent))
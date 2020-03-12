import React, {useState, MouseEvent} from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import { generateIcon } from '../../../icons'
import ResourceModal from './resource-modal'
import './resources.scss'

interface IProps{
    data: Map<any,any>,
    agentActions: object,
    agentId: string|number
}

const PlusSvg = generateIcon('plus')
const TrushSvg = generateIcon('trush')

export const Resources = (props: IProps) => {
    let { data } = props

    const [show, setShow] = useState(false)

    /**
     * 添加按钮点击事件
     * @param e 
     */
    function addHandle(e: MouseEvent){
        setShow(!show)
    }
    function hideModal(){
        setShow(false)
    }
    function deleteResource(resourceId:any){
        // @ts-ignore
        props.agentActions.deleteResource({
            id: props.agentId,
            resourceId
        })
    }

    function generateItem(item:Map<any, any>){
        return (
            <li className="rli" key={'rsitem_' + item.get('id')}>
                <span className="tx">{item.get('name')}</span>
                <span className="btn_remove" onClick={()=>deleteResource(item.get('id'))}>
                    <span className="iconw trush">
                        <TrushSvg/>
                    </span>
                </span>
            </li>
        )
    }
    return (
        <div className="resources-w clearfix">
            <div className="btn btn_add_resource" >
                <span className="iconw plus" onClick={addHandle}>
                    <PlusSvg/>
                </span>
                {show?<ResourceModal 
                    agentId={props.agentId}
                    show={show} 
                    agentActions={props.agentActions}
                    close={hideModal}/>:''}
            </div>
            <ul className="clearfix">
                {data.map(item=>generateItem(item))}
            </ul>
        </div>
    )
}

Resources.propTypes = {
    data: PropTypes.object,
    agentActions:PropTypes.object,
    agentId: PropTypes.any
}
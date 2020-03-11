import React from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

interface IProps{
    data: Map<any,any>
}

export const Resources = (props: IProps) => {
    let { data } = props
    function generateItem(item:Map<any, any>){
        return (
            <li key={'rsitem_' + item.get('id')}>
                <span className="tx">{item.get('name')}</span>
                <span className="btn_remove">
                    <i className="fa fa-delete"></i>
                </span>
            </li>
        )
    }
    return (
        <div className="resources-w">
            <button className="btn btn_add_resource">
                <i className="fa fa-plus"></i>
            </button>
            <ul>
                {data.map(item=>generateItem(item))}
            </ul>
        </div>
    )
}

Resources.propTypes = {
    data: PropTypes.object
}
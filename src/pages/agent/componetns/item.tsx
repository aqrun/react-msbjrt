import React from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

import { Resources } from './resources'

interface IProps{
    data: Map<any,any>
}

export const Item = (props: IProps) => {
    let { data } = props
    let deny:any = ''
    if(data.get('deny') === 1){
        deny = (<button className="btn_deny" onClick={()=>alert('denyed')}>
            <i className="fa fa-deny"></i>
            <span className="tx">Deny</span>
        </button>)
    }

    return (
        <div className="li">
            <div className="in">
                <div className="system">
                    <div className="imgw">
                        <img src="" alt=""/>
                    </div>
                </div>
                <div className="right">
                    <ul className="info">
                        <li className="name">
                            <i className="fa fa-computer"></i>
                            <a href="" className="tx">{data.get('name')}</a>
                        </li>
                        <li className={'status ' + data.get('status')}>
                            {data.get('status')}
                        </li>
                        <li className="ip">
                            <i className="fa fa-ip"></i>
                            <span className="tx">{data.get('ip')}</span>
                        </li>
                        <li className="folder">
                            <i className="fa fa-folder"></i>
                            <span className="tx">{data.get('folder')}</span>
                        </li>
                    </ul>
                    <div className="control-w">
                        <Resources data={data.get('resources')} />
                        {deny}
                    </div>
                </div>
            </div>
        </div>
    )
}

Item.propTypes = {
    data: PropTypes.object
}
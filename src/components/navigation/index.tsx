import React from 'react'
import { Link } from 'react-router-dom'
import {Map} from 'immutable'
import PropTypes from 'prop-types'
import { generateIcon } from '../../icons'

import './style.scss'

interface IProps {
    routes: Map<any,any>
}

export default function Navigation(props: IProps)
{
    function generateItem(item:Map<any,any>){
        let icon = generateIcon(item.get('icon'))
        return(
        <li key={'m_' + item.get('id')}>
            <Link to={item.get('url')} key={item.get('id')}>
                <span className="faw">{icon}</span>
                <span className="tx">{item.get('name')}</span>
            </Link>
        </li>
        )
    }

    return(
        <div className="navigation">
            <ul>
                {props.routes.map(item => generateItem(item))}
            </ul>
        </div>
    )
}

Navigation.propTypes = {
    routes: PropTypes.object
}
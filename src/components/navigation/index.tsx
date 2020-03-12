import React from 'react'
import { Link } from 'react-router-dom'
import {Map} from 'immutable'
import PropTypes from 'prop-types'
import { generateIcon } from '../../icons'
//import boatUrl, { ReactComponent as BoatSvg } from '../../icons/boat.svg'
//import BoatSvg from '../../icons/boat.svg'
import './style.scss'

interface IProps {
    routes: Map<any,any>
}

export default function Navigation(props: IProps)
{
    function generateItem(item:Map<any,any>){
        const Icon = generateIcon(item.get('icon'))
        return(
        <li key={'m_' + item.get('id')}>
            <Link to={item.get('url')} key={item.get('id')}>
                <span className="faw"><Icon /></span>
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
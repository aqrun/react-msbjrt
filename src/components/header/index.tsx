import React from 'react'

import { generateIcon } from '../../icons'

const AvatarSvg = generateIcon('avatar')
const ArrowLeftSvg = generateIcon('arrow_left')

export default function Header(){
    return(
        <header>
            <div className="max-width">
                <div className="h1w">
                    <h1>MANAGE</h1>
                </div>
                <div className="profile">
                    <span className="iconw avatar">
                        <AvatarSvg />
                    </span>
                    <span className="iconw arrow">
                        <ArrowLeftSvg/>
                    </span>
                </div>
            </div>
        </header>
    )
}
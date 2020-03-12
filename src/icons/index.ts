import React from 'react'
//import Icon from '@ant-design/icons'

import dashboardUrl, { ReactComponent as DashboardSvg } from './dashboard.svg'
import boatUrl, { ReactComponent as BoatSvg } from './boat.svg'
import helpUrl, { ReactComponent as HelpSvg } from './help.svg'
import reationUrl, { ReactComponent as RelationSvg } from './relation.svg'

import arrowLeftUrl, { ReactComponent as ArrowLeftSvg } from './arrow-left.svg'
import computerUrl, { ReactComponent as ComputerSvg } from './computer.svg'
import denyUrl, { ReactComponent as DenySvg } from './deny.svg'
import folderUrl, { ReactComponent as FolderSvg } from './folder.svg'
import noteUrl, { ReactComponent as NoteSvg } from './note.svg'
import plusUrl, { ReactComponent as PlusSvg } from './plus.svg'
import trushUrl, { ReactComponent as TrushSvg } from './trush.svg'
import avatarUrl, { ReactComponent as AvatarSvg} from './avatar.svg'
import loadingUrl, { ReactComponent as LoadingSvg} from './loading.svg'

export function generateIcon(icon:string, style = {}) {
  let component = ''
  let icons = {
    dashboard: DashboardSvg,
    boat: BoatSvg,
    help: HelpSvg,
    relation: RelationSvg,
    arrow_left: ArrowLeftSvg,
    computer:ComputerSvg,
    deny: DenySvg,
    folder: FolderSvg,
    note: NoteSvg,
    plus: PlusSvg,
    trush: TrushSvg,
    avatar:AvatarSvg,
    loading: LoadingSvg
  }
  if (icons.hasOwnProperty(icon)) {
    // @ts-ignore
    component = icons[icon]
    //return <Icon component={component} style={style} />
    return component
  }else{
    throw 'icons/index.ts: icon ['+icon+'] not found'
  }
}

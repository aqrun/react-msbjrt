import React from 'react'
//import Icon from '@ant-design/icons'

import dashboardUrl, { ReactComponent as DashboardSvg } from './dashboard.svg'
import boatUrl, { ReactComponent as BoatSvg } from './boat.svg'
import helpUrl, { ReactComponent as HelpSvg } from './help.svg'
import reationUrl, { ReactComponent as RelationSvg } from './relation.svg'

export function generateIcon(icon, style = {}) {
  let component = ''
  let icons = {
    dashboard: DashboardSvg,
    boat: BoatSvg,
    help: HelpSvg,
    relation: RelationSvg
  }
  if (icons.hasOwnProperty(icon)) {
    component = icons[icon]
    //return <Icon component={component} style={style} />
    return component
  }
  return ''
}

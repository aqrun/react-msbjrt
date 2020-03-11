import React from 'react'
import Icon from '@ant-design/icons'

import DashboardSvg from './dashboard.svg'
import BoatSvg from './boat.svg'
import HelpSvg from './help.svg'
import RelationSvg from './relation.svg'

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
    return <Icon component={component} style={style} />
  }
  return ''
}

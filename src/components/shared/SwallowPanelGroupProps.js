//      
/*
 * swallows the props that PanelGroup
 * passes down
 * bootstrap components would pick them up
 * but regular divs dont and that provokes
 * react errors in the console
 * see: https://github.com/react-bootstrap/react-bootstrap/issues/1994#issuecomment-242216741
 */

import React from 'react'

const SwallowPanelGroupProps = (props        ) => {
  const {
    bsStyle,
    headerRole,
    panelRole,
    collapsible,
    expanded,
    children,
    ...rest
  } = props
  return (
    <div {...rest}>
      {children}
    </div>
  )
}

SwallowPanelGroupProps.displayName = 'SwallowPanelGroupProps'

export default SwallowPanelGroupProps

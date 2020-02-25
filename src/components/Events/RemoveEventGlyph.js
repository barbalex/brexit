//      
import React, { useCallback, useContext } from 'react'
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import storeContext from '../../storeContext'

const StyledGlyphicon = styled(Glyphicon)`
  font-size: 0.9em;
  color: red;
  padding-left: 8px;
  cursor: pointer;
`

const RemoveEventGlyph = ({ event }                   ) => {
  const store = useContext(storeContext)
  const { setEventToRemove } = store.events
  const onRemoveEvent = useCallback(() => setEventToRemove(event), [event, setEventToRemove])

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="removeThisEvent">remove</Tooltip>}
    >
      <StyledGlyphicon glyph="remove-circle" onClick={onRemoveEvent} />
    </OverlayTrigger>
  )
}

RemoveEventGlyph.displayName = 'RemoveEventGlyph'

export default observer(RemoveEventGlyph)

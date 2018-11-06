// @flow
import React, { useCallback, useContext } from 'react'
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import storeContext from '../../storeContext'

const StyledGlyphicon = styled(Glyphicon)`
  font-size: 0.9em;
  color: red;
  padding-left: 8px;
  cursor: pointer;
`

const RemoveEventGlyph = ({ event }: { event: Object }) => {
  const store = useContext(storeContext)
  const onRemoveEvent = useCallback(() => store.events.setEventToRemove(event))

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

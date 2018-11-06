// @flow
import React, { useCallback, useContext } from 'react'
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import storeContext from './../../storeContext'

const StyledGlyphicon = styled(Glyphicon)`
  font-size: 0.9em;
  padding-left: 8px;
  cursor: pointer;
`

const EditEventGlyph = ({ event }: { event: Object }) => {
  const store = useContext(storeContext)
  const onClick = useCallback(
    () => {
      store.events.getEvent(event._id)
    },
    [event],
  )

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="editThisEvent">edit</Tooltip>}
    >
      <StyledGlyphicon glyph="pencil" onClick={onClick} />
    </OverlayTrigger>
  )
}

EditEventGlyph.displayName = 'EditEventGlyph'

export default observer(EditEventGlyph)

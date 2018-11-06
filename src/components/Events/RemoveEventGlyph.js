// @flow
import React, { useState, useCallback, useContext } from 'react'
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

import storeContext from '../../storeContext'

const StyledGlyphicon = styled(Glyphicon)`
  font-size: 0.9em;
  color: red;
  padding-left: 8px;
  cursor: pointer;
`

const enhance = compose(
  inject(`store`),
  withHandlers({
    onRemoveEvent: props => () =>
      props.store.events.setEventToRemove(props.event),
  }),
  observer,
)

const RemoveEventGlyph = ({
  event,
  onRemoveEvent,
}: {
  event: Object,
  onRemoveEvent: () => void,
}) => {
  const store = useContext(storeContext)

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

export default enhance(RemoveEventGlyph)

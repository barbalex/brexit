// @flow
import React, { useCallback, useContext } from 'react'
import {
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Glyphicon,
  FormGroup,
  FormControl,
} from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import storeContext from '../../storeContext'

const StyledGlyphicon = styled(Glyphicon)`
  font-size: 1.5em;
  color: red;
  cursor: pointer;
`

const EventLink = ({
  link,
  focus,
  index,
}: {
  link: Object,
  focus: boolean,
  index: number,
}) => {
  const store = useContext(storeContext)
  const { events } = store
  const { saveEvent } = events
  // DANGER: computed only recomputes when _id changes!
  // so do not use store.events.activeEvent
  const activeEvent = events.events.find(
    event => event._id === events.activeEventId,
  )

  const onChangeUrl = useCallback(
    e => {
      // not using action because don't know
      // how to find this link in activeEvent.links...
      link.url = e.target.value
    },
    [link],
  )
  const onBlurUrl = useCallback(
    () => {
      const i = activeEvent.links.findIndex(
        l => l.label === link.label && l.url === link.url,
      )
      activeEvent.links[i] = { ...link }
      saveEvent(activeEvent)
    },
    [link, activeEvent],
  )
  const onChangeLabel = useCallback(
    e => {
      link.label = e.target.value
    },
    [link],
  )
  const onBlurLabel = useCallback(
    () => {
      const i = activeEvent.links.findIndex(
        l => l.url === link.url && l.label === link.label,
      )
      activeEvent.links[i] = { ...link }
      saveEvent(activeEvent)
    },
    [link, activeEvent],
  )
  const onRemoveLink = useCallback(
    () => {
      activeEvent.links = activeEvent.links.filter(
        l => l.label !== link.label && l.url !== link.url,
      )
      saveEvent(activeEvent)
    },
    [link],
  )

  return (
    <Row key={index}>
      <Col sm={3} lg={2}>
        <FormGroup controlId="eventLink">
          <FormControl
            type="text"
            bsSize="small"
            value={link.label}
            onChange={onChangeLabel}
            onBlur={onBlurLabel}
            autoFocus={focus && !link.label}
          />
        </FormGroup>
      </Col>
      <Col sm={8} lg={9}>
        <FormGroup controlId="eventUrl">
          <FormControl
            type="url"
            bsSize="small"
            value={link.url}
            onChange={onChangeUrl}
            onBlur={onBlurUrl}
          />
        </FormGroup>
      </Col>
      <Col sm={1} lg={1}>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="removeLink">remove</Tooltip>}
        >
          <StyledGlyphicon glyph="remove-circle" onClick={onRemoveLink} />
        </OverlayTrigger>
      </Col>
    </Row>
  )
}

EventLink.displayName = 'EventLink'

export default observer(EventLink)

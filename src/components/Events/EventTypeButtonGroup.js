// @flow
import React, { useEffect, useCallback, useContext } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import storeContext from '../../storeContext'

const Container = styled.div`
  margin-bottom: 20px;
`
const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`

const EventTypeButtonGroup = () => {
  const store = useContext(storeContext)
  const { saveEvent, events, activeEventId } = store.events
  // DANGER: computed only recomputes when _id changes!
  // so do not use store.events.activeEvent
  const activeEvent = events.find(event => event._id === activeEventId)

  const changeEventType = useCallback(
    eventType => {
      activeEvent.eventType = eventType
      saveEvent(activeEvent)
    },
    [activeEvent],
  )

  useEffect(
    () => {
      if (!activeEvent.eventType) changeEventType('gb')
    },
    [activeEvent],
  )

  const eventType = activeEvent.eventType

  return (
    <Container>
      <Label>Column</Label>
      <ButtonGroup>
        <Button
          className={eventType === 'gb' ? 'active' : ''}
          onClick={changeEventType.bind(this, 'gb')}
        >
          Great Britain
        </Button>
        <Button
          className={eventType === 'eu' ? 'active' : ''}
          onClick={changeEventType.bind(this, 'eu')}
        >
          European Union
        </Button>
        <Button
          className={eventType === 'both' ? 'active' : ''}
          onClick={changeEventType.bind(this, 'both')}
        >
          both
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default observer(EventTypeButtonGroup)

// @flow
import React, { useCallback, useContext } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import EventLink from './EventLink'
import storeContext from '../../storeContext'

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`
const Label = styled.p`
  margin-bottom: 0;
`

const EventLinks = () => {
  const store = useContext(storeContext)
  const { events } = store
  // DANGER: computed only recomputes when _id changes!
  // so do not use events.activeEvent
  const activeEvent = events.events.find(
    event => event._id === events.activeEventId,
  )

  const onNewLink = useCallback(
    () => {
      activeEvent.links.push({
        url: '',
        label: '',
      })
      events.saveEvent(activeEvent)
    },
    [activeEvent],
  )

  return (
    <div>
      <Title>Links</Title>
      <Row>
        <Col sm={3} lg={2}>
          <Label>{activeEvent.links.length > 0 ? 'Label' : null}</Label>
        </Col>
        <Col sm={7} lg={8}>
          <Label>{activeEvent.links.length > 0 ? 'Url' : null}</Label>
        </Col>
        <Col sm={1} lg={1} />
      </Row>
      {activeEvent.links.map((link, index) => (
        <EventLink
          link={link}
          focus={index === activeEvent.links.length - 1}
          key={index}
          index={index}
        />
      ))}
      <Button onClick={onNewLink}>new link</Button>
    </div>
  )
}

EventLinks.displayName = 'EventLinks'

export default observer(EventLinks)

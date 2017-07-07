// @flow
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

import EventLink from './EventLink'

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`
const Label = styled.p`margin-bottom: 0;`

const enhance = compose(
  inject(`store`),
  withState('showMeta', 'changeShowMeta', false),
  withHandlers({
    onNewLink: props => (): void => {
      const newLink = {
        url: '',
        label: '',
      }
      props.store.events.activeEvent.links.push(newLink)
      props.store.events.saveEvent(props.store.events.activeEvent)
    },
    onCloseMeta: props => () => props.changeShowMeta(false),
  }),
  observer
)

const EventLinks = ({
  store,
  onNewLink,
}: {
  store: Object,
  onNewLink: () => void,
}) => {
  const { activeEvent } = store.events

  return (
    <div>
      <Title>Links</Title>
      <Row>
        <Col sm={3} lg={2}>
          <Label>
            {activeEvent.links.length > 0 ? 'Label' : null}
          </Label>
        </Col>
        <Col sm={7} lg={8}>
          <Label>
            {activeEvent.links.length > 0 ? 'Url' : null}
          </Label>
        </Col>
        <Col sm={1} lg={1} />
      </Row>
      {activeEvent.links.map((link, index) =>
        <EventLink
          link={link}
          focus={index === activeEvent.links.length - 1}
          key={index}
          index={index}
        />
      )}
      <Button onClick={onNewLink}>new link</Button>
    </div>
  )
}

EventLinks.displayName = 'EventLinks'

export default enhance(EventLinks)

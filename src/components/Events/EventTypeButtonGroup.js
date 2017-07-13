// @flow
import React, { Component } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

const Container = styled.div`margin-bottom: 20px;`
const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`

const enhance = compose(
  inject(`store`),
  withHandlers({
    changeEventType: props => eventType => {
      const { saveEvent } = props.store.events
      // DANGER: computed only recomputes when _id changes!
      // so do not use store.events.activeEvent
      const activeEvent = props.store.events.events.find(
        event => event._id === props.store.events.activeEventId
      )
      activeEvent.eventType = eventType
      saveEvent(activeEvent)
    },
  }),
  observer
)

class EventTypeButtonGroup extends Component {
  displayName: 'EventType'

  props: {
    store: Object,
    changeEventType: () => void,
  }

  componentDidMount() {
    const { store, changeEventType } = this.props
    // if no eventType, set gb
    // DANGER: computed only recomputes when _id changes!
    // so do not use store.events.activeEvent
    const activeEvent = store.events.events.find(
      event => event._id === store.events.activeEventId
    )
    if (!activeEvent.eventType) changeEventType('gb')
  }

  render() {
    const { changeEventType, store } = this.props
    // DANGER: computed only recomputes when _id changes!
    // so do not use store.events.activeEvent
    const activeEvent = store.events.events.find(
      event => event._id === store.events.activeEventId
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
}

export default enhance(EventTypeButtonGroup)

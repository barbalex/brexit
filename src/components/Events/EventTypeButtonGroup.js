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
      const { activeEvent, saveEvent } = props.store.events
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
    // if no eventType, set migration
    if (!store.events.activeEvent.eventType) changeEventType('migration')
  }

  render() {
    const { changeEventType, store } = this.props
    const { eventType } = store.events.activeEvent

    return (
      <Container>
        <Label>Column</Label>
        <ButtonGroup>
          <Button
            className={eventType === 'migration' ? 'active' : ''}
            onClick={changeEventType.bind(this, 'migration')}
          >
            maritime events / monthly statistics
          </Button>
          <Button
            className={eventType === 'politics' ? 'active' : ''}
            onClick={changeEventType.bind(this, 'politics')}
          >
            political events / total statistics
          </Button>
        </ButtonGroup>
      </Container>
    )
  }
}

export default enhance(EventTypeButtonGroup)

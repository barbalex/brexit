import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

const enhance = compose(
  inject(`store`),
  withState('showMeta', 'changeShowMeta', false),
  withHandlers({
    abort: props => () => props.store.events.setEventToRemove(null),
    remove: props => () => {
      props.store.events.removeEvent(props.store.events.eventToRemove)
      props.store.events.setEventToRemove(null)
    },
  }),
  observer,
)

const ModalRemoveEvent = ({
  store,
  remove,
  abort,
}: {
  store: Object,
  remove: () => void,
  abort: () => void,
}) => (
  <Modal show onHide={abort}>
    <Modal.Header>
      <Modal.Title>
        Remove event "{store.events.eventToRemove.title}"
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        Are you sure you want to remove event "
        {store.events.eventToRemove.title}
        "?
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="danger" onClick={remove}>
        yes, remove!
      </Button>
      <Button onClick={abort}>
        no!
      </Button>
    </Modal.Footer>
  </Modal>
)

ModalRemoveEvent.displayName = 'ModalRemoveEvent'

export default enhance(ModalRemoveEvent)

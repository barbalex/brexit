import React, { useCallback, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react'

import storeContext from '../../storeContext'

const ModalRemoveEvent = () => {
  const store = useContext(storeContext)
  const { events } = store
  const { setEventToRemove, removeEvent, eventToRemove } = events

  const abort = useCallback(() => setEventToRemove(null))
  const remove = useCallback(
    () => {
      removeEvent(eventToRemove)
      setEventToRemove(null)
    },
    [eventToRemove],
  )

  return (
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
        <Button onClick={abort}>no!</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalRemoveEvent.displayName = 'ModalRemoveEvent'

export default observer(ModalRemoveEvent)

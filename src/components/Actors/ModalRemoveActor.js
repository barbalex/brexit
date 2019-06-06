// @flow
import React, { useCallback, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import storeContext from '../../storeContext'

const ModalRemoveActor = () => {
  const store = useContext(storeContext)
  const { actorToRemove, removeActor, setActorToRemove } = store.actors

  const remove = useCallback(
    () => {
      removeActor(actorToRemove)
      setActorToRemove(null)
    },
    [actorToRemove],
  )
  const abort = useCallback(() => setActorToRemove(null))

  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Remove actor "{actorToRemove.category}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to remove actor "{actorToRemove.category}
            "?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={remove}>
            yes, remove!
          </Button>
          <Button onClick={abort}>no!</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}

ModalRemoveActor.displayName = 'ModalRemoveActor'

export default observer(ModalRemoveActor)

// @flow
import React, { useCallback, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react'

import storeContext from '../../storeContext'

const ModalRemoveActor = () => {
  const store = useContext(storeContext)
  const remove = useCallback(
    () => {
      const { actorToRemove, removeActor, setActorToRemove } = store.actors
      removeActor(actorToRemove)
      setActorToRemove(null)
    },
    [store.actors.actorToRemove],
  )
  const abort = useCallback(() => store.actors.setActorToRemove(null))

  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            Remove actor "{store.actors.actorToRemove.category}"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to remove actor "
            {store.actors.actorToRemove.category}
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

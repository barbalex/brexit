// @flow
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

const enhance = compose(
  inject(`store`),
  withHandlers({
    remove: props => () => {
      const {
        actorToRemove,
        removeActor,
        setActorToRemove,
      } = props.store.actors
      removeActor(actorToRemove)
      setActorToRemove(null)
    },
    abort: props => () => props.store.actors.setActorToRemove(null),
  }),
  observer,
)

const ModalRemoveActor = ({
  store,
  remove,
  abort,
}: { store: Object, remove: () => void, abort: () => void }) => (
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
        <Button onClick={abort}>
          no!
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  </div>
)

ModalRemoveActor.displayName = 'ModalRemoveActor'

export default enhance(ModalRemoveActor)

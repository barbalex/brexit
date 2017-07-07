// @flow
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

const enhance = compose(
  inject(`store`),
  withHandlers({
    abort: props => event =>
      props.store.commentaries.setCommentaryToRemove(null),
    remove: props => () => {
      const {
        commentaryToRemove,
        removeCommentary,
        setCommentaryToRemove,
      } = props.store.commentaries
      removeCommentary(commentaryToRemove)
      setCommentaryToRemove(null)
    },
  }),
  observer,
)

const ModalRemoveCommentary = ({
  store,
  remove,
  abort,
}: { store: Object, remove: () => void, abort: () => void }) => (
  <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>
          Remove commentary "{store.commentaries.commentaryToRemove.title}"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to remove commentary "
          {store.commentaries.commentaryToRemove.title}
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

ModalRemoveCommentary.displayName = 'ModalRemoveCommentary'

export default enhance(ModalRemoveCommentary)

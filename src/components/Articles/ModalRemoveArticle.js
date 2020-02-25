//      
import React, { useCallback, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import storeContext from '../../storeContext'

const ModalRemoveArticle = () => {
  const store = useContext(storeContext)
  const { articleToRemove, removeArticle, setArticleToRemove } = store.articles

  const abort = useCallback(event => setArticleToRemove(null), [
    setArticleToRemove,
  ])
  const remove = useCallback(() => {
    removeArticle(articleToRemove)
    setArticleToRemove(null)
  }, [articleToRemove, removeArticle, setArticleToRemove])

  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Remove article "{articleToRemove.title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to remove article "{articleToRemove.title}
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

ModalRemoveArticle.displayName = 'ModalRemoveArticle'

export default observer(ModalRemoveArticle)

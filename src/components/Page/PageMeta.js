// @flow
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'

import AttachedImagesList from '../shared/AttachedImagesList'
import AttachImages from '../shared/AttachImages'

const enhance = compose(observer)

const PageMeta = ({
  doc,
  onCloseMeta,
}: {
  doc: Object,
  onCloseMeta: () => void,
}) => {
  console.log('rendering PageMeta')
  return (
    <Modal show bsSize="large">
      <Modal.Header>
        <Modal.Title>
          Images for "{doc.title ? doc.title : doc.category}"
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AttachedImagesList doc={doc} />
        <AttachImages doc={doc} />
      </Modal.Body>

      <Modal.Footer>
        <Button bsStyle="primary" onClick={onCloseMeta}>
          close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

PageMeta.displayName = 'PageMeta'

export default enhance(PageMeta)

// @flow
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import AttachedImagesList from '../shared/AttachedImagesList'
import AttachImages from '../shared/AttachImages'

const PageMeta = ({
  doc,
  onCloseMeta,
}: {
  doc: Object,
  onCloseMeta: () => void,
}) => (
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

PageMeta.displayName = 'PageMeta'

export default observer(PageMeta)

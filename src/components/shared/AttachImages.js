// @flow
import React from 'react'
import Dropzone from 'react-dropzone'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

const Container = styled.div`
  padding-top: 10px;
  padding-left: 5px;
  div {
    width: 220px !important;
    height: 124px !important;
  }
`
const DropzoneDiv = styled.div`
  width: 220px !important;
  margin-left: 5px;
  height: 147px !important;
  padding: 5px;
`

const enhance = compose(
  inject(`store`),
  withHandlers({
    onDrop: props => files => {
      const { store, doc } = props
      const attachments = {}
      files.forEach(file => {
        /**
       * create an attachments object of this form:
       * {
       *   "att.txt": {
       *     "content_type": "image/png",
       *     "data": new Blob(
       *       ["And she's hooked to the silver screen"],
       *       {type: 'text/plain'})
       *   },
       *   "att2.txt": {
       *     "content_type": "text/plain",
       *     "data": new Blob(
       *       ["But the film is a saddening bore"],
       *       {type: 'text/plain'})
       *   }
       * }
       * note: react-dropzone built the blob itself! It is file
       */
        attachments[file.name] = {
          content_type: file.type,
          data: file,
        }
      })

      store.page.addPageAttachments(doc, attachments)
    },
  }),
  observer
)

const AttachImages = ({
  store,
  doc,
  onDrop,
}: {
  store: Object,
  doc: Object,
  onDrop: () => void,
}) =>
  <Container>
    <Dropzone onDrop={onDrop} accept="image/*">
      <DropzoneDiv>
        Drop some images here.<br />
        Or click to select.
      </DropzoneDiv>
    </Dropzone>
  </Container>

AttachImages.displayName = 'AttachImages'

export default enhance(AttachImages)

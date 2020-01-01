// @flow
import React, { useCallback, useContext } from 'react'
import Dropzone from 'react-dropzone'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import storeContext from '../../storeContext'

const Container = styled.div`
  padding-top: 10px;
  padding-left: 5px;
  div {
    width: 220px !important;
    height: 124px !important;
  }
`
const StyledDropzone = styled(Dropzone)`
  border-color: transparent;
  height: 147px !important;
  width: 220px !important;
`
const DropzoneInnerDiv = styled.div`
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #666;
  border-style: dashed;
  border-radius: 5px;
`

const AttachImages = ({ doc }: { doc: Object }) => {
  const store = useContext(storeContext)
  const onDrop = useCallback(
    files => {
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
    [doc, store.page],
  )

  return (
    <Container>
      <StyledDropzone onDrop={onDrop} accept="image/*">
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
          if (isDragActive) {
            return (
              <DropzoneInnerDiv {...getRootProps()}>
                <div>drop now...</div>
              </DropzoneInnerDiv>
            )
          }
          if (isDragReject) {
            return (
              <DropzoneInnerDiv {...getRootProps()}>
                <div>Oh no. Something went wrong :-(</div>
              </DropzoneInnerDiv>
            )
          }
          return (
            <DropzoneInnerDiv {...getRootProps()}>
              <input {...getInputProps()} style={{ width: 0, height: 0 }} />
              <div>
                Drop some images here...
                <br />
                ...or click to select.
              </div>
            </DropzoneInnerDiv>
          )
        }}
      </StyledDropzone>
    </Container>
  )
}

AttachImages.displayName = 'AttachImages'

export default observer(AttachImages)

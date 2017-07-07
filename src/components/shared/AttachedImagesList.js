// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

import AttachedImage from './AttachedImage'

const Container = styled.div`
  overflow: auto !important;
  max-height: 500px !important;
`

const enhance = compose(
  inject(`store`),
  withState('urlCopied', 'changeUrlCopied', null),
  withHandlers({
    onCopyUrl: props => urlCopied => {
      props.changeUrlCopied(urlCopied)
    },
  }),
  observer
)

const AttachedImagesList = ({
  doc,
  urlCopied,
  onCopyUrl,
  changeUrlCopied,
}: {
  doc: Object,
  urlCopied: string,
  onCopyUrl: () => void,
  changeUrlCopied: () => void,
}) => {
  console.log('rendering AttachedImagesList')
  return (
    <Container className="media">
      {Object.keys(doc._attachments || []).map(key =>
        <AttachedImage
          key={key}
          doc={doc}
          attName={key}
          urlCopied={urlCopied}
          onCopyUrl={onCopyUrl}
          attachments={doc._attachments}
        />
      )}
    </Container>
  )
}

AttachedImagesList.displayName = 'AttachedImagesList'

export default enhance(AttachedImagesList)

// @flow
import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import AttachedImage from './AttachedImage'

const Container = styled.div`
  overflow: auto !important;
  max-height: 500px !important;
`

const AttachedImagesList = ({ doc }: { doc: Object }) => {
  const [urlCopied, changeUrlCopied] = useState(null)
  const onCopyUrl = useCallback(urlCopied => changeUrlCopied(urlCopied), [])

  return (
    <Container className="media">
      {Object.keys(doc._attachments || []).map(key => (
        <AttachedImage
          key={key}
          doc={doc}
          attName={key}
          urlCopied={urlCopied}
          onCopyUrl={onCopyUrl}
          attachments={doc._attachments}
        />
      ))}
    </Container>
  )
}

AttachedImagesList.displayName = 'AttachedImagesList'

export default observer(AttachedImagesList)

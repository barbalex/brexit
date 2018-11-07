// @flow
import React, { useState, useCallback, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Base64 } from 'js-base64'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import Editor from '../../shared/Editor'
import Meta from '../../Page/PageMeta'
import storeContext from '../../../storeContext'

const Container = styled.div`
  p,
  .row,
  table {
    margin-bottom: 20px;
  }
  h2 {
    text-align: center;
    font-size: x-large;
    font-weight: 800;
    margin-top: 60px;
    margin-bottom: 20px;
  }
  h3 {
    text-align: center;
    font-size: large;
    font-weight: 800;
    margin-top: 40px;
    margin-bottom: 20px;
  }
`
const MetaButton = styled(Button)`
  position: fixed;
  bottom: 10px;
  right: 10px;
`

const Commentary = () => {
  const store = useContext(storeContext)
  const { editing, commentaries } = store
  const { activeCommentary } = commentaries

  const [showMeta, setShowMeta] = useState(false)
  const onClickMeta = useCallback(() => setShowMeta(!showMeta), [showMeta])
  const onCloseMeta = useCallback(() => setShowMeta(false))

  const articleEncoded = activeCommentary.article
  const articleDecoded = Base64.decode(articleEncoded)

  if (editing) {
    return (
      <Container>
        {showMeta && <Meta doc={activeCommentary} onCloseMeta={onCloseMeta} />}
        <Editor
          docType="commentary"
          doc={activeCommentary}
          articleDecoded={articleDecoded}
        />
        <MetaButton onClick={onClickMeta}>images</MetaButton>
      </Container>
    )
  }
  const createMarkup = () => ({ __html: articleDecoded })
  return (
    <Container>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </Container>
  )
}

Commentary.displayName = 'Commentary'

export default observer(Commentary)

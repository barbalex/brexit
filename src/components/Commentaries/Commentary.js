// @flow
import React from 'react'
import { Button } from 'react-bootstrap'
import { Base64 } from 'js-base64'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

import Editor from '../shared/Editor'
import Meta from '../Page/PageMeta'

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

const enhance = compose(
  inject(`store`),
  withState('showMeta', 'changeShowMeta', false),
  withHandlers({
    onClickMeta: props => () => props.changeShowMeta(!props.showMeta),
    onCloseMeta: props => () => props.changeShowMeta(false),
  }),
  observer
)

const Commentary = ({
  store,
  showMeta,
  onClickMeta,
  onCloseMeta,
}: {
  store: Object,
  showMeta: boolean,
  onClickMeta: () => void,
  onCloseMeta: () => void,
}) => {
  const { activeCommentary } = store.commentaries
  const articleEncoded = activeCommentary.article
  const articleDecoded = Base64.decode(articleEncoded)

  if (store.editing) {
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

export default enhance(Commentary)

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

const Actor = ({
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
  const { activeActor } = store.actors
  const articleEncoded = activeActor.article
  const articleDecoded = Base64.decode(articleEncoded)

  if (store.editing) {
    return (
      <div className="actor">
        {showMeta && <Meta doc={activeActor} onCloseMeta={onCloseMeta} />}
        <Editor
          docType="actor"
          doc={activeActor}
          articleDecoded={articleDecoded}
        />
        <MetaButton onClick={onClickMeta}>images</MetaButton>
      </div>
    )
  }
  const createMarkup = () => ({ __html: articleDecoded })

  return (
    <div className="actor col500">
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  )
}

Actor.displayName = 'Actor'

export default enhance(Actor)

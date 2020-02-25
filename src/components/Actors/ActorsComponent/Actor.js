//      
import React, { useState, useCallback, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Base64 } from 'js-base64'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import Editor from '../../shared/Editor'
import Meta from '../../Page/PageMeta'
import storeContext from '../../../storeContext'

//import { setConfig } from 'react-hot-loader'
//setConfig({ pureSFC: true })

const MetaButton = styled(Button)`
  position: fixed;
  bottom: 10px;
  right: 10px;
`

const Actor = () => {
  const store = useContext(storeContext)
  const { activeActor } = store.actors
  const articleEncoded = activeActor.article
  const articleDecoded = articleEncoded ? Base64.decode(articleEncoded) : null
  const [showMeta, setShowMeta] = useState(false)
  const onClickMeta = useCallback(() => setShowMeta(!showMeta), [showMeta])
  const onCloseMeta = useCallback(() => setShowMeta(false), [])

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

export default observer(Actor)

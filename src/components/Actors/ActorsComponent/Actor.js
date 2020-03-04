//
import React, { useContext } from 'react'
import { Base64 } from 'js-base64'
import { observer } from 'mobx-react-lite'

import Editor from '../../shared/Editor'
import storeContext from '../../../storeContext'

const Actor = () => {
  const store = useContext(storeContext)
  const { activeActor } = store.actors
  const articleEncoded = activeActor.article
  const articleDecoded = articleEncoded ? Base64.decode(articleEncoded) : null

  if (store.editing) {
    return (
      <div className="actor">
        <Editor
          docType="actor"
          doc={activeActor}
          articleDecoded={articleDecoded}
        />
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

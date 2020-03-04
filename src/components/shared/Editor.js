//
import React, { useContext, useCallback } from 'react'
import { Base64 } from 'js-base64'
import { Editor } from '@tinymce/tinymce-react'
import { observer } from 'mobx-react-lite'

import storeContext from '../../storeContext'

const MyEditor = ({ doc, docType, articleDecoded }) => {
  const store = useContext(storeContext)
  const { activePage, savePage } = store.page
  const { activeArticle, saveArticle } = store.articles
  const { activeActor, saveActor } = store.actors

  const onSavePageArticle = useCallback(
    articleEncoded => {
      activePage.article = articleEncoded
      savePage(activePage)
    },
    [activePage, savePage],
  )
  const onSaveArticleArticle = useCallback(
    articleEncoded => {
      activeArticle.article = articleEncoded
      saveArticle(activeArticle)
    },
    [activeArticle, saveArticle],
  )
  const onSaveActorArticle = useCallback(
    articleEncoded => {
      activeActor.article = articleEncoded
      saveActor(activeActor)
    },
    [activeActor, saveActor],
  )

  // height = window - menu height - (menubar + iconbar)
  let height = typeof window !== `undefined` ? window.innerHeight - 52 - 74 : 1
  if (['article', 'actor'].includes(docType)) {
    height =
      typeof window !== `undefined` ? window.innerHeight - 52 - 74 - 90 : 1
  }
  // need to add specific classes to the iframe body because my css will not apply otherwise
  let bodyClass = ''
  let saveFunction = () => {}
  switch (docType) {
    case 'page':
      bodyClass = ''
      saveFunction = onSavePageArticle
      break
    case 'article':
      bodyClass = 'article'
      saveFunction = onSaveArticleArticle
      break
    case 'actor':
      bodyClass = 'actor'
      saveFunction = onSaveActorArticle
      break
    default:
      return store.error.showEdit('no or wrong docType passed to editor')
  }

  return (
    <Editor
      id={doc._id.replace('?', '')}
      apiKey="58ali3ylgj6fv1zfjv6vdjkkt32yjw36v1iypn95psmae799"
      initialValue={articleDecoded}
      init={{
        selector: `#${doc._id.replace('?', '')}`,
        plugins: [
          'advlist autolink link image lists charmap print hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen media nonbreaking',
          'save table contextmenu directionality template paste textcolor autosave',
        ],
        menubar: 'edit insert view format table tools',
        toolbar:
          'insertfile undo redo | styleselect | bold italic underline forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print code fullscreen',
        height,
        browser_spellcheck: true,
        automatic_uploads: false,
        statusbar: false,
        body_class: bodyClass,
      }}
      onChange={e => {
        const articleDecoded = e.target.getContent()
        const articleEncoded = Base64.encode(articleDecoded)
        saveFunction(articleEncoded)
      }}
    />
  )
}

export default observer(MyEditor)

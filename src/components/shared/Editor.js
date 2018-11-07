// @flow
import React, { useContext, useCallback, useEffect } from 'react'
import { Base64 } from 'js-base64'
import tinymce from 'tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/print'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/save'
import 'tinymce/plugins/table'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/template'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/autosave'
import { observer } from 'mobx-react'

import storeContext from '../../storeContext'

const Editor = ({
  doc,
  docType,
  articleDecoded,
}: {
  doc: Object,
  docType: string,
  articleDecoded: string,
}) => {
  const store = useContext(storeContext)
  const { activePage, savePage } = store.page
  const { activeCommentary, saveCommentary } = store.commentaries
  const { activeActor, saveActor } = store.actors

  const onSavePageArticle = useCallback(
    articleEncoded => {
      activePage.article = articleEncoded
      savePage(activePage)
    },
    [activePage],
  )
  const onSaveCommentaryArticle = useCallback(
    articleEncoded => {
      activeCommentary.article = articleEncoded
      saveCommentary(activeCommentary)
    },
    [activeCommentary],
  )
  const onSaveActorArticle = useCallback(
    articleEncoded => {
      activeActor.article = articleEncoded
      saveActor(activeActor)
    },
    [activeActor],
  )

  // only on mount
  useEffect(
    () => {
      // height = window - menu height - (menubar + iconbar)
      let height = window.innerHeight - 52 - 74
      if (['commentary', 'actor'].includes(docType)) {
        height = window.innerHeight - 52 - 74 - 90
      }
      // need to add specific classes to the iframe body because my css will not apply otherwise
      let bodyClass = ''
      let saveFunction = () => {}
      switch (docType) {
        case 'page':
          bodyClass = ''
          saveFunction = onSavePageArticle
          break
        case 'commentary':
          bodyClass = 'commentary'
          saveFunction = onSaveCommentaryArticle
          break
        case 'actor':
          bodyClass = 'actor'
          saveFunction = onSaveActorArticle
          break
        default:
          return store.error.showEdit('no or wrong docType passed to editor')
      }

      // see: https://www.ephox.com/blog/how-to-integrate-react-with-tinymce
      // add codemirror? see: https://github.com/christiaan/tinymce-codemirror
      tinymce.init({
        selector: `#${doc._id.replace('?', '')}`,
        theme: 'modern',
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
        // enable auto-saving
        setup(editor) {
          editor.on('change undo redo', () => {
            const articleDecoded = editor.getContent()
            const articleEncoded = Base64.encode(articleDecoded)
            saveFunction(articleEncoded)
          })
        },
      })
      // scroll editor to top in pages
      if (doc.type === 'pages') {
        window.$('html, body').animate(
          {
            scrollTop: 140,
          },
          800,
        )
      }
      return () => {
        // this is needed for correct behaviour, see
        // http://stackoverflow.com/questions/29169158/react-html-editor-tinymce
        const instanceSelector = `#${doc._id.replace('?', '')}`
        tinymce.remove(instanceSelector)
      }
    },
    [doc, docType],
  )

  console.log('editor rendering')

  return (
    <textarea id={doc._id.replace('?', '')} defaultValue={articleDecoded} />
  )
}

// how garantee this with hooks?
/*class Editor extends Component {
  shouldComponentUpdate() {
    // make sure react does not update this component
    return false
  }
}*/

export default observer(Editor)

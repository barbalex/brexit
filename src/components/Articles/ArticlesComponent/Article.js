//
import React, { useContext } from 'react'
import { Base64 } from 'js-base64'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import Editor from '../../shared/Editor'
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

const Article = () => {
  const store = useContext(storeContext)
  const { editing, articles } = store
  const { activeArticle } = articles

  const articleEncoded = activeArticle.article
  const articleDecoded = articleEncoded ? Base64.decode(articleEncoded) : null

  if (editing) {
    return (
      <Container>
        <Editor
          docType="article"
          doc={activeArticle}
          articleDecoded={articleDecoded}
        />
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

Article.displayName = 'Article'

export default observer(Article)

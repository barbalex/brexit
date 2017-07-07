// @flow
import React from 'react'
import { Base64 } from 'js-base64'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import Editor from '../shared/Editor'

const Container = styled.div`
  h2 {
    font-size: medium;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .mce-tinymce {
    margin: -15px;
    width: calc(100% + 27px) !important;
  }
`

const enhance = compose(inject(`store`), observer)

const Publication = ({ store }: { store: Object }) => {
  const articleEncoded = store.publications.activePublication.article
  const articleDecoded = Base64.decode(articleEncoded)

  if (store.editing) {
    return (
      <Container>
        <Editor
          docType="publication"
          doc={store.publications.activePublication}
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

Publication.displayName = 'Publication'

export default enhance(Publication)

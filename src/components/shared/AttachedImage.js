// @flow
import React from 'react'
import {
  Button,
  Glyphicon,
  FormGroup,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import getCouchUrl from '../../modules/getCouchUrl'

const Container = styled.div`padding: 5px;`
const Image = styled.img`width: 220px;`
const StyledGlyphicon = styled(Glyphicon)`
  position: absolute !important;
  top: 10px !important;
  left: 175px;
  font-size: 2em;
  color: red;
  cursor: pointer;
`
const MediaLeft = styled.div`position: relative;`

const enhance = compose(inject(`store`), observer)

const AttachedImage = ({
  store,
  doc,
  attName,
  urlCopied,
  onCopyUrl,
}: {
  store: Object,
  doc: Object,
  attName: string,
  urlCopied: string,
  onCopyUrl: () => void,
}) => {
  const id = doc._id
  const url = `${getCouchUrl()}/${id}/${attName}`
  const urlCopiedButtonBsStyle = urlCopied === url ? 'success' : 'default'

  return (
    <Container key={id}>
      <MediaLeft className="media-left">
        <Image src={url} className="media-object" alt={attName} />
        <StyledGlyphicon
          glyph="remove-circle"
          onClick={() => store.page.removePageAttachment(doc, attName)}
        />
      </MediaLeft>
      <div className="media-body media-middle">
        <FormGroup>
          <InputGroup>
            <FormControl type="text" value={url} disabled />
            <InputGroup.Button>
              <CopyToClipboard text={url} onCopy={() => onCopyUrl(url)}>
                <Button bsStyle={urlCopiedButtonBsStyle}>
                  {urlCopied === url ? 'copied' : 'copy'}
                </Button>
              </CopyToClipboard>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    </Container>
  )
}

AttachedImage.displayName = 'AttachedImage'

export default enhance(AttachedImage)

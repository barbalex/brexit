//      
import React, { useContext } from 'react'
import {
  Button,
  Glyphicon,
  FormGroup,
  FormControl,
  InputGroup,
} from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import getCouchUrl from '../../modules/getCouchUrl'
import storeContext from '../../storeContext'

const Container = styled.div`
  padding: 5px;
`
const Image = styled.img`
  width: 220px;
`
const StyledGlyphicon = styled(Glyphicon)`
  position: absolute !important;
  top: 10px !important;
  left: 175px;
  font-size: 2em;
  color: red;
  cursor: pointer;
`
const MediaLeft = styled.div`
  position: relative;
`

const AttachedImage = ({
  doc,
  attName,
  urlCopied,
  onCopyUrl,
}   
              
                  
                    
                        
 ) => {
  const store = useContext(storeContext)
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

export default observer(AttachedImage)

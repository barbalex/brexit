// @flow
/*
 * receives an object with two keys: title, msg
 * displays it while the object is present
 *
 * if a view wants to inform of an error it
 * calls action showError and passes the object
 * the errorStore triggers, passing the error
 * ...then triggers again some time later, passing an empty error object
 */

import React from 'react'
import { Overlay, Glyphicon } from 'react-bootstrap'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: auto !important;
  left: auto !important;
  bottom: 8px;
  left: 8px;
  margin-left: 8px;
  background-color: orange;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 3px;
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 3;
`
const MessageContainer = styled.div`
  border: none;
  padding-left: 10px;
  padding-right: 25px;
`
const StyledGlyphicon = styled(Glyphicon)`
  position: absolute !important;
  top: 3px !important;
  right: 3px;
  font-size: 18px;
  cursor: pointer;
`

const enhance = compose(
  inject(`store`),
  withHandlers({
    onClickGlyph: props => () => props.store.setUpdateAvailable(false),
    onClickReload: props => event => {
      event.preventDefault()
      window.location.reload(false)
    },
  }),
  observer
)

const UpdateAvailable = ({
  store,
  onClickGlyph,
  onClickReload,
}: {
  store: Object,
  onClickGlyph: () => void,
  onClickReload: () => void,
}) => (
  <Overlay show={store.updateAvailable}>
    <Container>
      <StyledGlyphicon
        glyph="remove-circle"
        onClick={onClickGlyph}
        alt="close"
      />
      <MessageContainer>
        <span>
          An update for brexit-chronology.ch is available.{' '}
          <a href={'//brexit-chronology.ch'} onClick={onClickReload}>
            Reload
          </a>{' '}
          to install it.
        </span>
      </MessageContainer>
    </Container>
  </Overlay>
)

UpdateAvailable.displayName = 'UpdateAvailable'

export default enhance(UpdateAvailable)

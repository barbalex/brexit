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
  right: 8px;
  margin-left: 8px;
  background-color: orange;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 3px;
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 3;
`
const ErrorContainer = styled.div`
  border: none;
  padding-right: ${props => (props.first ? '27px' : 'inherit')};
`
const Error = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`
const Title = styled.p`margin-bottom: 0;`
const Message = styled.p`margin-bottom: -2px;`
const StyledGlyphicon = styled(Glyphicon)`
  position: absolute !important;
  top: 3px !important;
  right: 3px;
  font-size: 18px;
  cursor: pointer;
`
const Hr = styled.hr`
  margin-top: 8px;
  margin-bottom: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
`

const enhance = compose(
  inject(`store`),
  withHandlers({
    onClickGlyph: props => () => props.store.error.showError(),
  }),
  observer
)

const Errors = ({
  store,
  onClickGlyph,
}: {
  store: Object,
  onClickGlyph: () => void,
}) =>
  <Overlay show={store.error.errors.length > 0}>
    <Container id="errors">
      <StyledGlyphicon glyph="remove-circle" onClick={onClickGlyph} />
      {store.error.errors.map((error, index) =>
        <ErrorContainer key={index} first={index === 0}>
          <Error>
            {error.title &&
              <Title>
                {error.title}
              </Title>}
            <Message>
              <em>
                {error.msg}
              </em>
            </Message>
          </Error>
          {index + 1 < store.error.errors.length && <Hr />}
        </ErrorContainer>
      )}
    </Container>
  </Overlay>

Errors.displayName = 'Errors'

export default enhance(Errors)

//      
/*
 * receives an object with two keys: title, msg
 * displays it while the object is present
 *
 * if a view wants to inform of an error it
 * calls action showError and passes the object
 * the errorStore triggers, passing the error
 * ...then triggers again some time later, passing an empty error object
 */

import React, { useCallback, useContext } from 'react'
import { Overlay, Glyphicon } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import storeContext from '../storeContext'

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
const Title = styled.p`
  margin-bottom: 0;
`
const Message = styled.p`
  margin-bottom: -2px;
`
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

const Errors = () => {
  const store = useContext(storeContext)
  const { errors, showError } = store.error
  const onClickGlyph = useCallback(() => showError(), [showError])

  return (
    <Overlay show={errors.length > 0}>
      <Container id="errors">
        <StyledGlyphicon glyph="remove-circle" onClick={onClickGlyph} />
        {errors.map((error, index) => (
          <ErrorContainer key={index} first={index === 0}>
            <Error>
              {error.title && <Title>{error.title}</Title>}
              <Message>
                <em>{error.msg}</em>
              </Message>
            </Error>
            {index + 1 < errors.length && <Hr />}
          </ErrorContainer>
        ))}
      </Container>
    </Overlay>
  )
}

Errors.displayName = 'Errors'

export default observer(Errors)

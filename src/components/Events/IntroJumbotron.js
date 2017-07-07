/**
 * can't convert to es6 function because this is referenced
 */

import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import styled from 'styled-components'

const StyledJumbotron = styled(Jumbotron)`
  hyphens: manual !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
  padding-top: 20px !important;
  padding-bottom: 15px !important;
  margin-top: 30px !important;
  margin-bottom: 20px !important;
  text-align: center !important;
  background-color: transparent !important;
  border: 0 solid #ddd !important;
  border-radius: 4px !important;
`
const P = styled.p`
  margin-bottom: 0 !important;
  font-size: 18px !important;
`

class IntroJumbotron extends Component {
  displayName: 'IntroJumbotron'

  render() {
    return (
      <StyledJumbotron className="eventsIntro">
        <P>
          Most mi­grants and re­fu­gees ar­ri­ving in Eu­ro­pe cross the blue
          bor­­ders of the Eas­­tern and Cen­­tral Me­diterrane­an. The flow is
          massive and high­ly com­plex. This web­­si­te provides a rough
          over­­view by co­ve­­ring chro­­no­­lo­­gi­­cal­­ly both ma­ri­­ti­me
          and political events.
        </P>
      </StyledJumbotron>
    )
  }
}
export default IntroJumbotron

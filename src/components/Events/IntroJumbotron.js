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
          Brexit is a topic of historical proportions, bound to be of interest
          for many years. And because so important and rich it is also difficult
          to gain overview. The purpose of this website is to help. A mere
          chronology focusing on the most relevant information and limited to a
          handful of publicly available sources. And focus on actual EXIT
          negotiations, on both sides…, on a process that is bound to go on for
          years.
        </P>
      </StyledJumbotron>
    )
  }
}
export default IntroJumbotron

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
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  margin-top: 20px !important;
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
          Brexit is a topic of historical proportions and difficult to get an
          overview. This website is meant to help. It is a simple chronology
          beginning with the British exit notice the end of March 2017. The
          focus is on the negotiation dynamics between the two sides based on
          information of a handful of publicly available sources.
        </P>
      </StyledJumbotron>
    )
  }
}
export default IntroJumbotron

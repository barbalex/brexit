//      
import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import styled from 'styled-components'

const StyledJumbotron = styled(Jumbotron)`
  hyphens: manual !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
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
  margin-top: 15px !important;
  margin-bottom: 15px !important;
  font-size: 22px !important;
`

const IntroJumbotron = () =>
  <StyledJumbotron className="eventsIntro">
    <P>
      Brexit is a complex topic difficult to grasp. The present website is meant
      to help. It is a simple chronology based on a handful of publicly
      available sources and focusing on the negotiation dynamics between the two
      sides.
    </P>
  </StyledJumbotron>

export default IntroJumbotron

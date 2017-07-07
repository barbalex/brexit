// @flow
import React from 'react'
import styled from 'styled-components'

import euImage from '../images/eu.svg'
import ukImage from '../images/uk.svg'

const Container = styled.div`
  margin-top: 36px;
  height: 150px;
  padding: 15px;
`
const RowContent = styled.div`
  hyphens: manual;
  display: flex;
  padding-bottom: 25px;
`
const TitleContainer = styled.div`position: relative;`
const Title = styled.div`
  position: absolute;
  margin-top: 125px;
  width: 100%;
  text-align: center;
  font-size: 58px;
  font-weight: 800;
  line-height: 46px;
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px 3px black, -2px -2px 3px black, 2px -2px 3px black,
    -2px 2px 3px black;
`

const Header = () =>
  <Container className="masthead introHeader">
    <div className="container">
      <div className="row">
        <RowContent className="col-xs-12">
          <div>
            <img src={ukImage} height="300" alt="uk" />
          </div>
          <div>
            <img src={euImage} height="300" alt="eu" />
          </div>
        </RowContent>
        <TitleContainer>
          <Title>brexit chronology</Title>
        </TitleContainer>
      </div>
    </div>
  </Container>

Header.displayName = 'Header'

export default Header

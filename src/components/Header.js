// @flow
import React from 'react'
import styled from 'styled-components'
import oceanImage from '../images/ocean.jpg'

const Container = styled.div`
  margin-top: 42px;
  height: 150px;
  padding: 15px;
  &:before {
    content: ' ';
    background-image: url(${oceanImage});
    display: block;
    position: absolute;
    left: 0;
    top: 51px;
    width: 100%;
    height: 150px;
    z-index: -1;
    opacity: 1;
  }
`
const IntroTitle = styled.div`
  margin-top: 20px;
  font-size: 42px;
  font-weight: 800;
  line-height: 46px;
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px 3px black, -2px -2px 3px black, 2px -2px 3px black,
    -2px 2px 3px black;
`
const IntroText = styled.div`
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  line-height: 30px;
  color: #fff;
  text-shadow: 2px 2px 3px black, -2px -2px 3px black, 2px -2px 3px black,
    -2px 2px 3px black;
`
const RowContent = styled.div`hyphens: manual;`

const Header = () =>
  <Container className="masthead introHeader">
    <div className="container">
      <div className="row">
        <RowContent className="col-xs-12">
          <IntroTitle>blue borders</IntroTitle>
          <IntroText>central & eastern mediterranean</IntroText>
        </RowContent>
      </div>
    </div>
  </Container>

Header.displayName = 'Header'

export default Header

/**
 * Cant move Helmet to App
 * because neither StaticQuery nor AppQuery
 * work there :-(
 */
import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Navbar from './Navbar'
import Header from './Header'

const Container = styled.div`
  @media print {
    height: auto;
    overflow: visible !important;
  }
`

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
/**
 * ReactDOMServer does not yet support Suspense
 */
const Layout = ({ children }) => {
  const data = useStaticQuery(query)

  return (
    <Container>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: 'chronology of the brexit',
          },
          {
            name: 'keywords',
            content:
              'Great Britain, United Kingdom, European Union, EU, UK, Brexit',
          },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <Navbar />
      <Header />
      {children}
    </Container>
  )
}

export default Layout

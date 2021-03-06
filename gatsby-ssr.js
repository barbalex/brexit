/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'

import App from './src/App'

export const wrapRootElement = ({ element }) => <App element={element} />

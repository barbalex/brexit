// @flow
import React from 'react'

const LoadingComponent = ({
  isLoading,
  error,
}: {
  isLoading: Boolean,
  error: Object,
}) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>
  } else if (error) {
    // Handle the error state
    return <div>Sorry, there was a problem loading the page.</div>
  } else {
    return null
  }
}

export default LoadingComponent

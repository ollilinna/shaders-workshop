import React from "react"
import Header from '../components/header'
import Box from '../components/box'

const IndexPage = () => (
  <>
    <Header/>
    <Box />
  </>
)

if (module.hot) {
  // [HMR] seems to be broken with latest version of gatsby & three :<
  // https://github.com/gatsbyjs/gatsby/issues/11928
  module.hot.accept(['../shaders/box.frag', '../shaders/box.vert', '../components/box.js'], function() {
    window.location.reload();
  })
}

export default IndexPage

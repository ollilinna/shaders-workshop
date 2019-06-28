import React from "react"
import Header from '../components/header'
import Quad from '../components/quad'

const QuadPage = () => (
  <>
    <Header/>
    <Quad />
  </>
)

if (module.hot) {
  // [HMR] seems to be broken with latest version of gatsby & three :<
  // https://github.com/gatsbyjs/gatsby/issues/11928
  module.hot.accept(['../shaders/quad.frag', '../shaders/quad.vert', '../components/quad.js'], function() {
    window.location.reload();
  })
}

export default QuadPage

import React from "react"
import Header from '../components/header'
import GPGPU from '../components/gpgpu'

const GPGPUPage = () => (
  <>
    <Header/>
    <GPGPU />
  </>
)

if (module.hot) {
  // [HMR] seems to be broken with latest version of gatsby & three :<
  // https://github.com/gatsbyjs/gatsby/issues/11928
  module.hot.accept(['../shaders/gpgpu.frag', '../shaders/gpgpu.vert', '../shaders/data.frag', '../components/gpgpu.js'], function() {
    window.location.reload();
  })
}

export default GPGPUPage

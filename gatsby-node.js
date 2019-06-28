exports.onCreateWebpackConfig = ({ actions }) => {
  let glslifyFiles = /\.(glsl|frag|vert|vs|fs)$/

  actions.setWebpackConfig({
    module: {
      rules: [{
        test: glslifyFiles,
        loaders: ['raw-loader', 'glslify-loader']
      }]
    }
  })
}

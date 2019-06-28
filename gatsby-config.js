module.exports = {
  siteMetadata: {
    title: 'Shaders Workshop',
    description: 'Introduction to shaders',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `shaders`,
        path: `${__dirname}/src/shaders`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: '/',
        display: 'minimal-ui',
      },
    },
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-sass'
  ],
}

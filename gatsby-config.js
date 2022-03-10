module.exports = {
  siteMetadata: {
    title: `My Gatsby Personal App`,
  },
  plugins: ["gatsby-plugin-styled-components", "gatsby-plugin-gatsby-cloud", "gatsby-plugin-mdx", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};
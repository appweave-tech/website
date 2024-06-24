import path from 'path';

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create project pages
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `/projects/${node.frontmatter.slug}`,
        component: path.resolve(`./src/pages/projects/[slug].tsx`),
        context: {
          slug: node.frontmatter.slug,
        },
      });
    });
  });
};

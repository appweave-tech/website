import { GatsbyNode } from 'gatsby';
import path from 'path';

// Type for GraphQL query result
interface QueryResult {
  allMarkdownRemark: {
    edges: {
      node: {
        frontmatter: {
          slug: string;
        };
      };
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const result = (await graphql(`
    query GetAllMarkdownSlugs {
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
  `)) as { data?: QueryResult };

  if (!result.data) {
    throw new Error('No data returned from GraphQL query');
  }

  const projects = result.data.allMarkdownRemark.edges;
  // Create project pages
  projects.forEach(({ node }) => {
    createPage({
      path: `/projects/${node.frontmatter.slug}`,
      component: path.resolve(`./src/pages/projects/[slug].tsx`),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};

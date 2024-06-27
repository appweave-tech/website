import { GatsbyNode } from 'gatsby';
import path from 'path';

// Type for GraphQL query result
interface QueryResult {
  ProjectPage: {
    edges: {
      node: {
        frontmatter: {
          slug: string | null;
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
      ProjectPage: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "project-page" } } }
      ) {
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

  const projects = result.data.ProjectPage.edges;
  // Create project pages
  projects.forEach(({ node }) => {
    const slug = node.frontmatter.slug;
    if (!slug) {
      console.warn(
        'Skipping page creation for markdown node with missing slug'
      );
      return;
    }

    createPage({
      path: `/projects/${slug}`,
      component: path.resolve(`./src/pages/projects/[slug].tsx`),
      context: {
        slug: slug,
      },
    });
  });
};

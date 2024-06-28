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
  BlogPage: {
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
      BlogPage: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "blog-page" } } }
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
  const blogs = result.data.BlogPage.edges;

  // Create project pages
  projects.forEach(({ node }) => {
    const slug = node.frontmatter.slug;
    if (!slug) {
      console.warn('Skipping page creation for markdown node with missing slug');
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

  // Create blog pages
  blogs.forEach(({ node }) => {
    const slug = node.frontmatter.slug;
    if (!slug) {
      console.warn('Skipping page creation for markdown node with missing slug');
      return;
    }

    createPage({
      path: `/blog/${slug}`,
      component: path.resolve(`./src/pages/blog/[slug].tsx`),
      context: {
        slug: slug,
      },
    });
  });
};

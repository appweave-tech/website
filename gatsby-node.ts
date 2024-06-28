import { GatsbyNode } from 'gatsby';
import path from 'path';

// Define types for GraphQL query result
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

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Fetch all markdown slugs for project and blog pages
  const result = await graphql<QueryResult>(`
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
  `);



  // Destructure data from GraphQL query result
  const { ProjectPage, BlogPage } = result.data!;

  // Create project pages
  ProjectPage.edges.forEach(({ node }) => {
    const slug = node.frontmatter.slug;
    if (!slug) {
      console.warn('Skipping page creation for markdown node with missing slug');
      return;
    }

    createPage({
      path: `/projects/${slug}`,
      component: path.resolve(`./src/pages/projects/[slug].tsx`), // Adjust path as necessary
      context: {
        slug: slug,
      },
    });
  });

  // Create blog pages
  BlogPage.edges.forEach(({ node }) => {
    const slug = node.frontmatter.slug;
    if (!slug) {
      console.warn('Skipping page creation for markdown node with missing slug');
      return;
    }

    createPage({
      path: `/blog/${slug}`,
      component: path.resolve(`./src/pages/blog/[slug].tsx`), // Adjust path as necessary
      context: {
        slug: slug,
      },
    });
  });
};

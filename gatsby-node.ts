import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

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
        fields: {
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
            fields {
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
            fields {
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
      path: `${slug}`,
      component: path.resolve(`./src/views/ProjectTemplate.tsx`),
      context: {
        slug: slug,
      },
    });
  });

  // Create blog pages
  BlogPage.edges.forEach(({ node }) => {
    const slug = node.fields.slug;
    if (!slug) {
      console.warn('Skipping page creation for markdown node with missing slug');
      return;
    }

    createPage({
      path: `${slug}`,
      component: path.resolve(`./src/views/BlogTemplate.tsx`),
      context: {
        slug: slug,
      },
    });
  });
};

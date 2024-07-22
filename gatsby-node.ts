import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
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

interface QueryResult {
  ProjectPage: {
    edges: {
      node: {
        fields: {
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
export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;
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
  if (!result.data) {
    throw new Error('GraphQL query for markdown slugs returned no data');
  }
  const { ProjectPage, BlogPage } = result.data;
  ProjectPage.edges.forEach(({ node }) => {
    const slug = node.fields.slug;
    if (!slug) {
      console.warn(
        'Skipping page creation for markdown node with missing slug'
      );
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


  const posts = BlogPage.edges;
  const postsPerPage = 3; 
  const numPages = Math.ceil(posts.length / postsPerPage);
  
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/all-blogs` : `/all-blogs/${i + 1}`,
      component: path.resolve(`./src/views/all-blogs.tsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });


  BlogPage.edges.forEach(({ node }) => {
    const slug = node.fields.slug;
    if (!slug) {
      console.warn(
        'Skipping page creation for markdown node with missing slug'
      );
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

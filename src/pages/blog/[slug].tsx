import React from 'react';
import { graphql } from 'gatsby';
import BlogTemplate from '../../views/BlogTemplate';

export type BlogPageProps = {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        description: string;
        image: string;
        author: string;
        date: string;
        tags: Array<{ tag: string }>;
      };
    };
  };
};

const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
  if (!data) {
    return <div>Loading....</div>;
  }

  return <BlogTemplate data={data} />;
};

export const query = graphql`
  query BlogBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        image
        author
        date(formatString: "MMMM DD, YYYY")
        tags {
          tag
        }
      }
    }
  }
`;

export default BlogPage;

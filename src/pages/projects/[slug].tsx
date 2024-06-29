import React from 'react';
import { graphql } from 'gatsby';
import ProjectTemplate from '../../views/ProjectTemplate';
import Layout from '../../components/layout';

export type ProjectPageProps = {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        description: string;
        image: string;
      };
    };
  };
};

const ProjectPage: React.FC<ProjectPageProps> = ({ data }) => {
  if (!data) {
    return <div>Loading....</div>;
  }

  return (
    <Layout>
      <ProjectTemplate data={data} />
    </Layout>
  );
};

export const query = graphql`
  query ProjectBySlug($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        image
      }
    }
  }
`;

export default ProjectPage;

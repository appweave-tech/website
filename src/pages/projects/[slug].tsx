import React from 'react';
import { graphql } from 'gatsby';
import ProjectTemplate from '../../views/ProjectTemplate';

const ProjectPage = ({ data }) => {
  if (!data) {
    return <div>Loading....</div>;
  }

  return <ProjectTemplate data={data} />;
};

export const query = graphql`
  query ProjectByTitle($slug: String!) {
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

import * as React from "react";
import { PageProps, graphql } from "gatsby";
import Header from "../components/Header";
import Hero from "../components/Hero";

export type IndexPageType = Pick<Queries.IndexPageQuery, "markdownRemark">;

// Step 2: Define your component
const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  return <IndexPageTemplate markdownRemark={data.markdownRemark} />;
};

export const IndexPageTemplate = ({ markdownRemark }: IndexPageType) => {
  const pageObj = markdownRemark?.frontmatter;
  return (
    <>
      <Header />

      <main>
        <Hero title={pageObj?.title} image={pageObj?.image} />
      </main>
    </>
  );
};

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>Home Page</title>;

// Step 3: Export your component
export default IndexPage;

export const query = graphql`
  query IndexPage {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      id
      frontmatter {
        title
        image
      }
    }
  }
`;

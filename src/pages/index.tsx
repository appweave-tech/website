import * as React from "react";
import { PageProps, graphql } from "gatsby";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonial";
import Contact from "../components/Contact";
import Projects from "../components/Projects";
import Layout from "../components/layout";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
export type IndexPageType = Pick<Queries.IndexPageQuery, "indexPage">;

export type IndexPageFrontmatterType = NonNullable<
  Queries.IndexPageQuery["indexPage"]
>["frontmatter"];

// export type BlogPageType = NonNullable<Queries.IndexPageQuery["blogs"]>;

// export type BlogPageEdgeType = NonNullable<
//   NonNullable<Queries.IndexPageQuery["blogs"]>["edges"]
// >;

export type ProjectPageType = NonNullable<Queries.IndexPageQuery["projects"]>

export type ProjectPageEdgeType = NonNullable<NonNullable<Queries.IndexPageQuery["projects"]>["edges"]>

// Step 2: Define your component
const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  console.log(data);
  return (
    <IndexPageTemplate
      indexPage={data.indexPage?.frontmatter!}
      blogs={data.blogs}
    />
  );
};

export const IndexPageTemplate = ({
  indexPage
}: {
  indexPage: IndexPageFrontmatterType;
}) => {
  const { hero, services, testimonials, contact ,footer} = indexPage!;
  return (
    <>
      <Navbar />
      <main>
        <Hero {...hero!} />
        <Features {...services!} />
        <Testimonials {...testimonials!} />
        <Contact {...contact!} />
      </main>

      <Footer footerprops={footer!} />
    </>
  );
};

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>Home Page</title>;

// Step 3: Export your component
export default IndexPage;

export const query = graphql`
  query IndexPage {
    indexPage: markdownRemark(
      frontmatter: { templateKey: { eq: "index-page" } }
    ) {
      id
      frontmatter {
        hero {
          titleUp
          titleDown
          image
          description
          ctaButton {
            text
            link
          }
        }
        services {
          serviceImage
          tag
          title
          description
          service {
            title
            logo {
              icon
              bgColor
            }
          }
        }
        testimonials {
          title
          description
          testimonial {
            title
            description
            profile
            name
            bio
          }
        }
        contact {
         contactImage
         email
        }
        blurbs {
          blogList {
            blurb
          }
        }
        footer {
          social {
            Github {
              size
              link
            }
            linkedin {
              size
              link
            }
            twiter {
              link
              size
            }
          }
          company {
            testimonials
            Services
            aboutus
          }
          support {
            PrivacyPolicy
            TermService
            FAQs
          }
        }
      }
    }
     projects: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "project-page" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            image
          }
        }
      }
    }
  }
`;

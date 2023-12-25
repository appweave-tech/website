import * as React from "react";
import { PageProps, graphql } from "gatsby";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Testimonials from "../components/Testimonial";
import FeaturedBlogs from "../components/Blog";
import Contact from "../components/Contact";

export type IndexPageType = Pick<Queries.IndexPageQuery, "markdownRemark">;

export type IndexPageFrontmatterType = NonNullable<Queries.IndexPageQuery['markdownRemark']>['frontmatter']

// Step 2: Define your component
const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  return <IndexPageTemplate markdownRemark={data.markdownRemark} />;
};

export const IndexPageTemplate = ({ markdownRemark }: IndexPageType) => {
  
  const {hero , services, testimonials, contact}  = markdownRemark?.frontmatter!;

  return (
    <>
      <Navbar />

      <main>
        <Hero {...hero!} />
        <Features {...services!}  />
        <Testimonials {...testimonials!} />
        <FeaturedBlogs />
        <Contact {...contact!}/>
      </main>

      <Footer contact={contact!} />
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
          phoneNumber
          email
          address
        }
      }
    }
  }
`;

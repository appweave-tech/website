import * as React from "react";
import { PageProps, graphql } from "gatsby";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Testimonials from "../components/Testimonial";
import FeaturedBlogs from "../components/Blog";
import Contact from "../components/Contact";
import Projects from "../components/Projects";
import Layout from "../components/layout";

export type IndexPageType = Pick<Queries.IndexPageQuery, "indexPage">;

export type IndexPageFrontmatterType = NonNullable<
  Queries.IndexPageQuery["indexPage"]
>["frontmatter"];

export type BlogPageType = NonNullable<Queries.IndexPageQuery["blogs"]>

export type BlogPageEdgeType = NonNullable<NonNullable<Queries.IndexPageQuery["blogs"]>["edges"]>

export type ProjectPageType = NonNullable<Queries.IndexPageQuery["projects"]>

export type ProjectPageEdgeType = NonNullable<NonNullable<Queries.IndexPageQuery["projects"]>["edges"]>

// Step 2: Define your component
const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  console.log(data);
  return <IndexPageTemplate indexPage={data.indexPage?.frontmatter!} blogs={data.blogs} projects={data.projects}/>;
};

export const IndexPageTemplate = ({ indexPage, blogs, projects }: {indexPage: IndexPageFrontmatterType, blogs: BlogPageType, projects: ProjectPageType}) => {
  const { hero, services, testimonials, contact } =
    indexPage!;
  blogs.edges.map((item) => (console.log(item.blog.frontmatter?.title)))
  return (
    <>
      <Layout>
          <Hero {...hero!} />
          <Features {...services!} />
          <Projects {...projects} />
          <Testimonials {...testimonials!} />
         <FeaturedBlogs {...blogs}/>
          <Contact {...contact!} />
      </Layout>
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
          phoneNumber
          email
          address
        }
        blurbs {
          blogList {
            blurb
          }
        }
      }
    }
    blogs: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-page" } } }
    ) {
      edges {
        blog: node {
          fields {
            slug
          }
          fileAbsolutePath
          frontmatter {
            date
            title
            author
            description
            tags{
              tag
            }
            image
          }
          wordCount {
            words
          }
          timeToRead
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

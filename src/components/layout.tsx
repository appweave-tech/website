import React, { ReactNode } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query FooterContact {
          markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
              contact {
                email
              }
            }
          }
        }
      `}
      render={(data) => {
        const contact = data.markdownRemark.frontmatter.contact;
        return (
          <>
            <Navbar />
            {children}
            <Footer contact={contact} />
          </>
        );
      }}
    />
  );
};

export default Layout;

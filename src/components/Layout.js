import { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyles } from '../styles/GlobalStyles';
import Navbar from './Navbar';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[6]} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export default function Layout({ children, title = 'Product Management Portfolio' }) {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const smoothScroll = (e) => {
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      };

      // Add smooth scroll to all anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach((link) => {
        link.addEventListener('click', smoothScroll);
      });

      return () => {
        // Clean up event listeners
        anchorLinks.forEach((link) => {
          link.removeEventListener('click', smoothScroll);
        });
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Product Management Portfolio - Showcasing my work and experience in product management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyles />
      <LayoutContainer>
        <Navbar />
        <Main>{children}</Main>
        <Footer>
          <div className="container">
            <p>© {new Date().getFullYear()} Product Management Portfolio. All rights reserved.</p>
          </div>
        </Footer>
      </LayoutContainer>
    </>
  );
}

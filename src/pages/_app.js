import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Layout from '../components/Layout';
import PasswordProtect from '../components/PasswordProtect';

// Loading spinner component
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

// Main app component
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle page loading state
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  // Check if current route is the password page
  const isPasswordPage = router.pathname === '/password';

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <LoadingSpinner>
          <div>Loading...</div>
        </LoadingSpinner>
      ) : (
        <PasswordProtect>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PasswordProtect>
      )}
    </ThemeProvider>
  );
}

// Add global CSS
import '../styles/globals.css';

// Add Bebas Neue font from Google Fonts
const loadFonts = () => {
  // Check if the font is already loaded
  if (typeof document !== 'undefined' && !document.querySelector('link[href*="Bebas+Neue"]')) {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
};

// Load fonts when the app mounts
if (typeof window !== 'undefined') {
  loadFonts();
}

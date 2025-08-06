import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { theme } from '../styles/theme';

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const Nav = styled(motion.nav)`
  position: fixed;
  top: 24px;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 16px;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  & > div {
    background-color: rgba(255, 255, 255, ${({ scrolled }) => scrolled ? '0.6' : '0.75'});
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.6);
    padding: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    pointer-events: auto;
    
    ${({ scrolled }) => scrolled && `
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    `}
  }
  
  ${({ scrolled }) => scrolled && `
    top: 16px;
  `}
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  width: auto;
  padding: 0 8px;
`;

const Logo = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
  background: linear-gradient(90deg, #FFF085, #FCB454, #FF9B17, #F16767);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 24px;
  transition: all 0.3s ease;
  white-space: nowrap;
  margin-right: 8px;
  font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:hover {
    background: linear-gradient(90deg, #F16767, #FF9B17, #FCB454, #FFF085);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: scale(1.02);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 85%;
    max-width: 320px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 100px 24px 40px;
    box-shadow: -8px 0 30px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    justify-content: flex-start;
    overflow-y: auto;
    overscroll-behavior: contain;
    will-change: transform, visibility;
    transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), 
                visibility 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    padding: 90px 16px 40px;
  }
`;

const NavLink = styled(motion.a)`
  color: #000000;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  padding: 10px 16px;
  border-radius: 24px;
  position: relative;
  white-space: nowrap;
  font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
  -webkit-tap-highlight-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 300%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 240, 133, 0.5),
      rgba(252, 180, 84, 0.5),
      rgba(255, 155, 23, 0.5),
      rgba(252, 180, 84, 0.5),
      rgba(255, 240, 133, 0.5)
    );
    background-size: 200% 100%;
    z-index: -1;
    opacity: 0;
    transition: all 0.3s ease;
    border-radius: 24px;
  }

  &:hover::before {
    opacity: 1;
    left: 0;
    animation: ${gradientMove} 3s linear infinite;
  }
  
  ${({ isActive, isFilterActive }) => (isActive || isFilterActive) && `
    background: linear-gradient(90deg, #FFF085, #FCB454, #FF9B17);
    color: #000000;
    
    &::before {
      display: none;
    }
  `}

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 16px 24px;
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    border-radius: 12px;
    margin: 4px 0;
    transition: all 0.2s ease;
    
    &:active {
      transform: scale(0.98);
      background-color: rgba(0, 0, 0, 0.03);
    }
    
    ${({ isActive, isFilterActive }) => (isActive || isFilterActive) && `
      background: linear-gradient(90deg, #FFF085, #FCB454, #FF9B17);
      color: #000000;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(255, 155, 23, 0.2);
    `}
  }
`;

const MenuButton = styled.button`
  background: ${({ isOpen }) => isOpen ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;
  display: none;
  z-index: 1002;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px; /* Positioned below the navbar */
  right: 20px;
  width: calc(100% - 40px);
  max-width: 320px;
  max-height: calc(100vh - 100px); /* Adjusted to account for top and bottom spacing */
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.6);
  z-index: 1001;
  overflow-y: auto;
  overscroll-behavior: contain;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 23px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1000;
`;

const navItems = [
  { name: 'Myself', path: '/about' },
  { 
    name: 'My Product Management', 
    path: '/my-product-management',
    filter: 'professional',
    avatar: '/images/professional_headshot.jpeg'
  },
  { 
    name: 'My Adventures', 
    path: '/my-adventures',
    filter: 'adventures',
    avatar: '/images/biking_headshot.JPG'
  },
];

const MobileNavLink = styled.a`
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 14px 20px;
  margin: 4px 12px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #FFF085, #FCB454, #FF9B17);
    opacity: 0;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
    border-radius: 14px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 155, 23, 0.2);
    background: rgba(255, 255, 255, 0.95);
    color: #FF9B17;
    
    &::before {
      opacity: 0.15;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.1s ease;
  }
  
  ${({ $isActive }) => $isActive && `
    background: linear-gradient(90deg, #FFF085, #FCB454, #FF9B17);
    color: #000;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(255, 155, 23, 0.2);
    
    &:hover {
      transform: none;
      box-shadow: 0 4px 12px rgba(255, 155, 23, 0.3);
      
      &::before {
        opacity: 0;
      }
    }
  `}
`;

export default function Navbar({ activeFilter, setActiveFilter, filter }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

  // Function to handle filter changes
  const handleFilterClick = (e, filterValue, filterName) => {
    e.preventDefault();
    setActiveFilter(filterValue);
    // Navigate to the home page with the filter and hash
    router.push({
      pathname: '/',
      query: { filter: filterName },
      hash: 'portfolio-section'
    });
  };

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      document.body.style.overflow = '';
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        const menuButton = document.querySelector('[aria-label^="Menu"]');
        if (menuButton && !menuButton.contains(event.target)) {
          setIsOpen(false);
          document.body.style.overflow = '';
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <Nav scrolled={scrolled}>
        <div>
          <NavContainer>
            <Link href="/" passHref>
              <Logo 
                onClick={() => {
                  setIsOpen(false);
                  document.body.style.overflow = '';
                }}
              >
                Michael Hoefert
              </Logo>
            </Link>
            
            <MenuButton 
              onClick={toggleMenu} 
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              isOpen={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </MenuButton>
            
            <NavLinks>
              <Link href="/about/" passHref>
                <NavLink isActive={router.pathname === '/about/'}>
                  Myself
                </NavLink>
              </Link>
              <Link href="/my-product-management/" passHref>
                <NavLink 
                  isActive={router.pathname === '/my-product-management/'}
                  isFilterActive={activeFilter === '/images/professional_headshot.jpeg'}
                  onClick={(e) => handleFilterClick(e, '/images/professional_headshot.jpeg', 'professional')}
                >
                  My Product Management
                </NavLink>
              </Link>
              <Link href="/my-adventures/" passHref>
                <NavLink 
                  isActive={router.pathname === '/my-adventures/'}
                  isFilterActive={activeFilter === '/images/biking_headshot.JPG'}
                  onClick={(e) => handleFilterClick(e, '/images/biking_headshot.JPG', 'adventures')}
                >
                  My Adventures
                </NavLink>
              </Link>
            </NavLinks>

            <AnimatePresence>
              {isOpen && (
                <MobileMenu
                  ref={menuRef}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <Link href="/about/" passHref legacyBehavior>
                    <MobileNavLink
                      as={motion.a}
                      $isActive={router.pathname === '/about/'}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => {
                        setIsOpen(false);
                        document.body.style.overflow = '';
                      }}
                    >
                      Myself
                    </MobileNavLink>
                  </Link>
                  <Link href="/my-product-management/" passHref legacyBehavior>
                    <MobileNavLink
                      as={motion.a}
                      $isActive={router.pathname === '/my-product-management/' || activeFilter === '/images/professional_headshot.jpeg'}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      onClick={(e) => {
                        handleFilterClick(e, '/images/professional_headshot.jpeg', 'professional');
                        setIsOpen(false);
                        document.body.style.overflow = '';
                      }}
                    >
                      My Product Management
                    </MobileNavLink>
                  </Link>
                  <Link href="/my-adventures/" passHref legacyBehavior>
                    <MobileNavLink
                      as={motion.a}
                      $isActive={router.pathname === '/my-adventures/' || activeFilter === '/images/biking_headshot.JPG'}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      onClick={(e) => {
                        handleFilterClick(e, '/images/biking_headshot.JPG', 'adventures');
                        setIsOpen(false);
                        document.body.style.overflow = '';
                      }}
                    >
                      My Adventures
                    </MobileNavLink>
                  </Link>
                </MobileMenu>
              )}
            </AnimatePresence>
          </NavContainer>
        </div>
      </Nav>
      
      <Overlay 
        isOpen={isOpen}
        onClick={closeMenu}
        initial={{ opacity: 0 }}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, visibility: 'visible' },
          closed: { opacity: 0, visibility: 'hidden' }
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </>
  );
}

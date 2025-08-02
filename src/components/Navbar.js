import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { theme } from '../styles/theme';

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
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    flex-direction: column;
    padding: 80px 24px 24px;
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: ${({ theme }) => theme.zIndices.modal};
    border-radius: 0 0 0 24px;
  }
`;

const NavLink = styled.a`
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
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1.2;

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
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
    width: 100%;
    text-align: center;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 24px;
  cursor: pointer;
  display: none;
  z-index: ${({ theme }) => theme.zIndices.modal + 1};
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndices.overlay};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
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

export default function Navbar({ activeFilter, setActiveFilter, filter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Filter navigation items based on current route
  const filteredNavItems = router.pathname === '/about' 
    ? navItems.filter(item => item.path === '/about')
    : navItems;

  return (
    <Nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      scrolled={scrolled}
    >
      <NavContainer>
        <Link href="/" passHref>
          <Logo 
            onClick={(e) => {
              if (setActiveFilter) {
                e.preventDefault();
                setActiveFilter(null);
                window.history.pushState({}, '', '/');
              }
            }}
          >
            Michael's Portfolio
          </Logo>
        </Link>
        
        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <FiX /> : <FiMenu />}
        </MenuButton>
        
        <NavLinks isOpen={isOpen}>
          {filteredNavItems.map((item) => (
            <Link key={item.path} href={item.path} passHref>
              <NavLink 
                isActive={router.pathname === item.path}
                isFilterActive={activeFilter === item.avatar}
                onClick={(e) => {
                  closeMenu();
                  if (item.filter) {
                    e.preventDefault();
                    const newFilter = activeFilter === item.avatar ? null : item.avatar;
                    setActiveFilter(newFilter);
                    // Update URL without page reload
                    window.history.pushState({}, '', newFilter ? item.path : '/');
                  }
                }}
              >
                {item.name}
              </NavLink>
            </Link>
          ))}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

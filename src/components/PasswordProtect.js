import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const PASSWORD = 'ProductManagementJourney';

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[6]};
  background-color: ${({ theme }) => theme.colors.background};
  font-family: 'Raleway', sans-serif;
`;

const PasswordBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.space[8]};
  width: 100%;
  max-width: 400px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  background: linear-gradient(90deg, #FFF085, #FCB454, #FF9B17);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space[4]};
  font-size: 1rem;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => `${theme.space[4]} auto 0`};
  font-size: 0.95rem;
  line-height: 1.7;
  text-align: center;
  max-width: 320px;
  padding: ${({ theme }) => theme.space[4]};
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  
  p {
    margin: 0 0 ${({ theme }) => theme.space[4]} 0;
  }
`;

const EmailLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0 auto;
  
  &:hover {
    background: #FF9B17;
    color: white;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space[4]};
  transition: all 0.3s ease;
  font-family: 'Raleway', sans-serif;

  &:focus {
    outline: none;
    border-color: #FF9B17;
    box-shadow: 0 0 0 2px rgba(255, 155, 23, 0.3);
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(90deg, #FFF085, #FCB454, #FF9B17);
  color: #000000;
  border: none;
  border-radius: 24px;
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[6]}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  font-family: 'Raleway', sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 300%;
    height: 100%;
    background: linear-gradient(90deg, #F16767, #FF9B17, #FCB454, #FFF085, #FCB454, #FF9B17);
    background-size: 200% 100%;
    z-index: -1;
    transition: all 0.6s ease;
  }

  &:hover::before {
    left: 0;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  margin-top: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  min-height: 20px;
`;

export default function PasswordProtect({ children }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if password is already stored in localStorage
    const savedPassword = typeof window !== 'undefined' ? localStorage.getItem('portfolio-password') : null;
    if (savedPassword === PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-password', password);
      }
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <PasswordContainer>
      <PasswordBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Enter Password</Title>
        <Description>This portfolio is password protected. Please enter the password to continue.</Description>
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Enter password"
            autoFocus
          />
          <ErrorMessage>{error}</ErrorMessage>
          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue
          </Button>
        </form>
        <ContactInfo>
          <p>If you do not have the password, contact me and I am more than happy to give it to you!</p>
          <EmailLink href="mailto:mhoefert1@gmail.com" aria-label="Email">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </EmailLink>
        </ContactInfo>
      </PasswordBox>
    </PasswordContainer>
  );
}

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const ProcessHeader = styled.header`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}15 0%, ${({ theme }) => theme.colors.secondary}15 100%);
  padding: ${({ theme }) => `${theme.space[16]} 0 ${theme.space[12]}`};
  margin-bottom: ${({ theme }) => theme.space[12]};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[6]};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.space[6]};
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateX(-4px);
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  margin-bottom: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 800px;
  line-height: 1.6;
`;

const ProcessContent = styled.article`
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.space[16]};
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin: ${({ theme }) => `${theme.space[12]} 0 ${theme.space[6]}`};
    color: ${({ theme }) => theme.colors.text};
    position: relative;
    padding-left: ${({ theme }) => theme.space[4]};
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5em;
      height: 1em;
      width: 4px;
      background: linear-gradient(to bottom, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
      border-radius: 2px;
    }
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin: ${({ theme }) => `${theme.space[8]} 0 ${theme.space[4]}`};
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.space[6]};
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textLight};
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.space[6]};
    padding-left: ${({ theme }) => theme.space[6]};
    
    li {
      margin-bottom: ${({ theme }) => theme.space[3]};
      color: ${({ theme }) => theme.colors.textLight};
      line-height: 1.7;
    }
  }
  
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.secondary};
    padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[6]};
    margin: ${({ theme }) => `${theme.space[8]} 0`};
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: 0 ${({ theme }) => theme.radii.md} ${({ theme }) => theme.radii.md} 0;
    
    p {
      margin: 0;
      font-style: italic;
      color: ${({ theme }) => theme.colors.text};
    }
    
    footer {
      margin-top: ${({ theme }) => theme.space[2]};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      color: ${({ theme }) => theme.colors.textLight};
    }
  }
`;

const ImageContainer = styled.figure`
  margin: ${({ theme }) => `${theme.space[8]} 0`};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  figcaption {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textLight};
    margin-top: ${({ theme }) => theme.space[2]};
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[6]};
  margin: ${({ theme }) => `${theme.space[6]} 0`};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  
  h3 {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function ProcessTemplate({ title, description, children }) {
  return (
    <>
      <ProcessHeader>
        <Container>
          <BackLink href="/">
            <FiArrowLeft /> Back to Home
          </BackLink>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title>{title}</Title>
            <Subtitle>{description}</Subtitle>
          </motion.div>
        </Container>
      </ProcessHeader>
      
      <Container>
        <ProcessContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </ProcessContent>
      </Container>
    </>
  );
}

export { ImageContainer, Card, fadeIn };

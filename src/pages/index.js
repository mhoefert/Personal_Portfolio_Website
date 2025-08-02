import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ExpandedCard from '../components/ExpandedCard';

const ContentText = styled.div`
  line-height: 1.7;
  font-size: clamp(18px, 1.3vw + 12px, 22px);
  
  p {
    margin-bottom: 1.5em;
    min-height: 1.5em; /* Prevent text from collapsing */
  }
  
  @media (max-width: 1200px) {
    font-size: clamp(17px, 1.2vw + 12px, 20px);
  }
  
  @media (max-width: 992px) {
    font-size: clamp(16px, 1.2vw + 12px, 19px);
  }
  
  @media (max-width: 768px) {
    font-size: clamp(16px, 1.3vw + 12px, 18px);
    line-height: 1.8;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(16px, 1.2vw + 14px, 19px);
    line-height: 1.8;
  }
`;

const RadiatingLines = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70vh; /* Shorter height to fade out before title */
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  opacity: ${props => props.scrollOpacity};
  transition: opacity 0.3s ease;
  will-change: opacity;
  mix-blend-mode: multiply;
  mask-image: linear-gradient(to bottom, 
    rgba(0,0,0,1) 0%, 
    rgba(0,0,0,0.8) 50%, 
    rgba(0,0,0,0) 100%);
  
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .line {
    fill: none;
    stroke-linecap: round;
    stroke-width: 1.5;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));
    transition: all 0.5s ease;
    opacity: 0.8; /* Slightly more visible */
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: white;
  position: relative;
  overflow: hidden;
  width: 100%;
  z-index: 1;
  padding: 4rem 0 2rem;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: 
      radial-gradient(
        circle at 50% 0%,
        rgba(255, 155, 23, 0.9) 0%,
        rgba(255, 255, 255, 0) 75%
      ),
      white;
    pointer-events: none;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    min-height: 90vh;
    justify-content: center;
    padding: 3rem 0 1rem;
  }
  
  @media (max-width: 480px) {
    min-height: 85vh;
    padding: 2rem 0 0.5rem;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 5%;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  overflow: visible;
  
  @media (min-width: 1600px) {
    padding: 0 10%;
  }
`;

const HeroContent = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 0;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const PreTitle = styled(motion.p)`
  font-size: clamp(1.2rem, 4vw, 2.4rem);
  color: #333;
  margin: 0 0 0 0;
  padding: 0 2%;
  font-weight: 500;
  line-height: 1.5;
  width: 100%;
  font-family: 'Raleway', sans-serif;
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  text-align: left;
  margin-bottom: 0rem;
  
  @media (max-width: 400px) {
    font-size: clamp(0.8rem, 10vw, 1rem);
    padding: 0 8%;
  }
  
  @media (max-width: 600px) {
    font-size: clamp(0.9rem, 8vw, 1.3rem);
    padding: 0 6%;
  }
  
  @media (max-width: 900px) {
    font-size: clamp(1rem, 6vw, 1.7rem);
    padding: 0 4%;
  }

  @media (max-width: 1280px) {
    font-size: clamp(1.0rem, calc(-0.2353rem + 3.2941vw), 2.4rem);
    padding: 0 2%;
  }
`;

const Title = styled(motion.h1)`
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 16vw, 19.6rem);
  font-weight: 700;
  margin: 0;
  padding: 0 2%;
  line-height: 1;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  width: 100%;
  max-width: 100%;
  position: relative;
  transform: translateX(0%);
  text-align: left;
  z-index: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  display: block;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;

  @media (max-width: 400px) {
    font-size: clamp(1.5rem, 8vw, 3.2rem);
    padding: 0 6%;
    line-height: 1.2;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #666;
  margin: 0 0 3rem 0;
  max-width: 500px;
  line-height: 1.6;
`;

const CtaButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #000;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Section = styled.section`
  padding: 60px 0;
  background: #ffffff;
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Bebas Neue', sans-serif;
  font-size: ${({ theme }) => `calc(${theme.fontSizes['5xl']} * 1.2)`};
  font-weight: 900;
  margin-bottom: ${({ theme }) => theme.space[12]};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: ${({ theme }) => theme.space[10]};
  line-height: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #000000;
    border-radius: 2px;
  }
`;

const CardsGrid = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  max-width: 2200px;
  margin: 0 auto;
  padding: 2rem 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1.5rem 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem; /* Smaller gap to avoid crowding */
    padding: 1rem; /* Less padding on sides for better fit */
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1440px;
  margin: 2rem auto;
  padding: 0 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
`;

const WorkCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 500px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    min-height: 450px; /* Shorter for tablets */
    width: 95%; /* Better fit on iPads */
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    min-height: 400px;
    width: 100%;
  }

  @media (max-width: 480px) {
    min-height: auto; /* Allow natural height */
  }
`;

const WorkCardHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  h4 {
    margin: 0;
    font-size: 1rem;
    color: #333;
    font-family: 'Raleway', sans-serif;
  }
  
  p {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: #666;
    font-family: 'Raleway', sans-serif;
  }
`;

const WorkCardImage = styled.div`
  width: 90%;
  height: 240px;
  background: #f5f5f5;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 8px;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CarouselImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: opacity 0.3s ease;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.02);
  }
`;

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  padding: 2rem;
  
  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  ${({ $direction }) => ($direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 5px;
  z-index: 2;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $isActive }) => ($isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)')};
  cursor: pointer;
  transition: background 0.3s ease;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #eaeaea;
  margin: 1rem 0;
`;

const Description = styled.p`
  color: #333;
  line-height: 1.6;
  margin: 0.5rem 0 0;
  font-size: clamp(0.6875rem, calc(1.35vw - 0.5rem), 0.75vw); /* Base: Preferred at 0.75vw, gradual min */
  font-family: 'Raleway', sans-serif;

  @media (max-width: 1440px) {
    font-size: clamp(0.675rem, calc(1.3vw - 0.45rem), 0.7vw); /* Subtle step down, min ~10.8px */
  }

  @media (max-width: 1280px) {
    font-size: clamp(0.65rem, calc(1.2vw - 0.4rem), 0.65vw); /* Incremental reduction, min ~10.4px */
  }

  @media (max-width: 1024px) {
    font-size: clamp(0.625rem, calc(1.1vw - 0.35rem), 0.6vw); /* Gentle taper, min ~10px */
  }

  @media (max-width: 900px) {
    font-size: clamp(0.6rem, calc(1.0vw - 0.3rem), 0.55vw); /* Extra breakpoint for smoothness, min ~9.6px */
  }

  @media (max-width: 768px) {
    font-size: clamp(0.575rem, calc(0.9vw - 0.25rem), 0.5vw); /* Slow progression to tablet, min ~9.2px */
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.5rem, calc(0.7vw - 0.15rem), 0.4vw); /* Mobile floor at 0.5rem (~8px), still readable */
  }
`;

const WorkCardContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
  h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    color: #333;
  }
  
  @media (max-width: 1024px) {
    padding: 1rem; /* Balanced for tablets */
    align-items: center; /* Vertical centering for better flow */
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    text-align: center;
  }
`;

const WorkStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
  text-align: center;
  width: 100%;
  padding: 1rem 0;
  margin: auto 0 0;
  box-sizing: border-box;
  
  div {
    padding: 0.5rem;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    h4 {
      margin: 0 0 0.25rem;
      font-size: 1.25rem;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }
    
    p {
      margin: 0;
      font-size: 0.7rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const AnimatedBorder = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  padding: 4.5px; /* Increased from 3px to 6px for thicker border */
  background: ${({ gradientType }) => 
    gradientType === 'adventures' 
      ? 'linear-gradient(90deg, #FFF085, #FCB454, #FF9B17)'
      : 'linear-gradient(90deg, #722323, #BA487F, #FF9587)'};
  background-size: 200% 200%;
  animation: gradient 10s ease infinite;
  opacity: 0.8; /* Slightly increased opacity for more vibrant colors */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
  width: 100%;
  display: block;
  will-change: transform, width, box-shadow;
  overflow: visible;
  z-index: 1;
  transform-origin: center;
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const MainCard = styled(motion.div)`
  background: white;
  border-radius: 14px;
  padding: clamp(24px, 3vw, 40px);
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 280px;
  width: 100%;
  opacity: 1 !important;
  position: relative;
  z-index: 1;
  will-change: transform, box-shadow;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  
   @media (max-width: 1024px) {
    padding: 28px 24px; /* Fixed padding for tablets */
    min-height: 260px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 20px;
    min-height: auto;
    width: 90%;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    padding: 20px 16px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ gradientType }) => 
      gradientType === 'adventures' 
        ? 'linear-gradient(90deg, rgba(255, 240, 133, 0.1), rgba(252, 180, 84, 0.1), rgba(255, 155, 23, 0.1))' 
        : 'linear-gradient(90deg, rgba(114, 35, 35, 0.1), rgba(186, 72, 127, 0.1), rgba(255, 149, 135, 0.1))'};
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    padding: 32px 24px;
  }
  
  /* Removed ::before pseudo-element for cleaner hover effect */
`;

const ProcessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(24px, 3vw, 40px);
  margin-bottom: 0;
  height: 100%;
  width: 100%;
  
  @media (max-width: 1024px) {
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const ProcessNumber = styled.div`
  flex-shrink: 0;
  width: clamp(100px, 13vw, 180px);
  height: clamp(100px, 13vw, 180px);
  min-width: 80px;
  min-height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFF085, #FCB454, #FF9B17, #F16767);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 6px solid white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 1248px) {
    width: 150px; /* Fixed size for large tablets */
    height: 150px;
  }

  @media (max-width: 1024px) {
    width: 130px; /* Optimal size for iPad */
    height: 130px;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin: 0 auto 10px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    border-width: 4px;
  }

  @media (max-width: 360px) {
    width: 80px;
    height: 80px;
  }
`;

const ProcessTitle = styled.h3`
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 900;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  margin: 0.5em 0 0.5em 0;
  color: #1a1a1a;
  text-align: left;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%;
  
   @media (max-width: 1024px) {
    font-size: 1.8rem; /* Fixed size for tablets */
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    text-align: center;
    margin: 0.4em 0;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin: 0.3em 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: clamp(24px, 3.5vw, 48px);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  
  @media (max-width: 1024px) {
    margin-left: 32px;
  }
  
  @media (max-width: 768px) {
    margin: 24px 0 0 0;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    margin-top: 16px;
  }
`;

const ProcessDescription = styled.p`
  color: #333;
  line-height: 1.7;
  margin: 0;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  text-align: left;
  white-space: pre-line;
  flex-grow: 1;
  display: flex;
  align-items: center;
  max-width: 100%;
  
  @media (max-width: 1280px) {
    font-size: 1.3rem; /* Larger text for tablets */
  }

  @media (max-width: 1024px) {
    font-size: 1.2rem; /* Readable size for iPad */
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const mainCards = [
  {
    number: '01',
    title: 'MY PRODUCT MANAGEMENT',
    description: 'Explore some of my work, I believe great products require constant engagement with the customer. I take this mindset when creating products.',
    href: '/my-product-management',
    gradientType: 'product'
  },
  {
    number: '02',
    title: 'MY ADVENTURES',
    description: 'Discover my passion for challenging experiences (mainly bike rides) and how they shape my perspective on problem-solving and resilience.',
    href: '/adventures',
    gradientType: 'adventures'
  }
];

const cardAnimation = {
  hidden: { 
    opacity: 0,
    y: 40,
    scale: 0.98,
    width: '100%'
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    width: '100%',
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: [0.16, 1, 0.3, 1],
      opacity: { 
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      },
      y: { 
        type: 'spring',
        damping: 20,
        stiffness: 100
      },
      scale: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    }
  })
};

const staggerContainer = {
  hidden: { },
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: 'beforeChildren',
      staggerDirection: 1,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Sample work items data
const workItems = [
  {
    id: 1,
    title: 'Chasing the Dragon',
    images: [
      '/images/chasing_the_dragon.JPG',
      '/images/chasing_the_dragon_map.png',
      '/images/chasing_the_dragon_b_roll_1.jpeg',
      '/images/chasing_the_dragon_b_roll_2.JPG',
      '/images/chasing_the_dragon_b_roll_3.JPG'
    ],
    stats: {
      distance: '563km',
      elevation: '5250m',
      time: '20.5h'
    },
    avatar: '/images/biking_headshot.JPG',
    name: 'Michael Hoefert',
    location: 'London to Wales',
    description: 'The goal: Chase the Sun on Saturday and the Dragon Devil race on Sunday. I was looking for a new challenge; to push myself further than ever before, to explore how I respond to new levels of discomfort. This ride proved to do just that, but not in the way I was expecting.',
    additionalDetails: (
      <ContentText>
        <p style={{ marginBottom: '1.5em' }}>Every year I set myself a goal to do hard things, typically some sort of extreme physical challenge that ends up testing my mental resilience as well. This year, the Chase the Sun + Dragon Devil weekend was the second one of those challenges. Earlier in the year I completed the lap of Mallorca (which you can read about on this site as well). The lap of Mallorca was extremely challenging, but I felt I could go deeper, push my boundaries even more. Without a doubt this Chase the Dragon ride would be the biggest physical and mental challenge I will have ever undertaken. However, little did I know that it would test me in a completely different way than I expected.</p>
        <p style={{ marginBottom: '1.5em' }}>Long story short, during both days I felt extremely strong on the bike and wasn't suffering physically or mentally nearly as much as I thought I would be (all that training I'd been doing really paid off). To be quite honest, I felt it was pretty easy all things considered. However, the one thing I didn't expect for the Dragon ride was the weather. Forecasts leading up to the day promised a hot 30+ degree day with sun. Reality was quite different. The weather was biblical to say the least. The storms, the rain, and the wind were brutal. I had never biked through anything like that before and at kilometer 245 of the 295km race all things suddenly went wrong, really wrong.</p>
        <p style={{ marginBottom: '1.5em' }}>The storm is getting incredibly bad, I am in remote Wales, and then I get a flat tire. I am drenched to the bone, temperatures have dropped to 7 degrees, and I am comically underdressed. I scramble to take the wheel and tire off to replace my flat tube. I get tire sorted relatively quickly and am back rolling in 10 minutes. But soon after I get started again, I feel the wheel go flat again. Shit. Now I'm out of tubes, stuck in a storm in a remote part of Wales, absolutely freezing and have no way to fix my tire.</p>
        <p style={{ marginBottom: '1.5em' }}>What do I do? I start to panic a bit, naturally. But before I let myself spiral I realize that the situation is actually quite dire and I don't have the luxury to panic. I need to figure out a plan. I knew there was an emergency mechanic van you call, and the phone number is listed on the race number you have to pin to yourself. I get my phone out to call the mechanic and my phone is dead. A wave of dread washes over me. What do I do now? I know I can't let myself panic even though I'm shivering beyond control now, have a flat tire with no means to fix it, and a dead phone.</p>
        <p style={{ marginBottom: '1.5em' }}>Suddenly I remember that about 1km down the climb there was an event photographer. I run down the hill with my bike to the photographer who is sitting in a massive rain coat in the rain. I tap his shoulder and begin to explain the situation to him. He lets me borrow his phone and sit in his car which is parked on the side of the road. I end up managing to call the mechanic and in about an hour the mechanic arrives and sets me up with a new tire.</p>
        <p style={{ marginBottom: '1.5em' }}>There are more details here and there that I've left out in an effort to minimize how long this description is. Long story short, I managed to get to the next feed station at kilometer 255 where I ended up DNFing with several paramedics beside me assessing my condition. I was uncontrollably shivering with mild-hypothermia, the storm was getting even worse and I knew it was incredibly unsafe to continue.</p>
        <p style={{ marginBottom: '1.5em' }}>I went into this event expecting to be challenged physically and mentally purely because of the distance and elevation I was going to be covering. In reality the weekend challenged my ability to remain calm in extremely high stake situations and my ability to focus on solutions rather than letting myself spiral out of control. Rather than focusing on how everything had gone wrong and the dangerous situation I was in, I focused on practical next steps to resolve the situation. My ability to do so translates to all aspects of my life, including my work. In high pressure/stake situations, I have the ability to focus on the tasks at hand and resolve the issues.</p>
        <p>There is so much more to this story and the learnings I took from it, but this description isn't the place to record it all. If you want to hear more, reach out!</p>
      </ContentText>
    ),
  },
  {
    id: 2,
    title: 'Intelligent Cleaning: from 0 to 1',
    images: [
      '/images/Intelligent_Cleaning_Landing_Page.png',
      '/images/Intelligent_Cleaning_Estate_Overview.png',
      '/images/intelligent_cleaning_map.png',
      '/images/intelligent_cleaning_planning_1.png',
      '/images/intelligent_cleaning_planning_2.png'
    ],
    stats: {
      customers: '27',
      buildings: '247',
      DAU: '85%'
    },
    avatar: '/images/professional_headshot.jpeg',
    name: 'Michael Hoefert',
    location: 'London, UK',
    description: 'Took the Intelligent Cleaning from ideation to deployed product. The process included significant UXR to uncover needs, pain points, and generally understand what the customers decision making process is. The product has improved SLA audit compliance from 91% to 98%.',
    additionalDetails: (
      <ContentText>
        <p style={{ marginBottom: '1.5em' }}>I took the Intelligent Cleaning from ideation to deployed product. The process included significant UXR to uncover needs, pain points, and generally understand what the customers decision-making process is. The product improved SLA audit compliance from 91% to 98% (and reduced the number of sites that we receive SLA breach fines down to 4% from 6%).</p>
        <p style={{ marginBottom: '1.5em' }}><b>Inception & User Research (UXR):</b> The "Intelligent Cleaning" product was a zero-to-one initiative I led within a newly formed Digital Products team. The initial challenge was that no one in the business, including supposed business leader “subject matter experts”, had a clear understanding of the end-to-end operational workflows, decision-making processes, or pain points of the cleaning operations managers who would be our primary users.</p>
        <p style={{ marginBottom: '1.5em' }}>Instead of immediately building a solution as senior stakeholders pressured for, I prioritized foundational user research. My approach was heavily influenced by Jeff Patton's user story mapping techniques. I conducted numerous on-the-ground user journey workshops with a diverse range of customer types. This allowed me to create detailed, customer-specific user journey maps. By identifying and merging patterns across these individual maps, I developed a single, comprehensive map that became the team's reference point for all roadmap decisions. This exercise was fundamental in ensuring we built a product that addressed real user needs, pains, and thought processes.</p>
        <p style={{ marginBottom: '1.5em' }}><b>Roadmapping & Prioritization:</b> With a deep understanding of the user journey, we began roadmapping. Our team utilized Monday.com (the only software we could clear through our IS division…) to manage and share our roadmap with engineers, ensuring transparency and collaboration. The insights gathered from the user journey mapping directly informed the features we prioritized.</p>
        <p style={{ marginBottom: '1.5em' }}>The core of the product was to optimize cleaning scheduling, routing, and day-to-day operations by capturing data from a cleaner's handheld device (which used our proprietary software). This data included not only cleaning activities but also cleaner sentiment and commentary, giving them a voice in the process.</p>
        <p style={{ marginBottom: '1.5em' }}><b>Building & AI Integration:</b> During the building phase, we focused on developing a system that could translate the collected data into actionable insights. A significant part of this was the integration of Artificial Intelligence and Machine Learning (which I won’t get into too much here because there’s a whole card dedicated to this).</p>
        <p style={{ marginBottom: '1.5em' }}>In addition to the ML models we trained, we utilized the new layer in our technology stack, Microsoft Fabric, to efficiently build out a semantic layer for the product where we were able to perform numerous calculations on the data. These calculations included missed clean instances, repeat missed cleans (which were flagged immediately to users), and perform several expected versus realized variance calculations.</p>
        <p style={{ marginBottom: '1.5em' }}><b>Deployment, Testing & Iteration:</b> The deployed product, "Intelligent Cleaning," transformed our static cleaning service. The system uses data to create and inform cleaning schedules, routes, and daily operations to move towards a demand-based service delivery model (leading to cleaner spaces and happier tenants).</p>
        <p style={{ marginBottom: '1.5em' }}>We conducted User Acceptance Testing (UAT) with our users, gathering qualitative feedback to identify trends and patterns for continuous improvement. This iterative process of testing and gathering feedback has been crucial for the product's success.</p>
        <p style={{ marginBottom: '1.5em' }}>The impact was twofold. Firstly, we received powerful testimonials from cleaners who felt empowered by their ability to influence schedules and focus on areas that genuinely needed attention. Secondly, the product delivered significant business value, reducing our cost to serve by approximately 10%, a substantial saving in the low-margin facilities management industry. We continue to monitor the product, test new features, and iterate based on user feedback and performance data.</p>
        <p>One additional side benefit that we weren’t targeting (but ended up being quite a nice surprise) was the reduction in customer complaints to our operations teams. The reduction in complaints meant we had better relationships with our customers, the operations teams could focus on, and in a couple of the bid re-tender processes (ie. Contract renewals), it was noted by the customer how the customer experience had improved.</p>
      </ContentText>
    ),
  },
  {
    id: 3,
    title: 'Product Growth Strategy',
    images: [
      '/images/be_growth_strategy.png',
      '/images/BE_growth_strategy_market_segmentation.png',
      '/images/BE_growth_strategy_current_customer_segmentation_BLURRED.png',
      '/images/BE_growth_strategy_current_sales_funnel_BLURRED.png',
      '/images/BE_growth_strategy_current_product_segmentation_BLURRED.png',
      '/images/BE_growth_strategy_adjacent_BLURRED.png'
    ],
    stats: {
      markets: '9',
      stakeholders: '30',
      growth: '2.8x'
    },
    avatar: '/images/professional_headshot.jpeg',
    name: 'Michael Hoefert',
    location: 'Vancouver, Canada',
    description: 'Developed and executed a growth strategy that identified incremental revenue streams among existing core customer segments and revenue opportunities via product Feature expansion. The strategy resulted in $68M to $73M in potential incremental revenue streams.',
    additionalDetails: (
      <ContentText>
        <p style={{ marginBottom: '1.5em' }}><b>Project Overview:</b> Building a Path to $XM ARR: The goal of this strategic project was to create a comprehensive growth plan for an in-house software product. The objective was to identify pathways to achieve a $X million Annual Recurring Revenue target by analyzing the current market, sizing opportunities, understanding customer segments, and exploring new growth areas. I was a supporting player in all components and fully led the current state competitive landscape and adjacent markets sections of the project (hence the much more detailed section).</p>
        <p style={{ marginBottom: '1.5em' }}><b>Current State Analysis:</b> This initial phase involved a thorough assessment of the market landscape and our products position within it.</p>
        <p style={{ marginBottom: '1.5em' }}>Market & Competitive Landscape: The analysis revealed that the building operations software market is largely composed of a few incumbents that grow primarily through mergers and acquisitions (M&A) to gain customers and expand their offerings. Key competitors identified include large end-to-end property management platforms like MRI and Yardi, as well as other major BOM players like Spacewell.</p>
        <p style={{ marginBottom: '1.5em' }}>Internal Performance & Challenges: An internal review of the products portfolio showed a strategic shift towards the Y platform, with new sales growth expected from non-core products like W (energy optimization) and V (tenant experience). The analysis also identified significant customer pain points, including high costs and difficulties associated with switching from competitor products, complex implementation processes, and the need for more responsive customer support.</p>
        <p style={{ marginBottom: '1.5em' }}><b>Market Sizing and Value Pools:</b> A detailed market sizing exercise was conducted to quantify the addressable opportunity for the product in the United States.</p>
        <p style={{ marginBottom: '1.5em' }}>Serviceable Addressable Market (SAM): The total U.S. commercial real estate (CRE) footprint was analyzed to determine the SAM. After excluding segments with poor product-market fit (like multi-family housing and specialized healthcare), the estimated SAM for the core business was ~$250 million across its three primary segments: Office, Retail, and Industrial.</p>
        <p style={{ marginBottom: '1.5em' }}>Penetration & Growth Opportunity: The analysis showed that the product had the highest penetration in the Office segment (17%), its traditional stronghold. The Retail (7%) and Industrial (4%) segments, however, represented significant untapped potential. The strategy highlighted that these segments were poised for greater adoption as they increasingly recognize the value of specialized BOM solutions.</p>
        <p style={{ marginBottom: '1.5em' }}><b>Customer Segmentation and Buying Behaviors:</b> To refine the go-to-market strategy, a deep dive into the products customer base was performed to understand their unique needs and purchasing habits.</p>
        <p style={{ marginBottom: '1.5em' }}>Office Segment: This market is dominated by third-party property management firms that typically make technology decisions on a building-by-building basis. This creates challenges in securing large, portfolio-wide deals and introduces friction when displacing incumbent software.</p>
        <p style={{ marginBottom: '1.5em' }}>Retail and Industrial Segments: These segments feature a higher concentration of owner-operators who self-manage their properties. This customer type is more inclined to make centralized, portfolio-level technology decisions, presenting a more direct path for our product to secure larger, multi-module contracts. Their buying decisions are often driven by a preference for multifaceted platforms that integrate with other systems and enhance the tenant experience.</p>
        <p style={{ marginBottom: '1.5em' }}><b>Adjacent Markets - Crafting a Diversified Growth Strategy:</b> A significant portion of the project was dedicated to identifying and evaluating adjacent markets to fuel the products long-term growth. This work involved assessing ten potential markets and prioritizing six with the strongest product-market fit and revenue potential. The goal was to find opportunities that could contribute ~$50–$55 million in incremental ARR. All analysis was completed by conducting thorough research into the relevant personas (ie. Users, buying decision makers, influencers), competitive landscape analysis to identify competitiveness, the technical requirements needed to deliver and subsequently the investment and time needed to deliver those requirements, product-market fit assessments, potential constraints, the ability to incorporate the market into our product, and market sizing. Here is a detailed look at the analysis and recommendations for each prioritized adjacent market:</p>
        <p style={{ marginBottom: '1.5em' }}>Fault Detection and Diagnostics (FDD): <i>Opportunity:</i> Create a premium, advanced maintenance module that uses AI to predict equipment failures. This was identified as a key differentiator, as competitors did not offer a comparable solution. <i>Strategic Approach:</i> Build the FDD module in-house over an estimated 22 months. The solution would improve asset lifespan and reduce repair costs for customers. <i>Potential ARR:</i> ~$14 million.</p>
        <p style={{ marginBottom: '1.5em' }}>Energy and Sustainability: <i>Opportunity:</i> Address the growing demand for sustainability solutions, driven by regulatory pressures and investor expectations. Customers need tools for capital planning, portfolio reporting, and managing decarbonization initiatives. <i>Strategic Approach:</i> A phased build and integrate strategy. The plan involved leveraging existing JLL tools in the short term, followed by a ~$5 million investment to develop new capital planning and reporting modules within the product and integrate them with other JLL sustainability platforms like Carbon Pathfinder (CPF) and Canopy. <i>Potential ARR:</i> ~$13 million.</p>
        <p style={{ marginBottom: '1.5em' }}>Vendor Workflow & Network Monetization: <i>Opportunity:</i> Monetize the products extensive network of over 10,000 vendors by charging a subscription or transaction fee for access to requests for proposals (RFPs). This model was already proven successful by competitors. <i>Strategic Approach:</i> A build and consolidate approach. The short-term plan was to monetize the existing vendor network. The longer-term vision was to consolidate the products network with sister JLL product (~17,000 vendors) to create a comprehensive JLL Services Marketplace. <i>Potential ARR:</i> ~$10 million (mid-range estimate).</p>
        <p style={{ marginBottom: '1.5em' }}>Advanced Inventory Management: <i>Opportunity:</i> While basic inventory tracking is becoming a standard feature, the product could offer advanced capabilities—like automated low-stock alerts and purchase order workflows—as a premium add-on module. <i>Strategic Approach:</i> Build the advanced features as a natural upsell to the core BOM solution, moving beyond table-stakes capabilities. <i>Potential ARR:</i> ~$8 million.</p>
        <p style={{ marginBottom: '1.5em' }}>Flexible Office Management: <i>Opportunity:</i> Capitalize on the growing trend of property owners dedicating 10% or more of their office portfolios to flexible workspace to attract tenants. <i>Strategic Approach:</i> Acquire an existing flexible office software provider to quickly gain scale and technological expertise. The acquired technology would then be integrated into the the products platform. <i>Potential ARR:</i> ~$8 million.</p>
        <p style={{ marginBottom: '1.5em' }}>Access Control: <i>Opportunity:</i> Enhance visitor management capabilities, a feature increasingly demanded by clients for security and tenant experience. This was identified as crucial for customer retention, as competitors were offering more robust solutions. <i>Strategic Approach:</i> A partner and integrate model. For buildings with traditional systems, the recommendation was to use third-party integrators. For modern, cloud-based systems, the product would build direct integrations. <i>Potential ARR:</i> ~$0.3 million, viewed primarily as a defensive play to prevent customer churn.</p>
        <p style={{ marginBottom: '1.5em' }}><b>Final Strategic Recommendations:</b> The project concluded with a clear, two-pronged strategy to guide the product to its $100M ARR target:</p>
        <p style={{ marginBottom: '1.5em' }}>1. <i>Maximize Core Penetration:</i> Drive an additional $18 million in ARR by increasing market share in the core Office, Retail, and Industrial segments, with a focus on securing portfolio-level deals with owner-operators.</p>
        <p style={{ marginBottom: '1.5em' }}>2. <i>Expand into Adjacencies:</i> Capture ~$50-55 million in new ARR by executing the build, partner, and acquire strategies outlined for the six high-priority adjacent markets</p>
      </ContentText>
    ),
  },
  {
    id: 4,
    title: 'The Lap of Mallorca',
    images: [
      '/images/the_lap_of_mallorca.jpg',
      '/images/mallorca_strava_route.jpg',
      '/images/mallorca_strava_route_elevation.png'
    ],
    stats: {
      distance: '325km',
      elevation: '4572m',
      time: '12.4h'
    },
    avatar: '/images/biking_headshot.JPG',
    name: 'Michael Hoefert',
    location: 'Mallorca, Spain',
    description: 'On the final day of a week-long cycling trip in Mallorca, I tackled the iconic Mallorca 312, extending it by incorporating the legendary Sa Calobra climb, starting at 5:30am under starry skies and battling intense heat, dehydration, and physical pain through major ascents like Coll de Femenia, Puig Major, and  Sa Calobra.',
    additionalDetails: (
      <ContentText>
        <p style={{ marginBottom: '1.5em' }}>The Mallorca 312, an iconic road ride around the island of Mallorca. A milestone and goal road cyclists use to test themselves and see where their limits lie. On our last day in Mallorca after 6 days of back to back riding, me and two friends decided to tackle the challenge, but with one twist. On top of the 312km we were going to add on one of the most famous climbs of the island, Sa Callobra. This brought the total ride statistics to 325km and 4572m of elevation.</p>
        <p style={{ marginBottom: '1.5em' }}>The day started early with a 5:30am rollout time. The goal was to make sure we could end in the day time. The first 30 minutes of the ride were in the twilight hours of the morning. If I could describe the feeling during these first 30 minutes, I would say; calm. We were the only ones up and out on the roads. The stars were crystal clear. The birds weren’t even chirping yet. All you could hear was the rhythmic sound of our bike chains and the sound of our tires on the pristine Mallorca tarmac. That sense of calm would only last so long.</p>
        <p style={{ marginBottom: '1.1em' }}>Soon the sun was up and out in full blast, but we kept pushing along. To be honest, everything was going really well and I was feeling really strong. We aimed to minimize our stopping so the first stop was at the 100km mark where we stopped at a gas station to grab a bocadillo. After this first stop is when things started to get harder. The sun was pelting down on us. I started to feel the signs of dehdryation and the dehydration was made evident when I stood on the pedals to climb a hill and my lower back seized up. I was in excruciating pain. But I was at the pack of our 3 person pace line and I refused to be the reason we stopped or slowed down. Stubborn, I know. I closed my eyes, sat back down on the saddle and gritted my teeth through the pain until my lower back loosened a bit. For the next hour and a half I did all I could to not move around on the saddle in fear that I would cause another seizing up of my lower back.</p>
        <p style={{ marginBottom: '1.1em' }}>At the next pit stop, 200km into the ride, I buy all the electrolyte drinks and big bag of salty chips in an effort to replenish the salt I’d lost. But this is when I knew the ride would start to get challenging. We were staying in Soller, which meant that vast majority of the climbing would take place in the last 120km of the ride. </p>
        <p style={{ marginBottom: '1.5em' }}>After this quick pit stop we apprehisvely get back on the bikes to start the final push of the ride where we would tackle Coll de Femenia (the iconic lighthouse climb), Puig Major (the highest accessible climb on the island), and then wrapping it up with the infamous Sa Calobra climb. Three beasts and 120km still lay ahead of us. </p>
        <p style={{ marginBottom: '1.5em' }}>Coll de Femenia is upon us and one of the three of us is feeling strong and decides to push ahead a bit faster. We all finish it with relative ease and then regroup at the end of the climb.</p>
        <p style={{ marginBottom: '1.5em' }}>Next we start approaching Puig Major. The one of us that had gone ahead on Coll de Femenia was starting to crack. At the base of Puig Major he actually split and fell back from us, deciding to go his own pace. The two of us keep pushing on. After 2 hours steadily climbing we make it to the peak of Puig Major where we wait for our friend. After some time he rolls in, defeated. Because of the way the route was made and the nature of Sa Calobra (which is an out and back climb), we always had the option to skip the Sa Calobra climb and head home if we were running short on time. At this point in the day, if we decided to do Sa Calobra we would be pushing it if we wanted to finish in daylight - there could be no messing around and nothing could go wrong. Otherwise we would have to complete the 17km descent back into solar in the pitch black. Our friend decides to head directly home, whereas myself and my other friend decide to continue with the original plan.</p>
        <p style={{ marginBottom: '1.5em' }}>So next comes Sa Calobra, the most iconic and beautiful climb on the island. Typically jam packed with tourists in rental cars and massive busses. But considering it was nearing sunset, we were blessed with an empty road. We had all the room in the world to hit every single apex and truly enjoy the wonder that is Sa Calobra. We descend this stunning 11km descent, get to the bottom, grab a quick photo, and 2 minutes later begin the final climb back out. Again, the roads are absolutely empty and I cannot emphasize enough how rare this is. It was truly a magical experience the way the sun was shining and setting into the valley as we climbed back up. </p>
        <p style={{ marginBottom: '1.5em' }}>Long story short, we made it back home. On the final 17km descent back home we were blessed with even more golden light from the sunset, the ultimate finale to an epic adventure. During the day I went through ups and downs. There were moments where I wished the ride was over and others where all I wanted to do was keep riding. But I had this itch. This itch that I hadn’t pushed or tested myself as much as I had wanted. I still had more in me. I guess I needed to find my next challenge. Maybe I would chase a dragon? </p>
      </ContentText>
    ),
  },
  {
    id: 5,
    title: 'Cleaning Optimiser: application of ML',
    images: [
      '/images/Intelligent_Cleaning_ML1.png',
      '/images/Intelligent_Cleaning_ML2.png'
    ],
    stats: {
      efficiency: '40%',
      cost: '30%',
      accuracy: '95%'
    },
    avatar: '/images/professional_headshot.jpeg',
    name: 'Michael Hoefert',
    location: 'London, UK',
    description: 'Led the development of a machine learning-powered cleaning optimization system that improved operational efficiency by 40% and reduced costs by 30%. The solution achieved 95% accuracy in predicting optimal cleaning schedules and resource allocation.',
    additionalDetails: (
      <ContentText>
        <p style={{ marginBottom: '1.5em' }}>Description still in progress!.</p>
        <p style={{ marginBottom: '1.5em' }}>Apologies for the delay and inconvenience.</p>
        <p>Check back soon!</p>
      </ContentText>
    ),
  },
  {
    id: 6,
    title: 'Large Audience Demos & Presentations',
    images: [
      '/images/sales_event_presentation.JPG'
    ],
    stats: {
      participants: '150+',
      presentations: '20+',
      'nervous?': '100%'
    },
    avatar: '/images/professional_headshot.jpeg',
    name: 'Michael Hoefert',
    location: 'London, UK',
    description: 'Skilled and able to present and demo products to large internal audiences (150+ sales leaders in the picture) as well as to existing and potential customers. Experienced in both presentations that require in-depth detail as well as presentations with significant time limitations where translating the impact/outcomes is crucial.',
    additionalDetails: (
      <ContentText>
        <p style={{ marginBottom: '1.5em' }}>The image included above is from an internal sales event our Product team hosted. It was a half-day event where our team showcased the digital products we had built and how the sales teams could utilise them within their bids. I was responsible for presenting the product vision for my suite of products (Intelligent X), demoing each of the products, explaining how the bid teams should talk about and sell the prodcuts, and then finally creating and offering them all the necessary collateral.</p>
        <p style={{ marginBottom: '1.5em' }}>Beyond this sales event, I have been responsible for demoing my products to both existing Mitie customers to sell the value of adopting the products, as well as to prospective customers where we are trying to win a contract. Throughout these two types of customer sessions, I've learned the importance in how to sell the products and really focus on the outcomes and value the products will provide rather than simply explaining what they do.</p>
        <p style={{ marginBottom: '1.5em' }}>Public speaking has always been something I approach hesitantly. I always get incredibly nervous but I am extremely grateful that throughout my tenure at Mitie, I have been put into positions where I am forced to grow (ie. presenting). As a result, I have become far more confident and have learned the art of presenting (by no means have I mastered it though, I'm always striving to be better) and tailoring my presentations based on who I am talking to (ie. sales teams vs. senior stakeholders vs. customers) and always highlighting impact and the value the products can provide.</p>
        <p>I wonder if there will ever be a day where I don't get nervous before a presentation.</p>
      </ContentText>
    ),
  },
  {
    id: 7,
    title: 'My Portfolio - This Site',
    images: [
      '/images/design_ideation.jpg',
      '/images/inspiration_website_code.png',
      '/images/inspiration_radiating_colours.png',
      '/images/inspiration_navbar.jpg',
      '/images/inspiration_colours.png',
      '/images/inspiration_kpi_cards.png'
    ],
    stats: {
      hours: 'too many',
      complete: 'no',
      'satisfied': 'never'
    },
    avatar: '/images/professional_headshot.jpeg',
    name: 'Michael Hoefert',
    location: 'Windsurf IDE',
    description: 'I was struggling a bit with my day-to-day life. I was enjoying my work and my biking, but I felt like I was missing a creative outlet where I could actually create something myself. So here we are, the first iteration of my portfolio that I coded using the Windsurf IDE and my HTML/CSS knowledge I learnt via a Python bootcamp (I know, weird that I learnt HTML/CSS in a Python bootcamp)',
    additionalDetails: (
      <ContentText>
        <p style={{ marginBottom: '1.5em' }}>I’ve always wanted to get more into coding and actually creating something. I’d taken coding bootcamps in the past, but never felt I had the level of skills required to actually create anything. I doubted myself and that doubt resulted in me not doing anything. But then I started to see all these AI-powered IDEs being released which drastically reduced the barriers to entry and sparked a new wave of “vibe coding”. I thought to myself that I really didn’t have any excuses now. So here we are.</p>
        <p style={{ marginBottom: '1.5em' }}>But what do I build? Where do I start? I spent weeks brainstorming ideas, often falling into the complexity trap; trying to create these complicated applications. I knew I just needed to start something. One day I decided I would just build a personal portfolio where I could begin to showcase some of my work and tell the stories of some of my crazy adventures and challenges. </p>
        <p style={{ marginBottom: '1.5em' }}>I got right into it and was absolutely blown away by the power of Windsurf. The speed in which I could spin up an MVP was insane. Then couple that with the experience I do have with HTML/CSS, I was able to fine tune the code to get exactly what I wanted. It was a perfect combination; Windsurf did the heavy lifting and my somewhat limited knowledge allowed me to get the site exactly how I wanted.</p>
        <p style={{ marginBottom: '1.5em' }}>The layout and design of this site you see today are completely different from where I started (and will likely look different again in a couple months). I went through several iterations and inspiration sources before I landed on something I was satisfied with. I was searching through blogs that showcased different people's personal portfolios for inspiration, I was looking at websites for companies that I felt were really eye-catching, and I was looking at applications I use on a daily basis to understand what hooks they used to engage people. I ended up taking inspiration from tons of sources and combined them into my own site.</p>
        <p style={{ marginBottom: '1.5em' }}><b>The nav-bar:</b> I was looking at Plaid’s website, the fintech company, and really loved their nav-bar. The simplicity of the “pill” design and then the glass effect that allowed the background content to show through was so satisfying for me. But I didn’t want my site to have a ton of pages on it, so rather than having the nav-bar navigate to all the different pages and examples of work, I used it as a filter mechanism. </p>
        <p style={{ marginBottom: '1.5em' }}><b>The radiating color and big font:</b> I looked at a TON of personal sites and something about  the simplicity of the radiating color and big name text caught my eye. I loved the simplicity of it. But I wanted something a bit more. I took out my iPad and was sketching around a couple different ideas, eventually landing on these dynamic radiating lines from the center of the page. I drew out the concept on my iPad, sent it to my Mac and attached the inspiration in the Windsurf IDE. It took a fair amount of back and forth as well as prompt engineering to nail the lines and the dynamic nature to a point where I was satisfied. I was blown away with how I could ideate on my iPad with drawings and then attach that as an image where Windsurf could then build out the functionality. </p>
        <p style={{ marginBottom: '1.5em' }}><b>The color scheme:</b> when I was in one of my coding bootcamps, the web design portion of the bootcamp had a module on colors. During this module I was shown the website “Color Hunt” where it gives you sets of 4 colors that complement one another. I knew I wanted to have examples of both my Product work and my biking adventures. I wanted these to be differentiated based on their colors, but I wanted the colors to be somewhat similar. So I spent some time exploring Color Hunt until I found the perfect match for me. I used these colors all throughout the site from the radiating color on the landing page, the dynamic lines, and various border effects.</p>
        <p style={{ marginBottom: '1.5em' }}><b>The KPI cards:</b> From looking at other personal portfolios that I quite liked, I knew I didn’t want to have separate pages on the site for each example of work, but I wasn’t sure how I wanted to organize the information. I decided to get inspiration from an app I spend far too much time on, Strava. I loved the idea of having a simple title, high-level description, and then key stats as the first layer. Then users could click each KPI card and it would expand with all of the additional details. </p>
        <p>All in all I’m quite happy with how this site has come together, and I’m excited to see where I take it. But if I’m being honest, the best part of all of this is that it got me creating again. It built that momentum where it is now harder to skip a day not working on this or playing around with Windsurf. I really do believe these new AI-powered IDE tools that enable “vibe coding” has opened the door to creating for so many more people. </p>
      </ContentText>
    ),
  }
];

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;
  
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const goToImage = (e, index) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  if (totalImages === 0) return null;

  return (
    <CarouselContainer>
      {images.map((image, index) => (
        <CarouselImage 
          key={index} 
          $isActive={index === currentIndex}
        >
          <Image 
            src={image} 
            alt={`Slide ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
        </CarouselImage>
      ))}
      
      {totalImages > 1 && (
        <>
          <CarouselButton $direction="left" onClick={prevImage}>
            <FiChevronLeft size={20} />
          </CarouselButton>
          <CarouselButton $direction="right" onClick={nextImage}>
            <FiChevronRight size={20} />
          </CarouselButton>
          <DotsContainer>
            {images.map((_, index) => (
              <Dot 
                key={index} 
                $isActive={index === currentIndex}
                onClick={(e) => goToImage(e, index)}
              />
            ))}
          </DotsContainer>
        </>
      )}
    </CarouselContainer>
  );
};

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate opacity based on scroll position
  const scrollOpacity = Math.max(0, 1 - scrollY / 300); // Fades out over 300px of scrolling
  // Create curvy paths that radiate from top center
  const createCurvyPaths = () => {
    const colors = [
      'rgba(255, 138, 101, 0.6)',
      'rgba(186, 72, 127, 0.6)',
      'rgba(255, 202, 40, 0.6)',
      'rgba(255, 183, 77, 0.6)',
      'rgba(255, 204, 128, 0.6)'
    ];
    
    const paths = [];
    const pathCount = 40; // Slightly more lines for better coverage
    const centerX = 50;
    
    for (let i = 0; i < pathCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = 0.2 + Math.random() * 0.3; // Slightly more visible
      const width = 0.8 + Math.random() * 1.2;
      
      // Even distribution across the entire width
      const endX = Math.random() * 100; // 0-100% of viewport width
      
      // Control points for natural curves with more variation
      const curveIntensity = 15 + Math.random() * 40;
      const direction = Math.random() > 0.5 ? 1 : -1;
      
      // Vary the end height for staggered fade-out
      const endY = 60 + Math.random() * 40; // End between 60-100%
      
      // First control point - creates the initial curve
      const curveMultiplier = 0.3 + Math.random() * 0.7;
      const cp1x = centerX + (curveIntensity * direction * curveMultiplier);
      const cp1y = 10 + Math.random() * 20; // Start curving earlier
      
      // Second control point - brings it back toward the end point
      const cp2x = endX + (Math.random() * 40 - 20); // More horizontal variation
      const cp2y = endY * 0.6 + Math.random() * 20; // Keep within fade range
      
      paths.push({
        id: i,
        d: `M ${centerX} 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
        color,
        opacity: opacity * (0.8 + Math.random() * 0.4), // Vary opacity
        width,
        length: 30 + Math.random() * 40
      });
    }
    
    return paths;
  };

  return (
    <>
      <HeroSection>
        <RadiatingLines ref={linesRef} scrollOpacity={scrollOpacity}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {createCurvyPaths().map((path) => (
              <path
                key={path.id}
                className="line"
                d={path.d}
                stroke={path.color}
                strokeWidth={path.width}
                opacity={path.opacity}
                style={{
                  filter: 'saturate(1.5) contrast(1.2)',
                  mixBlendMode: 'multiply',
                  transition: 'all 0.5s ease'
                }}
              />
            ))}
          </svg>
        </RadiatingLines>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              position: 'relative',
              zIndex: 2
            }}
          >
            <PreTitle>Hello! I like to build products centered on customer experiences and go on biking adventures. Scroll through to learn more about me!</PreTitle>
          </motion.div>
          <Title>Michael Hoefert</Title>
        </HeroContent>
      </HeroSection>

      <Section>
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px" }}
          >
            <CardsGrid>
              {mainCards.map(({ number, title, description, href, gradientType }, index) => (
                <div key={number} style={{ width: '100%' }}>
                  <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%', cursor: 'pointer' }}>
                    <AnimatedBorder
                      gradientType={gradientType}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      whileHover={{
                        scale: 1.02,
                        width: 'calc(100% + 40px)',
                        marginLeft: '-20px',
                        marginRight: '-20px',
                        transition: { 
                          type: 'spring', 
                          stiffness: 300, 
                          damping: 20,
                          duration: 0.3 
                        }
                      }}
                      whileTap={{ scale: 0.99 }}
                      viewport={{ once: true, margin: '-15% 0px', amount: 0.2 }}
                      variants={cardAnimation}
                      onClick={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.position = 'fixed';
                        e.currentTarget.style.top = '0';
                        e.currentTarget.style.left = '0';
                        e.currentTarget.style.width = '100vw';
                        e.currentTarget.style.height = '100vh';
                        e.currentTarget.style.zIndex = '1000';
                        e.currentTarget.style.borderRadius = '0';
                        e.currentTarget.style.padding = '0';
                        
                        // After animation completes, navigate
                        setTimeout(() => {
                          window.location.href = href;
                        }, 500);
                      }}
                    >
                      <MainCard gradientType={gradientType}>
                        <ProcessNumber>
                          <img 
                            src={gradientType === 'adventures' 
                              ? '/images/biking_headshot.JPG' 
                              : '/images/professional_headshot.jpeg'
                            } 
                            alt={gradientType === 'adventures' ? 'Biking Adventure' : 'Professional Profile'} 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiMyM2QwOWMiLz48L3N2Zz4=';
                            }}
                          />
                        </ProcessNumber>
                        <ContentWrapper>
                          <ProcessTitle>{title}</ProcessTitle>
                          <ProcessDescription>{description}</ProcessDescription>
                        </ContentWrapper>
                      </MainCard>
                    </AnimatedBorder>
                  </Link>
                </div>
              ))}
            </CardsGrid>
          </motion.div>
        </Container>
      </Section>
      
      <Section>
        <Container style={{ paddingTop: '4rem', paddingBottom: '6rem', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <SectionTitle>MY PORTFOLIO</SectionTitle>
          {activeFilter && (
            <button 
              onClick={() => setActiveFilter(null)}
              style={{
                background: 'transparent',
                border: '1px solid #ddd',
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Clear Filter
              <span>✕</span>
            </button>
          )}
        </div>
        <WorkGrid>
          {workItems
            .filter(item => !activeFilter || item.avatar === activeFilter)
            .map((item) => (
            <WorkCard 
              key={item.id}
              onClick={() => setExpandedCard(item)}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <WorkCardHeader>
                <Avatar>
                  <Image 
                    src={item.avatar} 
                    alt={item.name} 
                    width={48} 
                    height={48} 
                  />
                </Avatar>
                <UserInfo>
                  <h4>{item.name}</h4>
                  <p>{item.location}</p>
                </UserInfo>
              </WorkCardHeader>
              <h3 style={{ margin: '0rem 1.5rem 1.5rem', textAlign: 'left', fontSize: '1.25rem', fontWeight: '900' }}>{item.title}</h3>
              <WorkCardImage>
                <ImageCarousel images={Array.isArray(item.images) ? item.images : [item.image]} />
              </WorkCardImage>
              <WorkCardContent>
                <WorkStats>
                  {Object.entries(item.stats).map(([key, value]) => (
                    <div key={key}>
                      <h4>{value}</h4>
                      <p>{key}</p>
                    </div>
                  ))}
                </WorkStats>
                <Divider />
                <Description>
                  {item.description || 'TestProject description goes here. Add a brief overview of the project and its key highlights.'}
                </Description>
              </WorkCardContent>
            </WorkCard>
          ))}
        </WorkGrid>
      </Container>
      </Section>
      
      <Section>
        <Navbar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <Footer />
      </Section>
      
      <AnimatePresence>
        {expandedCard && (
          <ExpandedCard 
            item={expandedCard} 
            onClose={() => setExpandedCard(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;

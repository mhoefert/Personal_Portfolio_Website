import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  padding-top: 6rem; /* Add more padding at the top to account for navbar */
  overflow-y: auto;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  
  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 5rem;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  width: 90%;
  max-width: 1000px;
  max-height: calc(90vh - 6rem); /* Adjust height to account for padding */
  min-height: 50vh;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  margin: 0 auto 2rem; /* Add margin at the bottom */
  -webkit-overflow-scrolling: touch;
  font-family: 'Raleway', sans-serif;
  
  @media (max-width: 768px) {
    width: 95%;
    max-height: calc(90vh - 5rem);
    min-height: 50vh;
    border-radius: 12px;
    margin: 0 auto 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #f5f5f5;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  overflow-y: auto;
  flex: 1;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  img {
    transition: transform 0.3s ease;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  
  &:hover img:not(.nav-button) {
    transform: scale(1.02);
  }
  
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    
    &:hover {
      background: white;
      transform: translateY(-50%) scale(1.1);
    }
    
    &:active {
      transform: translateY(-50%) scale(0.95);
    }
    
    &:focus {
      outline: none;
    }
    
    svg {
      width: 24px;
      height: 24px;
      color: #333;
    }
  }
  
  .carousel-arrow.prev {
    left: 15px;
  }
  
  .carousel-arrow.next {
    right: 15px;
  }
  
  .carousel-dots {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 8px;
    z-index: 10;
    
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.active {
        background: white;
        transform: scale(1.2);
      }
    }
  }
  
  @media (max-width: 768px) {
    min-height: 250px;
  }
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  margin: 0 0 1rem 0;
  color: #1a1a1a;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  font-family: 'Raleway', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  color: #333;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
  font-size: 1.05rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0 0 0;
  width: 100%;
  gap: 1rem;
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const StatItem = styled.div`
  flex: 1;
  min-width: 0;
  padding: 1rem 0.25rem;
  background: #f9f9f9;
  border-radius: 8px;
  transition: all 0.2s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80px;
  
  h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 0 0.25rem;
  }
  
  p {
    margin: 0.25rem 0 0 0;
    font-size: 0.9rem;
    font-weight: 400;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  &:hover {
    background: #f0f0f0;
  }
`;

const StatValue = styled.h3`
  margin: 0 0 0.25rem 0;
  color: #1a1a1a;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.2;
`;

const StatLabel = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.875rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  line-height: 1.4;
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  width: 100%;
  margin: 0.25rem 0 0.25rem 0;
  grid-column: 1 / -1;
`;

const AdditionalDetails = styled.div`
  width: 100%;
  
  h3 {
    font-size: 1.25rem;
    margin: 0 0 0.75rem 0;
    color: #1a1a1a;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }
  
  p {
    color: #333;
    line-height: 1.7;
    margin: 0;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 1.05rem;
  }
`;

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  cursor: pointer;
  
  .modal-content {
    position: relative;
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    color: white;
    font-size: 1.5rem;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    }
  }
  
  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    pointer-events: none;
  }
  
  .modal-nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    color: #333;
    font-size: 1.5rem;
    
    &:hover {
      background: white;
      transform: translateY(-50%) scale(1.1);
    }
    
    &:active {
      transform: translateY(-50%) scale(0.95);
    }
    
    &:focus {
      outline: none;
    }
    
    &.prev {
      left: 20px;
    }
    
    &.next {
      right: 20px;
    }
  }
  
  .modal-dots {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    z-index: 10;
    
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.active {
        background: white;
        transform: scale(1.2);
      }
    }
  }
`;

export default function ExpandedCard({ item, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  
  if (!item) return null;
  
  const handleImageClick = (e) => {
    e.stopPropagation();
    // Ensure we're using the current image index when expanding
    setExpandedImage(images[currentImageIndex]);
  };
  
  const closeExpandedImage = useCallback((e) => {
    if (e) {
      e.stopPropagation();
    }
    setExpandedImage(null);
  }, []);
  
  const images = Array.isArray(item.images) ? item.images : [item.image];
  const hasMultipleImages = images.length > 1;
  
  const nextImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => {
      const newIndex = (prevIndex + 1) % images.length;
      if (expandedImage) {
        setExpandedImage(images[newIndex]);
      }
      return newIndex;
    });
  }, [images, expandedImage]);
  
  const prevImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      if (expandedImage) {
        setExpandedImage(images[newIndex]);
      }
      return newIndex;
    });
  }, [images, expandedImage]);
  
  const goToImage = useCallback((index) => {
    setCurrentImageIndex(index);
    if (expandedImage) {
      setExpandedImage(images[index]);
    }
  }, [images, expandedImage]);
  

  
  // Auto-advance carousel every 5 seconds if there are multiple images and image is expanded
  useEffect(() => {
    if (!hasMultipleImages || !expandedImage) return;
    
    const timer = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [hasMultipleImages, images.length, expandedImage]); // Add expandedImage to dependencies

  return (
    <AnimatePresence>
      {expandedImage && (
        <ImageModal onClick={closeExpandedImage}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-button" 
              onClick={closeExpandedImage}
              aria-label="Close expanded view"
            >
              <FiX />
            </button>
            <img 
              src={expandedImage} 
              alt="Expanded view"
            />
            
            {hasMultipleImages && (
              <>
                <button 
                  className="modal-nav-button prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label="Previous image"
                >
                  <FiChevronLeft />
                </button>
                
                <button 
                  className="modal-nav-button next"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="Next image"
                >
                  <FiChevronRight />
                </button>
                
                <div className="modal-dots">
                  {images.map((_, index) => (
                    <div 
                      key={index}
                      className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                        setExpandedImage(images[index]);
                      }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </ImageModal>
      )}
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <Card
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <CloseButton onClick={onClose} aria-label="Close">
            <FiX size={24} />
          </CloseButton>
          
          <CardContent>
            <Details>
              <ImageContainer onClick={handleImageClick} style={{ cursor: 'zoom-in' }}>
                <Image
                  src={images[currentImageIndex]}
                  alt={`${item.title} - Image ${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
                
                {hasMultipleImages && (
                  <>
                    <button 
                      className="carousel-arrow prev" 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      aria-label="Previous image"
                    >
                      <FiChevronLeft />
                    </button>
                    
                    <button 
                      className="carousel-arrow next" 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      aria-label="Next image"
                    >
                      <FiChevronRight />
                    </button>
                    
                    <div className="carousel-dots">
                      {images.map((_, index) => (
                        <div 
                          key={index}
                          className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToImage(index);
                          }}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </ImageContainer>
              
              <div>
                <h2>{item.title}</h2>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1.5rem',
                  fontFamily: "'Raleway', sans-serif" 
                }}>
                  <Avatar>
                    <Image 
                      src={item.avatar} 
                      alt={item.name} 
                      width={120} 
                      height={120} 
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover' 
                      }}
                    />
                  </Avatar>
                  <div style={{ marginLeft: '0.75rem' }}>
                    <div style={{ 
                      fontWeight: 700, 
                      fontSize: '1rem',
                      color: '#1a1a1a',
                      lineHeight: '1.4'
                    }}>
                      {item.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: '#666',
                      fontWeight: 500,
                      lineHeight: '1.4'
                    }}>
                      {item.location}
                    </div>
                  </div>
                </div>
                <p>{item.description}</p>
                {item.stats && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
                    {Array.isArray(item.stats) ? (
                      item.stats.map((stat, index) => (
                        <StatItem key={index}>
                          <StatValue>{stat.value}</StatValue>
                          <StatLabel>{stat.label}</StatLabel>
                        </StatItem>
                      ))
                    ) : (
                      Object.entries(item.stats).map(([label, value], index) => (
                        <StatItem key={index}>
                          <StatValue>{value}</StatValue>
                          <StatLabel>{label}</StatLabel>
                        </StatItem>
                      ))
                    )}
                  </div>
                )}
              </div>
            </Details>
            
            <Divider />
            
            <AdditionalDetails>
              <h3>Project Details</h3>
              <p>{item.additionalDetails || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
            </AdditionalDetails>
          </CardContent>
        </Card>
      </Overlay>
    </AnimatePresence>
  );
}

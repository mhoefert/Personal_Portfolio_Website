import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiMail, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import Head from 'next/head';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const AboutHeader = styled.div`
  text-align: center;
  margin: ${({ theme }) => `${theme.space[24]} 0 ${theme.space[16]}`};
`;

const AboutTitle = styled.h1`
  font-family: 'Bebas Neue', sans-serif;
  font-size: ${({ theme }) => `calc(${theme.fontSizes['5xl']} * 1.2)`};
  margin-bottom: ${({ theme }) => theme.space[6]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1;
  text-transform: uppercase;
`;

const AboutSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[12]};
  margin-top: ${({ theme }) => theme.space[12]};
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
  }
`;

const AboutImage = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  aspect-ratio: 1;
  max-width: 500px;
  margin: 0 auto;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AboutText = styled.div`
  h2 {
    font-family: 'Raleway', sans-serif;
    font-size: ${({ theme }) => `calc(${theme.fontSizes['3xl']} * 1.2)`};
    margin-bottom: ${({ theme }) => theme.space[6]};
    color: ${({ theme }) => theme.colors.text};
    font-weight: 900;
    letter-spacing: 1px;
    line-height: 1;
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.space[6]};
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const SkillsSection = styled.section`
  margin-top: ${({ theme }) => theme.space[16]};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Bebas Neue', sans-serif;
  font-size: ${({ theme }) => `calc(${theme.fontSizes['4xl']} * 1.2)`};
  margin-bottom: ${({ theme }) => theme.space[12]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1;
  text-transform: uppercase;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 1fr; /* Makes all rows the same height */
  gap: ${({ theme }) => theme.space[6]};
  align-items: stretch; /* Stretch items to fill the grid cell */
`;

const SkillIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SkillHeading = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-family: 'Raleway', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  /* Default color if no color prop is provided */
  color: ${({ theme }) => theme.colors.primary};
  
  /* Apply different colors based on the index */
  ${({ index }) => {
    switch(index) {
      case 0: // Strategy
        return 'color: #FF9587;';
      case 1: // User Research
        return 'color: #BA487F;';
      case 2: // Delivery
        return 'color: #FF9B17;';
      case 3: // Analytics
        return 'color: #F16767;';
      default:
        return 'color: inherit;';
    }
  }}
`;

const SkillCard = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.body}; /* Using theme font */
  
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
    flex-grow: 1;
    
    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      line-height: 1.6; /* Slightly more breathing room */
      color: ${({ theme }) => theme.colors.text};
      font-size: ${({ theme }) => theme.fontSizes.sm}; /* Reduced font size for better fit */
      
      &::before {
        content: '•';
        position: absolute;
        left: 0.25rem;
        color: ${({ theme }) => theme.colors.text};
        font-weight: bold;
        margin-right: ${({ theme }) => theme.space[2]};
      }
    }
  }
`;

const CertificationsSection = styled.section`
  margin-top: ${({ theme }) => theme.space[16]};
  text-align: left;
`;

const CertificationsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[8]};
  margin-top: ${({ theme }) => theme.space[8]};
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
`;

const CertificationCard = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  gap: ${({ theme }) => theme.space[6]};
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .cert-image-container {
    flex: 0 0 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    padding: ${({ theme }) => theme.space[4]};
    border-radius: ${({ theme }) => theme.radii.md};
    
    @media (max-width: 768px) {
      width: 100%;
      flex: 0 0 auto;
      margin-bottom: ${({ theme }) => theme.space[4]};
    }
  }
  
  .cert-image {
    width: auto;
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radii.md};
  }
  
  .cert-content {
    flex: 1;
  }
  
  h3 {
    font-family: 'Raleway', sans-serif;
    font-size: 1.25rem;
    font-weight: 900;
    margin: 0 1.5rem 1.5rem 0;
    color: ${({ theme }) => theme.colors.text};
  }
  
  .issuer, .date {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-style: italic;
    margin: 0;
    line-height: 1.5;
  }
  
  .issuer {
    margin-bottom: ${({ theme }) => theme.space[2]};
  }
    
  p {
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
`;

const ContactSection = styled.section`
  margin-top: ${({ theme }) => theme.space[16]};
  text-align: center;
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.space[8]};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[8]};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    background: #FF9B17;
    color: white;
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const certifications = [
  {
    title: 'AI Fundamentals',
    issuer: <i>Issuer: DataCamp</i>,
    date: 'Issued: 2025',
    description: 'Gained a strong foundation in Artificial Intelligence, with the ability to identify practical applications for various AI sub-domains. Developed proficiency in Generative AI, including its core concepts, terminology, and the construction of effective prompts for AI tools. Acquired a keen understanding of the ethical considerations crucial for developing and implementing responsible AI solutions',
    image: '/images/AI_Fundamentals_Certificate.png',
    imageAlt: 'Scrum Alliance Logo'
  },
  {
    title: 'MLOps Fundamentals',
    issuer: <i>Issuer: DataCamp</i>,
    date: 'Issued: 2025',
    description: 'Achieved an MLOps certification focused on the entire machine learning lifecycle. The program covered how to transition models from development to production, apply an MLOps mindset to train and scale models, and manage deployment and lifecycle. Key skills include implementing MLOps architecture, automation patterns, and CI/CD/CM/CT techniques to ensure models deliver continuous business value',
    image: '/images/MLOps_Fundamentals_Certificate.png',
    imageAlt: 'Google Analytics Logo'
  }
];

const skills = [
  {
    title: 'Strategy',
    icon: '/images/strategy_icon.png',
    isImage: true,
    items: [
      'Market Research',
      'Competitive Analysis',
      'Market Sizing',
      'Product Vision',
      'Go-to-Market Strategy',
      'Product-Market Fit'
    ]
  },
  {
    title: 'User Research',
    icon: '/images/user_research_icon.png',
    isImage: true,
    items: [
      'User Interviews',
      'Stakeholder Mapping',
      'User Journey Mapping',
      'Usability Testing',
      'Persona Development'    
    ]
  },
  {
    title: 'Delivery',
    icon: '/images/delivery_icon.png',
    isImage: true,
    items: [
      'Aligning to Engineer Delivery Practices',
      'PRDs, PRFAQs, and other documentation',
      'Roadmap Planning',
      'Release Management',
      'Stakeholder Management'
    ]
  },
  {
    title: 'Analytics',
    icon: '/images/analytics_icon.png',
    isImage: true,
    items: [
      'A/B Testing',
      'Funnel Analysis',
      'KPI Definition (Leading & Lagging)',
      'Instrumentation',
      'Continuous Interation'
    ]
  }
];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function About() {
  return (
    <>
      <Head>
        <title>About Me | Product Management Portfolio</title>
        <meta name="description" content="Learn more about my background, skills, and experience in product management." />
      </Head>
      
      <AboutContainer>
        <AboutHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AboutTitle>About Me</AboutTitle>
            <AboutSubtitle>
              Passionate about building products that solve real problems and genuinely impact the customer.
            </AboutSubtitle>
          </motion.div>
        </AboutHeader>
        
        <AboutContent>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AboutImage>
              {/* Replace with your actual image */}
              <img 
                src="/images/professional_headshot.jpeg" 
                alt="Profile" 
              />
            </AboutImage>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AboutText>
              <h2>Hi, I'm Michael!</h2>
              <p>
                I'm a Product Manager with 5 years of experience in building digital products as well as conducting technology and product growth strategies. 
                My journey in product started with a background in PropTech corporate strategy. Here I learned deep research skills and the importance of truly
                understanding your users/personas to ensure the right product is built and also targets the right pain points.
              </p>
              <p>
                I believe in a user-centered approach to product development, combining data-driven decision making with 
                deep user research. My favorite technique to employ is Jeff Patton's User Story Mapping technique. 
                Jeff's technique allows me to truly understand the customer and subsequently ensure there is a shared understanding
                between the product team, the engineering teams, and all stakeholders on what we are building and why.
              </p>
              <p>
                When I'm not being a PM, you can find me on my bike! On the main page explore some of the challenges I've undertaken just this year!
              </p>
            </AboutText>
          </motion.div>
        </AboutContent>
        
        <SkillsSection>
          <SectionTitle>My Skills</SectionTitle>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SkillsGrid>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                >
                  <SkillCard>
                    <SkillHeading index={index}>
                      <SkillIcon>
                        {skill.isImage ? (
                          <img src={skill.icon} alt="" />
                        ) : (
                          <span>{skill.icon}</span>
                        )}
                      </SkillIcon>
                      {skill.title}
                    </SkillHeading>
                    <ul>
                      {skill.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </SkillCard>
                </motion.div>
              ))}
            </SkillsGrid>
          </motion.div>
        </SkillsSection>
        
        <CertificationsSection>
          <SectionTitle>My Certifications</SectionTitle>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <CertificationsGrid>
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                >
                  <CertificationCard>
                    <div className="cert-image-container">
                      <img 
                        src={cert.image} 
                        alt={cert.imageAlt || 'Certification'} 
                        className="cert-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="cert-content">
                      <h3>{cert.title}</h3>
                      <p>{cert.description}</p>
                      <div className="issuer">{cert.issuer}</div>
                      <div className="date">{cert.date}</div>
                    </div>
                  </CertificationCard>
                </motion.div>
              ))}
            </CertificationsGrid>
          </motion.div>
        </CertificationsSection>
        
        <ContactSection>
          <SectionTitle>Get In Touch</SectionTitle>
          <p>I'm always open to discussing product management, new opportunities, or anything bike related.</p>
          
          <SocialLinks>
            <SocialLink href="mailto:mhoefert1@gmail.com" aria-label="Email">
              <FiMail />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/michael-hoefert/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </SocialLink>
          </SocialLinks>
        </ContactSection>
      </AboutContainer>
    </>
  );
}

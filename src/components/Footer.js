import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #f5f5f5;
  padding: 2rem 0;
  text-align: center;
  border-top: 1px solid #eaeaea;
  margin-top: 2rem;
`;

const FooterText = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© {new Date().getFullYear()} Michael Hoefert. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;

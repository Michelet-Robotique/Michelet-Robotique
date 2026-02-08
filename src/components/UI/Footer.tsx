'use client';

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 3rem;
  z-index: 100;
  pointer-events: none;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const CreditText = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  
  span {
    color: rgba(0, 212, 255, 0.7);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    order: 2;
  }
`;

const ScrollHint = styled.div`
  position: absolute;
  left: 3rem;
  bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;

  @media (max-width: 768px) {
    position: relative;
    left: auto;
    bottom: auto;
    font-size: 0.6rem;
    order: 1;
  }
`;

const ScrollLine = styled.div`
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 212, 255, 0.6), transparent);
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 20px;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <ScrollHint>
        <ScrollLine />
        Scroll to explore
      </ScrollHint>
      <CreditText>
        Developed by <span>OMEGA DEVELOPMENTS</span>
      </CreditText>
    </FooterContainer>
  );
};

export default Footer;

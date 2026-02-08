'use client';

import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  z-index: 100;
  pointer-events: none;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ffffff;
  pointer-events: auto;
  
  span {
    color: #00d4ff;
  }
  
  &:hover {
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  }
  
  transition: text-shadow 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    letter-spacing: 0.1em;
  }
`;

const MenuButton = styled.button`
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    border-color: #00d4ff;
    
    &::before {
      left: 100%;
    }
  }
  
  transition: border-color 0.3s ease;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <span>M</span> MICHELET ROBOTIQUE
      </Logo>
    </HeaderContainer>
  );
};

export default Header;

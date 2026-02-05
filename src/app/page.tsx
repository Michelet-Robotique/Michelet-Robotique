'use client';

import React from 'react';
import styled from 'styled-components';
import { ScrollProvider } from '@/context/ScrollContext';
import GlobalStyles from '@/styles/GlobalStyles';
import dynamic from 'next/dynamic';

const World = dynamic(() => import('@/components/Scene/World'), {
  ssr: false,
  loading: () => <div style={{ background: '#000', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }} />
});

import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #000000;
`;

const UILayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  
  & > * {
    pointer-events: auto;
  }
`;

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <ScrollProvider>
        <AppContainer>
          {/* 3D WebGL Canvas */}
          <World />

          {/* Fixed UI Layer */}
          <UILayer>
            <Header />
            <Footer />
          </UILayer>
        </AppContainer>
      </ScrollProvider>
    </>
  );
}

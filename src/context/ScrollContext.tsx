'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextType {
    progress: number;
    lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextType>({
    progress: 0,
    lenis: null,
});

export const useScroll = () => useContext(ScrollContext);

interface ScrollProviderProps {
    children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
    const [progress, setProgress] = useState(0);
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Create virtual scroll container
        const scrollContainer = document.createElement('div');
        scrollContainer.id = 'scroll-container';
        scrollContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 500vh;
      pointer-events: none;
      z-index: -1;
    `;
        document.body.appendChild(scrollContainer);

        // Initialize Lenis smooth scroll
        const lenisInstance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        // GSAP ScrollTrigger timeline
        ScrollTrigger.create({
            trigger: scrollContainer,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onUpdate: (self) => {
                setProgress(self.progress);
            },
        });

        // Animation frame loop
        const raf = (time: number) => {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // Sync Lenis with ScrollTrigger
        lenisInstance.on('scroll', ScrollTrigger.update);

        return () => {
            lenisInstance.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            scrollContainer.remove();
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ progress, lenis }}>
            {children}
        </ScrollContext.Provider>
    );
};

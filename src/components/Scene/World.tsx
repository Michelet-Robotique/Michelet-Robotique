'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import CameraRig from './CameraRig';
import Starfield from './Starfield';
import Effects from './Effects';
import ProjectMonolith from '@/components/Projects/ProjectMonolith';
import { projects } from '@/data/projects';

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const LoadingFallback = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00d4ff;
  font-size: 1.2rem;
  font-family: 'Space Grotesk', monospace;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const World: React.FC = () => {
    return (
        <CanvasContainer>
            <Suspense fallback={<LoadingFallback>Initialisation de la scène...</LoadingFallback>}>
                <Canvas
                    gl={{
                        antialias: true,
                        alpha: false,
                        powerPreference: 'high-performance',
                        stencil: false,
                        depth: true,
                    }}
                    dpr={[1, 2]}
                    style={{ background: '#000000' }}
                >
                    {/* Camera on virtual rail */}
                    <CameraRig startZ={20} endZ={-40} />

                    {/* Ambient lighting - very dim */}
                    <ambientLight intensity={0.05} />

                    {/* Dramatic positioned lights */}
                    <pointLight
                        position={[-15, 10, 15]}
                        color="#00d4ff"
                        intensity={0.8}
                        distance={50}
                    />
                    <pointLight
                        position={[15, -10, 5]}
                        color="#ff6b00"
                        intensity={0.6}
                        distance={50}
                    />
                    <pointLight
                        position={[0, 15, -20]}
                        color="#9c27b0"
                        intensity={0.4}
                        distance={60}
                    />

                    {/* Starfield particle system */}
                    <Starfield count={2000} radius={35} depth={120} />

                    {/* Project monoliths */}
                    {projects.map((project, index) => (
                        <ProjectMonolith
                            key={project.id}
                            project={project}
                            index={index}
                            totalProjects={projects.length}
                        />
                    ))}

                    {/* Post-processing effects */}
                    {/* <Effects /> */}
                </Canvas>
            </Suspense>
        </CanvasContainer>
    );
};

export default World;

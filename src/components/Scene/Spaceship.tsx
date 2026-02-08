'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from '@/context/ScrollContext';

const Spaceship: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const { progress } = useScroll();
    const { size } = useThree();
    const isMobile = size.width < 768;

    // Scroll range based on World.tsx
    const startZ = 20;
    const endZ = -100;

    useFrame((state) => {
        if (!groupRef.current) return;

        // Sync Z with camera progress, maintaining a forward offset
        const targetZ = THREE.MathUtils.lerp(startZ, endZ, progress) - 10;

        groupRef.current.position.z = THREE.MathUtils.lerp(
            groupRef.current.position.z,
            targetZ,
            0.1
        );

        // Framing: Slightly more to the right and adjusted height
        // Center on mobile and put it HIGHER above the project cards
        groupRef.current.position.x = isMobile ? 0 : 4.6;
        groupRef.current.position.y = (isMobile ? 5.0 : 1.6) + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;

        // Orientation: Better forward-looking angle
        // On mobile, point it more straight forward since it's centered
        groupRef.current.rotation.y = isMobile ? Math.PI : Math.PI - 0.35;
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    });

    return (
        <group ref={groupRef} scale={isMobile ? 0.45 : 0.32}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Body */}
                <mesh castShadow>
                    <cylinderGeometry args={[0.2, 0.5, 4, 8]} />
                    <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Nose */}
                <mesh position={[0, 2.5, 0]} castShadow>
                    <coneGeometry args={[0.2, 1, 8]} />
                    <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Wings (X-Wing style) */}
                {[1, -1].map((side) => (
                    [1, -1].map((vertical) => (
                        <group key={`${side}-${vertical}`} rotation={[0, 0, (Math.PI / 6) * side * vertical]}>
                            <mesh position={[1.5 * side, 0, 0]} castShadow>
                                <boxGeometry args={[3, 0.1, 1]} />
                                <meshStandardMaterial color="#bbbbbb" metalness={0.5} roughness={0.5} />
                            </mesh>
                            {/* Engines */}
                            <mesh position={[0.5 * side, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
                                <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
                                <meshStandardMaterial color="#333333" />
                            </mesh>
                            {/* Laser cannons */}
                            <mesh position={[3 * side, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                                <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
                                <meshStandardMaterial color="#888888" />
                            </mesh>
                        </group>
                    ))
                ))}

                {/* Cockpit */}
                <mesh position={[0, 0.5, 0.3]} castShadow>
                    <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#00d4ff" transparent opacity={0.6} metalness={1} roughness={0} />
                </mesh>

                {/* Schedule Text - Fixed mirroring by rotating 180 degrees (Math.PI) */}
                {/* Repositioned text for mobile to be more central or better integrated */}
                <group position={[isMobile ? 0 : -5, isMobile ? -3.5 : 1.2, 0.5]} rotation={[0, Math.PI + (isMobile ? 0 : 0.35), 0]}>
                    <Text
                        fontSize={isMobile ? 0.7 : 0.6}
                        color="#00d4ff"
                        anchorX={isMobile ? "center" : "left"}
                        anchorY="middle"
                        maxWidth={isMobile ? 8 : 6}
                        textAlign={isMobile ? "center" : "right"}
                        outlineWidth={0.03}
                        outlineColor="#000000"
                    >
                        CLUB ROBOTIQUE
                        {"\n"}
                        Tous les vendredis
                        {"\n"}
                        16h - 18h
                    </Text>
                </group>

                {/* Engine Glow */}
                <pointLight position={[0, -2, 0]} color="#ff4400" intensity={2} distance={5} />
            </Float>
        </group>
    );
};

export default Spaceship;

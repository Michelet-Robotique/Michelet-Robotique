'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const Spaceship: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Dynamic movement: orbiting slightly and tilting
        const t = state.clock.elapsedTime * 0.5;
        groupRef.current.position.x = Math.sin(t) * 2 + 5;
        groupRef.current.position.y = Math.cos(t * 0.5) * 1 + 2;
        groupRef.current.rotation.z = Math.sin(t) * 0.2;
        groupRef.current.rotation.y = Math.PI + Math.cos(t) * 0.1;
    });

    return (
        <group ref={groupRef} position={[5, 2, 10]} scale={0.5}>
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

                {/* Schedule Text */}
                <group position={[0, 1.5, 1]}>
                    <Text
                        fontSize={0.3}
                        color="#00d4ff"
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={4}
                        textAlign="center"
                    >
                        CLUB ROBOTIQUE
                        {"\n"}
                        Tous les vendredis
                        {"\n"}
                        16h - 18h
                    </Text>
                    {/* Text Glow effect */}
                    <mesh position={[0, 0, -0.01]}>
                        <planeGeometry args={[4, 2]} />
                        <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} />
                    </mesh>
                </group>

                {/* Engine Glow */}
                <pointLight position={[0, -2, 0]} color="#ff4400" intensity={2} distance={5} />
            </Float>
        </group>
    );
};

export default Spaceship;

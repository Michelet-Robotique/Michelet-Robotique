'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from '@/context/ScrollContext';

const Spaceship: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const { progress } = useScroll();

    // Scroll range based on World.tsx
    const startZ = 20;
    const endZ = -100;

    useFrame((state) => {
        if (!groupRef.current) return;

        // Sync Z with camera progress, maintaining a forward offset
        const targetZ = THREE.MathUtils.lerp(startZ, endZ, progress) - 8;

        groupRef.current.position.z = THREE.MathUtils.lerp(
            groupRef.current.position.z,
            targetZ,
            0.1
        );

        // Fixed position in view with floating animation
        groupRef.current.position.x = 4.2;
        groupRef.current.position.y = 1.8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;

        // Orientation
        groupRef.current.rotation.y = Math.PI - 0.4;
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    });

    return (
        <group ref={groupRef} scale={0.4}>
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

                {/* Schedule Text - Re-positioned for permanent visibility */}
                <group position={[-2, 1, 0]} rotation={[0, 0.4, 0]}>
                    <Text
                        fontSize={0.25}
                        color="#00d4ff"
                        anchorX="right"
                        anchorY="middle"
                        maxWidth={3}
                        textAlign="right"
                        outlineWidth={0.02}
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

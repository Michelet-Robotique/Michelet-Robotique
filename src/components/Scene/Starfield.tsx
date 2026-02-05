'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
    count?: number;
    radius?: number;
    depth?: number;
}

const Starfield: React.FC<StarfieldProps> = ({
    count = 2000,
    radius = 30,
    depth = 100
}) => {
    const pointsRef = useRef<THREE.Points>(null);
    const velocitiesRef = useRef<Float32Array>();

    // Generate star positions and velocities
    const { positions, velocities, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Random spherical distribution with depth
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random());

            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = (Math.random() - 0.5) * depth;

            // Slow drift velocities
            velocities[i3] = (Math.random() - 0.5) * 0.002;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

            // Random sizes for depth perception
            sizes[i] = Math.random() * 2 + 0.5;
        }

        velocitiesRef.current = velocities;
        return { positions, velocities, sizes };
    }, [count, radius, depth]);

    // Create soft circular texture
    const starTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d')!;

        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(200, 220, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }, []);

    // Animate particle drift
    useFrame((_, delta) => {
        if (!pointsRef.current || !velocitiesRef.current) return;

        const geometry = pointsRef.current.geometry;
        const positionAttr = geometry.attributes.position;
        const positions = positionAttr.array as Float32Array;
        const vels = velocitiesRef.current;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            positions[i3] += vels[i3] * delta * 60;
            positions[i3 + 1] += vels[i3 + 1] * delta * 60;
            positions[i3 + 2] += vels[i3 + 2] * delta * 60;

            // Wrap particles that drift too far
            if (Math.abs(positions[i3]) > radius) {
                positions[i3] *= -0.9;
            }
            if (Math.abs(positions[i3 + 1]) > radius) {
                positions[i3 + 1] *= -0.9;
            }
        }

        positionAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                sizeAttenuation={true}
                map={starTexture}
                transparent={true}
                opacity={0.8}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors={false}
                color={new THREE.Color(0.9, 0.95, 1)}
            />
        </points>
    );
};

export default Starfield;

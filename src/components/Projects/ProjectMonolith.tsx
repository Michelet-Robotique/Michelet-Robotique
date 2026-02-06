'use client';

import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from '@/context/ScrollContext';
import { glitchVertexShader, glitchFragmentShader } from '@/shaders/glitchShader';
import type { Project } from '@/data/projects';

interface ProjectMonolithProps {
    project: Project;
    index: number;
    totalProjects: number;
}

const ProjectMonolith: React.FC<ProjectMonolithProps> = ({
    project,
    index,
    totalProjects
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [hovered, setHovered] = useState(false);
    const { progress } = useScroll();

    // Calculate position based on index
    const zPosition = useMemo(() => {
        // Each project is spaced along Z axis
        // Project 0 at z=0, Project 1 at z=-30
        return index * -30;
    }, [index]);

    // Create placeholder texture
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 384;
        const ctx = canvas.getContext('2d')!;

        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 512, 384);
        const colorSchemes = [
            { start: '#1a237e', end: '#4a148c' }, // 0: Blue/Indigo
            { start: '#b71c1c', end: '#e65100' }, // 1: Red/Orange
            { start: '#004d40', end: '#00acc1' }, // 2: Green/Teal
            { start: '#4a148c', end: '#c2185b' }  // 3: Purple/Pink
        ];
        const scheme = colorSchemes[index % colorSchemes.length];

        gradient.addColorStop(0, scheme.start);
        gradient.addColorStop(1, scheme.end);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 384);

        // Grid pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 512; i += 32) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 384);
            ctx.stroke();
        }
        for (let i = 0; i < 384; i += 32) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(512, i);
            ctx.stroke();
        }

        // Center icon
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(256, 192, 60, 0, Math.PI * 2);
        ctx.fill();

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }, [index]);

    // Shader material
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: texture },
                uTime: { value: 0 },
                uHover: { value: 0 },
                uIntensity: { value: 1.0 },
            },
            vertexShader: glitchVertexShader,
            fragmentShader: glitchFragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
        });
    }, [texture]);

    useFrame((state, delta) => {
        if (!groupRef.current || !materialRef.current) return;

        // Update shader time
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

        // Smooth hover transition
        const targetHover = hovered ? 1 : 0;
        materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
            materialRef.current.uniforms.uHover.value,
            targetHover,
            0.1
        );

        // Calculate visibility based on scroll progress
        // Project 0: visible from 0-60%, Project 1: visible from 40-100%
        const projectStart = index / totalProjects;
        const projectEnd = (index + 1) / totalProjects + 0.1;
        const visibility = progress >= projectStart && progress <= projectEnd ? 1 : 0;

        // Scale based on proximity
        const proximity = 1 - Math.abs(progress - (projectStart + projectEnd) / 2) * 2;
        const scale = THREE.MathUtils.clamp(proximity * 1.2, 0.3, 1);

        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(
            groupRef.current.scale.x,
            scale,
            0.05
        ));

        // Subtle floating animation
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.02;
    });

    return (
        <group
            ref={groupRef}
            position={[0, 0, zPosition]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Main project panel */}
            <mesh>
                <planeGeometry args={[8, 6]} />
                <primitive object={shaderMaterial} ref={materialRef} attach="material" />
            </mesh>

            {/* Border glow */}
            <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[8.2, 6.2]} />
                <meshBasicMaterial
                    color={hovered ? "#00ffff" : "#333333"}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Title */}
            <Text
                position={[0, -3.8, 0.1]}
                fontSize={0.6}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                {project.title}
            </Text>

            {/* Description */}
            <Text
                position={[0, -4.5, 0.1]}
                fontSize={0.25}
                color="#aaaaaa"
                anchorX="center"
                anchorY="middle"
            >
                {project.description}
            </Text>

            {/* Point lights for dramatic effect */}
            <pointLight
                position={[-5, 0, 2]}
                color="#00d4ff"
                intensity={hovered ? 2 : 0.5}
                distance={15}
            />
            <pointLight
                position={[5, 0, 2]}
                color="#ff6b00"
                intensity={hovered ? 2 : 0.5}
                distance={15}
            />
        </group>
    );
};

export default ProjectMonolith;

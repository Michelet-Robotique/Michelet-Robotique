'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from '@/context/ScrollContext';

interface CameraRigProps {
    startZ?: number;
    endZ?: number;
}

const CameraRig: React.FC<CameraRigProps> = ({
    startZ = 20,
    endZ = -40
}) => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const { progress } = useScroll();
    const currentZ = useRef(startZ);
    const { set } = useThree();

    useFrame(() => {
        if (!cameraRef.current) return;

        // Target Z position based on scroll progress
        const targetZ = THREE.MathUtils.lerp(startZ, endZ, progress);

        // Smooth lerp for cinematic movement
        currentZ.current = THREE.MathUtils.lerp(
            currentZ.current,
            targetZ,
            0.05
        );

        cameraRef.current.position.z = currentZ.current;

        // Subtle camera movement based on progress
        const wobbleX = Math.sin(progress * Math.PI * 2) * 0.3;
        const wobbleY = Math.cos(progress * Math.PI * 2) * 0.2;
        cameraRef.current.position.x = wobbleX;
        cameraRef.current.position.y = wobbleY;

        // Always look forward along Z axis
        cameraRef.current.lookAt(0, 0, currentZ.current - 10);
    });

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={75}
            near={0.1}
            far={200}
            position={[0, 0, startZ]}
        />
    );
};

export default CameraRig;

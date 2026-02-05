'use client';

import React from 'react';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const Effects: React.FC = () => {
    return (
        <EffectComposer multisampling={0}>
            <Bloom
                intensity={0.5}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.9}
                radius={0.8}
            />
            <Noise
                opacity={0.04}
                blendFunction={BlendFunction.OVERLAY}
            />
            <Vignette
                offset={0.3}
                darkness={0.6}
                eskil={false}
            />
        </EffectComposer>
    );
};

export default Effects;

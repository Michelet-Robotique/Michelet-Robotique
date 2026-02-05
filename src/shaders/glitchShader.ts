import * as THREE from 'three';

export const glitchVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const glitchFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform float uIntensity;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Pseudo-random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Scanline effect
  float scanline(vec2 uv) {
    return sin(uv.y * 400.0) * 0.04;
  }
  
  void main() {
    vec2 uv = vUv;
    float hover = uHover;
    float time = uTime;
    
    // Slice displacement (horizontal bands)
    float sliceY = floor(uv.y * 20.0);
    float sliceOffset = step(0.7, random(vec2(sliceY, time * 0.5))) * hover;
    uv.x += sliceOffset * (random(vec2(sliceY, time)) - 0.5) * 0.15;
    
    // Chromatic aberration
    float aberration = hover * uIntensity * 0.03;
    float redOffset = aberration * (random(vec2(time * 0.1, 0.0)) - 0.5);
    float blueOffset = aberration * (random(vec2(0.0, time * 0.1)) - 0.5);
    
    vec4 texR = texture2D(uTexture, uv + vec2(redOffset, 0.0));
    vec4 texG = texture2D(uTexture, uv);
    vec4 texB = texture2D(uTexture, uv + vec2(blueOffset, 0.0));
    
    vec4 color = vec4(texR.r, texG.g, texB.b, texG.a);
    
    // Scanline overlay (always subtle)
    float scan = scanline(vUv) * (1.0 - hover * 0.5);
    color.rgb += scan;
    
    // Brightness boost on hover
    color.rgb *= 1.0 + hover * 0.3;
    
    // Random glitch blocks on hover
    if (hover > 0.5) {
      float blockY = floor(uv.y * 10.0);
      float blockX = floor(uv.x * 10.0);
      float blockNoise = random(vec2(blockX, blockY + time));
      
      if (blockNoise > 0.95) {
        color.rgb = 1.0 - color.rgb; // Invert random blocks
      }
    }
    
    gl_FragColor = color;
  }
`;

export const createGlitchMaterial = (texture: THREE.Texture) => {
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
};

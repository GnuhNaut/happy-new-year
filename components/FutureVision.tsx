import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { FUTURE_GOALS } from '../constants';

interface LanternProps {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
}

const Lantern: React.FC<LanternProps> = ({ position, color, speed, scale }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += speed * 0.01;
      // Reset position if too high
      if (meshRef.current.position.y > 5) {
        meshRef.current.position.y = -5;
      }
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Lantern Body */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.9} />
      </mesh>
      {/* Top Cap */}
      <mesh position={[0, 0.65, 0]}>
         <cylinderGeometry args={[0.2, 0.5, 0.1, 8]} />
         <meshStandardMaterial color="#330000" />
      </mesh>
      {/* Bottom Cap */}
      <mesh position={[0, -0.65, 0]}>
         <cylinderGeometry args={[0.5, 0.2, 0.1, 8]} />
         <meshStandardMaterial color="#330000" />
      </mesh>
      {/* Light Source inside */}
      <pointLight intensity={1} distance={3} color="#ffaa00" />
    </group>
  );
};

const FutureText: React.FC = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff"
        fontSize={1}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0]}
        maxWidth={8}
        textAlign="center"
      >
        Tầm Nhìn 2026
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} />
      </Text>
      
      {FUTURE_GOALS.map((goal, i) => (
        <Text
          key={i}
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2"
          fontSize={0.3}
          color="#ffffff"
          position={[(i - 1.5) * 2.5, -1.5, 0]}
          anchorX="center"
          maxWidth={2}
          textAlign="center"
        >
          {goal}
        </Text>
      ))}
    </Float>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#FFD700" />
      
      <FutureText />

      {/* Background Lanterns */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Lantern 
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5 - 2
          ]} 
          color={Math.random() > 0.5 ? "#D32F2F" : "#FFD700"}
          speed={0.5 + Math.random()}
          scale={0.5 + Math.random() * 0.3}
        />
      ))}
    </>
  );
};

const FutureVision: React.FC = () => {
  return (
    <section className="h-[600px] w-full relative bg-gradient-to-b from-black to-tet-dark border-y border-tet-gold/20">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-10">
        <p className="text-white/50 text-sm font-sans uppercase tracking-[0.3em]">Xuân Media • Future Forward</p>
      </div>
    </section>
  );
};

export default FutureVision;
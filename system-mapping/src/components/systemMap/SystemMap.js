import * as THREE from 'three';
import { useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Billboard, Plane } from '@react-three/drei';
import randomColor from 'randomcolor';
import CameraControls from 'camera-controls';

const randomPos = (min = 2, max = -2) => Math.random() * (max - min) + min;

function Cloud({ momentsData }) {
  return momentsData.map(({ position, color }, i) => (
    <Billboard key={i} follow={true} position={position}>
      <mesh key={i}>
        <boxGeometry args={[0.1, 0.08, 0.003]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Billboard>
  ));
}

export default function SystemMap() {
  const momentsArray = useMemo(
    () =>
      Array.from({ length: 100 }, () => ({
        color: randomColor(),
        position: [randomPos(), randomPos(), randomPos()],
      })),
    []
  );
  return (
    <div id='systemMap' className='system-map'>
      <button onClick={() => document.exitFullscreen()}>X</button>
      <Canvas linear camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <directionalLight position={[150, 150, 150]} intensity={0.55} />
        <Cloud momentsData={momentsArray} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

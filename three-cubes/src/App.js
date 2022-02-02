import './App.scss';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  MeshWobbleMaterial,
  softShadows,
  OrbitControls,
  Html,
  Text,
  Box,
} from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

softShadows();

function useTurntable() {
  const ref = useRef(null);
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  return ref;
}

function BoxText() {
  const ref = useRef(null);
  const [text, setText] = useState('click me bitch');
  const [textBox, setTextBox] = useState('');
  const [rotation, setRotation] = useState(0);

  return (
    <>
      <Box
        ref={ref}
        onClick={() => (ref.current.rotation.y += Math.PI / 16)}
        position={[2, 2, 2]}>
        <meshPhongMaterial attach='material' color='#f3f3f3' />
        <Text
          color={'#EC2D2D'}
          onClick={() => {
            setText(textBox);
          }}
          position={[0, 0, 0.6]}>
          {text}
        </Text>
      </Box>
      <Html position={[2, 1.5, 2]}>
        <input
          type='text'
          name='textBox'
          value={textBox}
          onChange={(e) => setTextBox(e.target.value)}
        />
      </Html>
    </>
  );
}

function TextScene() {
  const ref = useTurntable();
  return (
    <Text
      ref={ref}
      color={'#EC2D2D'}
      fontSize={0.1}
      maxWidth={2}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign={'left'}
      font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
      anchorX='center'
      anchorY='middle'
      position={[0, 0, 5]}>
      LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD
      TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM
      VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA
      COMMODO CONSEQUAT. DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE
      VELIT ESSE CILLUM DOLORE EU FUGIAT NULLA PARIATUR. EXCEPTEUR SINT OCCAECAT
      CUPIDATAT NON PROIDENT, SUNT IN CULPA QUI OFFICIA DESERUNT MOLLIT ANIM ID
      EST LABORUM.
    </Text>
  );
}
const MeshText = () => {
  return (
    <Html>
      <div>This is html...</div>
      <button>I do nothing</button>
    </Html>
  );
};

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  return (
    <a.mesh
      onClick={() => setExpand((expanded) => !expanded)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial
        attach='material'
        color={color}
        speed={speed}
        factor={0.6}
      />
      <MeshText />
    </a.mesh>
  );
};

function App() {
  return (
    <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -20, 0]} intensity={1.5} />
      <group>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3, 0]}>
          <planeBufferGeometry attach='geometry' args={[100, 100]} />
          <shadowMaterial attach='material' opacity={0.3} />
        </mesh>
        <SpinningMesh
          position={[0, 1, 0]}
          args={[3, 2, 1]}
          color='lightblue'
          speed={2}
        />
        <SpinningMesh position={[-2, 1, -5]} color='pink' speed={6} />
        <SpinningMesh position={[5, 1, -2]} color='pink' speed={6} />
      </group>
      <TextScene />
      <BoxText />
      <OrbitControls />
    </Canvas>
  );
}

export default App;

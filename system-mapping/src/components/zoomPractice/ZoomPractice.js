import * as THREE from 'three';
import { useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Billboard, Plane } from '@react-three/drei';
import randomColor from 'randomcolor';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE });
const randomPos = (min = 2, max = -2) => Math.random() * (max - min) + min;

function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(
    () => new CameraControls(camera, gl.domElement),
    [camera, gl.domElement]
  );

  const [focusLook, setFocusLook] = useState(new THREE.Vector3(0, 0, 4));

  useEffect(() => {
    const cameraPosDelta = Math.sqrt(
      focus.x ** 2 + focus.y ** 2 + focus.z ** 2
    );
    console.log(cameraPosDelta);
    setTimeout(() => {
      zoom
        ? setFocusLook(new THREE.Vector3(focus.x, focus.y, focus.z))
        : setFocusLook(new THREE.Vector3(0, 0, 4));
    }, cameraPosDelta * (zoom ? 0 : 300));
  }, [zoom, focus]);

  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5);
    look.set(focusLook.x, focusLook.y, focusLook.z);
    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true
    );
    return controls.update(delta);
  });
}

function Cloud({ momentsData, zoomToView }) {
  return momentsData.map(({ position, color }, i) => (
    <Billboard key={i} follow={true}>
      <mesh
        key={i}
        position={position}
        onClick={(e) => zoomToView(e.object.position)}>
        <boxGeometry args={[0.1, 0.08, 0.003]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Billboard>
  ));
}

export default function ZoomPractice() {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  const momentsArray = useMemo(
    () =>
      Array.from({ length: 500 }, () => ({
        color: randomColor(),
        position: [randomPos(), randomPos(), randomPos()],
      })),
    []
  );
  return (
    <div style={{ height: '100vh' }}>
      <Canvas linear camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <directionalLight position={[150, 150, 150]} intensity={0.55} />
        <Cloud
          momentsData={momentsArray}
          zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
        />
        <Controls zoom={zoom} focus={focus} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

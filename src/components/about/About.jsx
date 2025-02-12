import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  Clouds,
  Cloud,
  Stars,
  CameraControls,
  Sky as SkyImpl,
} from "@react-three/drei";

import styles from "./About.module.css";

import InfoAboutMe from "./InfoAboutMe";

function Sky() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 2;
  });
  return (
    <>
      <SkyImpl
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.5}
        turbidity={6}
        rayleigh={0}
        mieCoefficient={2}
        mieDirectionalG={1}
      />
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400}>
          <Cloud
            concentrate="outside"
            growth={100}
            color="#ffccdd"
            opacity={0.25}
            seed={0.3}
            bounds={200}
            volume={200}
          />
        </Clouds>
      </group>
    </>
  );
}

export default function About() {
  return (
    <section className={styles.aboutContainer}>
      <Canvas camera={{ position: [0, -15, 10], fov: 75 }}>
        <Sky />
        <Stars
          radius={100}
          depth={50}
          count={8000}
          factor={4}
          saturation={0}
          fade
        />
        <ambientLight intensity={Math.PI / 1.5} />
        <spotLight
          position={[0, 40, 0]}
          decay={0}
          distance={45}
          penumbra={1}
          intensity={100}
        />
        <spotLight
          position={[-20, 0, 10]}
          color="red"
          angle={0.15}
          decay={0}
          penumbra={-1}
          intensity={30}
        />
        <spotLight
          position={[20, -10, 10]}
          color="red"
          angle={0.2}
          decay={0}
          penumbra={-1}
          intensity={20}
        />
        <CameraControls />

        <Html center>
          <InfoAboutMe />
        </Html>
      </Canvas>
    </section>
  );
}

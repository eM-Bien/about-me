import { useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Lightformer,
  Text,
  ContactShadows,
  Environment,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing";
import { useSpring, animated } from "@react-spring/three";

import styles from "./Discover.module.css";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import About from "../about/About";

extend({ Text });

const Knot = ({ onClick, ...props }) => {
  const [hover, setHover] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const AnimatedText = animated(Text);

  const textProps = useSpring({
    opacity: hover ? 1 : 0,
    position: hover ? [0, 9, 0] : [0, 3, 0],
    config: { tension: 120, friction: 10 },
  });

  const handlePointerOver = () => setHover(true);
  const handlePointerLeave = () => setHover(false);

  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
    >
      {hover && (
        <AnimatedText fontSize={0.6} {...textProps}>
          tap me
        </AnimatedText>
      )}

      <mesh receiveShadow castShadow onClick={onClick} {...props}>
        <torusKnotGeometry
          args={[isMobile ? 3 : 4, isMobile ? 1 : 1.5, 256, 32]}
        />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
        />
      </mesh>
    </group>
  );
};

function Status(props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const text = "discover";
  const verticalText = text.split("").join("\n");
  return (
    <Text
      fontSize={isMobile ? 6 : 14}
      letterSpacing={-0.025}
      lineHeight={isMobile ? 0.9 : 1}
      color="black"
      {...props}
    >
      {isMobile ? verticalText : text}
    </Text>
  );
}

function CameraController({ focusOnKnot, setTransition }) {
  const { camera } = useThree();
  const initialZ = useRef(camera.position.z);
  const targetZ = 4;

  useFrame((state, delta) => {
    // init camera
    if (!focusOnKnot && camera.position.z < initialZ.current * 4) {
      camera.position.z += delta * (initialZ.current / 4) * 2;
      camera.position.z = Math.min(camera.position.z, initialZ.current * 4);
    }

    // focus on click
    if (focusOnKnot && camera.position.z > targetZ) {
      camera.position.z -= delta * 20;
      camera.position.z = Math.max(camera.position.z, targetZ);
    }

    if (focusOnKnot && camera.position.z <= targetZ) {
      setTransition(true);
    }

    camera.updateProjectionMatrix();
  });

  return <TiltShift2 />;
}

function Discover({ onElementClick }) {
  const [focusOnKnot, setFocusOnKnot] = useState(false);
  const [transition, setTransition] = useState(false);

  const handleClickOnKnot = () => {
    setFocusOnKnot(true);

    setTimeout(() => {
      if (onElementClick) {
        onElementClick();
      }
    }, 500);
  };

  if (transition) {
    return <About />;
  }

  return (
    <section className={styles.discoverContainer}>
      <Canvas>
        <CameraController
          focusOnKnot={focusOnKnot}
          setTransition={setTransition}
        />
        <spotLight
          position={[20, 20, 10]}
          penumbra={1}
          castShadow
          angle={0.2}
        />
        <Status position={[0, 0, -10]} />
        <Float floatIntensity={10}>
          <Knot onClick={handleClickOnKnot} />
        </Float>
        <Text fontSize={0.6} color="gray" position={[0, -12, -2]}>
          rotate | use scroll | have fun
        </Text>
        <ContactShadows
          scale={100}
          position={[0, -7.5, 0]}
          blur={1}
          far={200}
          opacity={0.85}
        />
        <Environment preset="forest">
          <Lightformer
            intensity={2}
            position={[10, 5, 0]}
            scale={[1, 50, 1]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        <EffectComposer disableNormalPass>
          <N8AO aoRadius={5} intensity={2} />
          <TiltShift2 blur={focusOnKnot ? 0.5 : 0} />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
    </section>
  );
}

export default Discover;

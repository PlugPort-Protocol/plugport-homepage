import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * PlugPort hero scene — literal brand iconography in 3D.
 *
 *  Left:   a chromed plug with two prongs on a coiled cable stub.
 *  Right:  a translucent socket/port face with two prong slots and a
 *          soft interior glow.
 *  Behind: a stacked database (three glass discs + spindle).
 *
 *  As scroll progresses the plug drifts toward the socket, the prongs seat
 *  into the slots, an energy arc snaps between plug and database, and the
 *  database lights up (verified).
 */

/* -------------------------------------------------------------------------- */
/*                                   Plug                                     */
/* -------------------------------------------------------------------------- */

function Plug({
  progress,
  color = "#3b82f6",
}: {
  progress: React.MutableRefObject<number>;
  color?: string;
}) {
  const group = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);

  // Rounded-rect plug body via ExtrudeGeometry
  const bodyGeo = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 1.1;
    const h = 0.8;
    const r = 0.2;
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 6,
      curveSegments: 32,
    });
    g.center();
    return g;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.current;
    // Docking motion: plug starts at x=-2.2 and moves to x=-0.65 as it seats
    const dock = THREE.MathUtils.smoothstep(p, 0.05, 0.55);
    if (group.current) {
      const restX = -2.2 + dock * 1.55;
      group.current.position.x = restX + Math.sin(t * 0.6) * 0.03 * (1 - dock);
      group.current.position.y = Math.sin(t * 0.4) * 0.06 * (1 - dock * 0.5);
      group.current.rotation.z = Math.sin(t * 0.5) * 0.05 * (1 - dock);
      // "settle" nudge when it seats
      const settle = Math.max(0, 1 - Math.abs(p - 0.55) * 12);
      group.current.rotation.y = Math.sin(t * 0.3) * 0.02 - settle * 0.05;
    }
    if (glow.current) {
      const on = THREE.MathUtils.smoothstep(p, 0.55, 0.75);
      const mat = glow.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + on * 0.55 + Math.sin(t * 4) * 0.05 * on;
    }
  });

  return (
    <group ref={group} position={[-2.2, 0, 0]}>
      {/* Cable stub with strain relief */}
      <group position={[-0.85, 0, 0]}>
        {/* Strain relief cone */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.28, 0.35, 24]} />
          <meshPhysicalMaterial
            color="#0e1220"
            metalness={0.15}
            roughness={0.55}
            clearcoat={1}
            clearcoatRoughness={0.25}
          />
        </mesh>
        {/* Cable */}
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.85, 24]} />
          <meshPhysicalMaterial
            color="#0a0d14"
            metalness={0.1}
            roughness={0.7}
            clearcoat={0.6}
            clearcoatRoughness={0.4}
          />
        </mesh>
      </group>

      {/* Plug body (rounded rect prism), lying on its side */}
      <mesh geometry={bodyGeo} rotation={[0, Math.PI / 2, 0]}>
        <meshPhysicalMaterial
          color="#111827"
          metalness={0.85}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.6}
          iridescence={0.4}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 600]}
        />
      </mesh>

      {/* Front face plate (slightly lighter for depth) */}
      <mesh position={[0.29, 0, 0]}>
        <planeGeometry args={[0.7, 1]} />
        <meshPhysicalMaterial
          color="#1a2540"
          metalness={0.9}
          roughness={0.18}
          clearcoat={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Two chrome prongs */}
      {[-0.18, 0.18].map((y, i) => (
        <group key={i} position={[0.55, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.055, 0.055, 0.5, 20]} />
            <meshPhysicalMaterial
              color="#e5e7eb"
              metalness={1}
              roughness={0.12}
              clearcoat={1}
              clearcoatRoughness={0.05}
              envMapIntensity={2}
            />
          </mesh>
          {/* Prong tip */}
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.055, 20, 20]} />
            <meshPhysicalMaterial color="#f3f4f6" metalness={1} roughness={0.1} clearcoat={1} />
          </mesh>
        </group>
      ))}

      {/* Small status LED on the plug body */}
      <mesh position={[0.3, 0.28, 0.15]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>

      {/* Energy halo that appears when seated */}
      <mesh ref={glow} position={[0.55, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Socket                                    */
/* -------------------------------------------------------------------------- */

function Socket({ progress }: { progress: React.MutableRefObject<number> }) {
  const bezel = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  const bezelGeo = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 1.4;
    const h = 1.1;
    const r = 0.28;
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 6,
      curveSegments: 32,
    });
    g.center();
    return g;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.current;
    const on = THREE.MathUtils.smoothstep(p, 0.5, 0.75);
    if (inner.current) {
      const mat = inner.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + on * 1.4 + Math.sin(t * 3) * 0.1;
    }
    if (ring.current) {
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + on * 0.5;
      ring.current.rotation.z = t * 0.15;
    }
    if (bezel.current) {
      bezel.current.rotation.y = Math.sin(t * 0.3) * 0.02;
    }
  });

  return (
    <group position={[0.1, 0, 0]}>
      {/* Bezel */}
      <mesh ref={bezel} geometry={bezelGeo} rotation={[0, Math.PI / 2, 0]}>
        <meshPhysicalMaterial
          color="#0e1424"
          metalness={0.9}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Recessed face plate */}
      <mesh ref={inner} position={[-0.05, 0, 0]}>
        <planeGeometry args={[0.85, 1.15]} />
        <meshStandardMaterial
          color="#0a0f1e"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={0.4}
          roughness={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Two prong slots (dark inset rectangles) */}
      {[-0.22, 0.22].map((y, i) => (
        <group key={i} position={[-0.04, y, 0]}>
          <mesh>
            <boxGeometry args={[0.02, 0.14, 0.09]} />
            <meshStandardMaterial color="#000" emissive="#000" />
          </mesh>
          {/* subtle inner rim */}
          <mesh position={[-0.005, 0, 0]}>
            <planeGeometry args={[0.16, 0.11]} />
            <meshBasicMaterial color="#050810" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Bright ring that lights when plug seats */}
      <mesh ref={ring} position={[-0.055, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.62, 0.68, 96]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* Outer soft glow */}
      <mesh position={[-0.06, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[1.1, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.08} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Database                                    */
/* -------------------------------------------------------------------------- */

const PROTOCOLS = [
  { name: "mongo", color: "#10b981", y: 0.75 },
  { name: "sql", color: "#3b82f6", y: 0.25 },
  { name: "redis", color: "#ef4444", y: -0.25 },
];

function Database({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const discsRef = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.current;
    const active = THREE.MathUtils.smoothstep(p, 0.6, 0.85);
    if (group.current) {
      group.current.rotation.y = t * 0.15;
      group.current.position.y = Math.sin(t * 0.4) * 0.05;
    }
    if (discsRef.current) {
      discsRef.current.children.forEach((child, i) => {
        const meshes = (child as THREE.Group).children;
        meshes.forEach((m) => {
          const mat = (m as THREE.Mesh).material;
          if (mat && "emissiveIntensity" in (mat as any)) {
            (mat as THREE.MeshStandardMaterial).emissiveIntensity =
              0.25 + active * (0.9 + Math.sin(t * 2 + i) * 0.3);
          }
        });
      });
    }
    if (beam.current) {
      beam.current.scale.y = active * 1.2;
      const mat = beam.current.material as THREE.MeshBasicMaterial;
      mat.opacity = active * 0.7;
    }
  });

  return (
    <group ref={group} position={[2.5, 0, -0.2]}>
      {/* Pedestal */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.85, 0.95, 0.08, 64]} />
        <meshPhysicalMaterial
          color="#0e1424"
          metalness={1}
          roughness={0.25}
          clearcoat={1}
          envMapIntensity={1.4}
        />
      </mesh>
      <mesh position={[0, -1.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.82, 0.9, 96]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.7} toneMapped={false} />
      </mesh>

      {/* Stack of protocol discs */}
      <group ref={discsRef}>
        {PROTOCOLS.map((p, i) => (
          <group key={p.name} position={[0, p.y - 0.35, 0]}>
            {/* Glass disc body */}
            <mesh castShadow>
              <cylinderGeometry args={[0.78, 0.78, 0.32, 64]} />
              <meshPhysicalMaterial
                color="#0e1424"
                metalness={0.85}
                roughness={0.24}
                clearcoat={1}
                clearcoatRoughness={0.08}
                envMapIntensity={1.5}
                emissive={p.color}
                emissiveIntensity={0.15}
              />
            </mesh>
            {/* Top rim glow */}
            <mesh position={[0, 0.161, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.73, 0.79, 96]} />
              <meshBasicMaterial color={p.color} transparent opacity={0.85} toneMapped={false} />
            </mesh>
            {/* Bottom rim */}
            <mesh position={[0, -0.161, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.73, 0.79, 96]} />
              <meshBasicMaterial color={p.color} transparent opacity={0.35} toneMapped={false} />
            </mesh>
            {/* Data track arc */}
            <mesh position={[0, 0.162, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.4, 0.42, 48, 1, i * 0.7, Math.PI * 0.5]} />
              <meshBasicMaterial color={p.color} transparent opacity={0.7} toneMapped={false} />
            </mesh>
            {/* Side label pip */}
            <mesh position={[0.78, 0, 0.08]}>
              <sphereGeometry args={[0.05, 20, 20]} />
              <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={1.6} toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Verified beam */}
      <mesh ref={beam} position={[0, 1.5, 0]} scale={[1, 0, 1]}>
        <cylinderGeometry args={[0.05, 0.01, 2, 16, 1, true]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                         Energy conduit (plug → db)                         */
/* -------------------------------------------------------------------------- */

function EnergyConduit({ progress }: { progress: React.MutableRefObject<number> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const arc = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.current;
    const on = THREE.MathUtils.smoothstep(p, 0.55, 0.75);
    if (mesh.current) {
      const mat = mesh.current.material as THREE.MeshBasicMaterial;
      mat.opacity = on * (0.55 + Math.sin(t * 6) * 0.15);
      mesh.current.scale.x = on;
    }
    if (arc.current) {
      const mat = arc.current.material as THREE.MeshBasicMaterial;
      mat.opacity = on * (0.4 + Math.abs(Math.sin(t * 8)) * 0.4);
    }
  });

  return (
    <group position={[1.35, 0, 0]}>
      {/* Core beam plug → database */}
      <mesh ref={mesh} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.022, 0.022, 2.15, 16]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0} toneMapped={false} />
      </mesh>
      {/* Wider halo */}
      <mesh ref={arc} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 2.15, 16]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Ambient dot field                              */
/* -------------------------------------------------------------------------- */

function DotField({ count = 180 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3.5 + Math.random() * 2.5;
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.cos(phi) * radius * 0.55;
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#93c5fd"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Ground                                   */
/* -------------------------------------------------------------------------- */

function Ground() {
  return (
    <group position={[0, -1.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[7, 96]} />
        <meshStandardMaterial color="#080b12" metalness={0.6} roughness={0.55} envMapIntensity={0.7} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[2, 6.5, 96]} />
        <meshBasicMaterial color="#0a0d14" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Camera rig                                  */
/* -------------------------------------------------------------------------- */

function CameraRig({ progress }: { progress: React.MutableRefObject<number> }) {
  useFrame((state) => {
    const p = progress.current;
    const cam = state.camera;
    // Start wide from the front, gently orbit right to reveal the database
    const baseAngle = 0.1;
    const angle = baseAngle + p * 0.55 + Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    const radius = 5.2 - p * 0.6;
    cam.position.set(Math.sin(angle) * radius, 0.6 - p * 0.15, Math.cos(angle) * radius);
    cam.lookAt(0.4, 0, 0);
  });
  return null;
}

/* -------------------------------------------------------------------------- */
/*                          Studio HDRI (Lightformers)                        */
/* -------------------------------------------------------------------------- */

function StudioEnvironment() {
  return (
    <Environment resolution={512} frames={1} background={false}>
      <Lightformer form="rect" intensity={2.8} color="#e0edff" position={[0, 3, 4]} scale={[6, 2, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={3.5} color="#3b82f6" position={[0, 1, -4]} scale={[8, 2, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={1.6} color="#a78bfa" position={[-4, 0, 1]} scale={[2, 3, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={1.4} color="#10b981" position={[4, 0, 1]} scale={[2, 3, 1]} target={[0, 0, 0]} />
      <Lightformer form="ring" intensity={1.6} color="#c7d2fe" position={[0, 5, 0]} scale={[4, 4, 1]} rotation={[-Math.PI / 2, 0, 0]} target={[0, 0, 0]} />
    </Environment>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Scene                                     */
/* -------------------------------------------------------------------------- */

export function ProtocolEngineScene({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [0.5, 0.6, 5.2], fov: 42 }}
    >
      <color attach="background" args={["#0a0d14"]} />
      <fog attach="fog" args={["#0a0d14", 6, 14]} />

      <StudioEnvironment />

      <ambientLight intensity={0.28} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#93c5fd" />
      <pointLight position={[-3, -1, -3]} intensity={0.3} color="#3b82f6" />

      <CameraRig progress={progressRef} />

      <DotField />
      <Ground />

      {/* Floating containers so nothing feels perfectly rigid */}
      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.35}>
        <Plug progress={progressRef} />
      </Float>
      <Float speed={0.9} rotationIntensity={0.1} floatIntensity={0.2}>
        <Socket progress={progressRef} />
      </Float>
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
        <Database progress={progressRef} />
      </Float>

      <EnergyConduit progress={progressRef} />

      <EffectComposer>
        <Bloom intensity={0.75} luminanceThreshold={0.4} luminanceSmoothing={0.22} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}


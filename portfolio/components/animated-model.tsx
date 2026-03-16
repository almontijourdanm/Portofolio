"use client";

import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AnimatedModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  onLoaded?: () => void;
}

export function AnimatedModel({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  onLoaded,
}: AnimatedModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names, mixer } = useAnimations(animations, group);
  const eyeLights = useRef<THREE.PointLight[]>([]);

  // Setup materials and glowing eyes effect
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial) {
            // Ensure materials are properly configured
            material.needsUpdate = true;

            // Check if this could be an eye/lens material for glowing effect
            const name = material.name.toLowerCase();
            const childName = child.name.toLowerCase();

            if (
              name.includes("eye") ||
              name.includes("lens") ||
              name.includes("glass") ||
              childName.includes("eye") ||
              childName.includes("head")
            ) {
              // Make eyes/head glow with red-orange emissive light
              material.emissive = new THREE.Color(0xff3300); // Red-orange glow
              material.emissiveIntensity = 3;
              material.metalness = 0.9;
              material.roughness = 0.1;
            }
          }
        });
      }
    });
  }, [scene]);

  // Call onLoaded when model is ready
  useEffect(() => {
    if (onLoaded) {
      onLoaded();
    }
  }, [onLoaded]);

  // Play animations when component mounts
  useEffect(() => {
    if (names.length > 0) {
      // Stop all animations first
      names.forEach((name) => {
        const action = actions[name];
        if (action) {
          action.stop();
        }
      });

      // Try each animation to find one that works
      // Prioritize Walk, then Idle, then others
      const animationPriority = ["Tripod|Walk", names[0]];
      let primaryAnimation =
        animationPriority.find((name) => names.includes(name)) || names[0];

      const action = actions[primaryAnimation];

      if (action) {
        // const clip = action.getClip();
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.enabled = true;
        action.setEffectiveWeight(1);
        action.setEffectiveTimeScale(1);
        action.fadeIn(0.5);
        action.play();

        //   if (action) {
        //     const clip = action.getClip()
        //     console.log(`✅ Playing animation: ${primaryAnimation}`)
        //     console.log(`Animation duration: ${clip.duration}s`)
        //     console.log(`Animation tracks: ${clip.tracks.length}`)

        //     action.reset()
        //     action.setLoop(THREE.LoopRepeat, Infinity)
        //     action.clampWhenFinished = false
        //     action.enabled = true
        //     action.setEffectiveWeight(1)
        //     action.setEffectiveTimeScale(1)
        //     action.fadeIn(0.5) // Use fadeIn instead of direct play
        //     action.play()

        //     console.log(`Animation playing: ${action.isRunning()}`)
        //     console.log(`Animation weight: ${action.getEffectiveWeight()}`)
        //     console.log(`Animation timeScale: ${action.getEffectiveTimeScale()}`)
        //   }
        // } else {
        //   console.log("⚠️ No animations found in this model")
        // }
      }
    }
  }, [actions, names, modelPath]);

  // Update animation mixer and smooth float/rotate
  useFrame((state, delta) => {
    // Manually update mixer to ensure animations play
    if (mixer) {
      mixer.update(delta);
    }

    if (autoRotate && group.current) {
      const t = state.clock.elapsedTime;

      // FLOAT HALUS (smooth floating)
      group.current.position.y = position[1] + Math.sin(t * 0.8) * 0.12;

      // ROTATE HALUS (smooth rotation)
      group.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />

      {/* Point lights positioned in front of eyes - shining forward like bulbs */}
      {/* X: left(-) / right(+), Y: up/down (higher = up), Z: forward(+) / backward(-) */}
      <pointLight
        position={[0.3, 2.5, 5]}
        color="#360f5a"
        intensity={100}
        distance={15}
      />
      <pointLight
        position={[-0.3, 2.5, 5]}
        color="#360f5a"
        intensity={100}
        distance={15}
      />
    </group>
  );
}

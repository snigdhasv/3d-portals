import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Stats } from "@react-three/drei";
import "./App.css";

function printMeshHierarchy(node, prefix = '') {
  if (!node) return;
  console.log(`${prefix}${node.name} (${node.type})`);
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => printMeshHierarchy(child, `${prefix}  `));
  }
}

function Scene() {
  const gltf = useLoader(GLTFLoader, '/jewel_rio_fbx.glb');
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      console.log('Model loaded and reference set');
      printMeshHierarchy(modelRef.current);
    } else {
      console.log('Model reference is not set yet');
    }
  }, [gltf]);

  return <primitive object={gltf.scene} ref={modelRef} />;
}

export default function App() {
  return (
    <Canvas style={{ background: "#171717" }}>
      <OrbitControls />
      <ambientLight />
      <Scene />
      <Stats />
    </Canvas>
  );
}

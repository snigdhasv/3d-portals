import {
    AccumulativeShadows,
    Environment,
    Lightformer,
    OrbitControls,
    PerspectiveCamera,
    RandomizedLight,
    Sphere,
    useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import React, { useEffect } from "react";
import { DEG2RAD } from "three/src/math/MathUtils";

export const Scene =({mainColor, path, ...props})=>{
    const{nodes, materials, scene} = useGLTF(path); //load 3d scene
    useEffect(()=>{
        //go through each object to cast shadows
        scene.traverse((child)=>{
            if(child.isMesh){
                child.castShadow = true;
                child.receiveShadow=true;
            }
        });
    },[scene]);

    const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));
    return(
        <>
            <color attach="background" args={["#ffffff"]} />
            <group {...props} dispose={null}>
                {/* create a new camera for each scene and have orbit controls for each scene */}
                <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
                <OrbitControls
                    autoRotate
                    enablePan={false}
                    maxPolarAngle={DEG2RAD * 75}
                    minDistance={6}
                    maxDistance={10}
                    autoRotateSpeed={0.3}
                />
                <primitive object={scene} scale={ratioScale} />
                <ambientLight intensity={1} />
                <AccumulativeShadows
                    frames={100}
                    alphaTest={0.9}
                    scale={30}
                    position={[0, -0.008, 0]}
                    opacity={0.8}
                >
                <RandomizedLight
                    amount={4}
                    radius={9}
                    intensity={10}
                    ambient={0.25}
                    position={[10, 5, 15]}
                />
                </AccumulativeShadows>
                <Environment blur={0.8} background>
                {/* sphere is the background */}
                <Sphere scale={15}>
                    <meshBasicMaterial color={mainColor} side={THREE.BackSide} />
                </Sphere>

                <Lightformer
                    position={[0, 5, -2]}
                    form="ring" 
                    intensity={1.5} 
                    color="#BA5FFF" 
                    scale={[10, 5]} 
                    target={[0, 0, 0]}
                />
                <Lightformer
                    position={[0, 5, -2]}
                    form="rect" 
                    intensity={2} 
                    color="#F0CDCD" 
                    scale={[10, 5]} 
                    target={[0, 0, 0]}
                />
                
                </Environment>
            </group>
        </>
    );
};

useGLTF.preload("/models/mcqueen.glb");
useGLTF.preload("/models/cruz.glb");
useGLTF.preload("/models/storm.glb");
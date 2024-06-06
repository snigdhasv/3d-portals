import {
    CameraControls,
    Dodecahedron,
    Environment,
    Grid,
    MeshDistortMaterial,
    RenderTexture,
} from "@react-three/drei";

import { useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { slideAtom } from "./Overlay";
import { Scene } from "./Scene";

export const scenes = [
    {
        path : "/models/mcqueen.glb",
        mainColor : "#EB4E40",
        name : "Lightning McQueen",
        description : "I am speed",
    },
    {
        path : "/models/cruz.glb",
        mainColor : "#FFEA64",
        name : "Cruz Ramirez",
        description : "I am so excited that I get to train you. These young guys are great and all, but I like a challenge",
    },
    {
        path : "/models/storm.glb",
        mainColor : "#4051EB",
        name : "Jackson Storm",
        description : "You have no idea what a pleasure it is for me to finally beat you",
    },
];

const CameraHandler = ({slideDistance}) => { 
    const viewport = useThree((state) => state.viewport);
    const CameraControlsRef = useRef();
    const [slide] = useAtom(slideAtom); //listening to slide value (slide number)
    const lastSlide = useRef(0);

    const { dollyDistance } = useControls({
        dollyDistance:{
            value:10,
            min:0,
            max:50,
        }
    });

    const moveToSlide = async() => {
        await CameraControlsRef.current.setLookAt(
            lastSlide.current * (viewport.width + slideDistance),
            3,
            dollyDistance,
            lastSlide.current * (viewport.width + slideDistance),
            0,
            0,
            true
        );
        await CameraControlsRef.current.setLookAt(
            (slide + 1) * (viewport.width + slideDistance),
            1,
            dollyDistance,
            slide * (viewport.width + slideDistance),
            0,
            0,
            true
          );
      
        await CameraControlsRef.current.setLookAt(
            slide * (viewport.width + slideDistance),
            0,
            5,
            slide * (viewport.width + slideDistance),
            0,
            0,
            true
        );
    };

    //checking if we're on the same slide or not in the beginning
    useEffect(()=>{
        const resetTimeout = setTimeout(()=>{
            CameraControlsRef.current.setLookAt(
                slide * (viewport.width + slideDistance),
                0,
                5,
                slide * (viewport.width + slideDistance),
                0,
                0
            );
        },200);
        return () =>clearTimeout(resetTimeout);
    },[viewport]);

    useEffect(()=>{
        if (lastSlide.current===slide){
            return;
        }
        moveToSlide();
        lastSlide.current=slide;
    },[slide]);
    return(
        <CameraControls
            ref = {CameraControlsRef}
            touches={{
                one:0,
                two:0,
                three:0,
            }}
            mouseButtons={{
                left:0,
                middle:0,
                right:0,
            }}
        />
    );
};

export const Experience = () =>{
    const viewport = useThree((state)=>state.viewport);
    const { slideDistance } = useControls({
        slideDistance:{
            value:1,
            min:0,
            max:10,
        },
    });
    return(
        <>
            <ambientLight intensity={0.2}/>
            <Environment preset={"city"}/>
            <CameraHandler slideDistance={slideDistance}/>

            {/*Main World */}
            <Grid
                position-y={-viewport.height/2}
                sectionSize={1}
                sectionColor={"red"}
                sectionThickness={1}
                cellSize={0.5}
                cellColor={"#6f6f6f"}
                cellThickness={0.6}
                infiniteGrid
                fadeDistance={50}
                fadeStrength={5}/>
            {scenes.map((scene,index)=>(
                <mesh
                    key={index}
                    position={[index*(viewport.width + slideDistance),0,0]}>
                
                    <planeGeometry args={[viewport.width, viewport.height]}/>
                    <meshBasicMaterial toneMapped={false}>
                        <RenderTexture attach="map">
                            <Scene {...scene}/>
                        </RenderTexture>
                    </meshBasicMaterial>
                </mesh>
            ))}
        </>
    );
};


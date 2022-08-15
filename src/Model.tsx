import React, { useEffect, useState } from "react";
import {useFBX, useGLTF} from "@react-three/drei";

type AssetType = "GLTF" | "FBX"



type Prop = {
  scale?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  asset: string;
  
}

type PropWithAssetType = Prop & {
  assetType?: AssetType
}

const Model = ({
  assetType = "GLTF",
  ...prop
}: PropWithAssetType) => {  
  if (assetType === "FBX") {
    return <FBXModel {...prop} />
  } else {
    return <GLTFModel {...prop} />
  }
};

const FBXModel = ({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  asset,
}: Prop) => {  
  const [s, setS] = useState(1);
  const [p, setP] = useState([0,0,0]);
  const scene = useFBX(asset);
  useEffect(() => {
   setS(scale);
   setP(position)
  }, [scale, position]);

  return (
      <group dispose={null}>
          <primitive object={scene} rotation={rotation} scale={[s, s, s]} position={p} />
      </group>
    )
};

const GLTFModel = ({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  asset,
}: Prop) => {  
  const [s, setS] = useState(1);
  const [p, setP] = useState([0,0,0]);
  const { scene } = useGLTF(asset);
  useEffect(() => {
   setS(scale);
   setP(position)
  }, [scale, position]);

  return (
      <group dispose={null}>
          <primitive object={scene} rotation={rotation} scale={[s, s, s]} position={p} />
      </group>
    )
};


export default Model;
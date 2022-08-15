import React from "react";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import threeFontJson from "three/examples/fonts/helvetiker_bold.typeface.json";
import { Sphere } from "@react-three/drei";

extend({ TextGeometry });

const TextObject = ({
  text,
  onClick,
  x = 0,
  y = 0,
  z = 0,
  color = "royalblue",
}: {
  text: string;
  onClick?: () => void;
  x?: number;
  y?: number;
  z?: number;
  color?: string;
}) => {
  // 位置の調整
  const textGeo = new TextGeometry(text, {
    font: new FontLoader().parse(threeFontJson),
    size: 1,
    height: 0.1,
  });
  textGeo.computeBoundingBox();
  const centerOffset =
    -(textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x) / 2;

  return (
    <group dispose={null}>
      <mesh
        position={[x + centerOffset, y + 1, z + 0]}
        args={[textGeo]}
        castShadow
        receiveShadow
        onClick={onClick}
      >
        <meshPhongMaterial color={color} />
      </mesh>
      <Sphere position={[x, y + 1, z]} scale={2} onClick={onClick}>
        <meshStandardMaterial transparent opacity={0} />
      </Sphere>
    </group>
  );
};

export default TextObject;

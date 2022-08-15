import React from "react";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import threeFontJson from "three/examples/fonts/helvetiker_bold.typeface.json";

extend({ TextGeometry });

const TextObject = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
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
    <mesh
      position={[centerOffset, 1, 0]}
      args={[textGeo]}
      castShadow
      receiveShadow
      onClick={onClick}
    >
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
};

export default TextObject;

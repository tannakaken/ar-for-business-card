import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const BoxButton = (props: any) => {
  const ref = useRef<Mesh>();
  const speed = 0.01;
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += speed;
    }
  });
  return (
    <mesh {...props} ref={ref} onClick={() => props.onClick?.()}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
};

export default BoxButton;

import React, { useRef } from "react";
import "./App.css";
import ARCanvas from "./ar-canvas";
import ARMarker from "./ar-marker";
import { OrbitControls, Stage } from "@react-three/drei";
import Model from "./Model";
import { useFrame, useThree } from "@react-three/fiber";

const ARMarkerModel = () => {
  const { camera, gl } = useThree();
  const orbit = useRef<any>();
  useFrame(() => orbit.current && orbit.current.update());
  return (
    <>
      <OrbitControls
        ref={orbit}
        enableZoom={false}
        enablePan={false}
        args={[camera, gl.domElement]}
        enableDamping={true}
        dampingFactor={0.1}
        rotateSpeed={0.5}
      />
      <ARMarker
        type={"pattern"}
        patternUrl={"data/pattern-qrcode.patt"}
        onMarkerFound={() => {
          console.log("Marker Found");
        }}
      >
        <Stage>
          <Model
            rotation={[Math.PI / 2, Math.PI, Math.PI]}
            asset="assets/CesiumMan.glb"
          />
        </Stage>
      </ARMarker>
    </>
  );
};

/**
 * スマホのみで正しく動く
 */
const App = () => {
  return (
    <React.Suspense fallback={<span>loading...</span>}>
      <ARCanvas
        dpr={window.devicePixelRatio}
        onCameraStreamReady={() => console.log("Camera stream ready")}
        onCameraStreamError={() => console.error("Camera stream error")}
        onCreated={({ gl }) => {
          console.log("onCreated ARCanvas");
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
      >
        <OrbitControls makeDefault />
        <ambientLight />
        <pointLight position={[10, 10, 0]} intensity={10.0} />
        <ARMarkerModel />
      </ARCanvas>
    </React.Suspense>
  );
};

export default App;

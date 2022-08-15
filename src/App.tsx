import React, { useRef } from "react";
import "./App.css";
import ARCanvas from "./ar-canvas";
import ARMarker from "./ar-marker";
import { Stage } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import BoxButton from "./box-button";

const ARMarkerModel = () => {
  const orbit = useRef<any>();
  useFrame(() => orbit.current && orbit.current.update());
  return (
    <ARMarker
      type={"pattern"}
      patternUrl={"data/pattern.patt"}
      onMarkerFound={() => {
        console.log("Marker Found");
      }}
    >
      <Stage>
        <BoxButton
          position={[0, 0, 0]}
          onClick={() => (window.location.href = "https://tannakaken.xyz")}
        />
      </Stage>
    </ARMarker>
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
        patternRatio={0.9}
      >
        <ambientLight />
        <pointLight position={[10, 10, 0]} intensity={10.0} />
        <ARMarkerModel />
      </ARCanvas>
    </React.Suspense>
  );
};

export default App;

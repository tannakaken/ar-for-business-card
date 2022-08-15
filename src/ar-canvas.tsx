import React from "react"
import { RootState, Canvas } from "@react-three/fiber"

import { AR, ArProps } from "./ar"

type ArCanvasProps = ArProps & {
    arEnabled?: boolean;
    camera?: {
      position: [number, number, number];
      far?: number;
    };
    gl?: any;
    onCreated: (obj: RootState) => void;
    dpr?: number;
};

const ARCanvas = ({
  arEnabled = true,
  tracking = true,
  children,
  patternRatio = 0.5,
  detectionMode = "mono_and_matrix",
  cameraParametersUrl = "data/camera_para.dat",
  matrixCodeType = "3x3",
  sourceType = "webcam",
  onCameraStreamReady,
  onCameraStreamError,
  camera,
  ...props
}: ArCanvasProps) => (
  <Canvas camera={arEnabled ? { position: [0, 0, 0] } : camera} {...props}>
    {arEnabled ? (
      <AR
        tracking={tracking}
        patternRatio={patternRatio}
        matrixCodeType={matrixCodeType}
        detectionMode={detectionMode}
        sourceType={sourceType}
        cameraParametersUrl={cameraParametersUrl}
        onCameraStreamReady={onCameraStreamReady}
        onCameraStreamError={onCameraStreamError}>
        {children}
      </AR>
    ) : (
      children
    )}
  </Canvas>
)

export default ARCanvas
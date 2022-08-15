// @ts-ignore
import { ArMarkerControls } from "@ar-js-org/ar.js/three.js/build/ar-threex"
import { useFrame } from "@react-three/fiber"
import React, { useEffect, useRef, useState } from "react"
import { useAR } from "./ar"

type Prop = {
    children?: any;
    params?: any;
    onMarkerFound?: () => void;
    onMarkerLost?: () => void;
} & ({
    type: "barcode";
    barcodeValue: string;
    patternUrl?: undefined;
} | {
    type: "pattern";
    patternUrl: string;
    barcodeValue?: undefined;
});

const ARMarker = ({
  children,
  type,
  barcodeValue,
  patternUrl,
  params,
  onMarkerFound,
  onMarkerLost,
}: Prop) => {
  const markerRoot = useRef()
  // @ts-ignore
  const { arToolkitContext } = useAR()
  const [isFound, setIsFound] = useState(false)

  useEffect(() => {
    if (!arToolkitContext) {
      return
    }

    const markerControls = new ArMarkerControls(arToolkitContext, markerRoot.current, {
      type,
      barcodeValue: type === "barcode" ? barcodeValue : null,
      patternUrl: type === "pattern" ? patternUrl : null,
      ...params,
    })

    return () => {
      const index = arToolkitContext._arMarkersControls.indexOf(markerControls)
      arToolkitContext._arMarkersControls.splice(index, 1)
    }
  }, [arToolkitContext, barcodeValue, params, patternUrl, type]);

  useFrame(() => {
    // @ts-ignore
    if (markerRoot.current.visible && !isFound) {
      setIsFound(true)
      if (onMarkerFound) {
        onMarkerFound()
      }
    // @ts-ignore
    } else if (!markerRoot.current.visible && isFound) {
      setIsFound(false)
      if (onMarkerLost) {
        onMarkerLost()
      }
    }
  })

  // @ts-ignore
  return <group ref={markerRoot}>{children}</group>
}

export default ARMarker
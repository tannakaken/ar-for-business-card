// @ts-ignore
import { ArMarkerControls } from "@ar-js-org/ar.js/three.js/build/ar-threex";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import { Euler, Group, Vector3 } from "three";
import { useAR } from "./ar";

type Prop = {
  children?: any;
  params?: any;
  onMarkerFound?: (position: Vector3, rotation: Euler, scale: Vector3) => void;
  onMarkerLost?: () => void;
} & (
  | {
      type: "barcode";
      barcodeValue: string;
      patternUrl?: undefined;
    }
  | {
      type: "pattern";
      patternUrl: string;
      barcodeValue?: undefined;
    }
);

const ARMarker = ({
  children,
  type,
  barcodeValue,
  patternUrl,
  params,
  onMarkerFound,
  onMarkerLost,
}: Prop) => {
  const markerRoot = useRef<Group>(null);
  // @ts-ignore
  const { arToolkitContext } = useAR();
  const state = useMemo(
    () => ({
      isFound: false,
    }),
    []
  );

  useEffect(() => {
    if (!arToolkitContext) {
      return;
    }

    const markerControls = new ArMarkerControls(
      arToolkitContext,
      markerRoot.current,
      {
        type,
        barcodeValue: type === "barcode" ? barcodeValue : null,
        patternUrl: type === "pattern" ? patternUrl : null,
        ...params,
      }
    );

    return () => {
      const index = arToolkitContext._arMarkersControls.indexOf(markerControls);
      arToolkitContext._arMarkersControls.splice(index, 1);
    };
  }, [arToolkitContext, barcodeValue, params, patternUrl, type]);

  useFrame(() => {
    if (markerRoot.current?.visible && !state.isFound) {
      state.isFound = true;
      if (onMarkerFound) {
        onMarkerFound(
          markerRoot.current.position,
          markerRoot.current.rotation,
          markerRoot.current.scale
        );
      }
    } else if (!markerRoot.current?.visible && state.isFound) {
      state.isFound = false;
      if (onMarkerLost) {
        onMarkerLost();
      }
    }
  });

  return <group ref={markerRoot}>{children}</group>;
};

export default ARMarker;

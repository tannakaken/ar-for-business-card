import React, { useRef } from "react";
import "./App.css";
import ARCanvas from "./ar-canvas";
import ARMarker from "./ar-marker";
import { Stage, Text } from "@react-three/drei";
import TextObject from "./text-object";
import Model from "./Model";
import { chooseBegin } from "./begins";
import { Group } from "three";

const ARMarkerModel = () => {
  const groupRef = useRef<Group>(null);
  return (
    <>
      <ARMarker
        type={"pattern"}
        patternUrl={"data/pattern.patt"}
        onMarkerFound={() => {
          if (groupRef.current) {
            groupRef.current.visible = false;
          }
        }}
        onMarkerLost={() => {
          if (groupRef.current) {
            groupRef.current.visible = true;
          }
        }}
      >
        <Stage>
          <Model
            rotation={[(Math.PI * 3) / 4, Math.PI, Math.PI]}
            scale={2}
            asset="assets/tannakaken.glb"
          />
          <TextObject
            text="e-mail"
            y={8}
            x={-9}
            onClick={() =>
              (window.location.href = "mailto:tannakaken@gmail.com")
            }
            color={"orange"}
          />
          <TextObject
            text="twitter"
            y={8}
            onClick={() =>
              (window.location.href = "https://twitter.com/tannakaken")
            }
            color={"royalblue"}
          />
          <TextObject
            text="web site"
            y={8}
            x={9}
            onClick={() => (window.location.href = "https://tannakaken.xyz")}
            color={"green"}
          />
        </Stage>
      </ARMarker>
      <group ref={groupRef}>
        <Text
          rotation={[0, 0, 0]}
          font="./fonts/NotoSansJP-Regular.otf"
          anchorX={"center"}
          anchorY={"middle"}
          fontSize={1.5}
          strokeColor={"black"}
          color={"white"}
          strokeWidth={1}
        >
          QRコードの真ん中の"圏"をスキャンしてください。
        </Text>
      </group>
    </>
  );
};

/**
 * スマホのみで正しく動く
 */
const App = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <React.Suspense fallback={<span>{chooseBegin()}</span>}>
      <ARCanvas
        dpr={window.devicePixelRatio}
        onCameraStreamReady={() => {
          if (buttonRef.current) {
            buttonRef.current.style.backgroundColor = "royalblue";
          }
        }}
        onCameraStreamError={() => console.error("Camera stream error")}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
        patternRatio={0.9}
      >
        <ambientLight />
        <pointLight position={[10, 10, 0]} intensity={10.0} />
        <ARMarkerModel />
      </ARCanvas>
      <button
        ref={buttonRef}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          backgroundColor: "white",
          color: "white",
          width: "50px",
          height: "50px",
          textAlign: "center",
          borderRadius: "25px",
          fontSize: "Large",
        }}
        onClick={() => {
          if (modalRef.current) {
            modalRef.current.style.display = "block";
            modalRef.current.className = "fadein-animation";
          }
        }}
      >
        ?
      </button>
      <div
        ref={modalRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          width: "80vw",
          height: "80vh",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "20px",
          willChange: "opacity",
          opacity: 0,
          display: "none",
        }}
      >
        <h2>淡中圏</h2>
        <div style={{ textAlign: "center" }}>
          <img
            src="category.png"
            width="200px"
            height="200px"
            style={{ objectFit: "cover" }}
            alt="圏"
          />
        </div>
        <div>
          <ul>
            <li>
              小説家
              <ul>
                <li>SF</li>
                <li>実験小説</li>
              </ul>
            </li>
            <li>
              プログラマー
              <ul>
                <li>
                  バックエンド
                  <ul>
                    <li>FastAPI/Python</li>
                    <li>Laravel/PHP</li>
                  </ul>
                </li>
                <li>
                  フロントエンド
                  <ul>
                    <li>React/TypeScript</li>
                    <li>React Native/TypeScript&Swift&Kotlin</li>
                  </ul>
                </li>
                <li>
                  3D
                  <ul>
                    <li>Three.js&WebGL/TypeScript</li>
                    <li>Unity/C#</li>
                  </ul>
                </li>
                <li>
                  その他システム
                  <ul>
                    <li>C&C++&Rust&Lisp&Ocaml&Erlang</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              データサイエンティスト
              <ul>
                <li>AI開発/Python</li>
                <li>データ解析/R</li>
                <li>数値シミュレーション/Julia</li>
              </ul>
            </li>
            <li>
              ITコンサルタント
              <ul>
                <li>システム化支援</li>
                <li>IT講習</li>
                <li>プログラミング講習</li>
                <li>データサイエンス講習</li>
                <li>SFプロトタイピング</li>
              </ul>
            </li>
            <li>
              数学者
              <ul>
                <li>アルゴリズム開発</li>
                <li>Coq&Alloyによるモデル検証</li>
              </ul>
            </li>
          </ul>
        </div>
        <dl>
          <dt>Twitter:</dt>
          <dd>
            <a href="https://twitter.com/tannakaken/">tannakaken</a>
          </dd>
          <dt>Webサイト:</dt>
          <dd>
            <a href="https://tannakaken.xyz/">淡中圏の脳髄</a>
          </dd>
          <dt>メールアドレス:</dt>
          <dd>
            <a href="mailto:tannakaken@gmail.com/">tannakaken@gmail.com</a>
          </dd>
        </dl>
        <button
          style={{
            padding: "5p",
            fontSize: "Large",
          }}
          onClick={() => {
            if (modalRef.current) {
              modalRef.current.className = "fadeout-animation";
              setTimeout(() => {
                if (modalRef.current) {
                  modalRef.current.style.display = "none";
                }
              }, 1000);
            }
          }}
        >
          閉じる
        </button>
      </div>
    </React.Suspense>
  );
};

export default App;

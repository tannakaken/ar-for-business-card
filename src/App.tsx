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
        <Stage environment={null}>
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
          width: "90vw",
          height: "90vh",
          backgroundColor: "white",
          borderRadius: "20px",
          paddingTop: 0,
          paddingLeft: "10px",
          paddingRight: "10px",
          willChange: "opacity",
          opacity: 0,
          display: "none",
        }}
      >
        <h2 style={{ marginBottom: 0 }}>淡中圏</h2>
        <div style={{ textAlign: "center" }}>
          <img
            src="category.png"
            width="50%"
            height="50%"
            style={{ objectFit: "cover" }}
            alt="圏"
          />
        </div>
        <div style={{ overflow: "scroll", height: "25vh" }}>
          <ul style={{ listStyle: "none" }}>
            <li>
              <details>
                <summary>小説家</summary>
                <ul>
                  <li>SF</li>
                  <li>実験小説</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>プログラマー</summary>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <details>
                      <summary>バックエンド</summary>
                      <ul>
                        <li>FastAPI/Python</li>
                        <li>Laravel/PHP</li>
                        <li>Ruby on Rails/Ruby</li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary>フロントエンド</summary>
                      <ul>
                        <li>React/TypeScript</li>
                        <li>React Native/TypeScript</li>
                        <li>Android/Java&Kotlin</li>
                        <li>iOS/Objective-C&Swift</li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary>3D&WebXR</summary>
                      <ul>
                        <li>Three.js&WebGL/TypeScript</li>
                        <li>Unity/C#</li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary>データベース</summary>
                      <ul>
                        <li>MySQL</li>
                        <li>PostgreSQL</li>
                        <li>Redis</li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary>クラウド</summary>
                      <ul>
                        <li>AWS</li>
                        <li>GCP</li>
                        <li>Firebase</li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary>その他システム</summary>
                      <ul>
                        <li>C/C++</li>
                        <li>Rust</li>
                        <li>Ocaml</li>
                        <li>Erlang</li>
                        <li>Lisp</li>
                        <li>Prolog</li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>データサイエンティスト</summary>
                <ul>
                  <li>AI開発/Python</li>
                  <li>データ解析/R</li>
                  <li>数値シミュレーション/Julia</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>ITコンサルタント</summary>
                <ul>
                  <li>システム化支援</li>
                  <li>IT講習</li>
                  <li>プログラミング講習</li>
                  <li>データサイエンス講習</li>
                  <li>SFプロトタイピング</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>数学者</summary>
                <ul>
                  <li>アルゴリズム開発</li>
                  <li>Coq&Alloyによるモデル検証</li>
                </ul>
              </details>
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

import {ActionManager, ExecuteCodeAction} from "@babylonjs/core/Actions";
import {Engine, Scene} from '@babylonjs/core';
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera";
import {GlowLayer} from "@babylonjs/core/Layers/glowLayer";
import {HighlightLayer} from "@babylonjs/core/Layers/highlightLayer";
import {HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight";
import {BackgroundMaterial} from "@babylonjs/core/Materials/Background/backgroundMaterial";
import {StandardMaterial} from "@babylonjs/core/Materials/standardMaterial";
import {CubeTexture} from "@babylonjs/core/Materials/Textures/cubeTexture";
import {DynamicTexture} from "@babylonjs/core/Materials/Textures/dynamicTexture";
import {Texture} from "@babylonjs/core/Materials/Textures/texture";
import {Color3, Color4} from "@babylonjs/core/Maths/math.color";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {BoxBuilder} from "@babylonjs/core/Meshes/Builders/boxBuilder";
import {CylinderBuilder} from "@babylonjs/core/Meshes/Builders/cylinderBuilder";
import {GroundBuilder} from "@babylonjs/core/Meshes/Builders/groundBuilder";
import {PlaneBuilder} from "@babylonjs/core/Meshes/Builders/planeBuilder";
import {SphereBuilder} from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Misc/observableCoroutine";
import {ParticleSystem} from "@babylonjs/core/Particles/particleSystem";
import '@babylonjs/loaders/glTF';
import {WaterMaterial} from "@babylonjs/materials";
import {useRouter} from 'next/router';
import React, {useRef, useEffect} from "react";

const createBgMaterial = (url, scene) => {
  const mat = new BackgroundMaterial("background-texture", scene);
  mat.diffuseTexture = new Texture(url, scene);
  return mat;
}

function createSkyboxTexture(rootUrl, scene) {
  return new CubeTexture(rootUrl, scene);
}

function createSkyBox(scene) {
  const skybox = BoxBuilder.CreateBox("skyBox", {size: 5000.0}, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  const skyboxTexture = createSkyboxTexture("static/assets3d/skyboxes/TropicalSunnyDay/TropicalSunnyDay", scene);
  skyboxMaterial.reflectionTexture = skyboxTexture;
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = Color3.Black();
  skyboxMaterial.specularColor = Color3.Black();
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;
  return skybox;
}

function createLargeGround(scene) {
  const largeGround = GroundBuilder.CreateGroundFromHeightMap("largeGround", 'static/assets3d/textures/valley.png',
    {width: 180, height: 260, subdivisions: 100, minHeight: 0, maxHeight: 40});
  const lgMat = new BackgroundMaterial("lgMag", scene);
  lgMat.diffuseTexture = new Texture("static/assets3d/textures/highGroundGrass.jpeg", scene);
  lgMat.shadowLevel = 0.4;
  lgMat.opacityFresnel = false;
  largeGround.material = lgMat;
  largeGround.position.y = -20;
  return largeGround;
}

function createWaterMaterial(scene) {
  var water = new WaterMaterial("water", scene);
  water.backFaceCulling = true;
  water.bumpTexture = new Texture("static/assets3d/textures/waterbump.png", scene);
  water.windForce = -10;
  water.waveHeight = 0.5;
  water.bumpHeight = 0.1;
  water.waveLength = 0.1;
  water.waveSpeed = 20;
  water.waterColor = Color3.FromHexString("#009c6d");
  water.colorBlendFactor = 0.3;
  return water;
}

function createWaterMesh(scene) {
  const waterMesh = GroundBuilder.CreateGround("waterMesh", {width: 160, height: 230}, scene);
  waterMesh.position.y = -16;
  waterMesh.position.z = 18;
  waterMesh.rotation.y = -0.03;
  return waterMesh;
}

function createWaterBlock(scene) {
  const waterBlock = CylinderBuilder.CreateCylinder("waterBlock", {diameter: 4, height: 88}, scene);
  const wbMat = new BackgroundMaterial("wbMat", scene);
  wbMat.diffuseTexture = new Texture("static/assets3d/textures/highGroundGrass.jpeg", scene);
  wbMat.shadowLevel = 0.4;
  wbMat.opacityFresnel = false;
  waterBlock.material = wbMat;
  waterBlock.position = new Vector3(80, -15, 89);
  waterBlock.rotation = new Vector3(0, Math.PI / 2.1, Math.PI / 2);
  return waterBlock;
}

function createBillboard(scene, highlightLayer, interval, router) {
  const frameMat = createBgMaterial("static/assets3d/textures/vgreen.jpeg");
  frameMat.shadowLevel = 0.4;
  frameMat.opacityFresnel = false;

  const pillar = CylinderBuilder.CreateCylinder("piller", {diameter: 4, height: 18}, scene);
  pillar.position = new Vector3(-24, -12, 4);
  pillar.material = frameMat;

  const bottomFrame = CylinderBuilder.CreateCylinder("bottomFrame", {diameter: 1.2, height: 71.8}, scene);
  bottomFrame.position = new Vector3(-24, -5, 4);
  bottomFrame.rotation = new Vector3(0, - Math.PI / 5.4, Math.PI / 2);
  bottomFrame.material = frameMat;

  const mat = new StandardMaterial("mat", scene);
  mat.diffuseTexture = new Texture("static/images/1.png", scene);
  mat.roughness = 1;
  const billboard = PlaneBuilder.CreatePlane("billboard", {width: 72, height: 38, sideOrientation: Mesh.DOUBLESIDE}, scene);
  billboard.position = new Vector3(-24, 14, 4);
  billboard.rotation = new Vector3(0, - Math.PI / 5.4, 0);
  billboard.material = mat;

  const board = Mesh.MergeMeshes([pillar, billboard, bottomFrame], true, true, undefined, false, true);

  highlightLayer.addMesh(board, Color3.FromHexString("#22747d"));
  const mouseHoverAction = new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
    highlightLayer.removeMesh(board);
    highlightLayer.addMesh(board, Color3.Green());
  });
  const mouseLeaveAction = new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
    highlightLayer.removeMesh(board);
    highlightLayer.addMesh(board, Color3.FromHexString("#22747d"));
  })

  const mouseClickAction = new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
    router.push("/play");
  })
  board.isPickable = true;
  board.actionManager = new ActionManager(scene);
  board.actionManager.registerAction(mouseHoverAction);
  board.actionManager.registerAction(mouseLeaveAction);
  board.actionManager.registerAction(mouseClickAction);

  let num = 1;
  interval.current = setInterval(() => {
    num = num + 1;
    if (num > 5) {
      num = 1;
    }
    billboard.material.diffuseTexture = new Texture(`static/images/${num}.png`, scene);
  }, 4000);

  return board;
}

function createBuoy(scene, highlightLayer, water, router) {
  const rightBuoy = SphereBuilder.CreateSphere("rightBuoy", {diameter: 6}, scene);
  const buoyMat = createBgMaterial("static/assets3d/textures/vgreen.jpeg", scene);
  buoyMat.opacityFresnel = false;
  rightBuoy.material = buoyMat;
  rightBuoy.position = new Vector3(22, -13, 20);
  rightBuoy.rotation = new Vector3(0, 2.1 * -Math.PI / 2, 0);

  const middleBuoy = rightBuoy.clone("middleBuoy");
  middleBuoy.position = new Vector3(-6.5, 0, 0);
  middleBuoy.material = buoyMat;
  middleBuoy.parent = rightBuoy;

  const leftBuoy = middleBuoy.clone("leftBuoy");
  leftBuoy.position = new Vector3(-13, 0, 0);
  leftBuoy.material = buoyMat;
  leftBuoy.parent = rightBuoy;

  highlightLayer.addMesh(rightBuoy, Color3.FromHexString("#22747d"));
  highlightLayer.addMesh(middleBuoy, Color3.FromHexString("#22747d"));
  highlightLayer.addMesh(leftBuoy, Color3.FromHexString("#22747d"));

  const baseBoard = BoxBuilder.CreateBox("baseboard", {width: 20, height: 1, depth: 0.2}, scene);
  const bbMat = createBgMaterial("static/assets3d/textures/vgreen.jpeg", scene);
  bbMat.opacityFresnel = false;
  baseBoard.material = bbMat;
  baseBoard.isPickable = true;
  baseBoard.position = new Vector3(-0.2, 3, 0);
  baseBoard.rotation = new Vector3(0, Math.PI / 23, 0);

  const textBoard = BoxBuilder.CreateBox("getStartedBoard", {width: 20, height: 4.5, depth: 0.2, sideOrientation: Mesh.DOUBLESIDE}, scene);
  textBoard.position = new Vector3(0, 3, 0);
  textBoard.isPickable = true;
  textBoard.parent = baseBoard
  var textTexture = new DynamicTexture("text", {width: 700, height: 100}, scene, true);
  var textMaterial = new StandardMaterial("tmat", scene);
  textMaterial.diffuseTexture = textTexture;
  textMaterial.emissiveColor = Color3.FromHexString("#4F5B06");
  textBoard.material = textMaterial;
  var font = "bold 100px Arial";
  textTexture.drawText("PLAY", 210, 86, font, "pink", "#0A5F5E", true, true);
  const tb = Mesh.MergeMeshes([baseBoard, textBoard], true, true, undefined, true, true);
  if (tb) {
    const mouseHoverAction = new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
      highlightLayer.removeAllMeshes();
      if (tb) {
        highlightLayer.addMesh(rightBuoy, Color3.Green());
        highlightLayer.addMesh(middleBuoy, Color3.Green());
        highlightLayer.addMesh(leftBuoy, Color3.Green());
        highlightLayer.addMesh(tb, Color3.Green());
      }
    });
    const mouseLeaveAction = new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
      highlightLayer.removeAllMeshes();
      highlightLayer.addMesh(rightBuoy, Color3.FromHexString("#22747d"));
      highlightLayer.addMesh(middleBuoy, Color3.FromHexString("#22747d"));
      highlightLayer.addMesh(leftBuoy, Color3.FromHexString("#22747d"));
    })
    const mouseClickAction = new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
      router.push("/play");
    })
    tb.parent = middleBuoy;
    tb.isPickable = true;
    tb.actionManager = new ActionManager(scene);
    tb.actionManager.registerAction(mouseHoverAction);
    tb.actionManager.registerAction(mouseLeaveAction);
    tb.actionManager.registerAction(mouseClickAction);
  }
  water.addToRenderList(rightBuoy);
  water.addToRenderList(leftBuoy);
  water.addToRenderList(middleBuoy);

  var particleSystem = new ParticleSystem("particles", 1000, scene);
  particleSystem.particleTexture = new Texture("static/assets3d/textures/vgreen.jpeg", scene);
  particleSystem.emitter = new Vector3(13.5, -4, 33);
  particleSystem.minEmitBox = new Vector3(14.3, -13, -10);
  particleSystem.maxEmitBox = new Vector3(14.3, -13, -10);
  particleSystem.color1 = Color4.FromHexString("#4385EC");
  particleSystem.color2 = Color4.FromHexString("#03C03C");
  particleSystem.colorDead = new Color4(0, 0, 0.2, 0.0);
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.5;
  particleSystem.minLifeTime = 2;
  particleSystem.maxLifeTime = 3.5;
  particleSystem.emitRate = 1500;
  particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
  particleSystem.gravity = new Vector3(0, -18, 0);
  particleSystem.direction1 = new Vector3(-2, 8, 2);
  particleSystem.direction2 = new Vector3(2, 8, -2);
  particleSystem.minAngularSpeed = 0;
  particleSystem.maxAngularSpeed = Math.PI;
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.updateSpeed = 0.025;
  particleSystem.start();
  return rightBuoy;
}

function writeTentopGreenPlace(scene) {
  const plane = BoxBuilder.CreateBox("label", {width: 19, height: 3.8, depth: 0.1}, scene);
  plane.position = new Vector3(26, -4, -100);
  plane.rotation = new Vector3(-Math.PI, 2 * - Math.PI / 2, 0);
  var textTexture = new DynamicTexture("text", {width: 700, height: 120}, scene, true);
  var textMaterial = new StandardMaterial("tmat", scene);
  textMaterial.diffuseTexture = textTexture;
  plane.material = textMaterial;
  var font = "bold 70px Arial";
  textTexture.drawText("Tentop Green Place", 30, 90, font, "green", "yellow", true, true);
  const highlightLayer = new HighlightLayer("hl2", scene);
  highlightLayer.addMesh(plane, Color3.Green());
}

function createMovingBuoy(scene, highighlightLayerightLayer, waterMaterial, router) {
  const buoy = createBuoy(scene, highighlightLayerightLayer, waterMaterial, router);
  scene.registerAfterRender(function () {
    let time = waterMaterial._lastTime / 100000;
    let x = buoy.position.x;
    let z = buoy.position.z;
    buoy.position.y = -16 + Math.abs((Math.sin(((x / 0.05) + time * waterMaterial.waveSpeed)) * waterMaterial.waveHeight * waterMaterial.windDirection.x * 5.0) + (Math.cos(((z / 0.05) + time * waterMaterial.waveSpeed)) * waterMaterial.waveHeight * waterMaterial.windDirection.y * 5.0));
  });
}

function* loadMeshesIntoFrames(scene, highlightLayer, interval, router, removeOverlay) {
  const skybox = createSkyBox(scene);
  yield;
  createLargeGround(scene);
  yield;
  const billboard = createBillboard(scene, highlightLayer, interval, router);
  yield;
  createWaterBlock(scene);
  yield;
  const waterMaterial = createWaterMaterial(scene);
  const waterMesh = createWaterMesh(scene);
  waterMaterial.addToRenderList(skybox);
  waterMaterial.addToRenderList(billboard);
  waterMesh.material = waterMaterial;
  yield createMovingBuoy(scene, highlightLayer, waterMaterial, router);
  yield writeTentopGreenPlace(scene);

  // workaround: to make sure to remove overlay layer
  yield removeOverlay();
  yield removeOverlay();
}

const onSceneReady = (scene, interval, router) => {
  const canvas = scene.getEngine().getRenderingCanvas();

  const camera = new ArcRotateCamera("Camera", 3 * Math.PI / 1.788, Math.PI / 1.9, 80, Vector3.Zero(), scene);
  camera.upperBetaLimit = Math.PI / 2;
  camera.panningSensibility = 0;
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light1", new Vector3(1, 0.5, 0), scene);
  light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(1, 1, 1);
  light.groundColor = new Color3(0, 0, 0);
  light.intensity = 1;

  const glLayer = new GlowLayer("glow", scene);
  glLayer.intensity = 0.6;
  const highlightLayer = new HighlightLayer("hl", scene);
  highlightLayer.intensity = 0.6;
  highlightLayer.innerGlow = true;

  scene.onBeforeRenderObservable.runCoroutineAsync(loadMeshesIntoFrames(scene, highlightLayer, interval, router, () => {
    const odiv = document.getElementById("overlaydiv");
    if (odiv) {
      try {
        odiv.style.cssText = "display: none;";
        odiv.remove();
      } catch (e) {console.log(e);}
    }
  }));
};

function Landing3D() {
  const router = useRouter();
  const reactCanvas = useRef(null);
  const interval = useRef(null);

  useEffect(() => {
    const {current: canvas} = reactCanvas;
    if (!canvas) return;

    const overlayDiv = document.createElement("div");
    overlayDiv.setAttribute("id", "overlaydiv");
    overlayDiv.style.cssText = "position:absolute; width: 100%; height: 100%; z-index: 1000; display: flex; justify-content: center; align-items: center; background: linear-gradient(217deg, rgba(155,2,100,.6), rgba(155,20,120,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.6), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.6), rgba(0,0,255,0) 70.71%);";
    const loadingText = document.createElement("p");
    loadingText.textContent = "Loading...";
    loadingText.style.cssText = "margin: auto; color: rgba(0,255,0,.8); font-size: 1.4rem; font-family: Rajdhani";
    overlayDiv.appendChild(loadingText);
    canvas.insertAdjacentElement("afterEnd", overlayDiv);

    const engine = new Engine(canvas, true, null, true);

    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);

    if (scene.isReady()) {
      onSceneReady(scene, interval, router);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, interval, trouter));
    }

    engine.runRenderLoop(() => {
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      clearInterval(interval.current);
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] relative">
      <canvas ref={reactCanvas} className="outline-none w-full h-full" />
    </div>
  );
}

export default Landing3D

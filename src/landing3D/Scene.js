import {Engine, Scene, Color4} from '@babylonjs/core';
import React, {useEffect, useRef} from "react";

export default ({antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest}) => {
    const reactCanvas = useRef(null);

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

        const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
        const scene = new Scene(engine, sceneOptions);
        scene.clearColor = new Color4(0, 0, 0, 0);
        if (scene.isReady()) {
            onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            if (typeof onRender === "function") onRender(scene);
            scene.render();
        });

        const resize = () => {
            scene.getEngine().resize();
        };

        if (window) {
            window.addEventListener("resize", resize);
        }

        return () => {
            scene.getEngine().dispose();

            if (window) {
                window.removeEventListener("resize", resize);
            }
        };
    }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

    return <canvas ref={reactCanvas} {...rest} />;
};

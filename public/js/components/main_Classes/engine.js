const Mathf = new CMathf();
const Quaternion = new CQuaternion();
const Mouse = new CMouse();

import { Renderer } from "./renderer.js";
import { BoxGeometry, MeshBasicMaterial } from "../additionals/THREE.module.js";
import { newCube } from "../object.js";
class Engine {
  constructor() {
    this.window = document.getElementById("renderer");
    this.renderer = new Renderer(this.window);
    this.frameRate = 100;
    this.renderer._camera.z = 5;

    this.currentScene = this.renderer._scene;
    this.selectedTexture;
    this.renderer._scene.CreteSelectorObject().then((obj) => {
      this.selectorPositionObject = obj;
      this.update();
    });

    this._updating = true;
  }
  set updating(truthy) {
    this._updating = truthy;
    update();
  }
  get updating() {
    return this._updating;
  }

  update() {
    setInterval(() => {
      if (this.updating) {
        this.renderer.render();
        this.renderer._scene.loop();
      }
    }, this.frameRate);
  }
  start() {
    //this.addObject("cube", "red");
  }
  addObject(volume, options) {
    const { type, position, color } = options;
    let index = this.renderer.scene.children.length;
    if (!this.currentScene) {
      return;
    }
    switch (volume) {
      case "box" || "cube":
        this.renderer._scene.addObject({
          id: index,
          geometry: new BoxGeometry(),
          material: new MeshBasicMaterial({ color }),
        });
        break;
      case "spawn":
        this.renderer._scene.spawnObject({
          type,
          position: position || this.selectorPositionObject.position,
          w: 0.1,
          h: 0.1,
        });
        break;

      default:
        console.warn("the shape you chose doesn't exist");
        this.renderer._scene.addObject({
          id: index,
          geometry: new BoxGeometry(),
          material: new MeshBasicMaterial({ color }),
        });
        break;
    }
    //if (!this.selectorPositionObject) return;
    this.renderer._scene.getElementByIndex(
      index
    ).position.x = this.selectorPositionObject.position.x;
    this.renderer._scene.getElementByIndex(
      index
    ).position.y = this.selectorPositionObject.position.y;
    this.renderer._scene.getElementByIndex(
      index
    ).position.z = this.selectorPositionObject.position.z;
    return index;
  }
}

export { Engine };

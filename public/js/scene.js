import { OBJLoader2 } from "./components/additionals/objLoader.js";
import * as THREE from "./components/additionals/THREE.module.js";
import { newCube, spawnBlock, OBject } from "./components/object.js";

class Scene {
  constructor(props) {
    this.scene = new THREE.Scene(props);
    this.scene.background = new THREE.Color("#87CEFA");
    this.objects = new Map();
    this.selector = {};
    this.selectedObject;
  }
  CreteSelectorObject() {
    let object = {
      id: this.scene.children.length,
      geometry: new THREE.SphereGeometry(),

      material: new THREE.MeshBasicMaterial({ color: "brown" }),
    };
    return new Promise((solve, reject) => {
      this.loadObj().then((obj) => {
        this.selector = newCube(
          new THREE.SphereGeometry(),
          new THREE.MeshBasicMaterial({ color: "white" })
        );
        /*this.selector = obj;
        this.selector.material = new THREE.MeshBasicMaterial({
          color: "white",
        });*/
        this.selector.scale.set(0.1, 0.1, 0.1);
        // add to the scene
        this.scene.add(this.selector);

        solve(this.selector);
      });
    });
    // connect the mesh and the texture
    //this.selector = newCube(object.geometry, object.material);

    return this.selector;
  }
  changePosOfSelector(newPos) {
    this.selector.position.x = newPos.x;
    this.selector.position.y = enwPos.y;
    this.selector.position.z = enwPos.z;
  }
  addObject(object) {
    let _object;
    // connect the mesh and the texture
    _object = newCube(object.geometry, this.selector.material);

    _object.name = object.name || _object.name;
    _object.name = object.id || _object.id;

    // add to the scene
    this.scene.add(_object);

    // stopped here
    this.objects.set(_object.id, new OBject(_object));
  }
  spawnObject(options) {
    let _object;
    // connect the mesh and the texture
    _object = spawnBlock(options);

    _object.name = options.name || "noniname";
    _object.name = options.id || "noniid";

    // add to the scene
    this.scene.add(_object);

    // stopped here
    this.objects.set(_object.id, new OBject(_object));
  }
  deleteObject(object) {
    object.geometry.dispose();
    object.material.dispose();

    // remove object
    this.scene.remove(object);
  }

  getObject(prop, val) {
    return this.scene.getObjectByProperty(prop, val);
  }
  loop() {
    if (this.selectedObject) {
    }
  }
  getElementByIndex(index) {
    return this.scene.getObjectById(this.scene.children[index].id);
  }
  loadObj() {
    return new Promise((solve, reject) => {
      let loader = new OBJLoader2();
      loader.load(
        "./obj/bRow.obj",
        solve, // called when loading is in progresses
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        function (error) {
          console.log(error);
        }
      );
    });
  }

  placeChunck(pos, perl) {
    const group = new THREE.Group();
    for (let x = pos.x - 100; x < pos.x + 100; x++) {
      for (let y = pos.y - 100; y < pos.y + 100; y++) {
        group.add(
          spawnBlock({
            type: "grass",
            position: new THREE.Vector3(
              x,
              -5 -
                parseInt(perl.noise(x * 600, y * 600, Math.random() * 600) * 7),
              y
            ),
          })
        );
      }
    }
    console.log("done");
    this.scene.add(group);
    console.log(this.scene.children);
  }
}

export { Scene };

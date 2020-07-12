import * as THREE from "./js/components/additionals/THREE.module.js";
import { Engine } from "./js/engine.js";
import { getMaterialFromImage } from "./js/components/textureLoader.js";
import { Perlin } from "./js/components/additionals/perln.js";

const colors = ["red", "blue", "green", "white", "brown"];

const renderer = document.getElementById("renderer");
const createButton = document.getElementById("createButton");
const randomColorButton = document.getElementById("randomColorButton");
const costumTextureButton = document.getElementById("costumTextureButton");
const spawnGrass = document.getElementById("spawnGrass");
const spawnWrold = document.getElementById("spawnWrold");

const spawnTree = document.getElementById("spawnTree");
let engine = new Engine();

engine.start();

const camera = engine.renderer.camera;

spawnTree.onclick = function () {
  let index = treespawner();
  engine.renderer.camera.lookAt(
    engine.renderer._scene.getElementByIndex(index).position
  );
};

spawnGrass.onclick = function () {
  let index = engine.addObject("spawn", {
    position: new THREE.Vector3(0, 0, 0),
    type: "grass",
  });
  engine.renderer.camera.lookAt(
    engine.renderer._scene.getElementByIndex(index).position
  );
};

spawnWrold.onclick = function spawnWorld() {
  let perl = new Perlin(50);
  engine.renderer._scene.placeChunck(new THREE.Vector3(0, 0), perl);
};

createButton.onclick = function create() {
  let type = "cube";
  let index = engine.addObject(type);
  engine.renderer.camera.lookAt(
    engine.renderer._scene.getElementByIndex(index).position
  );
};

randomColorButton.onclick = function setRandomColor() {
  engine.selectorPositionObject.material = new THREE.MeshBasicMaterial({
    color: colors[parseInt(Math.random() * colors.length)],
  });
};

costumTextureButton.onclick = function setRandomColor() {
  engine.selectorPositionObject.material = getMaterialFromImage(
    "textures/grass.png"
  );
};

renderer.onclick = function onDocumentMouseClick(event) {
  event.preventDefault();

  var vec = new THREE.Vector3(); // create once and reuse
  var pos = new THREE.Vector3(); // create once and reuse

  vec.set(
    ((event.clientX + engine.window.offsetLeft) / engine.window.offsetWidth) *
      2 -
      2,
    -((event.clientY + engine.window.offsetTop) / engine.window.offsetHeight) *
      2 +
      1,
    0.1
  );
  console.log(vec.x, vec.y);
  vec.unproject(camera);

  vec.sub(camera.position).normalize();

  //var distance = -camera.position.z / vec.z;

  pos.copy(camera.position).add(vec.multiplyScalar(camera.position.z));
  engine.selectorPositionObject.position.x = pos.x + 0.1;
  engine.selectorPositionObject.position.y = pos.y + 0.4;
  engine.selectorPositionObject.position.z = pos.z;

  var intersects = raycaster.intersectObjects(
    engine.renderer.scene.children,
    ""
  );
};

let isRightMB = false;

item.addEventListener("pressHold", (event) => {
  if (isRightMB) {
    rightClicked();
  }
});
let currentRotation = new THREE.Vector2(0, 0);
let sensitivity = 1;
let maxYAngle = 80;

function rightClicked() {
  var vec = new THREE.Vector3(); // create once and reuse
  var pos = new THREE.Vector3(); // create once and reuse
  vec.set(
    (clientX / window.innerWidth) * 2 - 1,
    -(clientY / window.innerHeight) * 2 + 1,
    0.5
  );

  currentRotation.x += vec.x * sensitivity;
  currentRotation.y -= vec.y * sensitivity;
  currentRotation.x = Mathf.Repeat(currentRotation.x, 360);
  currentRotation.y = Mathf.Clamp(currentRotation.y, -maxYAngle, maxYAngle);
  camera.rotation.x = currentRotation.x;
  console.log(currentRotation);
  vec.unproject(camera);

  vec.sub(camera.position).normalize();
  engine.renderer.camera.lookAt(engine.selectorPositionObject.position);
}

var raycaster = new THREE.Raycaster();

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  object.rotateX(THREE.Math.degToRad(degreeX));
  object.rotateY(THREE.Math.degToRad(degreeY));
  object.rotateZ(THREE.Math.degToRad(degreeZ));
}
function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
  pointIsWorld = pointIsWorld === undefined ? false : pointIsWorld;

  if (pointIsWorld) {
    obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }

  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset

  if (pointIsWorld) {
    obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }

  obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

function treespawner() {
  let index = engine.addObject("spawn", {
    position: new THREE.Vector3(0, 0, 0),
    type: "treeWood",
  });

  engine.addObject("spawn", {
    position: new THREE.Vector3(0, 1, 0),
    type: "treeWood",
  });
  engine.addObject("spawn", {
    position: new THREE.Vector3(0, 2, 0),
    type: "treeWood",
  });
  engine.addObject("spawn", {
    position: new THREE.Vector3(1, 2, 0),
    type: "leaves",
  });
  engine.addObject("spawn", {
    position: new THREE.Vector3(-1, 2, 0),
    type: "leaves",
  });
  engine.addObject("spawn", {
    position: new THREE.Vector3(0, 2, 1),
    type: "leaves",
  });
  engine.addObject("spawn", {
    position: new THREE.Vector3(0, 2, -1),
    type: "leaves",
  });
  engine.addObject("spawn", {
    position: new THREE.Vector3(0, 3, 0),
    type: "leaves",
  });
  return index;
}

const Mathf = new CMathf();
const Quaternion = new CQuaternion();
const Mouse = new CMouse();

class Engine {
  constructor() {
    this.window = document.getElementById("renderer");
    this.renderer = new Renderer(this.window);
    this.frameRate = 100;
    this.renderer._camera.z = 5;

    this.currentScene = this.renderer._scene;
    this.selectedTexture;

    this.selectorPositionObject = this.renderer._scene.CreteSelectorObject();

    this._updating = true;

    this.update();
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
    this.addObject("cube", "red");
  }
  addObject(type, color) {
    let index = this.renderer.scene.children.length;
    if (!this.currentScene) {
      return;
    }
    switch (type) {
      case "box" || "cube":
        this.renderer._scene.addObject({
          id: this.renderer.scene.children.length,
          geometry: new THREE.BoxGeometry(),
          material: new THREE.MeshBasicMaterial({ color }),
        });
        break;

      default:
        console.warn("the shape you chose doesn't exist");
        this.renderer._scene.addObject({
          id: this.renderer.scene.children.length,
          geometry: new THREE.BoxGeometry(),
          material: new THREE.MeshBasicMaterial({ color }),
        });
        break;
    }
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

let engine = new Engine();

engine.start();

function create(type = "box") {
  let index = engine.addObject(type);
  engine.renderer.camera.lookAt(
    engine.renderer._scene.getElementByIndex(index).position
  );
}
document.addEventListener("contextmenu", (e) => e.preventDefault());
let isRightMB = false;
const pressing = () => {
  if (isRightMB) {
    rightClicked();
  }
};
let currentRotation = new THREE.Vector2(0, 0);
let sensitivity = 1;
let maxYAngle = 80;
function rightClicked() {
  camera = engine.renderer.camera;

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
}

let colors = ["red", "blue", "green", "white", "brown"];
let isMouseDown = true;

var raycaster = new THREE.Raycaster();

function onDocumentMouseClick(event) {
  camera = engine.renderer.camera;
  event.preventDefault();

  var vec = new THREE.Vector3(); // create once and reuse
  var pos = new THREE.Vector3(); // create once and reuse

  vec.set(
    (event.clientX / (window.innerWidth - engine.window.offsetLeft)) * 2 - 1,
    -(event.clientY / (window.innerHeight - engine.window.offsetTop)) * 2 + 1,
    0.1
  );

  vec.unproject(camera);
  console.log(vec.x, vec.y);
  vec.sub(camera.position).normalize();

  //var distance = -camera.position.z / vec.z;

  pos.copy(camera.position).add(vec.multiplyScalar(camera.position.z));
  engine.selectorPositionObject.position.x = pos.x;
  engine.selectorPositionObject.position.y = pos.y;
  engine.selectorPositionObject.position.z = pos.z;
  console.log(engine.selectorPositionObject);
  var intersects = raycaster.intersectObjects(
    engine.renderer.scene.children,
    ""
  );
}
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

function setRandomColor() {
  engine.selectorPositionObject.material = new THREE.MeshBasicMaterial({
    color: colors[parseInt(Math.random() * colors.length)],
  });
}

let item = document;

let timerID;
let counter = 0;

let pressHoldEvent = new CustomEvent("pressHold");

// Listening for the mouse and touch events
item.addEventListener("mousedown", pressingDown, false);
item.addEventListener("mouseup", notPressingDown, false);
item.addEventListener("mousemove", updateMouse, false);
item.addEventListener("mouseleave", notPressingDown, false);

item.addEventListener("touchstart", pressingDown, false);
item.addEventListener("touchend", notPressingDown, false);

function pressingDown(e) {
  e = e || engine.window.event;

  if ("which" in e)
    // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
    isRightMB = e.which == 3;
  else if ("button" in e)
    // IE, Opera
    isRightMB = e.button == 2;

  // Start the timer
  requestAnimationFrame(timer);

  e.preventDefault();
}

function notPressingDown() {
  cancelAnimationFrame(timerID);
}

//
// Runs at 60fps when you are pressing down
//
function timer(e) {
  pressing(e);
  timerID = requestAnimationFrame(timer);
}
var clientX = 0;
var clientY = 0;
function updateMouse(e) {
  clientX = e.clientX;
  clienty = e.clientY;
}

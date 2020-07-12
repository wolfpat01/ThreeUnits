import { Scene } from "./scene.js";
import { Camera } from "./camera.js";
import { WebGLRenderer } from "./components/additionals/THREE.module.js";
class Renderer {
  constructor(body, id = "renderer") {
    this.renderer = new WebGLRenderer();
    this.width = 0;
    this.height = 0;
    this.renderer.setSize(this.width, this.height);

    this.body = document.getElementById(id);

    this.intersects = [];

    // default setup
    body.appendChild(this.renderer.domElement);

    this._scene = new Scene();
    this._camera = new Camera();

    this.onWindowResize();
  }
  get scene() {
    return this._scene.scene;
  }
  get camera() {
    return this._camera.camera;
  }
  set scene(newScene) {
    this._scene.scene = newScene;
  }
  set camera(newCamera) {
    this._camera.camera = newCamera;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    // setting variables
    let main = document.getElementById("renderer");
    let middle = document.getElementById("middle");

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let top = document.getElementById("top");
    let bottom = document.getElementById("bottom");

    let left = document.getElementById("leftMenu");
    let right = document.getElementById("rightMenu");

    // calculate window height and width

    let sumTTB = windowHeight - (top.offsetHeight + bottom.offsetHeight);
    let sumLTR = windowWidth - (left.clientWidth + right.clientWidth);

    this.height = sumTTB;
    this.width = sumLTR;
    if (this.height < 0) this.height = -this.height;
    if (this.width < 0) this.width = -this.width;
    main.style.height = this.height;
    main.style.Width = this.width;

    middle.style.height = this.height;
    middle.style.Width = this.width;

    console.log(main.offsetHeight, windowHeight, sumTTB);

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width - 10, this.height);
  }

  onTouch(event) {
    event.preventDefault();

    mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(yourObject3D);
    console.log(intersects);
  }

  eventListerners() {
    this.body.addEventListener(
      "touchend",
      (event) => this.ontouch(event),
      false
    );
    window.addEventListener(
      "resize",
      () => {
        this.onWindowResize();
      },
      false
    );
  }
}

export { Renderer };

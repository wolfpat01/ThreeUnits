let width = 0,
  height = 0;

setInterval(() => {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let top = document.getElementById("top");
  let bottom = document.getElementById("bottom");

  let left = document.getElementById("leftMenu");
  let right = document.getElementById("rightMenu");

  let sumTTB = windowHeight - (top.offsetHeight + bottom.offsetHeight);
  let sumLTR = windowWidth - (left.offsetWidth + right.offsetWidth);
  height = sumTTB;
  width = sumLTR;
}, 100);

class Renderer {
  constructor(body, id = "renderer") {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    console.log({ ...body });
    this.body = document.getElementById("renderer");
    body.appendChild(this.renderer.domElement);
    window.addEventListener(
      "resize",
      () => {
        this.onWindowResize();
      },
      false
    );

    this._scene = new Scene();
    this._camera = new Camera();
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
    let body = document.getElementById("renderer");
    this.camera.aspect = body.style.width / body.style.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(body.style.width, body.style.height);
  }
}

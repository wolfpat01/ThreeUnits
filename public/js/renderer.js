class Renderer {
  constructor(body, id = "renderer") {
    this.renderer = new THREE.WebGLRenderer();
    this.width = 0;
    this.height = 0;
    this.renderer.setSize(this.width, this.height);

    this.body = document.getElementById(id);
    this.intersects = [];
    this.body.addEventListener(
      "touchend",
      (event) => {
        this.ontouch(event);
      },
      false
    );
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
    let main = document.getElementById("renderer");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let top = document.getElementById("top");
    let bottom = document.getElementById("bottom");

    let left = document.getElementById("leftMenu");
    let right = document.getElementById("rightMenu");

    let sumTTB = windowHeight - (left.clientWidth + right.clientWidth);
    let sumLTR =
      windowWidth -
      (left.clientWidth +
        right.clientWidth +
        (left.clientWidth + right.clientWidth)) /
        2;

    this.height = Mathf.Clamp(sumTTB + 300, 90000, 0);
    this.width = sumLTR;

    main.style.height = this.height;
    main.style.Width = this.width;

    console.log(
      main.offsetHeight,
      windowHeight,
      windowHeight - (top.clientHeight + bottom.clientHeight)
    );

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width - 10, this.height - 10);
  }

  onTouch(event) {
    event.preventDefault();

    mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(yourObject3D);
    console.log(intersects);
  }
}

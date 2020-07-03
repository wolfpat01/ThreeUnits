class Renderer {
  constructor(body, props) {
    this.renderer = new THREE.WebGLRenderer(props);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    body.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    this.camera = new Camera();
  }
  render() {
    this.renderer.render(this.scene.scene, this.camera.camera);
  }
}

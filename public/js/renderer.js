class Renderer {
  constructor(body, props) {
    this.renderer = new THREE.WebGLRenderer(props);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    body.appendChild(this.renderer.domElement);

    this._scene = new Scene();
    this._camera = new Camera();
  }
  get scene(){
    return this._scene.scene
  }
  get camera(){
    return this._camera.camera
  }
  set scene(newScene){
    this._scene.scene = newScene
  }
  set camera(newCamera){
    this._camera.camera = newCamera
  }

  
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

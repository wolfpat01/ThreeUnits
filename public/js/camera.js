class Camera {
  constructor(a, b, c, d) {
    this.camera = new THREE.PerspectiveCamera(
      a || 75,
      b || window.innerWidth / window.innerHeight,
      c || 0.1,
      d || 1000
    );
    this.x = this.camer;
  }
  rotate() {}
  move() {}
  setPos(
    x = this.camera.possion.x,
    y = this.camera.possion.y,
    z = this.camera.possion.z
  ) {
    this.camera.possion.x = x;
    this.camera.possion.y = y;
    this.camera.possion.z = z;
  }
}

class Camera {
  constructor(a, b, c, d) {
    this._angle = 0
    this.radius = 0
    this.camera = new THREE.PerspectiveCamera(
      a || 75,
      b || window.innerWidth / window.innerHeight,
      c || 0.1,
      d || 1000
    );
   
  }
  
  get x(){
    return this.camera.position.x
  }
  set x(newX){
    this.camera.position.x = newX
  }
  get y(){
    return this.camera.position.y
  }
  set y(newY){
    this.camera.position.y = newY
  }
  get z(){
    return this.camera.position.z
  }
  set z(newZ){

    this.camera.position.z = newZ
  }
  get angle(){
    return this._angle
  }
  set angle(newAngle){
    this.camera.position.x = this.radius * Math.cos( newAngle );  
    this.camera.position.z = this.radius * Math.sin( newAngle );
    this._angle = newAngle
  }

  rotate(angle) {
    this.angle = this.angle+angle
  }
  move() {}
  setPos(
    x = this.camera.position.x,
    y = this.camera.position.y,
    z = this.camera.position.z
  ) {
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;
  }
  
}

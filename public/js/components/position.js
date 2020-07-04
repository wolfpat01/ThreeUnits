class Position {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  update(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  take() {
    return { x: this.x, y: this.y, z: this.z };
  }
  get x() {
    return this.x;
  }
  set x(newX) {
    this.x = newX;
  }
  get y() {
    return this.y;
  }
  set y(newY) {
    this.y = newY;
  }
  get z() {
    return this.z;
  }
  set z(newZ) {
    this.z = newZ;
  }
}

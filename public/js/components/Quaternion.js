class CQuaternion {
  Euler(x = 0, y = 0, z = 0) {
    let cy = Math.cos(x * 0.5);
    let sy = Math.sin(x * 0.5);
    let cp = Math.cos(y * 0.5);
    let sp = Math.sin(y * 0.5);
    let cr = Math.cos(z * 0.5);
    let sr = Math.sin(z * 0.5);

    let q = new THREE.Quaternion(0, 0, 0);
    q.w = cr * cp * cy + sr * sp * sy;
    q.x = sr * cp * cy - cr * sp * sy;
    q.y = cr * sp * cy + sr * cp * sy;
    q.z = cr * cp * sy - sr * sp * cy;

    return q;
  }
}

import * as three from "../additionals/THREE.module.js";

function getMaterialFromImage(dir) {
  var texture = new three.TextureLoader().load(dir);

  return new three.MeshBasicMaterial({
    map: texture,
    wireframe: false,
    transparent: true,
  });
}
export { getMaterialFromImage };

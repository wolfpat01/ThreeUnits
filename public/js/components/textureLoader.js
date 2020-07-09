import * as three from "./THREE.module.js";

function getMaterialFromImage(dir) {
  var texture = new three.TextureLoader().load(dir);

  return new three.MeshBasicMaterial({
    map: texture,
    wireframe: false,
  });
}
export { getMaterialFromImage };

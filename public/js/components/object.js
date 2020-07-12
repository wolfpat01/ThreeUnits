class OBject {
  constructor(object, id) {
    this.object = object;
  }
  set id(newId) {
    this.object.id = newId;
  }
  get id() {
    return this.object.id;
  }
}

import * as three from "./THREE.module.js";
import * as textureLoader from "./textureLoader.js";
import * as fis from "./fileHandler.js";

let blocks = [];
fis.readFile("./data/blocks.json").then((data) => {
  blocks = JSON.parse(data);
  readyUpBlocks();
});

function sphere() {}
const Geometry = new three.PlaneGeometry();

function newCube(geometry, material) {
  return new three.Mesh(geometry, material);
}
let materials = {};

function readyUpBlocks() {
  Object.keys(blocks).forEach((name) => {
    materials[name] = MaterialBlock(name);
  });
  console.log("everything is ready", materials);
}

function spawnBlock(options) {
  const { type, position, w = 10, h = 10 } = options;

  const materialBlock = materials[type];
  const { x, y, z } = position;
  let group = new three.Group();

  const bt = new three.Mesh(Geometry, materialBlock[0]);

  bt.position.x = x;
  bt.position.y = y - 0.5;
  bt.position.z = z;

  bt.rotation.x = Math.PI / 2;

  group.add(bt);

  const top = new three.Mesh(Geometry, materialBlock[1]);
  top.position.x = x;
  top.position.y = y + 0.5;
  top.position.z = z;

  top.rotation.x = -Math.PI / 2;

  group.add(top);

  const s0 = new three.Mesh(Geometry, materialBlock[2]);
  s0.position.x = x + 0.5;
  s0.position.y = y;
  s0.position.z = z;

  s0.rotation.y = Math.PI / 2;

  group.add(s0);

  const s1 = new three.Mesh(Geometry, materialBlock[3]);
  s1.position.x = x - 0.5;
  s1.position.y = y;
  s1.position.z = z;

  s1.rotation.y = -Math.PI / 2;

  group.add(s1);

  const s2 = new three.Mesh(Geometry, materialBlock[4]);
  s2.position.x = x;
  s2.position.y = y;
  s2.position.z = z + 0.5;

  s2.rotation.y = Math.PI * 2;

  group.add(s2);

  const s3 = new three.Mesh(Geometry, materialBlock[5]);
  s3.position.x = x;
  s3.position.y = y;
  s3.position.z = z - 0.5;

  s3.rotation.y = Math.PI;

  group.add(s3);

  return group;
}

function MaterialBlock(type) {
  return setMat(blocks[type]);
}

function setMat(array) {
  return array.map((a) => {
    return textureLoader.getMaterialFromImage(a);
  });
}

export { newCube, spawnBlock, OBject };

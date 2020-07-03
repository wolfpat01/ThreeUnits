var scene = new Scene();
var renderer = new Renderer(document.body);
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

scene.addObject({
  geometry: new THREE.BoxGeometry(),
  material: new THREE.MeshBasicMaterial({ color: 0xffffff }),
});

function animate() {
  requestAnimationFrame(animate);

  scene.loop();

  renderer.render();
}
animate();

let isMouseDown = true;
let radious = 5;

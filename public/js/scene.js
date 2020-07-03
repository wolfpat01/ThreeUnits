class Scene {
  constructor(props) {
    this.scene = new THREE.Scene(props);
    this.objects = new Map();
  }

  addObject(object) {
    // connect the mesh and the texture
    var cube = new THREE.Mesh(object.geometry, object.material);

    // add to the scene
    this.scene.add(cube);

    // stopped here
    this.objects.set("");
  }
  deleteObject(object) {
    object.geometry.dispose();
    object.material.dispose();

    // remove object
    this.scene.remove(object);
  }

  getObject(prop, val) {
    return this.scene.getObjectByProperty(prop, val);
  }
  loop() {
    let objei = this.getObject("id", "1");
  }
}

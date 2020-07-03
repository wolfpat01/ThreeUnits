class Scene {
  constructor(props) {
    this.scene = new THREE.Scene(props);
    this.objects = new Map();
  }

  addObject(object) {
    let _object;
    // connect the mesh and the texture
    _object = newCube(object.geometry, object.material);

    _object.name = object.name|| _object.name;
    _object.name = object.id|| _object.id;

    // add to the scene
    this.scene.add(_object);

    // stopped here
    this.objects.set(_object.id,_object);
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
  getElementByIndex(index){
    return this.scene.getObjectById(this.scene.children[index].id)
  }
}

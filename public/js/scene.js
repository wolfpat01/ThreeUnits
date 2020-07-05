class Scene {
  constructor(props) {
    this.scene = new THREE.Scene(props);
    this.objects = new Map();
    this.selector;
  }
  CreteSelectorObject() {
    let object = {
      id: this.scene.children.length,
      geometry: new THREE.SphereGeometry(),

      material: new THREE.MeshBasicMaterial({ color: "brown" }),
    };

    // connect the mesh and the texture
    this.selector = newCube(object.geometry, object.material);

    this.selector.name = "selector";
    this.selector.scale.x = 0.2;
    this.selector.scale.y = 0.2;
    this.selector.scale.z = 0.2;
    // add to the scene
    this.scene.add(this.selector);
    return this.selector;
  }
  changePosOfSelector(newPos) {
    this.selector.position.x = newPos.x;
    this.selector.position.y = enwPos.y;
    this.selector.position.z = enwPos.z;
  }
  addObject(object) {
    let _object;
    // connect the mesh and the texture
    _object = newCube(object.geometry, this.selector.material);

    _object.name = object.name || _object.name;
    _object.name = object.id || _object.id;

    // add to the scene
    this.scene.add(_object);

    // stopped here
    this.objects.set(_object.id, new OBject(_object));
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
  getElementByIndex(index) {
    return this.scene.getObjectById(this.scene.children[index].id);
  }
}

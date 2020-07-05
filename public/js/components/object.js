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

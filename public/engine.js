

class Engine{
  constructor(){

    this.renderer = new Renderer(document.getElementById("renderer"));

    this.frameRate= 100
    this.renderer._camera.z = 5

    this.currentScene=this.renderer._scene;
    this.selectedTexture;
    
    this._updating=true;

    this.update()
  }
    set updating(truthy){
      this._updating = truthy;
      update()
    }
    get updating(){
      return this._updating
    }

    update() {
      setInterval(()=>{
        if(this.updating){

        this.renderer.render()
        this.renderer._scene.loop()

        }
      },this.frameRate)
    }
    start(){

      this.addObject("cube","red")
    }
    addObject(type,color){
      let index = this.renderer.scene.children.length
      if(!this.currentScene){return }
      switch (type) {
        case "box"||"cube":
          this.renderer._scene.addObject({
            id: this.renderer.scene.children.length,
            geometry: new THREE.BoxGeometry(),
            material: new THREE.MeshBasicMaterial({ color }),
          });
          break;
      
        default:
          console.warn("the shape you chose doesn't exist")
          this.renderer._scene.addObject({
            id: this.renderer.scene.children.length,
            geometry: new THREE.BoxGeometry(),
            material: new THREE.MeshBasicMaterial({ color }),
          });
          break;
      }
      this.renderer._scene.getElementByIndex(index).position.x = Math.random()*10-5
      this.renderer._scene.getElementByIndex(index).position.y = Math.random()*10-5
      this.renderer._scene.getElementByIndex(index).position.z = Math.random()*10-5
      return index
    }
}

let engine = new Engine();

engine.start();

function create(type="box",texture=engine.selectedTexture){
  this.selectedTexture = texture;
  let index = engine.addObject(type,texture)
  engine.renderer.camera.lookAt(engine.renderer._scene.getElementByIndex(index).position)
}

canvas.requestPointerLock()
let colors=["red",'blue',"green","white","brown"]
class CMouse {
  get x() {
    return clientX;
  }
  get y() {
    return clientY;
  }
}

////////////////////// mouse click/Hold detection
var clientX = 0;
var clientY = 0;

item = document.getElementById("renderer");

let timerID;
let counter = 0;

let isMouseDown = true;

let pressHoldEvent = new CustomEvent("pressHold");
// Listening for the mouse and touch events
item.addEventListener("mousedown", keyDown, false);
item.addEventListener("mouseup", keyUp, false);
item.addEventListener("mousemove", updateMouse, false);
item.addEventListener("mouseleave", keyUp, false);

item.addEventListener("touchstart", keyDown, false);
item.addEventListener("touchend", keyUp, false);

function keyDown(e) {
  e = e || engine.window.event;

  if ("which" in e)
    // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
    isRightMB = e.which == 3;
  else if ("button" in e)
    // IE, Opera
    isRightMB = e.button == 2;

  // Start the timer
  requestAnimationFrame(timer);

  e.preventDefault();
}

function keyUp() {
  cancelAnimationFrame(timerID);
}

//
// Runs at 60fps when you are pressing down
//
function timer(e) {
  item.dispatchEvent(pressHoldEvent);
  timerID = requestAnimationFrame(timer);
}

function updateMouse(e) {
  clientX = e.clientX;
  clienty = e.clientY;
}
//////////////////////

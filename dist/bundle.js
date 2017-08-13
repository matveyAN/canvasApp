/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


const canvas = document.getElementById('art');
let ctx = canvas.getContext('2d');
let cPushArray = [""];
let cStep = 0;
let colors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange', 'pink', 'black', 'white', 'ebebeb'];

function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function mouseMove(evt) {
  let mousePos = getMousePos(canvas, evt);
  ctx.lineTo(mousePos.x, mousePos.y);
  ctx.stroke();
  ctx.lineWidth = document.getElementById('selWidth').value;
}

canvas.addEventListener('mousedown', evt => {
  let mousePos = getMousePos(canvas, evt);
  ctx.beginPath();
  ctx.moveTo(mousePos.x, mousePos.y);
  cPush();
  evt.preventDefault();
  canvas.addEventListener('mousemove', mouseMove, false);
});

canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', mouseMove, false);
}, false);

document.getElementById('reset').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}, false);

function listener(i) {
  document.getElementById(colors[i]).addEventListener('click', () => {
    ctx.strokeStyle = colors[i];
  }, false);
}

for(let i = 0; i < colors.length; i++) {
  listener(i);
}

function cPush() {
  if (cStep < cPushArray.length) { cPushArray.length = cStep; }
  let image = canvas.toDataURL();
  cPushArray.push(image);
  ++cStep;
}

function cUndo() {
  if (cStep > 0) {
  cStep--;
  let canvasPic = new Image();
  canvasPic.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    ctx.drawImage(canvasPic, 0, 0);
  }
  canvasPic.src = cPushArray[cStep];     
  } 
}

document.getElementById("undo").addEventListener('click', () => {
  cUndo();
  return false;
});

function cRedo() {
  if (cStep < cPushArray.length - 1) {
    cStep++;
    let canvasPic = new Image();
    canvasPic.onload = () => { ctx.drawImage(canvasPic, 0, 0); }
    canvasPic.src = cPushArray[cStep];
  }
}

document.getElementById("redo").addEventListener('click', () => {
  cRedo();
  return false;
});







/***/ })
/******/ ]);
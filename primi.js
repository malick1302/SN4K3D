import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

let camera, scene, renderer;
let snake = [];
let food;
let boxSize = 3;
let direction = 'RIGHT';
let clock = new THREE.Clock();
let moveInterval = 0.15; 
let accumulator = 0;
let score = 0;
let isGameOver = false;
const gridSize = 20;
const canvas = document.getElementById('c');
const size = 700;


const sharedGeometry = new THREE.TorusKnotGeometry(1, 1.6, 20, 8, 13, 10);
const headMaterial = new THREE.MeshPhysicalMaterial({ color: 0x00ffb3, metalness: 0, roughness: 0 });
const bodyMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffff00, metalness: 0, roughness: 0 });
const foodMaterial = new THREE.MeshPhysicalMaterial({ color: 0xff0066, metalness: 0, roughness: 0 });


init();
animate();





function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
  camera.position.z = 120;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(size, size);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);

  addLights();
  drawGridBorder();
  animateTorus();


  const head = createTorusKnot(headMaterial);
  head.position.set(0, 0, 0);
  scene.add(head);
  snake.push(head);

  spawnFood();

  document.addEventListener('keydown', handleKey);
}





function addLights() {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 10);
  scene.add(light);
}





function drawGridBorder() {
  const size = boxSize * gridSize;
  const geometry = new THREE.BoxGeometry(size, size, 4.0 );
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x66666 }));
  scene.add(line);
}





function createTorusKnot(material) {
  return new THREE.Mesh(sharedGeometry, material);
}




function spawnFood() {
  if (food) scene.remove(food);

  let x, y, valid = false;
  const halfGrid = gridSize / 2;

  while (!valid) {
    x = (Math.floor(Math.random() * gridSize) - halfGrid) * boxSize;
    y = (Math.floor(Math.random() * gridSize) - halfGrid) * boxSize;

    valid = !snake.some(segment => segment.position.x === x && segment.position.y === y);
  }

  food = createTorusKnot(foodMaterial);
  food.position.set(x, y, 0);
  scene.add(food);
}



function handleKey(e) {
  const key = e.keyCode;
  if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
  else if (key === 38 && direction !== 'DOWN') direction = 'UP';
  else if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
  else if (key === 40 && direction !== 'UP') direction = 'DOWN';
}


function animate() {
  if (isGameOver) return;

  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  accumulator += delta;

  if (accumulator > moveInterval) {
    updateSnake();
    accumulator = 0;
  }

  snake.forEach(segment => {
    segment.rotation.x += 0.15;
    segment.rotation.y += 0.15; 
  });
  if (food) {
    food.rotation.x += 0.05; 
    food.rotation.y += 0.05; 
  }

  renderer.render(scene, camera);
}

function resizeCanvas() {
  const canvas = document.querySelector('canvas');
  const header = document.querySelector('header'); 
  // const headerHeight = header ? header.offsetHeight : ; 

  // const width = window.innerWidth; 
  // const height = window.innerHeight - headerHeight; 


  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);


function updateSnake() {
  const head = snake[0];
  const newHead = createTorusKnot(headMaterial);

  let x = head.position.x;
  let y = head.position.y;

  if (direction === 'LEFT') x -= boxSize;
  if (direction === 'RIGHT') x += boxSize;
  if (direction === 'UP') y += boxSize;
  if (direction === 'DOWN') y -= boxSize;

  newHead.position.set(x, y, 0);


  if (newHead.position.distanceTo(food.position) < boxSize / 1.5) {
    score++;
    console.log("Score:", score);
    spawnFood();
  } else {
    const tail = snake.pop();
    scene.remove(tail);
  }

  scene.add(newHead);
  snake.unshift(newHead);

  if (
    Math.abs(x) > boxSize * gridSize / 2 ||
    Math.abs(y) > boxSize * gridSize / 2 ||
    checkSelfCollision(newHead)
  ) {
    isGameOver = true;
    alert(" Game Over!\nScore: " + score);
  }
}




function checkSelfCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.position.distanceTo(snake[i].position) < boxSize / 1.5) {
      return true;
    }
  }
  return false;
}



  
function animateTorus(){
  THREE.LoopPingPong;
  THREE.InterpolateSmooth;

}


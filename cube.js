import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';


let camera, scene, renderer, cube;

function main() {
    //Création du caneva
    const canvas = document.querySelector('#c');
    //renderer sa mission : charger les données fournies et les effectuer dnas le canvas
    renderer = new THREE.WebGLRenderer({antialias: true, canvas});


    //Création d'une caméra
    //fov = champ de vision
    const fov = 75;
    //aspect = ratio d'affichage dans le canvea
    const aspect = 2;
    const near = 0.1;
    const far = 5;
     camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    //Création de la Scène : 
    scene = new THREE.Scene();

    //step-3 - LA LUMIERE 
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
//position legere sur la gauche, au dessus, et derriere la caméra
light.position.set(-1, 2, 4);
scene.add(light);
//FIN DE LA STEP - 3

    //Creation de la Géometry : 
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);


//il faut utiliser Phong pour jouer avec les couleurs et le slumières 

const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

    //Creation du Mesh = Material + Geometry
 cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    
    render();
}




//step 2 - L ' ANIMATION 

function render(time) {
    time *= 0.001; 
   
    cube.rotation.x = time;
    cube.rotation.y = time;
   
    renderer.render(scene, camera);
    
   
    requestAnimationFrame(render);
  }


  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});
   
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
   
    cube.position.x = x;
   
    return cube;
  } 
  
  
  main();
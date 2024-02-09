import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';


// import * as dat from 'dat.gui';

import { add_background } from './logic/background.js';
import { load_model_function } from "./logic/model_load.js";
import { objectModelsComp } from './logic/model_load.js';

import { show_input } from './logic/input_dialog.js';
import { isInputStatus } from './logic/input_dialog.js';

const renderer= new THREE.WebGL1Renderer();

// renderer.setClearColor(0xFFEA0);
renderer.shadowMap.enabled= true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


export const scene= new THREE.Scene();
scene.background= add_background();

//++++++++++ CAMERA +++++++++
const camera= new THREE.PerspectiveCamera(
    45, //ANGLE DISTANCE
    window.innerWidth / window.innerHeight,
    0.1, //MIN RANGE OF SIGHT
    1000 //MAX RANGE OF SIGHT
);
camera.position.set(0, 50, 70);

//+++++++ ORBIT SCREEN CONTROLLER ++++++++
const orbit= new OrbitControls(camera, renderer.domElement);
orbit.update();

const axesHelper= new THREE.AxesHelper(3);
scene.add(axesHelper);

// +++++++++++ GRID HELPER ++++++++++++++++++
const gridHelper= new THREE.GridHelper(30); 
scene.add(gridHelper);

//++++++++ AMBIENT LUGHT ++++++++++
const ambientLight= new THREE.AmbientLight(0x333333, 160.0);
scene.add(ambientLight);

// +++++++++++ SPOT LIGHT ++++++++++++++++++
// const spotLight= new THREE.SpotLight(0xFFFFFF, 200000);
// spotLight.position.set(-135, 100, -10);
// spotLight.castShadow= true;
// spotLight.angle= 0.25;
// // scene.add(spotLight);

// // +++++++++++ SPOTLIGHT HELPER ++++++++++++++++++
// const sLightHelper= new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper);

//+++++++++++++ MOUSE EVENT LISTENER +++++++++++++++++
const mousePosition= new THREE.Vector2();
// window.addEventListener('mousemove', function(e){
//     mousePosition.x= (e.clientX / this.window.innerWidth) * 2 -1;
//     mousePosition.y = - (e.clientY / this.window.innerHeight) * 2 + 1;
// });


//++++++++++++ RAYCASTER +++++++++++++++
const rayCaster= new THREE.Raycaster();

load_model_function();

// console.log("This is children");
// console.log(scene.children);
//++++++ ANIMATION FUNCTION ON CLICK LISTENER ++++++++++
var objectProperties= [];
var lastObject= null;
//var doubleClickTime = 250; // Time in milliseconds between two clicks to consider it a double-click
var lastClickTime = 0;
var lastMousePosition = new THREE.Vector2();
function animate(event){
    mousePosition.x= (event.clientX / window.innerWidth) * 2 -1;
    mousePosition.y = - (event.clientY / window.innerHeight) * 2 + 1;

    rayCaster.setFromCamera(mousePosition, camera);
    
    const intersects= rayCaster.intersectObjects(objectModelsComp);
    


    console.log(intersects.length);
    if (intersects.length != 0){
        if (lastObject !== null && lastObject.name !== intersects[0].object.name){
            lastObject.material.color.set(new THREE.Color(1, 1, 1)); //RESETIING COLOR TO NEUTRAL
            lastObject= null;
        }else{
            const intersected_object= intersects[0].object;
            intersected_object.material.color.set(new THREE.Color(7.5, 7.5, 7.5));
            lastObject= intersected_object;
        }
    }

    //event.preventDefault(); Guessed to prevent automatic clicl of mouse at the first run of a page
    var currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 250) {
        // Perform double-click action
        console.log('Double-clicked!');
    }

    lastClickTime = currentTime;

    // if (!isInputStatus){
    //     if (event.isTrusted){
    //         if (intersects.length != 0){
    //             const intersected_object= intersects[0].object;
    //             show_input(intersected_object.name);
    //             objectProperties.push(intersected_object.name);
    //         }
    //     }
    // }
    
    // lastMousePosition.copy(mousePosition);
    renderer.render(scene, camera);
    
}

function mouse_movement(event){
    
}

renderer.setAnimationLoop(animate);

// TO PREVENT AUTOMATIC CLICKING OF THE OBJECT, Check if the click event was triggered by an actual mouse click
// window.addEventListener('click', animate, false);
// Add event listeners
document.addEventListener('dblclick', animate, false);
document.addEventListener('mousemove', animate, false);
//doubleClick seconds time 250 

window.addEventListener('resize', function () {
    camera.aspect= this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
 });
 


// module.exports= {};


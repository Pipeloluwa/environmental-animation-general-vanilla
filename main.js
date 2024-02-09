import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


// import * as dat from 'dat.gui';

import { load_text } from './logic/text_geometry.js';
import { add_background } from './logic/background.js';

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
camera.position.set(0, 2, 255);

//+++++++ ORBIT SCREEN CONTROLLER ++++++++
const orbit= new OrbitControls(camera, renderer.domElement);
orbit.update();

const axesHelper= new THREE.AxesHelper(3);
scene.add(axesHelper);

// +++++++++++ GRID HELPER ++++++++++++++++++
const gridHelper= new THREE.GridHelper(60, 20); 
scene.add(gridHelper);

// // +++++++++++ PLANE GEOMETRY ++++++++++++++++++
// const planeGEOMETRY= new THREE.PlaneGeometry(100, 50);
// const planeMaterial= new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide}); //WE SET IT TO DOUBLE SIDE, SO THE PLANE WILL STILL BE VISIBLE FROM THE OTHER SIDE WHEN THE CAMERA IS TURNED
// //++++++ WE USED MESH BASIC MATERIAL FOR THE MESHES BECAUSE THAT WE MAKE US MESH THEM WITHOUT HAVING TO ADD LIGHT SOURCE TO THE SCENE 
// const plane= new THREE.Mesh(planeGEOMETRY, planeMaterial);
// scene.add(plane);
// //TO MAKE THE PLANE MATCH THE GRID WE CREATED BELOW, WE NEED TO ROTATE IT USING THE CODE BELOW
// plane.rotation.x= -0.5 * Math.PI;

// plane.receiveShadow= true;

//++++++++ AMBIENT LUGHT ++++++++++
const ambientLight= new THREE.AmbientLight(0x333333, 160.0);
scene.add(ambientLight);


// +++++++++++++++ POINT LIGHTS +++++++++++++++++
const pointLight= new THREE.PointLight(0xff6666, 1, 1000);
pointLight.castShadow= true;
// pointLight.shadow.mapSize.width= 4096;
// pointLight.shadow.mapSize.height= 4096;
scene.add(pointLight);

// +++++++++++++++ POINT LIGHT2 +++++++++++++++++
const pointLight2= new THREE.PointLight(0x33ff33, 1, 1000);
pointLight2.castShadow= true;
// pointLight.shadow.mapSize.width= 4096;
// pointLight.shadow.mapSize.height= 4096;
scene.add(pointLight);



//+++++++++++++ MOUSE EVENT LISTENER +++++++++++++++++
const mousePosition= new THREE.Vector2();
// window.addEventListener('mousemove', function(e){
//     mousePosition.x= (e.clientX / this.window.innerWidth) * 2 -1;
//     mousePosition.y = - (e.clientY / this.window.innerHeight) * 2 + 1;
// });


//++++++++++++ RAYCASTER +++++++++++++++
const rayCaster= new THREE.Raycaster();
load_text();

// console.log("This is children");
// console.log(scene.children);
//++++++ ANIMATION FUNCTION ON CLICK LISTENER ++++++++++

function animate(event){

    if (camera.position.z > 70){
        scene.rotation.x += 0.05;
        scene.rotation.z += 0.01;
        console.log("X ROTATION");
        console.log(scene.rotation.x);
        console.log("Z ROTATION");
        console.log(scene.rotation.z);

        camera.position.z -= 1;
    }else{
        scene.rotation.x = 15.0;
        scene.rotation.z = 0.0;

        // if (scene.rotation.x.){}
        scene.rotation.x = 0;
        scene.rotation.z = 0;
    }



    mousePosition.x= (event.clientX / window.innerWidth) * 2 -1;
    mousePosition.y = - (event.clientY / window.innerHeight) * 2 + 1;

    rayCaster.setFromCamera(mousePosition, camera);
    
    const intersects= rayCaster.intersectObjects(scene.children);
    
    for (let i= 0; i < intersects; i++ ){
        console.log(intersects[i]);
    }
    // TO PREVENT AUTOMATIC CLICKING OF THE OBJECT, Check if the click event was triggered by an actual mouse click
    if (intersects.length != 0){
        const intersected_object= intersects[0].object;
        intersected_object.material.color.set(new THREE.Color(7.5, 7.5, 7.5));
        

    }
    
    renderer.render(scene, camera);
    
}

renderer.setAnimationLoop(animate);

// TO PREVENT AUTOMATIC CLICKING OF THE OBJECT, Check if the click event was triggered by an actual mouse click
window.addEventListener('mousemove', animate, false);

window.addEventListener('resize', function () {
    camera.aspect= this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
 });
 


// module.exports= {};


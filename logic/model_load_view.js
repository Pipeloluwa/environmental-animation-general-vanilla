import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// import { scene_view_model } from '../view_model';
import { scene_view_model } from '../view_model';



// +++++++++++ box2 GEOMETRY ++++++++++++++++++
export let objectTrasverseModels2= new THREE.Object3D();
export let objectModelsComp2= new THREE.Group();
export let box2= new THREE.Mesh();

export function load_model_function2(){
    const modelUrl= new URL('../models/room/scene.gltf', import.meta.url);
    const modelLoader= new GLTFLoader();
    let objectModel= new THREE.Object3D();

    modelLoader.load(modelUrl.href, function(gltf){
        objectModel= gltf.scene;
        objectModel.position.set(0, 0, 0);
        objectModel.receiveShadow= true;
        scene_view_model.add(objectModel);

        // console.log(scene_view_model);
        objectModel.traverse((child) => {
            // console.log(child);
            
            if (child.isGroup){
                objectModelsComp2= child.children[0].children[0].children;
                // console.log(objectModelsComp2);

                objectTrasverseModels2= child.children[0].children[0];
                // console.log(objectTrasverseModels2);
            
                // console.log(objectModelsComp2);
                // scene_view_model.add(objectModelsComp2[2]);
            }            
        });
    }, undefined, function(error){console.error(error);});

    objectModel.position.needsUpdate= true;
}
// objectModel.position.needsUpdate= true;




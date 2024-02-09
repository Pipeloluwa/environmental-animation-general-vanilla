import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// import { scene } from '../view_model';
import { scene } from '../add_model';



// +++++++++++ BOX GEOMETRY ++++++++++++++++++
export let objectTrasverseModels= new THREE.Object3D();
export let objectModelsComp= new THREE.Group();
export let box= new THREE.Mesh();

export function load_model_function(){
    const modelUrl= new URL('../models/room/scene.gltf', import.meta.url);
    const modelLoader= new GLTFLoader();
    let objectModel= new THREE.Object3D();

    modelLoader.load(modelUrl.href, function(gltf){
        objectModel= gltf.scene;
        objectModel.position.set(0, 0, 0);
        objectModel.receiveShadow= true;
        scene.add(objectModel);

        // console.log(scene);
        objectModel.traverse((child) => {
            // console.log(child);
            
            if (child.isGroup){
                objectModelsComp= child.children[0].children[0].children;
                // console.log(objectModelsComp);

                objectTrasverseModels= child.children[0].children[0];
                // console.log(objectTrasverseModels);
            
                // console.log(objectModelsComp);
                // scene.add(ObjectModelsComp[2]);
            }            
        });
    }, undefined, function(error){console.error(error);});

    objectModel.position.needsUpdate= true;
}
// objectModel.position.needsUpdate= true;




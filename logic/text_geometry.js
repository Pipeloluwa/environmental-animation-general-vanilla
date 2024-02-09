import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';

//FONTS IMPORT
// import gentilisFont from 'three/examples/fonts/gentilis_bold.typeface.json';
// import optimerFont from 'three/examples/fonts/optimer_bold.typeface.json';
// import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
// import * as dat from 'dat.gui';
// import { Interaction } from 'three.interaction';

import { scene } from '../main';


// const textMaterial= new THREE.MeshNormalMaterial();
// to normalize standard rgb color to three js rgb, one divides each value by 255 
const textMaterial= [
    new THREE.MeshPhongMaterial({color: new THREE.Color("#F364a5")}), //front
    new THREE.MeshPhongMaterial({color: new THREE.Color("#870740")}), //
    // new THREE.MeshPhongMaterial({color: new THREE.Color(96/255, 26/255, 60/255, 1)}), //side
    ];

// +++++++++++ BOX GEOMETRY ++++++++++++++++++
export function load_text(){
    const loader= new FontLoader();

    loader.load('fonts_json/droid/droid_sans_regular.typeface.json', function(font){
        const textGeometry= new TextGeometry(
            'Add Model', {
                font: font,
                size: 4.5,
                height: 3,
                // curveSegments: 12,
                // bevelEnabled: true,
                // bevelThickness: 10,
                // bevelSize: 8,
                // bevelOffset: 0,
		        // bevelSegments: 5
            }
        );
    
        const text= new THREE.Mesh(textGeometry, textMaterial)
        text.castShadow= true;
        text.position.x= -49;
        text.position.y= 0;
        scene.add(text);




        const textGeometry2= new TextGeometry(
            'View Models', {
                font: font,
                size: 4.5,
                height: 5,
                // curveSegments: 12,
                // bevelEnabled: true,
                // bevelThickness: 10,
                // bevelSize: 8,
                // bevelOffset: 0,
		        // bevelSegments: 5
            }
        );
        //const textMaterial2= new THREE.MeshNormalMaterial();
        
        const text2= new THREE.Mesh(textGeometry2, textMaterial)

        text2.position.x= 13;
        text2.position.y= 0;
        scene.add(text2);
    });

}
// objectModel.position.needsUpdate= true;




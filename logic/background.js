import * as THREE from "three";



// +++++++++ BACKGROUND_CHANGE +++++++++++
export function add_background(){
    const textureLoader= new THREE.TextureLoader();
    const background_texture= textureLoader.load('/images/background2.jpg');
    background_texture.colorSpace= THREE.SRGBColorSpace;
    return background_texture;
}

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

// inicio configs basicas
let controls;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0,0,0);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000 )
const miRenderer = new THREE.WebGLRenderer();

miRenderer.setSize(window.innerWidth, window.innerHeight);
miRenderer.setAnimationLoop(animate)


//document.body.appendChild(miRenderer.domElement);

//EXTRA, efecto ASCII
const efectoAscii = new AsciiEffect(miRenderer, ' .:-=+*#%@', { invert: true });
efectoAscii.setSize(window.innerWidth, window.innerHeight);
efectoAscii.domElement.style.color = 'purple';
efectoAscii.domElement.style.backgroundColor = 'black';

document.body.appendChild(efectoAscii.domElement);
controls = new TrackballControls( camera, efectoAscii.domElement );

// iluminacion para modelo
const light1 = new THREE.PointLight(0xffffff, 20, 0, 0);
light1.position.set(500, 500, 500);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 22, 0, 0);
light2.position.set(-500, -500, -500);
scene.add(light2);


// carga de modelo
const loader = new GLTFLoader();
let cuckitalo;
loader.load( './src/models/italo_ugly.glb', function ( gltf ) {
    const model = gltf.scene;
    
    cuckitalo = new THREE.Group();
    scene.add(cuckitalo);

    console.log("Modelo cargado con éxito");

    // centrandolo
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);

    model.position.set(-center.x, -center.y, -center.z);
    cuckitalo.add(model);
    cuckitalo.scale.set(1,1,1)
}, undefined, function ( error ) {
    console.error( error );
} );

// para evitar sobreposicion, alejamos la camara un poco del modelo
	camera.position.x = 0;
    camera.position.y = 0;
	camera.position.z = 3;
window.addEventListener( 'resize', onWindowResize );

function animate(){
    
    efectoAscii.render(scene, camera);
    if (cuckitalo){
        //cuckitalo.rotation.x -= 0.0005;
        cuckitalo.rotation.y += 0.001;
    }
    controls.update();
    
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	efectoAscii.setSize( window.innerWidth, window.innerHeight );
}


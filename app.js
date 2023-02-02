import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load('./scene.glb', function(glb){
    console.log(glb);
    const root = glb.scene;
    root.scale.set(0.5, 0.5, 0.5);

    scene.add(root);
}, function(xhr){
    console.log(xhr.loader/xhr.total * 100) + '% loaded';
}, function (error){
    console.log('An error occurred');
});

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0,1,2);
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
});

/*renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;*/

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffeee);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
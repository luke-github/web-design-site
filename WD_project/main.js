import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// necessary setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
let cameraY = 0;
let isCamMoveUp = true;

const wireframeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

const starsGroup = new THREE.Group();
//

function switchCameraYMovement(y) {
  if (y >= 30) {
    return false;
  }
  if (y <= -30) {
    return true
  }
} 


//orbit tings
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.target = new THREE.Vector3(0,0,0);
orbit.minDistance = 35;
orbit.zoomSpeed = 0.3;
orbit.autoRotate = true;
orbit.autoRotateSpeed = 2.0;
orbit.enabled = false;
//

function addStarsS() {
  const dodecaGeoSmall = new THREE.IcosahedronGeometry(.1, 0);
  const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
  const star = new THREE.Mesh(dodecaGeoSmall, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x, y, z);
  starsGroup.add(star);
  // scene.add(star);

}

function addStarsM() {
  const dodecaGeoMedium = new THREE.DodecahedronGeometry(.3, 1);
  const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
  const star = new THREE.Mesh(dodecaGeoMedium, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x, y, z);
  starsGroup.add(star);
  // scene.add(star);

}

function addStarsL() {
  const dodecaGeoLarge = new THREE.DodecahedronGeometry(.5, 2);
  const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
  const star = new THREE.Mesh(dodecaGeoLarge, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x, y, z);
  starsGroup.add(star);
  // scene.add(star);
}
scene.add(starsGroup);


//planetry tings
const planetGeo = new THREE.SphereGeometry(3.8, 25, 13, 3.141592653589793, 6.283185307179586, 0, 3.141592653589793);
const planet = new THREE.Mesh(planetGeo, wireframeMaterial);
planet.position.set(4, -1, 9);
scene.add(planet);
//

Array(25).fill().forEach(addStarsL);
Array(65).fill().forEach(addStarsM);
Array(110).fill().forEach(addStarsS);


function animate() {
  requestAnimationFrame(animate);

  planet.rotation.x += .005
  planet.rotation.y += 0.0075

  starsGroup.rotateY(0.0005);

  switchCameraYMovement(cameraY);

  
  // if (isCamMoveUp) {
  //   cameraY += .03;
  //   if (cameraY >= 30) {
  //     isCamMoveUp = switchCameraYMovement(cameraY);
  //   }
  // }
  // if (!isCamMoveUp) {
  //   cameraY -= .03;
  //   if (cameraY <= -30) {
  //     isCamMoveUp = switchCameraYMovement(cameraY);
  //   }
  // }
  
  // camera.position.setY(cameraY);

  // orbit.update();

  renderer.render(scene,camera);
}
animate();


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
/* 

  ★ Move your mouse over to experience magic ★
  
  Mombasa 3D Kinetic Typography
  
  Thanks to @prisoner849 for helping me with the marshmallow geometry.
  
  Thanks to Davide Prati for the Palm Generator:
  https://davideprati.com/projects/palm-generator.html
  
  art & code by
  Anna Scavenger, March 2020
  https://twitter.com/ouchpixels
  
  License: You can remix, adapt, and build upon my code non-commercially.
  
  https://cdnjs.cloudflare.com/ajax/libs/three.js/r120/three.min.js

*/

import { BufferGeometryUtils } from "https://unpkg.com/three@0.120.0/examples/jsm/utils/BufferGeometryUtils.js";

'use strict';

let container, camera, scene, renderer;
let palm;
let letterMLeft, letterMRight, letterM2, sphereM2, sphere2M2;
let coneM, letterE, marshmallowH, cylinderH2, cylinderH3, cylinderH4, letterI, letterS, halfTorusS, halfTorusS2, halfTorusS3, halfTorusS4, discS2;
let halfTorus, halfTorus2, halfTorus3, torusP, sphereP;

let mouseX = 0;
let mouseY = 0;

const a = Math.PI / 2;

const matcapURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/911157/matcapGold_256_optimized.jpg";

const isMobile = /(Android|iPhone|iOS|iPod|iPad)/i.test(navigator.userAgent);

window.onload = function() {
  
  init();
  render();
  
};

function init() {
  
  container = document.querySelector("#scene-container");
  scene = new THREE.Scene();

  createCamera();
  createLights();
  createRenderer();
  createGeometries();
  createMeshes();
  
  document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener("touchmove", onTouch, false);
  window.addEventListener("resize", onWindowResize);
  
}

function createCamera() {

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 2, 21);
  camera.lookAt(0, 0.25, 0);
  camera.aspect = window.innerWidth / window.innerHeight;
  const cameraZ = 21;

  if (camera.aspect < 1 && camera.aspect > 0.75) {
    
    camera.position.z = cameraZ * 1.5;
    
  } else if (camera.aspect < 0.75) {
    
    camera.position.z = cameraZ * 2.4;
    
  } else {
    
    camera.position.z = cameraZ;
    
  }

}

function createLights() {

  const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 2.25);
  ambientLight.position.set(-10, 200, -1000);
  
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
  mainLight.position.set(-50, 100, 10);
  
  const mainLight2 = new THREE.DirectionalLight(0xFF002d, 8);
  mainLight2.position.set(50, 10, 10);
  mainLight2.target.position.set(1, 100, 0);
  
  scene.add(ambientLight, mainLight, mainLight2);
  
}

function createGeometries() {
  
  const cylinder = new THREE.CylinderGeometry( 0.75, 0.75, 3, 26, 20 );
  const cylinderWide = new THREE.CylinderGeometry( 1.1, 1.1, 0.75, 35, 5 );
  const cylinderThin = new THREE.CylinderBufferGeometry( 0.35, 0.35, 3, 20 );
  const disc = new THREE.CylinderGeometry( 0.75, 0.75, 0.25, 32 );
  disc.applyMatrix4(new THREE.Matrix4().makeTranslation( 0, 0.125, 0 ));
  const sphere = new THREE.SphereBufferGeometry( 0.75, 22, 22 );
  const halfSphere = new THREE.SphereBufferGeometry( 0.75, 15, 15, 0, Math.PI );
  const torus = new THREE.TorusBufferGeometry( 1.25, 0.25, 16, 40 );
  const halfTorus = new THREE.TorusBufferGeometry( 1.25, 0.35, 16, 20, Math.PI );
  const cone = new THREE.ConeBufferGeometry( 1.25, 2.25, 38 );
  cone.applyMatrix4(new THREE.Matrix4().makeTranslation( 0, 1.125, 0 ));
  const boxFlat = new THREE.BoxBufferGeometry( 1.25, 0.35, 1.25 );
  
  return {
    
    cylinder,
    cylinderThin,
    cylinderWide,
    disc,
    sphere,
    halfSphere,
    halfTorus,
    torus,
    cone,
    boxFlat
    
  };

}

function createMaterials() {
  
  const white = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9,
    metalness: 0.2,
    flatShading: false,
    side: THREE.DoubleSide
  });
  white.color.convertSRGBToLinear();
  
  const black = new THREE.MeshStandardMaterial({
    
    color: 0x000000,
    roughness: 0.2,
    metalness: 0.6,
    flatShading: false,
    side: THREE.DoubleSide
    
	});
  black.color.convertSRGBToLinear();

	const blue = new THREE.MeshStandardMaterial({
    
    color: 0x8fcbea,
    roughness: 0.9,
    metalness: 0.1,
    flatShading: false,
    side: THREE.DoubleSide
    
	});
	blue.color.convertSRGBToLinear();

  const pink = new THREE.MeshPhongMaterial({
    
    color: 0xffc0dd
    
  }); 
  pink.color.convertSRGBToLinear();
  
  const green2 = new THREE.MeshStandardMaterial({
    color: 0xbffbcb, 
    roughness: 0.1,
    metalness: 0.3,
    flatShading: true,
    side: THREE.DoubleSide
	});
  green2.color.convertSRGBToLinear();
  
  const textureLoader = new THREE.TextureLoader();
  const matcapTex = textureLoader.load(matcapURL);
  const matcapGold = new THREE.ShaderMaterial({
    
    transparent: false,
    side: THREE.DoubleSide,
    uniforms: {
      tMatCap: {
        type: "t",
        value: matcapTex
      }
    },
    vertexShader: document.querySelector("#matcap-vs").textContent,
    fragmentShader: document.querySelector("#matcap-fs").textContent,
    flatShading: false
    
  });

  return {
    
    white,
    pink,
    green2,
    blue,
    black,
    matcapGold
    
  };

}

function createMeshes() {

  const geometries = createGeometries();
  const materials = createMaterials();
  
  palm = createPalm();
  scene.add(palm);

  const pixelMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.25,
      vertexColors: THREE.FaceColors,
      flatShading: false
  });
  
  // letter M
  const letterM = new THREE.Group();
  
  const halfSphere = new THREE.Mesh(geometries.halfSphere, materials.black);
  halfSphere.position.y = 3.25;
  halfSphere.rotation.x = -Math.PI / 2;
  halfSphere.matrixAutoUpdate = false;
  halfSphere.updateMatrix();
  
  const cylinder = new THREE.Mesh(geometries.cylinder, pixelMat);
  colorVertices(geometries.cylinder);
  cylinder.position.y = 1.75;
  
  const disc = new THREE.Mesh(geometries.disc, materials.black);
  disc.matrixAutoUpdate = false;
  disc.updateMatrix();
  
  const sphere = new THREE.Mesh(geometries.sphere, materials.blue);
  sphere.position.y = -0.5;
  sphere.matrixAutoUpdate = false;
  sphere.updateMatrix();
  
  const disc2 = new THREE.Mesh(geometries.disc, materials.matcapGold);
  disc2.position.y = -1.25;
  disc2.matrixAutoUpdate = false;
  disc2.updateMatrix();

  letterMLeft = new THREE.Group();
  letterMLeft.add(halfSphere, cylinder, disc, disc2, sphere);
  letterMLeft.position.x = -2;
  
  letterMRight = letterMLeft.clone();
  letterMRight.position.x = 2;
  
  coneM = new THREE.Mesh(geometries.cone, materials.matcapGold);
  coneM.rotation.x = Math.PI;
  coneM.position.y = 3.25;
  
  letterM.add(letterMLeft, coneM, letterMRight);
  letter

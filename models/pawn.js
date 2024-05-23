import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export function createPawn(color) {
    // Pawn Geometries
    var topGeometry = new THREE.SphereGeometry(0.0035, 32, 16);
    var bodyGeometry = new THREE.ConeGeometry(0.005, .02, 32);

    // Pawn
    topGeometry.translate(0, .006, 0);
    var mergedGeometry = mergeGeometries([topGeometry, bodyGeometry]);
    var mergedMaterial = new THREE.MeshBasicMaterial({ color });
    var pawn = new THREE.Mesh(mergedGeometry, mergedMaterial);

    return pawn;
}
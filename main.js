import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { createLudoBoard } from './models/board.js';
import { createPawn } from './models/pawn.js';

let container;
let camera, scene, renderer;
let controller;

let reticle;
let board;

let hitTestSource = null;
let hitTestSourceRequested = false;

let boardPlaced = false;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));
        document.getElementById('overlay').style.display = 'none';
    });

    function onSelect() {
        if (reticle.visible && !boardPlaced) {
            board = new createLudoBoard();
            reticle.matrix.decompose(board.position, board.quaternion, board.scale);
            scene.add(board);
            boardPlaced = true;
            showPlayerSelection();
        }
    }

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    reticle = new createLudoBoard();
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render(timestamp, frame) {
    if (frame && !boardPlaced) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (!hitTestSourceRequested) {
            session.requestReferenceSpace('viewer').then(referenceSpace => {
                session.requestHitTestSource({ space: referenceSpace }).then(source => {
                    hitTestSource = source;
                });
            });

            session.addEventListener('end', () => {
                hitTestSourceRequested = false;
                hitTestSource = null;
            });

            hitTestSourceRequested = true;
        }

        if (hitTestSource) {
            const hitTestResults = frame.getHitTestResults(hitTestSource);

            if (hitTestResults.length) {
                const hit = hitTestResults[0];
                reticle.visible = true;
                reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
            } else {
                reticle.visible = false;
            }
        }
    }

    renderer.render(scene, camera);
}

function showPlayerSelection() { // Essa função criará botões em RA para a seleção da quantidade de jogadores para só depois desenhar os peões que serão utilizados
    const redTiles = board.children.filter(tile => tile.userData.type === 'rc');
    const yellowTiles = board.children.filter(tile => tile.userData.type === 'yc');

    const redPawns = [];
    for (let i = 0; i < 4 && i < redTiles.length; i++) {
        const pawn = createPawn(0xff0000);
        const tile = redTiles[i];
        if (tile) {
            pawn.position.copy(tile.position);
            pawn.position.y += 0.012;
            redPawns.push(pawn);
            board.add(pawn);
        } else {
            console.error("Red tile at index", i, "is undefined.");
        }
    }

    const yellowPawns = [];
    for (let i = 0; i < 4 && i < yellowTiles.length; i++) {
        const pawn = createPawn(0xffd700);
        const tile = yellowTiles[i];
        if (tile) {
            pawn.position.copy(tile.position);
            pawn.position.y += 0.012;
            yellowPawns.push(pawn);
            board.add(pawn);
        } else {
            console.error("Yellow tile at index", i, "is undefined.");
        }
    }

    startGame();

}

function startGame() {
    // Lógica do jogo
}
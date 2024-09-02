import * as THREE from 'three';

export let handPoints = [];
const numHandLandmarks = 21;
let hands, videoElement;

export async function initHandTracking(scene) {
    videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.style.display = 'none';
    document.body.appendChild(videoElement);

    const handMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const handSphereGeometry = new THREE.SphereGeometry(0.02, 32, 32);

    for (let i = 0; i < numHandLandmarks; i++) {
        const sphere = new THREE.Mesh(handSphereGeometry, handMaterial);
        scene.add(sphere);
        handPoints.push(sphere);
    }

    try {
        const constraints = {
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;

        videoElement.onloadedmetadata = () => {
            videoElement.play();
            console.log('Video element is playing');
            processVideo();
        };

    } catch (error) {
        console.error('Error initializing video element:', error);
    }
}

async function processVideo() {
    hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
    });

    hands.onResults(onResults);

    const sendFrame = async () => {
        try {
            if (videoElement && videoElement.readyState >= 2) {
                await hands.send({ image: videoElement });
            }
            requestAnimationFrame(sendFrame);
        } catch (error) {
            console.error('Error processing video frame:', error);
        }
    };

    sendFrame();
}

function onResults(results) {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        console.log('Hand landmarks detected:', results.multiHandLandmarks);

        const landmarks = results.multiHandLandmarks[0];

        for (let i = 0; i < landmarks.length; i++) {
            const x = (landmarks[i].x * 2 - 1) * 0.5;
            const y = -(landmarks[i].y * 2 - 1) * 0.5;
            const z = -landmarks[i].z * 0.5;

            handPoints[i].position.set(x, y, z);
        }
    } else {
        console.log('No hand landmarks detected.');
    }
}

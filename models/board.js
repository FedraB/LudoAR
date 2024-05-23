import * as THREE from 'three';

export function createTile(type) {
    const scale = 0.01;
    const tileSize = 2 * scale;
    const tileHeight = 0.5 * scale;
    const starSize = 0.7 * scale;
    const arrowSize = 0.5 * scale;
    const cylinderRadius = 0.7 * scale;
    const cylinderHeight = 0.5 * scale;

    const tileGeometry = new THREE.BoxGeometry(tileSize, tileHeight, tileSize);
    let tileMaterial;

    const whiteCubeGeometry = new THREE.BoxGeometry(tileSize, tileHeight, tileSize);
    const whiteCubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const whiteCube = new THREE.Mesh(whiteCubeGeometry, whiteCubeMaterial);
    const group = new THREE.Group();

    switch (type) {
        case 'r':
            tileMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            break;
        case 'g':
            tileMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            break;
        case 'w':
            tileMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            break;
        case 'b':
            tileMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            break;
        case 'y':
            tileMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
            break;
        case 'f':
            tileMaterial = new THREE.MeshBasicMaterial({ color: 0x0e0e10 });
            break;
        case 'rs':
            const redStarGeometry = new THREE.BoxGeometry(starSize, tileHeight, starSize);
            const redStarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const redStar = new THREE.Mesh(redStarGeometry, redStarMaterial);
            redStar.rotation.y = .75;

            whiteCube.position.copy(redStar.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(redStar);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'gs':
            const greenStarGeometry = new THREE.BoxGeometry(starSize, tileHeight, starSize);
            const greenStarMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const greenStar = new THREE.Mesh(greenStarGeometry, greenStarMaterial);
            greenStar.rotation.y = .75;

            whiteCube.position.copy(greenStar.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(greenStar);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'bs':
            const blueStarGeometry = new THREE.BoxGeometry(starSize, tileHeight, starSize);
            const blueStarMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const blueStar = new THREE.Mesh(blueStarGeometry, blueStarMaterial);
            blueStar.rotation.y = .75;

            whiteCube.position.copy(blueStar.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(blueStar);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'ys':
            const yellowStarGeometry = new THREE.BoxGeometry(starSize, tileHeight, starSize);
            const yellowStarMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
            const yellowStar = new THREE.Mesh(yellowStarGeometry, yellowStarMaterial);
            yellowStar.rotation.y = .75;

            whiteCube.position.copy(yellowStar.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(yellowStar);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'ra':
            const redArrowGeometry = new THREE.TetrahedronGeometry(arrowSize);
            const redArrowMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const redArrow = new THREE.Mesh(redArrowGeometry, redArrowMaterial);
            redArrow.rotation.x = -.6;
            redArrow.rotation.y = .5;
            redArrow.rotation.z = -.6;

            whiteCube.position.copy(redArrow.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(redArrow);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'ga':
            const greenArrowGeometry = new THREE.TetrahedronGeometry(arrowSize);
            const greenArrowMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const greenArrow = new THREE.Mesh(greenArrowGeometry, greenArrowMaterial);
            greenArrow.rotation.x = -1;
            greenArrow.rotation.y = -.8;
            greenArrow.rotation.z = -1.5;

            whiteCube.position.copy(greenArrow.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(greenArrow);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'ba':
            const blueArrowGeometry = new THREE.TetrahedronGeometry(arrowSize);
            const blueArrowMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const blueArrow = new THREE.Mesh(blueArrowGeometry, blueArrowMaterial);
            blueArrow.rotation.x = -0.5;
            blueArrow.rotation.z = -.8;

            whiteCube.position.copy(blueArrow.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(blueArrow);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'ya':
            const yellowArrowGeometry = new THREE.TetrahedronGeometry(arrowSize);
            const yellowArrowMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
            const yellowArrow = new THREE.Mesh(yellowArrowGeometry, yellowArrowMaterial);
            yellowArrow.rotation.x = -.6;
            yellowArrow.rotation.y = -.5;
            yellowArrow.rotation.z = -1;

            whiteCube.position.copy(yellowArrow.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(yellowArrow);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'rc':
            const redCylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
            const redCylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const redCylinder = new THREE.Mesh(redCylinderGeometry, redCylinderMaterial);

            whiteCube.position.copy(redCylinder.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(redCylinder);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'gc':
            const greenCylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
            const greenCylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const greenCylinder = new THREE.Mesh(greenCylinderGeometry, greenCylinderMaterial);
            greenCylinder.position.y = cylinderHeight;

            whiteCube.position.copy(greenCylinder.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(greenCylinder);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'bc':
            const blueCylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
            const blueCylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const blueCylinder = new THREE.Mesh(blueCylinderGeometry, blueCylinderMaterial);
            blueCylinder.position.y = cylinderHeight;

            whiteCube.position.copy(blueCylinder.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(blueCylinder);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        case 'yc':
            const yellowCylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
            const yellowCylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
            const yellowCylinder = new THREE.Mesh(yellowCylinderGeometry, yellowCylinderMaterial);
            yellowCylinder.position.y = cylinderHeight;

            whiteCube.position.copy(yellowCylinder.position);
            whiteCube.position.y = whiteCube.position.y - (0.15 * scale);

            group.add(yellowCylinder);
            group.add(whiteCube);
            group.userData.type = type;
            return group;
        default:
            tileMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            break;
    }

    const tile = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.userData.type = type;
    return tile;
}

export function createLudoBoard() {
    const scale = 0.01;
    const board = new THREE.Group();
    const redTiles = [];
    const greenTiles = [];
    const blueTiles = [];
    const yellowTiles = [];
    const whiteTiles = [];
    const finishTiles = [];
    const starTiles = [];
    const arrowTiles = [];
    const cylinders = [];

    const description = [
        ['r', 'r', 'r', 'r', 'r', 'r', 'w', 'ga', 'w', 'g', 'g', 'g', 'g', 'g', 'g'],
        ['r', 'w', 'w', 'w', 'w', 'r', 'w', 'g', 'g', 'g', 'w', 'w', 'w', 'w', 'g'],
        ['r', 'w', 'rc', 'rc', 'w', 'r', 'rs', 'g', 'w', 'g', 'w', 'gc', 'gc', 'w', 'g'],
        ['r', 'w', 'rc', 'rc', 'w', 'r', 'w', 'g', 'w', 'g', 'w', 'gc', 'gc', 'w', 'g'],
        ['r', 'w', 'w', 'w', 'w', 'r', 'w', 'g', 'w', 'g', 'w', 'w', 'w', 'w', 'g'],
        ['r', 'r', 'r', 'r', 'r', 'r', 'w', 'g', 'w', 'g', 'g', 'g', 'g', 'g', 'g'],
        ['w', 'r', 'w', 'w', 'w', 'w', 'f', 'f', 'f', 'w', 'w', 'w', 'gs', 'w', 'w'],
        ['ra', 'r', 'r', 'r', 'r', 'r', 'f', 'f', 'f', 'y', 'y', 'y', 'y', 'y', 'ya'],
        ['w', 'w', 'bs', 'w', 'w', 'w', 'f', 'f', 'f', 'w', 'w', 'w', 'w', 'y', 'w'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'w', 'b', 'w', 'y', 'y', 'y', 'y', 'y', 'y'],
        ['b', 'w', 'w', 'w', 'w', 'b', 'w', 'b', 'w', 'y', 'w', 'w', 'w', 'w', 'y'],
        ['b', 'w', 'bc', 'bc', 'w', 'b', 'w', 'b', 'w', 'y', 'w', 'yc', 'yc', 'w', 'y'],
        ['b', 'w', 'bc', 'bc', 'w', 'b', 'w', 'b', 'ys', 'y', 'w', 'yc', 'yc', 'w', 'y'],
        ['b', 'w', 'w', 'w', 'w', 'b', 'b', 'b', 'w', 'y', 'w', 'w', 'w', 'w', 'y'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'w', 'ba', 'w', 'y', 'y', 'y', 'y', 'y', 'y']
    ];

    const tileSize = 2 * scale;

    for (let i = 0; i < description.length; i++) {
        for (let j = 0; j < description[i].length; j++) {
            const tileType = description[i][j];
            const tile = createTile(tileType);
            tile.position.set((j - description[i].length / 2) * tileSize, tileSize / 2, (i - description.length / 2) * tileSize);

            switch (tileType) {
                case 'r':
                    redTiles.push(tile);
                    break;
                case 'g':
                    greenTiles.push(tile);
                    break;
                case 'b':
                    blueTiles.push(tile);
                    break;
                case 'y':
                    yellowTiles.push(tile);
                    break;
                case 'w':
                    whiteTiles.push(tile);
                    break;
                case 'f':
                    finishTiles.push(tile);
                    break;
                case 'rs':
                case 'gs':
                case 'bs':
                case 'ys':
                    starTiles.push(tile);
                    break;
                case 'ra':
                case 'ga':
                case 'ba':
                case 'ya':
                    arrowTiles.push(tile);
                    break;
                case 'rc':
                case 'gc':
                case 'bc':
                case 'yc':
                    cylinders.push(tile);
                    break;
                default:
                    break;
            }

            board.add(tile);
        }
    }

    board.userData.redTiles = redTiles;
    board.userData.greenTiles = greenTiles;
    board.userData.blueTiles = blueTiles;
    board.userData.yellowTiles = yellowTiles;
    board.userData.whiteTiles = whiteTiles;
    board.userData.finishTiles = finishTiles;
    board.userData.starTiles = starTiles;
    board.userData.arrowTiles = arrowTiles;
    board.userData.cylinders = cylinders;

    return board;
}

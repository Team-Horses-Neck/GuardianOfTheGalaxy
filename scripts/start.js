function calculateInitialResize() {

    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    const sideFieldCorrection = currentWidth * SIDE_FIELDS_PERCENT * 2 / 100;
    const downFieldCorrection = currentHeight * DOWN_FIELD_PERCENT / 100;

    const indexWidth = (currentWidth - sideFieldCorrection) / CANVAS_BASE_WIDTH;
    const indexHeight = (currentHeight - downFieldCorrection) / CANVAS_BASE_HEIGHT;

    var result = indexWidth < indexHeight ? indexWidth : indexHeight;

    return result;
}

function loadSprite(url) {
    const img = new Image();
    img.src = url;
    const resizeValue = calculateInitialResize();
    img.onload = function () {
        img.width *= resizeValue;
        img.height *= resizeValue;
    }
    return img;
}

function resizeScoreBar() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const resizeValue = calculateInitialResize();

    const svg = document.getElementById('scoreBar');
    svg.width = canvas.width;
    svg.height = canvas.height;
    svg.setAttribute('x', canvas.width * SIDE_FIELDS_PERCENT);

    const gElements = document.getElementsByClassName('resize');

    for (var i = 0; i < gElements.length; i += 1) {
        gElements[i].setAttribute('transform', 'scale(' + resizeValue + ')');
    }
}

//Define all game sprites here
const sprites = {
    guardian: loadSprite('./images/guardian-small.png'),
    spaceStatic: loadSprite('./images/space-static-tiling.jpg'),

    spaceMoving: loadSprite('./images/space-moving.png'),

    wall: loadSprite('./images/wall/wall.png'),
    wallDown: loadSprite('./images/wall/wall-down.png'),
    wallHightLeft: loadSprite('./images/wall/wall-height-left.png'),
    wallHightRight: loadSprite('./images/wall/wall-height-right.png'),
    wallMiddle: loadSprite('./images/wall/wall-middle.png'),
    wallHit: loadSprite('./images/wall/wall-hit.png'),
    wallDownHit: loadSprite('./images/wall/wall-down-hit.png'),
    wallHightLeftHit: loadSprite('./images/wall/wall-height-left-hit.png'),
    wallHightRightHit: loadSprite('./images/wall/wall-height-right-hit.png'),
    wallMiddleHit: loadSprite('./images/wall/wall-middle-hit.png'),

    enemy: loadSprite('./images/enemies/enemy-small.png'),
    evilEnemy: loadSprite('./images/enemies/evil-enemy-small.png'),
    boss: loadSprite('./images/enemies/possibleBoss.png'),
    projectile: loadSprite('./images/shell-small.png'),
    projectileUp: loadSprite('./images/shell-small-up.png'),
    bonusHealth: loadSprite('./images/health-bonus.png'),
    bonusPoint: loadSprite('./images/point-bonus.png')
};

window.addEventListener('load', function () {
    const canvas = document.getElementById('game-canvas');

    const resizeValue = calculateInitialResize();

    canvas.width = CANVAS_BASE_WIDTH * resizeValue;
    canvas.height = CANVAS_BASE_HEIGHT * resizeValue;
    const ctx = canvas.getContext('2d');

    resizeScoreBar();

    ctx.clearAll = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const engine = new Engine(ctx, sprites);

    // Keyboard events
    window.addEventListener('keydown', (e) => engine._userInput.onKeydown(e), false);
    window.addEventListener('keyup', (e) => engine._userInput.onKeyup(e), false);
    window.addEventListener('projectileFired', (e) => engine.launchNewProjectile(e));
    window.addEventListener('enemyGoDown', (e) => engine.onEnemyGoDown(e));
    window.addEventListener('enemiesToErase', (e) => engine.onEnemiesToErase(e));
    window.addEventListener('projectilesToErase', (e) => engine.onProjectilesToErase(e));
    window.addEventListener('bonusesToErase', (e) => engine.onBonusesToErase(e));

    window.addEventListener('wallsToErase', (e) => engine.onWallstoErase(e));

    engine.gameLoop(engine, ctx);
});

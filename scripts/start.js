function loadSprite(url) {
    const img = new Image();
    img.src = url;
    return img;
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
    wallMiddleHit: loadSprite('./images/wall/wall-middle-hit.png')
};

window.addEventListener('load', function() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearAll = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const engine = new Engine(ctx, sprites);

    // Keyboard events
    window.addEventListener('keydown', (e) => engine._userInput.onKeydown(e), false);
    window.addEventListener('keyup', (e) => engine._userInput.onKeyup(e), false);

    engine.gameLoop(engine, ctx);
});

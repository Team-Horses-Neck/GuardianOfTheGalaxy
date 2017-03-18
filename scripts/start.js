//does stuff

function loadSprite(url) {
    const img = new Image();
    img.src = url;
    return img;
}
// Define all game sprites here
const sprites = {
    guardian: loadSprite('./images/guardian-small.png'),
    spaceStatic: loadSprite('./images/space-static-tiling.jpg'),
    spaceMoving: loadSprite('./images/space-moving.png')
};

window.addEventListener('load', function () {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearAll = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const engine = new Engine();
    engine.gameLoop();
});
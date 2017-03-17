function loadSprite(url) {
    const img = new Image();
    img.src = url;
    return img;
}
// Define all game sprites here
const sprites = {
    guardian: loadSprite('./images/small-guardian.png'),
    space: loadSprite('./images/space.png')
};

// Start the game when sprites have loaded
window.addEventListener('load', function() {
    const canvas = document.getElementById('game-canvas');
    const spaceCanvas = document.getElementById('space-canvas');

    const ctx = canvas.getContext('2d');
    const spaceCtx = spaceCanvas.getContext('2d');

    ctx.clearAll = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    spaceCtx.clearAll = function() {
        spaceCtx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);
    };

    // Define game objects (player, enemies...)
    const keyboard = new Keyboard();
    const guardian = new Player(sprites.guardian, canvas);
    const spaceBackground = new Space(sprites.space, spaceCanvas); 

    function gameLoop() {
        // Update
        guardian.update(keyboard);

        // Draw
        ctx.clearAll();
        spaceCtx.clearAll();
        
        guardian.draw(ctx);
        spaceBackground.draw(spaceCtx);
        
        requestAnimationFrame(gameLoop);
    }
    gameLoop();

    // Keyboard events
    window.addEventListener('keydown', (e) => keyboard.onKeydown(e), false);
    window.addEventListener('keyup', (e) => keyboard.onKeyup(e), false);
});

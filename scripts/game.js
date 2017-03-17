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

// Start the game when sprites have loaded
window.addEventListener('load', function() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearAll = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Define game objects (player, enemies...)
    const keyboard = new Keyboard();
    const guardian = new Player(ctx, sprites.guardian);
    const space = new SpaceBg(ctx, sprites.spaceStatic, sprites.spaceMoving);
    
    function gameLoop() {
        // Update
        guardian.update(keyboard);
        space.update();

        // Draw
        ctx.clearAll();
        space.draw();
        guardian.draw();
        
        requestAnimationFrame(gameLoop);
    }
    gameLoop();

    // Keyboard events
    window.addEventListener('keydown', (e) => keyboard.onKeydown(e), false);
    window.addEventListener('keyup', (e) => keyboard.onKeyup(e), false);
});

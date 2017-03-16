function loadSprite(url) {
    var img = new Image();
    img.src = url;
    return img;
}
// Define all game sprites here
const sprites = {
    guardian: loadSprite('./images/small-guardian.png')
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
    const guardian = new Player(sprites.guardian, canvas);

    function gameLoop() {
        guardian.update(keyboard);

        ctx.clearAll();
        guardian.draw(ctx);

        requestAnimationFrame(gameLoop);
    }
    gameLoop();

    window.addEventListener('keydown', (e) => keyboard.onKeydown(e), false);
    window.addEventListener('keyup', (e) => keyboard.onKeyup(e), false);
});

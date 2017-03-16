function loadSprite(url) {
    var img = new Image();
    img.src = url;
    return img;
}
// Define all game sprites here
var sprites = {
    guardian: loadSprite('./images/guardian.png')
}

// Start the game when sprites have loaded
window.addEventListener('load', function() {
    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearAll = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Define game objects (player, enemies...)
    var guardian = new Player(sprites.guardian, 0, 0);

    function gameLoop() {
        ctx.clearAll();
        guardian.draw(ctx);

        // Example
        guardian.x += .5;
        guardian.y += .5;

        requestAnimationFrame(gameLoop);
    }
    gameLoop();
});

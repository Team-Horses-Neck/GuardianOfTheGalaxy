function loadSprite(url) {
    var img = new Image();
    img.src = url;
    return img;
}
// Define all game sprites here
var sprites = {
    guardian: loadSprite('./images/small-guardian.png')
};

// Start the game when sprites have loaded
window.addEventListener('load', function() {
    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearAll = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Define game objects (player, enemies...)
    var guardian = new Player(sprites.guardian, 375, 550);
        
    const GuardianMovements = {
        moveGuardianRight: function () {
            guardian.x += 0.05;
            guardian.y += 0;

            if (guardian.x >= 750) {
                guardian.x = 750;
            }
        },
        moveGuardianLeft: function () {
            guardian.x -= 0.05;
            guardian.y += 0;

            if (guardian.x <= 0) {
                guardian.x = 0;
            }
        },
        moveGuardianUp: function () {
            guardian.x += 0;
            guardian.y -= 0.05;

            if (guardian.y <= 0) {
                guardian.y = 0;
            }
        },
        moveGuardianDown: function () {
            guardian.x += 0;
            guardian.y += 0.05;
            
            if (guardian.y >= 550) {
                guardian.y = 550;
            }
        } 
        //TODO can add diagonal movement
    };

    function gameLoop() {
        ctx.clearAll();
        guardian.draw(ctx);

        canvas.addEventListener('keydown', function (e) {
            if (e.keyCode === 37) { 
               GuardianMovements.moveGuardianLeft();
            }
        }, false);

        canvas.addEventListener('keydown', function (e) {
            if (e.keyCode === 38) { 
                GuardianMovements.moveGuardianUp();  
            }
        }, false);

        canvas.addEventListener('keydown', function (e) {
            if (e.keyCode === 39) { 
                GuardianMovements.moveGuardianRight();
            }
        }, false);

        canvas.addEventListener('keydown', function (e) {
            if (e.keyCode === 40) { 
                GuardianMovements.moveGuardianDown();
            }
        }, false);

        // Example
        //guardian.x += 1.5;
        //guardian.y += 0.5;

        requestAnimationFrame(gameLoop);
    }
    gameLoop();
});

const CANVAS_BASE_WIDTH = 960;
const CANVAS_BASE_HEIGHT = 710;
const SIDE_FIELDS_PERCENT = 15;
const DOWN_FIELD_PERCENT = 10;

// Player
const PLAYER_SPEED = 4; // px/frame
const PLAYER_START_LIFE = 3;
const MIN_TIME_BETWEEN_SHOTS = 600; // ms

// Space background
const SPACE_SCROLL_SPEED = 0.3; // px/frame

// Projectiles
const PROJECTILE_SPEED = 1; // px/frame
const PLAYER_PROJECTILE_SPEED = 5; // px/frame
const BOSS_PROJECTILE_SPEED = 3; // px/frame
const BONUS_SPEED = 1; // px/frame
const PROJECTILE_WIDTH = 11;
// Enemies
var ENEMY_SPEED = 0.5; // px/frame
const ENEMY_ROWS = 4;
const ENEMIES_PER_ROW = 5;
const ENEMY_DOWN = 40; // px How much the enemies to go down on every iteration
const ENEMY_DENSITY = 1.3; // multiplies times number of enemies on a row, times enemy width/height
const ENEMY_POINTS = 100;
const EVIL_ENEMY_POINTS = 200;
const BOSS_POINTS = 1000;
const ENEMY_MAXIMAL_FIRING_INTERVAL = 30000;
const ENEMY_MINIMAL_FIRING_INTERVAL = 4000;

// Wall
const WALL_START_POS_WIDTH = 0.1;
const WALL_START_POS_HEIGHT = 0.7;
const WALL_HEALTH = 2;

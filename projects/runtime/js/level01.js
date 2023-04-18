var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;
    window.opspark.runLevelInGame = function (game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "nums": "reward", "x": 2000, "y": groundY - 60},

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(xvalue, yvalue) {
            var hitZoneSize = 25;
            var damageFromObstacle = 25;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

            sawBladeHitZone.x = xvalue;
            sawBladeHitZone.y = yvalue;
            game.addGameItem(sawBladeHitZone)

            var obstacleImage = draw.bitmap("img/sawblade.png");
            sawBladeHitZone.addChild(obstacleImage);
        }
        createSawBlade(800, 325)
        createSawBlade(600, 220)
        createSawBlade(1000, 325)
        createSawBlade(1200, 220)
        createSawBlade(1400, 325)
        createSawBlade(1600, 220)
        createSawBlade(1800, 325)
        createSawBlade(2000, 220)
        createSawBlade(2200, 325)

        function createEnemy(xvalue) {
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(75, 75, "black");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = xvalue;
            enemy.y = groundY - 50;
            enemy.velocityX = -3;
            enemy.rotationalVelocity = 5;

            enemy.onPlayerCollision = function () {
                game.changeIntegrity(-10);
            };
            enemy.onProjectileCollision = function () {
                game.increaseScore(100);
                enemy.fadeout();
            }; 
        }
        function createFairy(xvalue) {
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 90, "pink");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = xvalue;
            enemy.y = groundY - 70;
            enemy.velocityX = -1;
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(-10);
            };
            enemy.onProjectileCollision = function () {
                game.increaseScore(100);
                enemy.fadeOut();
            };
            game.addGameItem(enemy);
        }
        createFairy(400)
        function createReward(xvalue) {
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 90, "blue");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = xvalue;
            enemy.y = groundY - 70;
            enemy.velocityX = -1;
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(0);
            };
            enemy.onProjectileCollision = function () {
                game.changeIntegrity(50);
                game.increaseScore(100);
                enemy.fadeOut();
            };
            game.addGameItem(enemy);
        }
        createReward(800)

        for (var i = 0; i < levelData.gameItems.length; i++) {
            var i = levelData.gameItems[i];
            if (Object.nums === 'sawblade') {
                createSawBlade(object.x, object.y);
            }
            else if (object.nums === 'enemy') {
                createEnemy(object.x, object.y)
            }
            else if (object.nums === 'reward') {
                createReward(object.x, object.y)
            }
        }

        // DO NOT EDIT CODE BELOW HERE
    }

}


// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}

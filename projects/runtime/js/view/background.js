var background = function (window) {
    'use strict';

    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;

    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function (app, ground) {
        /* Error Checking - DO NOT DELETE */
        if (!app) {
            throw new Error("Invalid app argument");
        }
        if (!ground || typeof (ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;

        // container which will be returned
        var background;

        // ANIMATION VARIABLES HERE:
        var tree;
        var rock;
        var buildings = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, canvasHeight = groundY, "red");
            background.addChild(backgroundFill);
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap("img/korn.png");
            moon.x = 1000;
            moon.y = -50;
            moon.scaleX = 1.0;
            moon.scaleY = 1.0;
            background.addChild(moon);

            for (var i = 0; i < 150; i++) {
            var circle = draw.circle(10, "lightgray", "darkGray", 2);
           circle.x = canvasWidth * Math.random();
           circle.y = groundY * Math.random();
           background.addChild(circle);
         }

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 9; ++i) {
                var buildingHeight = 300;
                var building = draw.rect(75, buildingHeight, "black", "white", 5);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }


            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap("img/jonathan.png");
            console.log({tree})
            tree.x = 100;
            tree.y = 80;
            tree.scaleX = .6;
            tree.scaleY = .6;
            background.addChild(tree);

            rock = draw.bitmap("img/jonathan.png");
            console.log({rock})
            rock.x = 900;
            rock.y = 220;
            rock.scaleX = 1.5;
            rock.scaleY = .3;
            background.addChild(rock);

           


        } // end of render function - DO NOT DELETE


        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x + -7;

            if (tree.x <= -200) {
                tree.x = canvasWidth;
            }
            
            rock.x = rock.x + -7;

            if (rock.x <= -200) {
                rock.x = canvasWidth;
            }

            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                var currentBuilding = buildings[i];
                currentBuilding.x = currentBuilding.x - 5;
                if (currentBuilding.x < -200) {
                    currentBuilding.x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE



        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;

        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);

        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
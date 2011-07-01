
// create a namespace for the snake code
SNK = {};

SNK.canvasWidth = 300;
SNK.canvasHeight = 300;
SNK.blockSize = 10;
SNK.colour = "#FFF";

SNK.foodEaten;
SNK.gameOver;

SNK.controller = (function () {

    var snakeContext,
		x = 0,
		y = 0,
		frameDuration = 300,
		snake,
        food,
        score = 0;

    function init() {

        // get the canvas from the dom
        score = 0;
        var canvas = $("#cnvSnake");
        snakeContext = canvas[0].getContext('2d');
        snake = SNK.snake();
        food = SNK.food();
        handleKeyPress();
        loop();
    }

    function handleKeyPress() {

        var arrowKeys = {
            37: "left",
            38: "up",
            39: "right",
            40: "down"
        };

        // look for key presses
        $(document).keydown(function (e) {

            // get the key code for the pressed key
            var pressedKey = e.which;
            var newDirection = arrowKeys[pressedKey];

            if (newDirection) {

                // an arrow key has been pressed, inform the snake to change direction (if appropriate)
                snake.changeDirection(newDirection);
            }
        });
    };

    function loop() {

        snakeContext.clearRect(0, 0, SNK.canvasWidth, SNK.canvasHeight);

        food.make(snakeContext);
        snake.move();
        snake.draw(snakeContext);

        if (snake.crashed()) {

            SNK.gameOver();
        }
        else {
            if (snake.hasEatenFood(food)) {

                // move the food, increase the snake length and increment the score
                food.move();
                snake.setJustEaten();
                score++;
                SNK.foodEaten(score);

                // increase the speed of the snake by reducing the frame rate, this really crude an limits the number 
                // of food items
                frameDuration--;
            }
            setTimeout(loop, frameDuration);
        }
    }

    return {
        init: init
    };
})();

SNK.snake = function () {

    var positions = [],
		direction = "right",
        justEaten = false;

    // add starting points for a snake
    positions.push([7, 4]);
    positions.push([6, 4]);
    positions.push([5, 4]);
    positions.push([4, 4]);
    positions.push([3, 4]);
    positions.push([2, 4]);

    function drawBlock(ctx, position) {

        // get the coords that the block will be rendered to 
        var x = SNK.blockSize * position[0];
        var y = SNK.blockSize * position[1];

        ctx.fillRect(x, y, SNK.blockSize, SNK.blockSize);
    };

    function setJustEaten() {
        justEaten = true;
    };

    function draw(canvasContext) {

        canvasContext.save();
        canvasContextfillStyle = SNK.colour;

        for (var i = 0; i < positions.length; i++) {
            drawBlock(canvasContext, positions[i]);
        }
        canvasContext.restore();
    };

    function move() {

        // get the head of the snake which is represented by the item at the front of the array
        var head = positions[0].slice();

        // change the coordinate of the new head block depending on the current direction the snake is travelling in
        switch (direction) {

            case "up":
                // snake is moving up, subtract one from it's y coordinate
                head[1] -= 1;
                break;
            case "down":
                // snake is moving down, add one to it's y coordinate
                head[1] += 1;
                break;
            case "left":
                // snake is moving left, subtract one from it's x coordinate
                head[0] -= 1;
                break;
            case "right":
                // snake is moving right, add one to it's x coordinate
                head[0] += 1;
                break;
        }

        // add the new head to the front of the positions array
        positions.unshift(head);

        // remove the tail if the snake has not just eaten, otherwise allow the snake to grow
        if (justEaten) {
            justEaten = false;
        } else {
            positions.pop();
        }
    };

    function changeDirection(newDirection) {

        if ((direction === "left" | direction === "right") & (newDirection === "up" | newDirection === "down")) {
            direction = newDirection;
        }

        if ((direction === "up" | direction === "down") & (newDirection === "left" | newDirection === "right")) {
            direction = newDirection;
        }
    };

    /**
    Checks if any of the coordinates that the snake occupies are the same as any of the coordinates of the wall
    */
    function hasCrashedIntoWall() {
        var wallMinX = 0,
            wallMinY = 0,
            wallMaxX = (SNK.canvasWidth / SNK.blockSize) - 1,
            wallMaxY = (SNK.canvasHeight / SNK.blockSize) - 1;

        // establish if the snake's head is outside of the boundaries of the wall
        var head = getHead();
        var headX = head[0],
            headY = head[1];

        var crashed = ((headX < wallMinX) | (headX > wallMaxX) | (headY < wallMinY) | (headY > wallMaxY));
        return crashed;
    };

    /**
    Returns the item of the positions array at position zero which represents the snake's head
    */
    function getHead() {
        return positions[0];
    };

    function hasEatenSelf() {
        // has the head of the snake occupied another block of the snake?
        var head = getHead();
        var body = positions.slice(1);

        for (var i = 0, len = body.length; i < len; i++) {

            var bodyBlock = body[i];

            if (positionsAreEqual(bodyBlock, head)) {
                return true;
            }
        };

        // no body blocks are the same as the head, the snake is not eating itself.
        return false;
    };

    /**
    takes two arrays each expected with 2 items representing an X and Y coordinate and compares the values,
    returning true if both objects have the same X and Y values
    */
    function positionsAreEqual(positionA, positionB) {
        return (positionA[0] === positionB[0]) & (positionA[1] === positionB[1]);
    };

    function crashed() {
        return hasCrashedIntoWall() | hasEatenSelf();
    };

    /**
    Checks if the new head coordinate value means that the snake has moved onto the current item of food
    */
    function hasEatenFood(food) {
        // does the head coordinate equal the food's current position
        return positionsAreEqual(food.getCurrentPosition(), getHead());
    };

    // return an object with pointers to the public methods.
    return {
        draw: draw,
        move: move,
        changeDirection: changeDirection,
        crashed: crashed,
        hasEatenFood: hasEatenFood,
        setJustEaten: setJustEaten
    };

};





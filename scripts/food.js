
SNK.food = function () {

    // start with a default position away from the default snake position
    var position = [7, 7];

    /**
    Adds an item of food to the canvas for the snake to eat
    */
    var make = function (canvasContext) {
        canvasContext.save();
        canvasContext.fillStyle = "#0000FF";
        canvasContext.beginPath();
        var radius = SNK.blockSize / 2;
        var x = position[0] * SNK.blockSize + radius;
        var y = position[1] * SNK.blockSize + radius;
        canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
        canvasContext.restore();
    };

    /**
    Creates a new positions for the item of snake food 

    occupiedPositions: the positions on the board (occupied by the snake) that are not available
    to place the food
    */
    var move = function (occupiedPositions) {
        var blocks = SNK.canvasWidth / SNK.blockSize;

        position[0] = getRandomNumber(0, blocks);
        position[1] = getRandomNumber(0, blocks);

        if (SNK.positions.positionIsInPositionsArray(position, occupiedPositions)) {
            move(occupiedPositions);
        }
    };

    var getCurrentPosition = function () {
        return position;
    };

    var getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
        make: make,
        move: move,
        getCurrentPosition: getCurrentPosition
    };
};


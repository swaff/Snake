SNK.highScores = {};

SNK.highScores = (function () {

    var getScores = function () {

        // get all the SnakeScore objects from the local storage object
        var snakeScores = SNK.localStore.getSnakeScores(),

        // create an array that will hold all the username - high scores pairs
            usernameScorePairs = [],

        // array variables for iteration
            i = 0,
            scoresLength = snakeScores.length;

        // create an array of username v score
        for (i; i < scoresLength; i++) {

            var snakeScore = snakeScores[i],
                pair = { username: snakeScore.username,
                    highScore: snakeScore.getHighScore()
                };

            usernameScorePairs.push(pair);
        }

        // sort the array by score
        usernameScorePairs.sort(function (x, y) {
            return y.highScore - x.highScore
        });

        // return the array
        return usernameScorePairs;
    };

    return {
        getScores: getScores
    };

})();
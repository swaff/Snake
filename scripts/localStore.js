SNK.localStore = {};

SNK.localStore = (function () {

    var saveScore = function (username, score) {

        // get the existing scores
        var scores = SNK.localStore.getScores(),
            len = scores.length,
            foundAt = -1;

        // check if this username has an existing set of scores
        for (var i = 0; i < len; i++) {
            if (scores[i].username === username) {
                foundAt = i;
                break;
            };
        }

        // create a new SnakeScore object that will be used to track up to 3 of the highest scores
        // for the given username
        var snakeScore = new SNK.SnakeScore(username);

        if (foundAt > -1) {

            // this is an existing user, get their existing scores
            var scoreData = scores[foundAt];

            snakeScore.setScores(scoreData.scores);

            // remove the existing SnakeScore from the array
            scores.splice(foundAt, 1);
        }

        // add the score to the SnakeScore which will order by descending score value
        snakeScore.addLatestScore(score);

        // add the SnakeScore to the array
        scores.push(snakeScore);

        // convert to a JSON string and persist the the local storage
        var json = JSON.stringify(scores);
        localStorage["scores"] = json;
    };

    var getScores = function () {

        var foundScores = localStorage["scores"];

        if (foundScores !== null) {
            return JSON.parse(localStorage["scores"]);
        } else {
            return [];
        }
    };

    var getSnakeScores = function () {

        var scores = getScores(),
            i = 0,
            scoreLength = scores.length,
            snakeScores = [];

        for (i; i < scoreLength; i++) {

            // create a new snake score object
            var score = scores[i];
            var snakeScore = new SNK.SnakeScore(score.username);
            snakeScore.setScores(score.scores);
            snakeScores.push(snakeScore);
        }
        return snakeScores;
    };

    // expose desired public methods.
    return {
        getScores: getScores,
        saveScore: saveScore,
        getSnakeScores: getSnakeScores
    };
})();
test('getUsername()', function () {

    // arrange
    // create a new snake score
    var score = new SNK.SnakeScore("user");

    // act
    var foundUsername = score.getUsername();

    // assert
    equals(foundUsername, "user", "returned user name should be 'user'");
});

test('setScores()', function () {

    // arrange
    // create some test scores
    var scores = [1, 2, 3];

    // pass the scores to the SnakeScore object
    var score = new SNK.SnakeScore("test");
    score.setScores(scores);

    // act
    // get the scores back
    var returnedScores = score.getScores();

    // assert
    equals(returnedScores, scores, "setScores should set an array of scores");
});

test("getScores()", function () {

    // arrange
    // create some test scores
    var scores = [3, 2, 1];

    // set up the SnakeScore object
    var score = new SNK.SnakeScore("testing");
    score.setScores(scores);

    // act
    // get the scores from the SnakeScore
    var returnedScores = score.getScores();

    // assert
    equals(returnedScores, scores, "getScores should return the expected results");
});

test("addLatestScore adds single item", function () {

    // arrange
    // create a SnakeScore object and add a latest score
    var score = new SNK.SnakeScore("testing");
    score.addLatestScore(3);

    // create the expected return value
    var expected = [3,];

    // act 
    // get the scores back from the SnakeScore
    var scores = score.getScores();

    equals(scores[0], expected[0], "addLatestScore should add expected single item");
    equals(scores.length, expected.length, "addLatestScore should add expected single item");
});

test("addLatestScore adds three items in descending order", function () {

    // arrange
    var score = new SNK.SnakeScore("testing");

    // act
    score.addLatestScore(1);
    score.addLatestScore(10);
    score.addLatestScore(100);

    // get the scores back
    var scores = score.getScores();

    // assert
    equals(scores[0], 100, "expect item at index 0 = 100");
    equals(scores[1], 10, "expect item at index 1 = 10");
    equals(scores[2], 1, "expect item at index 2 = 1");
});

test("addLatestScore adds only shows top three scores in descending order", function () {

    // arrange
    var score = new SNK.SnakeScore("testing");

    // act
    // add 4 scores, expecting the one with the lowest value to be removed
    score.addLatestScore(1);
    score.addLatestScore(10);
    score.addLatestScore(100);
    score.addLatestScore(1000);

    // get the scores back
    var scores = score.getScores();

    // assert
    equals(scores.length, 3, "only expect three items");
    equals(scores[0], 1000, "expect item at index 0 = 1000");
    equals(scores[1], 100, "expect item at index 1 = 100");
    equals(scores[2], 10, "expect item at index 2 = 100");
});


test("getHighScore returns the highest score", function () {

    // arrange
    var score = new SNK.SnakeScore("testing");

    // act
    // add 4 scores
    score.addLatestScore(1);
    score.addLatestScore(10);
    score.addLatestScore(100);
    score.addLatestScore(1000);

    // get the highest score back
    var highScore = score.getHighScore();

    // assert
    equals(highScore, 1000, "expect 1000 back from getHighScore");
});

test("getHighScore returns zero for no scores", function () {

    // arrange
    var score = new SNK.SnakeScore("testing");

    // act
    var highScore = score.getHighScore();

    // assert
    equals(highScore, 0, "expect 0 back from getHighScore if no scores added");
});
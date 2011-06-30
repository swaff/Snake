SNK.SnakeScore = function SnakeScore(username) {
    this.username = username;
    this.scores = [];

    this.sortDescending = function (x, y) {
        return y - x;
    };

    this.sortScores = function () {
        this.scores.sort(this.sortDescending);
    };
    this.trimScores = function () {

        this.sortScores();

        if (this.scores.length > 3) {
            this.scores = this.scores.slice(0, 3);
        };
    };
};

SNK.SnakeScore.prototype.getUsername = function(){
    return this.username;
};

SNK.SnakeScore.prototype.setScores = function(scores){
    this.scores = scores;
};

SNK.SnakeScore.prototype.getScores = function(){
    return this.scores;
};

SNK.SnakeScore.prototype.addLatestScore = function (score) {
    this.scores.push(score);
    this.trimScores();
};

SNK.SnakeScore.prototype.getHighScore = function () {

    if (this.scores.length > 0) {
        // sort the scores 
        this.sortScores();

        // return the item at index 0 which will be the highest score
        return this.scores[0];
    }
    return 0;
};
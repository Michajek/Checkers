function Score() {
    var whiteScoreCounter = 0;
    var blackScoreCounter = 0;
    //Liczy punkty Białych
    function whiteScore(whiteScore) {
        var divScore = $(".whiteScore")
        whiteScoreCounter++
        divScore.text("White score: " + whiteScoreCounter)
    }
    //Liczy punkty Czarnych
    function blackScore(blackScore) {
        var divScore = $(".blackScore")
        blackScoreCounter++
        divScore.text("Black score: " + blackScoreCounter)
    }

    return {
        whiteScore : whiteScore,
        blackScore : blackScore

    }
}
module.exports = Score;

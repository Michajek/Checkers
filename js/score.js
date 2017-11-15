function Score() {
    let whiteScoreCounter = 0;
    let blackScoreCounter = 0;
    //Liczy punkty Białych
    function whiteScore(whiteScore) {
        const divScore = $(".whiteScore")
        whiteScoreCounter++
        divScore.text("White score: " + whiteScoreCounter)
    }
    //Liczy punkty Czarnych
    function blackScore(blackScore) {
        const divScore = $(".blackScore")
        blackScoreCounter++
        divScore.text("Black score: " + blackScoreCounter)
    }

    return {
        whiteScore : whiteScore,
        blackScore : blackScore

    }
}
module.exports = Score;

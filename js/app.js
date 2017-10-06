var Board = require("./board.js")
var board = new Board();
board.createBoard();

var Score = require("./score.js")
var score = new Score();

        //// RUSZANIE SIĘ BIAŁYMI

        /// blokuje inne divy białe
        function blockOtherDivWhite () {
            var allWhite = $(".white")
            allWhite.attr('onclick','').unbind('click');
        }


        function whiteMove() {
            $(".white").on("click", function() {

                var goodMove1 = Number($(this).attr("id")) - 7;
                var goodMove2 = Number($(this).attr("id")) - 9;
                var div1 = "#" + goodMove1;
                var div2 = "#" + goodMove2;
                var getDown1 = Number($(this).attr("id")) - 14
                var getDownDiv1 = "#" + getDown1;
                var getDown2 = Number($(this).attr("id")) - 18
                var getDownDiv2 = "#" + getDown2;
                $(this).addClass("checkedThis");
                //sprawdza lewą stronę
                if ($(div2).attr("class") == "active"){
                    $(div2).addClass("checkedLeft");
                    whiteCheckedLeft();
                } else if ($(div2).attr("class") == "black" && $(getDownDiv2).attr("class") == "active") {
                    $(getDownDiv2).addClass("checkedLeft");
                    whiteCheckedLeft();
                }
                //sprawdza prawą stronę
                if ($(div1).attr("class") == "active"){
                    $(div1).addClass("checkedRight");
                    whiteCheckedRight();
                }else if ($(div1).attr("class") == "black" && $(getDownDiv1).attr("class") == "active") {
                    $(getDownDiv1).addClass("checkedRight");
                    whiteCheckedRight();
                }

                blockOtherDivWhite();
                checkedThisReturnFunctionsWhite();
            })
        }


        whiteMove();

        //BIcie PRAWO

    function getDownRightWhite (a) {
        var getDown1 = Number((a).attr("id")) + 14
        var getDownDiv1 = "#" + getDown1;
        var getDown2 = Number((a).attr("id")) + 5
        var getDownDiv2 = "#" + getDown2;
        $(getDownDiv1).prop('onclick',null).off('click');
        $(getDownDiv1).removeClass();
        $(getDownDiv1).attr("class", "active")
        var getDown3 = Number((a).attr("id")) - 4
        var getDownDiv3 = "#" + getDown3;
        if ($(getDownDiv2).attr("class") == "active checkedLeft") {
            $(getDownDiv2).prop('onclick',null).off('click');
            $(getDownDiv2).removeClass();
            $(getDownDiv2).attr("class", "active")
        }
        if ($(getDownDiv3).attr("class") == "active checkedLeft") {
            $(getDownDiv3).prop('onclick',null).off('click');
            $(getDownDiv3).removeClass();
            $(getDownDiv3).attr("class", "active")
        }
    }

        //Bicie LEWO
        function getDownLeftWhite (a) {
            var getDown1 = Number((a).attr("id")) + 18
            var getDownDiv1 = "#" + getDown1;
            var getDown2 = Number((a).attr("id")) + 11
            var getDownDiv2 = "#" + getDown2;
            var getDown3 = Number((a).attr("id")) + 4
            var getDownDiv3 = "#" + getDown3;
            $(getDownDiv1).prop('onclick',null).off('click');
            $(getDownDiv1).removeClass();
            $(getDownDiv1).attr("class", "active")
            if ($(getDownDiv2).attr("class") == "active checkedRight") {
                $(getDownDiv2).prop('onclick',null).off('click');
                $(getDownDiv2).removeClass();
                $(getDownDiv2).attr("class", "active")
            }
            if ($(getDownDiv3).attr("class") == "active checkedRight") {
                $(getDownDiv3).prop('onclick',null).off('click');
                $(getDownDiv3).removeClass();
                $(getDownDiv3).attr("class", "active")
            }
        }
        //RUCH W PRAWO
    function whiteCheckedRight () {
        $(".checkedRight").on("click", function() {
            var self = $(this);
            var goodMove1 = Number($(this).attr("id")) + 7;
            var div1 = "#" + goodMove1;
            if ($(div1).attr("class") == "black") {
                score.whiteScore(score.whiteScoreCounter);
                getDownRightWhite(self);
            }
            $(div1).removeClass();
            $(div1).attr("class", "active")
            $(div1).prop('onclick',null).off('click');
            $(this).prop('onclick',null).off('click');
            $(this).removeClass();
            $(this).attr("class", "white")
            var goodMove2 = Number($(this).attr("id")) - 2
            var div2 = "#" + goodMove2;
            if ($(div2).attr("class") == "active checkedLeft") {
                $(div2).prop('onclick',null).off('click');
                $(div2).removeClass();
                $(div2).attr("class", "active")

            }

            blackMove();
        });
    }


    //RUCH W LEWO
    function whiteCheckedLeft () {
        $(".checkedLeft").on("click", function() {
            var self = $(this);
            var goodMove1 = Number($(this).attr("id")) + 9;
            var div1 = "#" + goodMove1;
            if ($(div1).attr("class") == "black") {
                score.whiteScore(score.whiteScoreCounter);
                getDownLeftWhite(self);
            }
            $(div1).removeClass();
            $(div1).attr("class", "active")
            $(div1).prop('onclick',null).off('click');
            $(this).prop('onclick',null).off('click');
            $(this).removeClass();
            $(this).attr("class", "white")
            var goodMove2 = Number($(this).attr("id")) + 2
            var div2 = "#" + goodMove2;
            if ($(div2).attr("class") == "active checkedRight") {
                $(div2).prop('onclick',null).off('click');
                $(div2).removeClass();
                $(div2).attr("class", "active")
            }
            blackMove();
        });
    }

    ///CZYŚCI PO ZŁYM WYBORZE white

    function checkedThisReturnFunctionsWhite() {
        $(".checkedThis").on("click", function() {
            var goodMove1 = Number($(this).attr("id")) - 7;
            var goodMove2 = Number($(this).attr("id")) - 9;
            var clearMore1 = Number($(this).attr("id")) - 14;
            var clearMore2 = Number($(this).attr("id")) - 18;
            var div1 = "#" + goodMove1;
            var div2 = "#" + goodMove2;
            var div3 = "#" + clearMore1;
            var div4 = "#" + clearMore2;
            $(this).removeClass("checkedThis");
            //sprawdza lewą stronę
            if ($(div2).attr("class") == "active checkedLeft" ) {
                $(div2).removeClass("checkedLeft");
                $(div2).prop('onclick',null).off('click');
            }//sprawdza prawą stronę
            if ($(div1).attr("class") == "active checkedRight") {
                $(div1).removeClass("checkedRight");
                $(div1).prop('onclick',null).off('click');
            }
            if ($(div3).attr("class") == "active checkedRight") {
                $(div3).removeClass("checkedRight");
                $(div3).prop('onclick',null).off('click');
            }
            if ($(div4).attr("class") == "active checkedLeft") {
                $(div4).removeClass("checkedLeft");
                $(div4).prop('onclick',null).off('click');
            }

            whiteMove()
        })
    }


//////RUCHY CZARNYCH !

    /// blookuje inne divy czarne
    function blockOtherDivBlack () {
        var allBlack = $(".black")
        allBlack.attr('onclick','').unbind('click');
    }


    function blackMove() {
        $(".black").on("click", function() {
        var goodMove1 = Number($(this).attr("id")) + 7;
        var goodMove2 = Number($(this).attr("id")) + 9;
        var div1 = "#" + goodMove1;
        var div2 = "#" + goodMove2;
        var getDown1 = Number($(this).attr("id")) + 14
        var getDownDiv1 = "#" + getDown1;
        var getDown2 = Number($(this).attr("id")) + 18
        var getDownDiv2 = "#" + getDown2;
        $(this).addClass("checkedThis");
        if ($(div1).attr("class") == "active") {
            $(div1).addClass("checkedLeft");
            blackCheckedLeft();
        } else if ($(div1).attr("class") == "white" && $(getDownDiv1).attr("class") == "active") {
            $(getDownDiv1).addClass("checkedLeft");
            blackCheckedLeft();
        }
        if ($(div2).attr("class") == "active") {
            $(div2).addClass("checkedRight");
            blackCheckedRight();
        } else if ($(div2).attr("class") == "white" && $(getDownDiv2).attr("class") == "active") {
            $(getDownDiv2).addClass("checkedRight");
            blackCheckedRight();
            }
        blockOtherDivBlack();
        checkedThisReturnFunctionsBlack();
    })
}

    //Zbijanie czarnych
function getDownRightBlack (a) {
    var getDown1 = Number((a).attr("id")) - 18
    var getDownDiv1 = "#" + getDown1;
    var getDown2 = Number((a).attr("id")) - 11
    var getDownDiv2 = "#" + getDown2;
    $(getDownDiv1).prop('onclick',null).off('click');
    $(getDownDiv1).removeClass();
    $(getDownDiv1).attr("class", "active")
    var getDown3 = Number((a).attr("id")) - 4
    var getDownDiv3 = "#" + getDown3;
    if ($(getDownDiv2).attr("class") == "active checkedLeft") {
        $(getDownDiv2).prop('onclick',null).off('click');
        $(getDownDiv2).removeClass();
        $(getDownDiv2).attr("class", "active")
    }
    if ($(getDownDiv3).attr("class") == "active checkedLeft") {
        $(getDownDiv3).prop('onclick',null).off('click');
        $(getDownDiv3).removeClass();
        $(getDownDiv3).attr("class", "active")
    }
}

    //Bicie LEWO
    function getDownLeftBlack (a) {
        var getDown1 = Number((a).attr("id")) - 14
        var getDownDiv1 = "#" + getDown1;
        var getDown2 = Number((a).attr("id")) - 5
        var getDownDiv2 = "#" + getDown2;
        var getDown3 = Number((a).attr("id")) + 4
        var getDownDiv3 = "#" + getDown3;
        $(getDownDiv1).prop('onclick',null).off('click');
        $(getDownDiv1).removeClass();
        $(getDownDiv1).attr("class", "active")
        if ($(getDownDiv2).attr("class") == "active checkedRight") {
            $(getDownDiv2).prop('onclick',null).off('click');
            $(getDownDiv2).removeClass();
            $(getDownDiv2).attr("class", "active")
        }
        if ($(getDownDiv3).attr("class") == "active checkedRight") {
            $(getDownDiv3).prop('onclick',null).off('click');
            $(getDownDiv3).removeClass();
            $(getDownDiv3).attr("class", "active")
        }
    }

    //RUCH W PRAWO
function blackCheckedRight () {
    $(".checkedRight").on("click", function() {
        var self = $(this)
        var goodMove1 = Number($(this).attr("id")) - 9;
        var div1 = "#" + goodMove1;
        if ($(div1).attr("class") == "white") {
            score.blackScore(score.blackScoreCounter);
            getDownRightBlack(self);
        }
        $(div1).removeClass();
        $(div1).attr("class", "active")
        $(div1).prop('onclick',null).off('click');
        $(this).prop('onclick',null).off('click');
        $(this).removeClass();
        $(this).attr("class", "black")
        var goodMove2 = Number($(this).attr("id")) - 2
        var div2 = "#" + goodMove2;
        if ($(div2).attr("class") == "active checkedLeft") {
            $(div2).prop('onclick',null).off('click');
            $(div2).removeClass();
            $(div2).attr("class", "active")
        }
        whiteMove();
    });
}



//RUCH W LEWO
function blackCheckedLeft () {
    $(".checkedLeft").on("click", function() {
        var self = $(this)
        var goodMove1 = Number($(this).attr("id")) - 7;
        var div1 = "#" + goodMove1;
        if ($(div1).attr("class") == "white") {
            score.blackScore(score.blackScoreCounter);
            getDownLeftBlack(self);
        }


        $(div1).removeClass();
        $(div1).attr("class", "active")
        $(div1).prop('onclick',null).off('click');
        $(this).prop('onclick',null).off('click');
        $(this).removeClass();
        $(this).attr("class", "black")
        var goodMove2 = Number($(this).attr("id")) + 2
        var div2 = "#" + goodMove2;


        if ($(div2).attr("class") == "active checkedRight") {
            $(div2).prop('onclick',null).off('click');
            $(div2).removeClass();
            $(div2).attr("class", "active")
        }
        whiteMove();
    });
}

///CZYŚCI PO ZŁYM WYBORZE PIONA DRUGIE KLIKNIĘCIE NA TEGO SAMEGO CZARNE

function checkedThisReturnFunctionsBlack() {
    $(".checkedThis").on("click", function() {
        var goodMove1 = Number($(this).attr("id")) + 9;
        var goodMove2 = Number($(this).attr("id")) + 7;
        var div1 = "#" + goodMove1;
        var div2 = "#" + goodMove2;
        var clearMore1 = Number($(this).attr("id")) + 14;
        var clearMore2 = Number($(this).attr("id")) + 18;
        var div3 = "#" + clearMore1;
        var div4 = "#" + clearMore2;

        // czarne
        // div1 - prawo o jeden
        // div2 - lewo o jeden
        // div3 - w prawo o dwa
        // div4 - w lewo o dwa


        $(this).removeClass("checkedThis");
        if ($(div1).attr("class") == "active checkedRight") {
            $(div1).removeClass("checkedRight");
            $(div1).prop('onclick',null).off('click');
        }
        if ($(div2).attr("class") == "active checkedLeft" ) {
            $(div2).removeClass("checkedLeft");
            $(div2).prop('onclick',null).off('click');
        }
        if ($(div3).attr("class") == "active checkedLeft") {
            $(div3).removeClass("checkedLeft");
            $(div3).prop('onclick',null).off('click');
        }
        if ($(div4).attr("class") == "active checkedRight") {
            $(div4).removeClass("checkedRight");
            $(div4).prop('onclick',null).off('click');
        }
        blackMove()
    })
}

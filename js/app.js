var disabled = [0,2,4,6,9,11,13,15,16,18,20,22,25,27,29,31,32,
                34,36,38,41,43,45,47,48,50,52,54,57,59,61,63];

var black = [1,3,5,7,8,10,12,14,17,19,21,23];

var active = [24,26,28,30,33,35,37,39];

var white = [40,42,44,46,49,51,53,55,56,58,60,62];
var whiteScoreCounter = 0;
var blackScoreCounter = 0;

function createBoard() {
    for (var i = 0; i < 64; i++) {
        var newDiv = $("<div></div>");
        newDiv.attr("id", i);
        $(".board").append($(newDiv));
    }
}

function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return true;
    }
}

function addClassBoard() {
    $(".board div").each(function () {
        if (include(disabled, $(this).attr("id")) == true) {
            $(this).addClass("disabled")
        } else if (include(black, $(this).attr("id")) == true) {
            $(this).addClass("black")
        } else if (include(active, $(this).attr("id")) == true) {
            $(this).addClass("active")
        } else {
            $(this).addClass("white")
        }
    })
}
createBoard();
addClassBoard();






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
                whiteScore(whiteScoreCounter);
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
                whiteScore(whiteScoreCounter);
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
        } else if ($(div1).attr("class") == "white" && $(getDownDiv1).attr("class") == "active") {
            $(getDownDiv1).addClass("checkedLeft");
        }
        if ($(div2).attr("class") == "active") {
            $(div2).addClass("checkedRight");
        } else if ($(div2).attr("class") == "white" && $(getDownDiv2).attr("class") == "active") {
            $(getDownDiv2).addClass("checkedRight");
            }
        blockOtherDivBlack();
        blackCheckedRight();
        blackCheckedLeft();
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
            blackScore(blackScoreCounter);
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
            blackScore(blackScoreCounter);
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

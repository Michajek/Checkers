var Score = require("./score.js")
var score = new Score();
function Figure() {


    // Czyści wszystko
    function clearCheckedFields() {
        const allActiveFields = [1,3,5,7,8,10,12,14,17,19,21,23,24,26,28,30,33,35,37,39,40,42,44,46,49,51,53,55,56,58,60,62];
        for (let i = 0; i < allActiveFields.length; i++) {
            let field = "#" + allActiveFields[i]
            $(field).removeClass("checkedRight");
            $(field).removeClass("checkedLeft");
            $(field).removeClass("checkedBackLeft");
            $(field).removeClass("checkedBackRight");
            $(field).removeClass("checkedThis");
            $(field).removeClass("moveLeft");
            $(field).removeClass("moveRight");
            $(field).prop('onclick',null).off('click');
        }
    }

    /// blokuje inne divy
    function blockOtherDiv(siteColor) {
        var allField = $(siteColor)
        allField.attr('onclick','').unbind('click');
    }

    //funkcja bicia w przód (białe) w przód (czarne)
    function getDown (self, fields, fieldClass) {
        var getDownDiv1 = "#" + (Number((self).attr("id")) + fields);
        $(getDownDiv1).removeClass();
        $(getDownDiv1).prop('onclick',null).off('click');
        $(getDownDiv1).attr("class", fieldClass)
    }

    //Ruchy o jedno pole
    function moveOneField(moveRightLeft, mustBeatArrayParameter, getDownOneArrayParameter,
                          getDownTwoArrayParameter, clearCheckedFieldsFunction, siteMove) {
        $(moveRightLeft).on("click", function() {
            var self = $(this);
            mustBeat(...mustBeatArrayParameter)
            getDown(self, ...getDownOneArrayParameter);
            getDown(self, ...getDownTwoArrayParameter);
            clearCheckedFieldsFunction();
            siteMove();
        });
    }

    //Funkcja zbijania
    function beatRightLeft (beatSite,  getDownOneArrayParameter, getDownTwoArrayParameter, getDownThreeArrayParameter,
                            clearCheckedFieldsFunction, siteMove, otherSiteClass, siteScore, siteScoreCounter, beatedFieldNumber,FunctionNextMove) {
        $(beatSite).on("click", function() {
            var self = $(this)
            var div1 = "#" + (Number($(this).attr("id")) + beatedFieldNumber);
            if ($(div1).attr("class") == otherSiteClass) {
                siteScore(siteScoreCounter);
                getDown(self, ...getDownThreeArrayParameter);
                getDown(self, ...getDownOneArrayParameter);
                clearCheckedFieldsFunction();
                FunctionNextMove(self)
            } else {
                clearCheckedFields();
                siteMove();
            }
            getDown($(this), ...getDownOneArrayParameter);
            getDown($(this), ...getDownTwoArrayParameter);
        });
    }

    ///CZYŚCI PO ZŁYM WYBORZE czarnego
    function checkedThisReturnFunctions(clearCheckedFieldsFunction, siteMoveFunction) {
        $(".checkedThis").on("click", function() {
            clearCheckedFieldsFunction()
            siteMoveFunction()
        })
    }

    //Sprawdza bicie przymusowe
    function mustBeat(siteColor, upRight, upLeft, upJumpRight, upJumpLeft,
        downLeft, downJumpLeft, downRight, downJumpRight,
        enemyClass, moveFunction) {
            var all = $(siteColor)
            var beated = false
            //Prawo góra
            for (var i = 0; i < all.length; i++) {
                var upRightMove = "#" + (Number($(all[i]).attr("id")) + upRight);
                var upLeftMove = "#" + (Number($(all[i]).attr("id")) + upLeft);
                var upRightJump = "#" + (Number($(all[i]).attr("id")) + upJumpRight);
                var upLeftJump = "#" + (Number($(all[i]).attr("id")) + upJumpLeft);
                var downLeftMove = "#" + (Number($(all[i]).attr("id")) + (downLeft));
                var downLeftJump = "#" + (Number($(all[i]).attr("id")) + (downJumpLeft));
                var downRightMove = "#" + (Number($(all[i]).attr("id")) + (downRight));
                var downRightJump = "#" + (Number($(all[i]).attr("id")) + (downJumpRight));
                if ($(upLeftMove).attr("class") == enemyClass
                &&
                $(upLeftJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDown($(all[i]), 0, "active");
                    clearCheckedFields();
                    moveFunction;
                }
                if ( ($(upRightMove).attr("class") == enemyClass)
                &&
                ($(upRightJump).attr("class") == "active")) {
                    alert("Bicie przymusowe, tracisz piona")
                    getDown($(all[i]), 0, "active");
                    clearCheckedFields();
                    moveFunction;
                }
                //sprawdza lewą stronę dół
                if ($(downLeftMove).attr("class") == enemyClass &&
                $(downLeftJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDown($(all[i]), 0, "active");
                    clearCheckedFields();
                    moveFunction;
                }
                //sprawdza prawą stronę dół
                if ($(downRightMove).attr("class") == enemyClass &&
                $(downRightJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDown($(all[i]), 0, "active");
                    clearCheckedFields();
                    moveFunction;
                }
            }
        }


        //-------------------------------------------------------------------------

        function nextMoveBlack(self) {
            var wasIf = false
            var upRightMove = "#" + (Number($(self).attr("id")) + 9);
            var upLeftMove = "#" + (Number($(self).attr("id")) + 7);
            var upRightJump = "#" + (Number($(self).attr("id")) + 14);
            var upLeftJump = "#" + (Number($(self).attr("id")) + 18);
            var downLeftMove = "#" + (Number($(self).attr("id")) - 9);
            var downLeftJump = "#" + (Number($(self).attr("id")) - 18);
            var downRightMove = "#" + (Number($(self).attr("id")) - 7);
            var downRightJump = "#" + (Number($(self).attr("id")) - 14);
            if ($(upLeftMove).attr("class") == "white"
            &&
            $(upLeftJump).attr("class") == "active") {
                wasIf = true
                $(upLeftJump).addClass("checkedLeft");
                let getDownOneArrayParam = [-7, "active"]
                let getDownTwoArrayParam = [0, "black"]
                let getDownThreeArrayParam = [-14, "active"]
                beatRightLeft(".checkedLeft", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                              whiteMove, "white", score.blackScore, score.blackScoreCounter, -7, nextMoveBlack)
            }
            //sprawdza prawą stronę
            if ( ($(upRightMove).attr("class") == "white")
            &&
            ($(upRightJump).attr("class") == "active")) {
                wasIf = true
                $(upRightJump).addClass("checkedRight");
                let getDownOneArrayParam = [-9, "active"]
                let getDownTwoArrayParam = [0, "black"]
                let getDownThreeArrayParam = [-18, "active"]
                beatRightLeft(".checkedRight", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                              whiteMove, "white", score.blackScore, score.blackScoreCounter, -9, nextMoveBlack)
            }
            //sprawdza lewą stronę dół
            if ($(downLeftMove).attr("class") == "white" &&
            $(downLeftJump).attr("class") == "active") {
                wasIf = true
                $(downLeftJump).addClass("checkedBackLeft")
                blackCheckedBackLeft();

            }
            //sprawdza prawą stronę dół
            if ($(downRightMove).attr("class") == "white" &&
            $(downRightJump).attr("class") == "active") {
                wasIf = true
                $(downRightJump).addClass("checkedBackRight")
                blackCheckedBackRight();
            }
            if (wasIf == false) {
                whiteMove();
            }

        }

        //// RUSZANIE SIĘ Czarnymi

        function blackMove() {
            $(".black").on("click", function() {

                $(this).addClass("checkedThis");
                var upRightMove = "#" + (Number($(this).attr("id")) + 9);
                var upLeftMove = "#" + (Number($(this).attr("id")) + 7);
                var upRightJump = "#" + (Number($(this).attr("id")) + 18);
                var upLeftJump = "#" + (Number($(this).attr("id")) + 14);
                var downLeftMove = "#" + (Number($(this).attr("id")) - 9);
                var downLeftJump = "#" + (Number($(this).attr("id")) - 18);
                var downRightMove = "#" + (Number($(this).attr("id")) - 7);
                var downRightJump = "#" + (Number($(this).attr("id")) - 14);

                var wasBeat = false;

                if ($(upLeftMove).attr("class") == "active"){
                    $(upLeftMove).addClass("moveLeft");
                    let beatArrayParam = [".black", 9, 7, 18, 14, (-9), (-18), (-7), (-14), "white", whiteMove()]
                    let getDownOneArrayParam = [-7, "active"]
                    let getDownTwoArrayParam = [0, "black"]
                    moveOneField(".moveLeft", beatArrayParam, getDownOneArrayParam, getDownTwoArrayParam, clearCheckedFields, whiteMove )

                } else if ($(upLeftMove).attr("class") == "white"
                &&
                $(upLeftJump).attr("class") == "active") {
                    $(upLeftJump).addClass("checkedLeft");
                    wasBeat = true
                    let getDownOneArrayParam = [-7, "active"]
                    let getDownTwoArrayParam = [0, "black"]
                    let getDownThreeArrayParam = [-14, "active"]
                    beatRightLeft(".checkedLeft", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                                  whiteMove, "white", score.blackScore, score.blackScoreCounter, -7, nextMoveBlack)
                }
                //sprawdza prawą stronę
                if ($(upRightMove).attr("class") == "active"){
                    $(upRightMove).addClass("moveRight");
                    let getDownOneArrayParam = [ -9, "active"]
                    let getDownTwoArrayParam = [ 0, "black"]
                    let beatArrayParam = [".black", 9, 7, 18, 14, (-9), (-18), (-7), (-14), "white", whiteMove()]
                    moveOneField(".moveRight", beatArrayParam, getDownOneArrayParam, getDownTwoArrayParam, clearCheckedFields,whiteMove )

                } else if ( ($(upRightMove).attr("class") == "white")
                &&
                ($(upRightJump).attr("class") == "active")) {
                    $(upRightJump).addClass("checkedRight");
                    wasBeat = true
                    let getDownOneArrayParam = [-9, "active"]
                    let getDownTwoArrayParam = [0, "black"]
                    let getDownThreeArrayParam = [-18, "active"]
                    beatRightLeft(".checkedRight", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                                  whiteMove, "white", score.blackScore, score.blackScoreCounter, -9, nextMoveBlack)
                }

                //sprawdza lewą stronę dół
                if ($(downLeftMove).attr("class") == "white" &&
                $(downLeftJump).attr("class") == "active") {
                    $(downLeftJump).addClass("checkedBackLeft")
                    wasBeat = true
                    let getDownOneArrayParam = [9, "active"]
                    let getDownTwoArrayParam = [0, "black"]
                    let getDownThreeArrayParam = [18, "active"]
                    beatRightLeft(".checkedBackLeft", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                                  whiteMove, "white", score.blackScore, score.blackScoreCounter, 9, nextMoveBlack)
                }
                //sprawdza prawą stronę dół
                if ($(downRightMove).attr("class") == "white" &&
                $(downRightJump).attr("class") == "active") {
                    $(downRightJump).addClass("checkedBackRight")
                    wasBeat = true
                    let getDownOneArrayParam = [7, "active"]
                    let getDownTwoArrayParam = [0, "black"]
                    let getDownThreeArrayParam = [14, "active"]
                    beatRightLeft(".checkedBackRight", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                                  whiteMove, "white", score.blackScore, score.blackScoreCounter, 7, nextMoveBlack)
                }

                if (wasBeat === true) {
                    $(upLeftMove).removeClass("moveLeft");
                    $(upRightMove).removeClass("moveRight");
                }

                blockOtherDiv(".black");
                checkedThisReturnFunctions(clearCheckedFields, blackMove);
            })
        }




        ///RUCHY BIAŁYCH


        //funkcja bicia podwójnego/potrójnego

        function nextMoveWhite(self) {
            var wasIf = false
            var upRightWhiteMove = "#" + (Number($(self).attr("id")) - 7);
            var upLeftWhiteMove = "#" + (Number($(self).attr("id")) - 9);
            var upRightWhiteJump = "#" + (Number($(self).attr("id")) - 14);
            var upLeftWhiteJump = "#" + (Number($(self).attr("id")) - 18);
            var downLeftWhiteMove = "#" + (Number($(self).attr("id")) + 7);
            var downLeftWhiteJump = "#" + (Number($(self).attr("id")) + 14);
            var downRightWhiteMove = "#" + (Number($(self).attr("id")) + 9);
            var downRightWhiteJump = "#" + (Number($(self).attr("id")) + 18);
            if ($(upLeftWhiteMove).attr("class") == "black"
            &&
            $(upLeftWhiteJump).attr("class") == "active") {
                wasIf = true
                $(upLeftWhiteJump).addClass("checkedLeft");
                whiteCheckedLeft();
            }
            //sprawdza prawą stronę
            if ( ($(upRightWhiteMove).attr("class") == "black")
            &&
            ($(upRightWhiteJump).attr("class") == "active")) {
                wasIf = true
                $(upRightWhiteJump).addClass("checkedRight");
                whiteCheckedRight();
            }
            //sprawdza lewą stronę dół
            if ($(downLeftWhiteMove).attr("class") == "black" &&
            $(downLeftWhiteJump).attr("class") == "active") {
                wasIf = true
                $(downLeftWhiteJump).addClass("checkedBackLeft")
                whiteCheckedBackLeft();

            }
            //sprawdza prawą stronę dół
            if ($(downRightWhiteMove).attr("class") == "black" &&
            $(downRightWhiteJump).attr("class") == "active") {
                wasIf = true
                $(downRightWhiteJump).addClass("checkedBackRight")
                whiteCheckedBackRight();
            }
            if (wasIf == false) {
                blackMove();
            }

        }

        //// RUSZANIE SIĘ BIAŁYMI



        ///CZYŚCI PO ZŁYM WYBORZE białych

        function whiteMove() {
            $(".white").on("click", function() {

                $(this).addClass("checkedThis");
                var upRightMove = "#" + (Number($(this).attr("id")) - 7);
                var upLeftMove = "#" + (Number($(this).attr("id")) - 9);
                var upRightJump = "#" + (Number($(this).attr("id")) - 14);
                var upLeftJump = "#" + (Number($(this).attr("id")) - 18);
                var downLeftMove = "#" + (Number($(this).attr("id")) + 7);
                var downLeftJump = "#" + (Number($(this).attr("id")) + 14);
                var downRightMove = "#" + (Number($(this).attr("id")) + 9);
                var downRightJump = "#" + (Number($(this).attr("id")) + 18);

                var wasBeat = false;
                //sprawdza lewą stronę
                if ($(upLeftMove).attr("class") == "active"){
                    $(upLeftMove).addClass("moveLeft");
                    let getDownOneArrayParam = [ 9, "active"]
                    let getDownTwoArrayParam = [ 0, "white"]
                    let beatArrayParam = [".white", -7, -9, -14, -18, 7, 14, 9, 18, "black", blackMove()]
                    moveOneField(".moveLeft", beatArrayParam, getDownOneArrayParam, getDownTwoArrayParam, clearCheckedFields,blackMove )

                } else if ($(upLeftMove).attr("class") == "black"
                &&
                $(upLeftJump).attr("class") == "active") {
                    $(upLeftJump).addClass("checkedLeft");
                    wasBeat = true
                    let getDownOneArrayParam = [9, "active"]
                    let getDownTwoArrayParam = [0, "white"]
                    let getDownThreeArrayParam = [18, "active"]
                    beatRightLeft(".checkedLeft", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                                  blackMove, "black", score.whiteScore, score.whiteScoreCounter, 9, nextMoveWhite )

                }
                if ($(upRightMove).attr("class") == "active"){
                    $(upRightMove).addClass("moveRight");
                    let getDownOneArrayParam = [ 7, "active"]
                    let getDownTwoArrayParam = [ 0, "white"]
                    let beatArrayParam = [".white", -7, -9, -14, -18, 7, 14, 9, 18, "black", blackMove()]
                    moveOneField(".moveRight", beatArrayParam, getDownOneArrayParam, getDownTwoArrayParam, clearCheckedFields,blackMove )

                } else if ( ($(upRightMove).attr("class") == "black")
                &&
                ($(upRightJump).attr("class") == "active")) {
                    $(upRightJump).addClass("checkedRight");
                    wasBeat = true
                    let getDownOneArrayParam = [7, "active"]
                    let getDownTwoArrayParam = [0, "white"]
                    let getDownThreeArrayParam = [14, "active"]
                    beatRightLeft(".checkedRight", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                                  blackMove, "black", score.whiteScore, score.whiteScoreCounter, 7, nextMoveWhite )
                }

                //sprawdza lewą stronę dół
                if ($(downLeftMove).attr("class") == "black" &&
                $(downLeftJump).attr("class") == "active") {
                    $(downLeftJump).addClass("checkedBackLeft")
                    wasBeat = true
                    let getDownOneArrayParam = [-7, "active"]
                    let getDownTwoArrayParam = [0, "white"]
                    let getDownThreeArrayParam = [-14, "active"]
                    beatRightLeft(".checkedBackLeft", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                                  blackMove, "black", score.whiteScore, score.whiteScoreCounter, -7, nextMoveWhite )
                }
                //sprawdza prawą stronę dół
                if ($(downRightMove).attr("class") == "black" &&
                $(downRightJump).attr("class") == "active") {
                    $(downRightJump).addClass("checkedBackRight")
                    wasBeat = true
                    let getDownOneArrayParam = [-9, "active"]
                    let getDownTwoArrayParam = [0, "white"]
                    let getDownThreeArrayParam = [-18, "active"]
                    beatRightLeft(".checkedBackRight", getDownOneArrayParam, getDownTwoArrayParam, getDownThreeArrayParam, clearCheckedFields,
                                  blackMove, "black", score.whiteScore, score.whiteScoreCounter, -9, nextMoveWhite )
                }

                if (wasBeat === true) {
                    $(upLeftMove).removeClass("moveLeft");
                    $(upLeftMove).prop('onclick',null).off('click');
                    $(upRightMove).removeClass("moveRight");
                    $(upRightMove).prop('onclick',null).off('click');
                }
                blockOtherDiv(".white");
                checkedThisReturnFunctions(clearCheckedFields, whiteMove);
            })
        }

        return {
            whiteMove: whiteMove
        }
}

module.exports = Figure;

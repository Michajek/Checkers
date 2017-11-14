var Board = require("./board.js")
var board = new Board();
board.createBoard();

var Score = require("./score.js")
var score = new Score();

        //Startuje
        whiteMove();


        // Czyści wszystko

        function clearCheckedFields() {
            var allActiveFields = [1,3,5,7,8,10,12,14,17,19,21,23,24,26,28,30,33,35,37,39,40,42,44,46,49,51,53,55,56,58,60,62];
            for (var i = 0; i < allActiveFields.length; i++) {
                var field = "#" + allActiveFields[i]
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

        // BICIE przymusowe

        //Sprawdza bicie przymusowe
        function mustBeat(siteColor, upRight, upLeft, upJumpRight, upJumpLeft,
                          downLeft, downJumpLeft, downRight, downJumpRight,
                          enemyClass, moveFunction) {
            var all = $(siteColor)
            var beated = false
            //Prawo góra
            for (var i = 0; i < all.length; i++) {

                var upRightMove = "#" + (Number($(all[i]).attr("id")) + upRight);
                //Lewo góra
                var upLeftMove = "#" + (Number($(all[i]).attr("id")) + upLeft);
                //Prawo góra do bicia
                var upRightJump = "#" + (Number($(all[i]).attr("id")) + upJumpRight);
                //Lewo góra do bicia
                var upLeftJump = "#" + (Number($(all[i]).attr("id")) + upJumpLeft);
                //Lewo dół
                var downLeftMove = "#" + (Number($(all[i]).attr("id")) + (downLeft));
                //Lewo dół do bicia
                var downLeftJump = "#" + (Number($(all[i]).attr("id")) + (downJumpLeft));
                //Prawo dół
                var downRightMove = "#" + (Number($(all[i]).attr("id")) + (downRight));
                //Prawo dół do bicia
                var downRightJump = "#" + (Number($(all[i]).attr("id")) + (downJumpRight));
                if ($(upLeftMove).attr("class") == enemyClass
                &&
                $(upLeftJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDown($(all[i]), 0, "active");
                    clearCheckedFields();
                    moveFunction;
                }
                //sprawdza prawą stronę
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

        function nextMoveBlack(self) {
            var wasIf = false
            //Prawo góra
            var upRightMove = "#" + (Number($(self).attr("id")) + 9);
            //Lewo góra
            var upLeftMove = "#" + (Number($(self).attr("id")) + 7);
            //Prawo góra do bicia
            var upRightJump = "#" + (Number($(self).attr("id")) + 14);
            //Lewo góra do bicia
            var upLeftJump = "#" + (Number($(self).attr("id")) + 18);
            //Lewo dół
            var downLeftMove = "#" + (Number($(self).attr("id")) - 9);
            //Lewo dół do bicia
            var downLeftJump = "#" + (Number($(self).attr("id")) - 18);
            //Prawo dół
            var downRightMove = "#" + (Number($(self).attr("id")) - 7);
            //Prawo dół do bicia
            var downRightJump = "#" + (Number($(self).attr("id")) - 14);
            if ($(upLeftMove).attr("class") == "white"
                       &&
                       $(upLeftJump).attr("class") == "active") {
                            wasIf = true
                            $(upLeftJump).addClass("checkedLeft");
                            blackCheckedLeft();
            }
            //sprawdza prawą stronę
            if ( ($(upRightMove).attr("class") == "white")
                        &&
                        ($(upRightJump).attr("class") == "active")) {
                            wasIf = true
                            $(upRightJump).addClass("checkedRight");
                            blackCheckedRight();
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

        ///CZYŚCI PO ZŁYM WYBORZE czarnego

        function checkedThisReturnFunctionsBlack() {
            $(".checkedThis").on("click", function() {
                clearCheckedFields()
                blackMove()
            })
        }

        function blackMove() {
            $(".black").on("click", function() {

                $(this).addClass("checkedThis");
                var upRightWhiteMove = "#" + (Number($(this).attr("id")) + 9);
                //Lewo góra
                var upLeftWhiteMove = "#" + (Number($(this).attr("id")) + 7);
                //Prawo góra do bicia
                var upRightWhiteJump = "#" + (Number($(this).attr("id")) + 18);
                //Lewo góra do bicia
                var upLeftWhiteJump = "#" + (Number($(this).attr("id")) + 14);
                //Lewo dół
                var downLeftWhiteMove = "#" + (Number($(this).attr("id")) - 9);
                //Lewo dół do bicia
                var downLeftWhiteJump = "#" + (Number($(this).attr("id")) - 18);
                //Prawo dół
                var downRightWhiteMove = "#" + (Number($(this).attr("id")) - 7);
                //Prawo dół do bicia
                var downRightWhiteJump = "#" + (Number($(this).attr("id")) - 14);

                var wasBeat = false;
                //sprawdza lewą stronę
                if ($(upLeftWhiteMove).attr("class") == "active"){
                    $(upLeftWhiteMove).addClass("moveLeft");

                } else if ($(upLeftWhiteMove).attr("class") == "white"
                           &&
                           $(upLeftWhiteJump).attr("class") == "active") {
                    $(upLeftWhiteJump).addClass("checkedLeft");
                    wasBeat = true
                }
                //sprawdza prawą stronę
                if ($(upRightWhiteMove).attr("class") == "active"){
                    $(upRightWhiteMove).addClass("moveRight");
                } else if ( ($(upRightWhiteMove).attr("class") == "white")
                            &&
                            ($(upRightWhiteJump).attr("class") == "active")) {
                    $(upRightWhiteJump).addClass("checkedRight");
                    wasBeat = true
                }

                //sprawdza lewą stronę dół
                if ($(downLeftWhiteMove).attr("class") == "white" &&
                     $(downLeftWhiteJump).attr("class") == "active") {
                    $(downLeftWhiteJump).addClass("checkedBackLeft")
                    wasBeat = true
                }
                //sprawdza prawą stronę dół
                if ($(downRightWhiteMove).attr("class") == "white" &&
                     $(downRightWhiteJump).attr("class") == "active") {
                    $(downRightWhiteJump).addClass("checkedBackRight")
                    wasBeat = true
                }

                if (wasBeat === true) {
                    $(upLeftWhiteMove).removeClass("moveLeft");
                    $(upRightWhiteMove).removeClass("moveRight");
                }
                moveRightBlack();
                moveLeftBlack();
                blackCheckedRight();
                blackCheckedLeft();
                blackCheckedBackLeft();
                blackCheckedBackRight();

                blockOtherDiv(".black");
                checkedThisReturnFunctionsBlack();
            })
        }

        // Ruch w prawo
        function moveRightBlack() {
            $(".moveRight").on("click", function() {
                mustBeat(".black", 9, 7, 18, 14, (-9), (-18), (-7), (-14), "white", whiteMove())
                getDown($(this), -9, "active");
                getDown($(this), 0, "black");
                clearCheckedFields();
                whiteMove();
            });
        }
        // Ruch w lewo
        function moveLeftBlack() {
            $(".moveLeft").on("click", function() {
                mustBeat(".black", 9, 7, 18, 14, -9, -18, -7, -14, "white", whiteMove())
                getDown($(this), -7, "active");
                getDown($(this), 0, "black");
                clearCheckedFields();
                whiteMove();
            });
        }

        //bicie w prawo
        function blackCheckedRight () {
            $(".checkedRight").on("click", function() {
                var self = $(this)
                var div1 = "#" + (Number($(this).attr("id")) - 9);
                if ($(div1).attr("class") == "white") {
                    score.blackScore(score.blackScoreCounter);
                    getDown(self, -18, "active");
                    getDown(self, -9, "active");
                    clearCheckedFields();
                    nextMoveBlack(self)
                } else {
                    clearCheckedFields();
                    whiteMove();
                }
                getDown($(this), -9, "active");
                getDown($(this), 0, "black");
            });
        }


        //Bicie W LEWO
        function blackCheckedLeft () {
            $(".checkedLeft").on("click", function() {
                var self = $(this)
                var goodMove1 = Number($(this).attr("id")) - 7;
                var div1 = "#" + goodMove1;
                if ($(div1).attr("class") == "white") {
                    score.blackScore(score.blackScoreCounter);
                    getDown(self, -14, "active");
                    getDown(self, -7, "active");
                    clearCheckedFields();
                    nextMoveBlack(self)
                } else {
                    clearCheckedFields();
                    whiteMove();
                }
                getDown($(this), -7, "active");
                getDown($(this), 0, "black");

            });
        }



        //Bicie do tyłu w prawo
        function blackCheckedBackRight () {
            $(".checkedBackRight").on("click", function() {
                var self = $(this)
                var div1 = "#" + (Number($(this).attr("id")) + 7);
                if ($(div1).attr("class") == "white") {
                    score.blackScore(score.blackScoreCounter);
                    getDown(self, 14, "active");
                    getDown(self, 7, "active");
                    clearCheckedFields();
                    nextMoveBlack(self)
                } else {
                    clearCheckedFields();
                    whiteMove();
                }
                getDown($(this), 7, "active");
                getDown($(this), 0, "black");
            });
        }

        //bicie do tyłu w lewo
        function blackCheckedBackLeft () {
            $(".checkedBackLeft").on("click", function() {
                var self = $(this)
                var div1 = "#" + (Number($(this).attr("id")) + 9);
                if ($(div1).attr("class") == "white") {
                    score.blackScore(score.blackScoreCounter);
                    getDown(self, 18, "active");
                    getDown(self, 9, "active");
                    clearCheckedFields();
                    nextMoveBlack(self)
                } else {
                    clearCheckedFields();
                    whiteMove();
                }
                getDown($(this), 9, "active");
                getDown($(this), 0, "black");

            });
        }




        ///RUCHY BIAŁYCH


        //funkcja bicia podwójnego/potrójnego

        function nextMove(self) {
            var wasIf = false
            //Prawo góra
            var upRightWhiteMove = "#" + (Number($(self).attr("id")) - 7);
            //Lewo góra
            var upLeftWhiteMove = "#" + (Number($(self).attr("id")) - 9);
            //Prawo góra do bicia
            var upRightWhiteJump = "#" + (Number($(self).attr("id")) - 14);
            //Lewo góra do bicia
            var upLeftWhiteJump = "#" + (Number($(self).attr("id")) - 18);
            //Lewo dół
            var downLeftWhiteMove = "#" + (Number($(self).attr("id")) + 7);
            //Lewo dół do bicia
            var downLeftWhiteJump = "#" + (Number($(self).attr("id")) + 14);
            //Prawo dół
            var downRightWhiteMove = "#" + (Number($(self).attr("id")) + 9);
            //Prawo dół do bicia
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

        function checkedThisReturnFunctionsWhite() {
            $(".checkedThis").on("click", function() {
                clearCheckedFields()
                whiteMove()
            })
        }

        function whiteMove() {
            $(".white").on("click", function() {

                $(this).addClass("checkedThis");
                //Prawo góra
                var upRightWhiteMove = "#" + (Number($(this).attr("id")) - 7);
                //Lewo góra
                var upLeftWhiteMove = "#" + (Number($(this).attr("id")) - 9);
                //Prawo góra do bicia
                var upRightWhiteJump = "#" + (Number($(this).attr("id")) - 14);
                //Lewo góra do bicia
                var upLeftWhiteJump = "#" + (Number($(this).attr("id")) - 18);
                //Lewo dół
                var downLeftWhiteMove = "#" + (Number($(this).attr("id")) + 7);
                //Lewo dół do bicia
                var downLeftWhiteJump = "#" + (Number($(this).attr("id")) + 14);
                //Prawo dół
                var downRightWhiteMove = "#" + (Number($(this).attr("id")) + 9);
                //Prawo dół do bicia
                var downRightWhiteJump = "#" + (Number($(this).attr("id")) + 18);

                var wasBeat = false;
                //sprawdza lewą stronę
                if ($(upLeftWhiteMove).attr("class") == "active"){
                    $(upLeftWhiteMove).addClass("moveLeft");

                } else if ($(upLeftWhiteMove).attr("class") == "black"
                           &&
                           $(upLeftWhiteJump).attr("class") == "active") {
                    $(upLeftWhiteJump).addClass("checkedLeft");
                    wasBeat = true
                }
                //sprawdza prawą stronę
                if ($(upRightWhiteMove).attr("class") == "active"){
                    $(upRightWhiteMove).addClass("moveRight");
                } else if ( ($(upRightWhiteMove).attr("class") == "black")
                            &&
                            ($(upRightWhiteJump).attr("class") == "active")) {
                    $(upRightWhiteJump).addClass("checkedRight");
                    wasBeat = true
                }

                //sprawdza lewą stronę dół
                if ($(downLeftWhiteMove).attr("class") == "black" &&
                     $(downLeftWhiteJump).attr("class") == "active") {
                    $(downLeftWhiteJump).addClass("checkedBackLeft")
                    wasBeat = true
                }
                //sprawdza prawą stronę dół
                if ($(downRightWhiteMove).attr("class") == "black" &&
                     $(downRightWhiteJump).attr("class") == "active") {
                    $(downRightWhiteJump).addClass("checkedBackRight")
                    wasBeat = true
                }

                if (wasBeat === true) {
                    $(upLeftWhiteMove).removeClass("moveLeft");
                    $(upRightWhiteMove).removeClass("moveRight");
                }
                whiteCheckedRight();
                whiteCheckedLeft();
                whiteCheckedBackLeft();
                whiteCheckedBackRight();
                moveRight();
                moveLeft();

                blockOtherDiv(".white");
                checkedThisReturnFunctionsWhite();
            })
        }
        // Ruch w prawo
        function moveRight() {
            $(".moveRight").on("click", function() {
                mustBeat(".white", -7, -9, -14, -18, 7, 14, 9, 18, "black", blackMove())
                var self = $(this);
                getDown($(this), 7, "active");
                getDown($(this), 0, "white");
                clearCheckedFields();
                blackMove();
            });
        }
        // Ruch w lewo
        function moveLeft() {
            $(".moveLeft").on("click", function() {
                mustBeat(".white", -7, -9, -14, -18, 7, 14, 9, 18, "black", blackMove())
                var self = $(this);
                getDown($(this), 9, "active");
                getDown($(this), 0, "white");
                clearCheckedFields();
                blackMove();
            });
        }

        //bicie w prawo
        function whiteCheckedRight () {
            $(".checkedRight").on("click", function() {
                var self = $(this);
                var div1 = "#" + (Number($(this).attr("id")) + 7);
                if ($(div1).attr("class") == "black") {
                    score.whiteScore(score.whiteScoreCounter);
                    getDown(self, 14, "active");
                    getDown(self, 7, "active");
                    clearCheckedFields();
                    nextMove(self);
                } else {
                    clearCheckedFields();
                    blackMove();
                }
                getDown($(this), 7, "active");
                getDown($(this), 0, "white");
            });
        }


        //Bicie W LEWO
        function whiteCheckedLeft () {
            $(".checkedLeft").on("click", function() {
                var self = $(this);
                var goodMove1 = Number($(this).attr("id")) + 9;
                var div1 = "#" + goodMove1;
                if ($(div1).attr("class") == "black") {
                    score.whiteScore(score.whiteScoreCounter);
                    getDown(self, 18, "active");
                    getDown(self, 9, "active");
                    clearCheckedFields();
                    nextMove(self);
                } else {
                    clearCheckedFields();
                    blackMove();
                }
                getDown($(this), 9, "active");
                getDown($(this), 0, "black");

            });
        }



        //Bicie do tyłu
        function whiteCheckedBackRight () {
            $(".checkedBackRight").on("click", function() {
                var self = $(this);

                var div1 = "#" + (Number($(this).attr("id")) - 9);
                if ($(div1).attr("class") == "black") {
                    score.whiteScore(score.whiteScoreCounter);
                    getDown(self, -18, "active");
                    getDown(self, -9, "active");
                    clearCheckedFields();
                    nextMove(self);
                } else {
                    clearCheckedFields();
                    blackMove();
                }
                getDown(self, -9, "active");
                getDown(self, 0, "white");
            });
        }

        function whiteCheckedBackLeft () {
            $(".checkedBackLeft").on("click", function() {
                var self = $(this);

                var div1 = "#" + (Number($(this).attr("id")) - 7);
                if ($(div1).attr("class") == "black") {
                    score.whiteScore(score.whiteScoreCounter);
                    getDown(self, -14, "active");
                    getDown(self, -7, "active");
                    clearCheckedFields();
                    nextMove(self);
                } else {
                    clearCheckedFields();
                    blackMove();
                }
                getDown(self, -7, "active");
                getDown(self, 0, "white");

            });
        }

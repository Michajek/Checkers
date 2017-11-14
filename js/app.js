var Board = require("./board.js")
var board = new Board();
board.createBoard();

var Score = require("./score.js")
var score = new Score();


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

        function getDownWhite (self, fields) {
            var getDownDiv1 = "#" + (Number((self).attr("id")) + fields);
            $(getDownDiv1).prop('onclick',null).off('click');
            $(getDownDiv1).removeClass();
            $(getDownDiv1).attr("class", "active")
        }

        // funkcja bicia w tył (białe) w przód (czarne)
        function getDownBackWhite (self, fields) {
            var getDownDiv1 = "#" + (Number((self).attr("id")) - fields);
            $(getDownDiv1).prop('onclick',null).off('click');
            $(getDownDiv1).removeClass();
            $(getDownDiv1).attr("class", "active")
        }
        // BICIE przymusowe

        // czyszczenie do bicia przymusowego


        //Sprawdza bicie przymusowe

        function mustBeatBlack() {
            var allBlack = $(".black")
            var beated = false
            //Prawo góra
            for (var i = 0; i < allBlack.length; i++) {
                allBlack[i]
                var upRightWhiteMove = "#" + (Number($(allBlack[i]).attr("id")) + 9);
                //Lewo góra
                var upLeftWhiteMove = "#" + (Number($(allBlack[i]).attr("id")) + 7);
                //Prawo góra do bicia
                var upRightWhiteJump = "#" + (Number($(allBlack[i]).attr("id")) + 18);
                //Lewo góra do bicia
                var upLeftWhiteJump = "#" + (Number($(allBlack[i]).attr("id")) + 14);
                //Lewo dół
                var downLeftWhiteMove = "#" + (Number($(allBlack[i]).attr("id")) - 9);
                //Lewo dół do bicia
                var downLeftWhiteJump = "#" + (Number($(allBlack[i]).attr("id")) - 18);
                //Prawo dół
                var downRightWhiteMove = "#" + (Number($(allBlack[i]).attr("id")) - 7);
                //Prawo dół do bicia
                var downRightWhiteJump = "#" + (Number($(allBlack[i]).attr("id")) - 14);
                if ($(upLeftWhiteMove).attr("class") == "white"
                &&
                $(upLeftWhiteJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDownWhite($(allBlack[i]), 0);
                    clearCheckedFields();
                    whiteMove();
                }
                //sprawdza prawą stronę
                if ( ($(upRightWhiteMove).attr("class") == "white")
                &&
                ($(upRightWhiteJump).attr("class") == "active")) {
                    alert("Bicie przymusowe, tracisz piona")
                    getDownWhite($(allBlack[i]), 0);
                    clearCheckedFields();
                    whiteMove();
                }
                //sprawdza lewą stronę dół
                if ($(downLeftWhiteMove).attr("class") == "white" &&
                $(downLeftWhiteJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDownWhite($(allBlack[i]), 0);
                    clearCheckedFields();
                    whiteMove();

                }
                //sprawdza prawą stronę dół
                if ($(downRightWhiteMove).attr("class") == "white" &&
                $(downRightWhiteJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDownWhite($(allBlack[i]), 0);
                    clearCheckedFields();
                    whiteMove();
                }
            }

        }

        //funkcja bicia podwójnego/potrójnego

        function nextMoveBlack(self) {
            var wasIf = false
            var upRightWhiteMove = "#" + (Number($(self).attr("id")) + 9);
            //Lewo góra
            var upLeftWhiteMove = "#" + (Number($(self).attr("id")) + 7);
            //Prawo góra do bicia
            var upRightWhiteJump = "#" + (Number($(self).attr("id")) + 18);
            //Lewo góra do bicia
            var upLeftWhiteJump = "#" + (Number($(self).attr("id")) + 14);
            //Lewo dół
            var downLeftWhiteMove = "#" + (Number($(self).attr("id")) - 9);
            //Lewo dół do bicia
            var downLeftWhiteJump = "#" + (Number($(self).attr("id")) - 18);
            //Prawo dół
            var downRightWhiteMove = "#" + (Number($(self).attr("id")) - 7);
            //Prawo dół do bicia
            var downRightWhiteJump = "#" + (Number($(self).attr("id")) - 14);
            if ($(upLeftWhiteMove).attr("class") == "white"
                       &&
                       $(upLeftWhiteJump).attr("class") == "active") {
                            wasIf = true
                            $(upLeftWhiteJump).addClass("checkedLeft");
                            blackCheckedLeft();
                            console.log($(downRightWhiteJump));

            }
            //sprawdza prawą stronę
            if ( ($(upRightWhiteMove).attr("class") == "white")
                        &&
                        ($(upRightWhiteJump).attr("class") == "active")) {
                            wasIf = true
                            $(upRightWhiteJump).addClass("checkedRight");
                            blackCheckedRight();
                        }

            //sprawdza lewą stronę dół
            if ($(downLeftWhiteMove).attr("class") == "white" &&
                 $(downLeftWhiteJump).attr("class") == "active") {
                     wasIf = true
                    $(downLeftWhiteJump).addClass("checkedBackLeft")
                    blackCheckedBackLeft();


            }
            //sprawdza prawą stronę dół
            if ($(downRightWhiteMove).attr("class") == "white" &&
                 $(downRightWhiteJump).attr("class") == "active") {
                     wasIf = true
                    $(downRightWhiteJump).addClass("checkedBackRight")
                    blackCheckedBackRight();
            }
            if (wasIf == false) {
                whiteMove();
            }

        }

        //// RUSZANIE SIĘ BIAŁYMI



        ///CZYŚCI PO ZŁYM WYBORZE białych

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
                blackCheckedRight();
                blackCheckedLeft();
                blackCheckedBackLeft();
                blackCheckedBackRight();
                moveRightBlack();
                moveLeftBlack();

                blockOtherDiv(".black");
                checkedThisReturnFunctionsBlack();
            })
        }
        // Ruch w prawo
        function moveRightBlack() {
            $(".moveRight").on("click", function() {
                mustBeatBlack();
                var self = $(this);
                var div1 = "#" + (Number($(this).attr("id")) - 9);
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "black")
                clearCheckedFields();
                whiteMove();
            });
        }
        // Ruch w lewo
        function moveLeftBlack() {
            $(".moveLeft").on("click", function() {
                mustBeatBlack();
                var self = $(this);
                var div1 = "#" + (Number($(this).attr("id")) - 7);
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "black")
                clearCheckedFields();
                whiteMove();
            });
        }

        //bicie w prawo
        function blackCheckedRight () {
            $(".checkedRight").on("click", function() {
                var self = $(this);
                var div1 = "#" + (Number($(this).attr("id")) - 9);
                if ($(div1).attr("class") == "white") {
                    score.blackScore(score.blackScoreCounter);
                    getDownBackWhite(self, 18);
                    $(div1).prop('onclick',null).off('click');
                    $(div1).removeClass();
                    $(div1).attr("class", "active")
                    clearCheckedFields();
                    nextMoveBlack(self);
                } else {
                    clearCheckedFields();
                    whiteMove();
                }
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "black")
            });
        }


        //Bicie W LEWO
        function blackCheckedLeft () {
            $(".checkedLeft").on("click", function() {
                var self = $(this);
                var goodMove1 = Number($(this).attr("id")) - 7;
                var div1 = "#" + goodMove1;
                if ($(div1).attr("class") == "white") {
                    score.blackScore(score.blackScoreCounter);
                    getDownBackWhite(self, 14);
                    $(div1).prop('onclick',null).off('click');
                    $(div1).removeClass();
                    $(div1).attr("class", "active")
                    clearCheckedFields();
                    nextMoveBlack(self);
                } else {
                    clearCheckedFields();
                    whiteMove();
                }
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "black")
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(div1).prop('onclick',null).off('click');

            });
        }



        //Bicie do tyłu
        function blackCheckedBackRight () {
            $(".checkedBackRight").on("click", function() {
                var self = $(this);

                var div1 = "#" + (Number($(this).attr("id")) + 7);
                if ($(div1).attr("class") == "white") {
                    score.blackScore(score.blackScoreCounter);
                    getDownWhite(self, 14);
                    $(div1).prop('onclick',null).off('click');
                    $(div1).removeClass();
                    $(div1).attr("class", "active")
                    clearCheckedFields();
                    nextMoveBlack(self);
                } else {
                    clearCheckedFields();
                    whiteMove();
                }
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "black")
            });
        }

        function blackCheckedBackLeft () {
            $(".checkedBackLeft").on("click", function() {
                var self = $(this);

                var div1 = "#" + (Number($(this).attr("id")) + 9);
                if ($(div1).attr("class") == "white") {
                    score.blackScore(score.blackScoreCounter);
                    getDownWhite(self, 18);
                    $(div1).prop('onclick',null).off('click');
                    $(div1).removeClass();
                    $(div1).attr("class", "active")
                    clearCheckedFields();
                    nextMoveBlack(self);
                } else {
                    clearCheckedFields();
                    whiteMove();
                }
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "black")

            });
        }




        ///RUCHY BIAŁYCH

        //Sprawdza bicie przymusowe

        function mustBeat(self) {
            var allWhite = $(".white")
            var beated = false
            //Prawo góra
            for (var i = 0; i < allWhite.length; i++) {
                allWhite[i]
                var upRightWhiteMove = "#" + (Number($(allWhite[i]).attr("id")) - 7);
                //Lewo góra
                var upLeftWhiteMove = "#" + (Number($(allWhite[i]).attr("id")) - 9);
                //Prawo góra do bicia
                var upRightWhiteJump = "#" + (Number($(allWhite[i]).attr("id")) - 14);
                //Lewo góra do bicia
                var upLeftWhiteJump = "#" + (Number($(allWhite[i]).attr("id")) - 18);
                //Lewo dół
                var downLeftWhiteMove = "#" + (Number($(allWhite[i]).attr("id")) + 7);
                //Lewo dół do bicia
                var downLeftWhiteJump = "#" + (Number($(allWhite[i]).attr("id")) + 14);
                //Prawo dół
                var downRightWhiteMove = "#" + (Number($(allWhite[i]).attr("id")) + 9);
                //Prawo dół do bicia
                var downRightWhiteJump = "#" + (Number($(allWhite[i]).attr("id")) + 18);
                if ($(upLeftWhiteMove).attr("class") == "black"
                &&
                $(upLeftWhiteJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDownWhite($(allWhite[i]), 0);
                    clearCheckedFields();
                    blackMove();
                }
                //sprawdza prawą stronę
                if ( ($(upRightWhiteMove).attr("class") == "black")
                &&
                ($(upRightWhiteJump).attr("class") == "active")) {
                    alert("Bicie przymusowe, tracisz piona")
                    getDownWhite($(allWhite[i]), 0);
                    clearCheckedFields();
                    blackMove();
                }
                //sprawdza lewą stronę dół
                if ($(downLeftWhiteMove).attr("class") == "black" &&
                $(downLeftWhiteJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDownWhite($(allWhite[i]), 0);
                    clearCheckedFields();
                    blackMove();

                }
                //sprawdza prawą stronę dół
                if ($(downRightWhiteMove).attr("class") == "black" &&
                $(downRightWhiteJump).attr("class") == "active") {
                    alert("Bicie przymusowe, tracisz piona")
                    getDownWhite($(allWhite[i]), 0);
                    clearCheckedFields();
                    blackMove();
                }
            }

        }

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
                mustBeat();
                var self = $(this);
                var div1 = "#" + (Number($(this).attr("id")) + 7);
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "white")
                clearCheckedFields();
                blackMove();
            });
        }
        // Ruch w lewo
        function moveLeft() {
            $(".moveLeft").on("click", function() {
                mustBeat();
                var self = $(this);
                var div1 = "#" + (Number($(this).attr("id")) + 9);
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "white")
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
                    getDownWhite(self, 14);
                    $(div1).prop('onclick',null).off('click');
                    $(div1).removeClass();
                    $(div1).attr("class", "active")
                    clearCheckedFields();
                    nextMove(self);
                } else {
                    clearCheckedFields();
                    blackMove();
                }
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "white")
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
                    getDownWhite(self, 18);
                    $(div1).prop('onclick',null).off('click');
                    $(div1).removeClass();
                    $(div1).attr("class", "active")
                    clearCheckedFields();
                    nextMove(self);
                } else {
                    clearCheckedFields();
                    blackMove();
                }
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "white")
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(div1).prop('onclick',null).off('click');

            });
        }



        //Bicie do tyłu
        function whiteCheckedBackRight () {
            $(".checkedBackRight").on("click", function() {
                var self = $(this);

                var div1 = "#" + (Number($(this).attr("id")) - 9);
                if ($(div1).attr("class") == "black") {
                    score.whiteScore(score.whiteScoreCounter);
                    getDownBackWhite(self, 18);
                    $(div1).prop('onclick',null).off('click');
                    $(div1).removeClass();
                    $(div1).attr("class", "active")
                    clearCheckedFields();
                    nextMove(self);
                } else {
                    clearCheckedFields();
                    blackMove();
                }
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "white")
            });
        }

        function whiteCheckedBackLeft () {
            $(".checkedBackLeft").on("click", function() {
                var self = $(this);

                var div1 = "#" + (Number($(this).attr("id")) - 7);
                if ($(div1).attr("class") == "black") {
                    score.whiteScore(score.whiteScoreCounter);
                    getDownBackWhite(self, 14);
                    $(div1).prop('onclick',null).off('click');
                    $(div1).removeClass();
                    $(div1).attr("class", "active")
                    clearCheckedFields();
                    nextMove(self);
                } else {
                    clearCheckedFields();
                    blackMove();
                }
                $(div1).prop('onclick',null).off('click');
                $(div1).removeClass();
                $(div1).attr("class", "active")
                $(this).prop('onclick',null).off('click');
                $(this).removeClass();
                $(this).attr("class", "white")

            });
        }

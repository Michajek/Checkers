function Board() {

    const disabled = [0,2,4,6,9,11,13,15,16,18,20,22,25,27,29,31,32,
                    34,36,38,41,43,45,47,48,50,52,54,57,59,61,63];

    const black = [1,3,5,7,8,10,12,14,17,19,21,23];

    const active = [24,26,28,30,33,35,37,39];

    const white = [40,42,44,46,49,51,53,55,56,58,60,62];

    function createBoard() {
        for (let i = 0; i < 64; i++) {
            let newDiv = $("<div></div>");
            newDiv.attr("id", i);
            $(".board").append($(newDiv));
        }

        addClassBoard();
    }

    function include(arr, obj) {
        for(let i=0; i<arr.length; i++) {
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

    return {
        createBoard: createBoard
    }
}
module.exports = Board;

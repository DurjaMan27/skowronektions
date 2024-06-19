const MAX_ITEMS_SELECTED = 4;
const MAX_GAMEBOARD_ITEMS = 16;
const MAX_MISSED_GUESSES = 4;


// required values:
    // string
    // group: 1, 2, 3, 4
    // selected: true, false
    // correct: true, false

var missedGuesses = 0;
var previousGuesses = [];
// var selectedItems = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; // represents the board -> 0s for non-selected, 1s for selected
// var gameBoardItems = []; // strings for 16 values that are shown in board
// var boardPlacement = [[], [], [], []]; // each of the 16 strings will be placed at certain locations corresponding to their board location
// var correctGroups = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; // represents the locations of correct groups (1 is for first group, 2 for second group, and so on)

var gameboardItems = [{name: "Ravens", group: 1, selected: 0}];

function lockBoard() {
    // ensure that no new blocks can be selected
}

function findBlock(name) {
    /**
     * finds the index of the block that matches the parameter name
     */
    for(index = 0; index < MAX_GAMEBOARD_ITEMS; index++) {
        if(gameboardItems[index].name === name) {
            return index;
        }
    }
}

function makeSelection(name) {
    /**
     * When a block is selected, it makes sure that the block is marked as selected
     */
    if(lockBoard()) {
        console.log("Max Number of Selections have been made")
    } else {
        let index = findBlock(name);
        gameboardItems[index].selected = true;
    }
}

function reshuffleBoard() {
    // function to reorder boardPlacement with values in gameBoardItems
}

function deselectAll() {
    /**
     * unselects all the blocks, setting the selected parameter of each index to 0
     */
    for(index = 0; index < MAX_GAMEBOARD_ITEMS; index++) {
        gameboardItems[index].selected = false;
    }
}

function countSelectedItems() {
    /**
     * returns the number of selected items in the list (min = 0, max = 4)
     */
    sum = 0;
    for(index = 0; index < MAX_GAMEBOARD_ITEMS; index++) {
        if(gameboardItems[index].selected) {
            sum++;
        }
    }

    return sum;
}

function submit() {
    currGuess = new Set();
    indices = []
    for(index = 0; index < MAX_GAMEBOARD_ITEMS; index++) {
        if(gameboardItems[index].selected) {
            currGuess.add(gameboardItems[index].name);
            indices.push(index);
        }
    }

    if(checkPreviousGuesses(currGuess)) {
        console.log("You already guessed this numbnuts");
    } else {
        // condition ? statement-if-true : statement-if-false
        // iterates through each of the selected items (indices) and checks that the group matches the group number from the first
        // indices.forEach(index => gameboardItems[index]["group"] === gameboardItems[indices[0]]["group"] ? correctGuess() : wrongGuess());
        // indices.forEach()

        // iterates through each of the selected items (index) and checks against the first selected item to ensure that they are all of the same group
        index = 1
        correct = true
        while(index < 4) {
            gameboardItems[indices[index]]["group"] === gameboardItems[indices[0]]["group"] ? index++ : correct = false;
        }

        // if correct is still true (i.e. all the selected items are of the same group), run correctGuess(), else run wrongGuess()
        if(correct) {
            correctGuess();
        } else {
            wrongGuess();
        }
    }
}

function correctGuess() {
    // add guessed values to front of the list and set their guessed values to right
    for(index = 0; index < MAX_GAMEBOARD_ITEMS; index++) {
        if(gameboardItems[index].selected) {

            removedValue = gameboardItems.splice(index,1);
            gameboardItems.unshift(removedValue);

            gameboardItems[0].correct = True;
            gameboardItems[0].selected = False;
        }
    }
}

function wrongGuess() {
    // set wrong guess
}

function checkPreviousGuesses(currGuess) {
    // function to convert a set to a sorted array
    const setToSortedArray = (set) => [...set].sort();

    // function to compare equality of two sets by their elements
    const areSetsEqual = (set1, set2) => {
        if (set1.size !== set2.size) {
            return false;
        }

        const arr1 = setToSortedArray(set1);
        const arr2 = setToSortedArray(set2);

        return arr1.every((value, index) => value === arr2[index]);
    };

    // function to check if a set is contained in a list of sets
    const isSetContained = (set, list) => {
        return list.some(item => areSetsEqual(set, item));
    };

    return isSetContained(currGuess, previousGuesses);
}



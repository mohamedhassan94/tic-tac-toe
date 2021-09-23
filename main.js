"use strict";

// tageting HTML elements

const cells = document.querySelectorAll('.cell');
const restartButtons = document.querySelectorAll('button');
const layer = document.querySelector('.layer');
const winnerName = document.querySelector('.layer-box h2');

const x_sound = new Audio('./media/x-sound.mp3');
const winning_sound = new Audio('./media/winning.mp3');


// setting blank values for all boces

let blanks = [null, null, null, null, null, null, null, null, null];


// defining winning cases based on the indexes vertically, horizontally and diagonally

let winSets = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

// the functionality of the computer player

const cpuTurn = () => {

    let availableBlanks = [];

    // getting the available boxes to fill in

    for (let i = 0; i < blanks.length; i++) {
        if(blanks[i] === null) { 
            availableBlanks.push(i)
        }
    }

    // getting a randon box to fill in

    let randomBlankIndex = Math.floor( Math.random() * availableBlanks.length );

    let index = availableBlanks[randomBlankIndex];

    let randomCell = cells[ index];
    
    // filling the box

    randomCell.textContent = 'o';
    blanks[index] = 'o';
    randomCell.style.color = 'red';

    // checking if the computer player won or not

    winning();

}


// the functionality of the player

const fillCell = (cell, i) => {


    if(cell.textContent === ''){

        // filling the box
        cell.textContent = 'x';
        blanks[i] = 'x';
        cell.style.color = '#09c';
        x_sound.play()

        // checking if the player won or not
        winning();

        // the computer player turn
    
        cpuTurn();
    }

}

// handling the player click

cells.forEach((cell, i) => {
    cell.addEventListener('click', fillCell.bind(this, cell, i), {once: true});
});

// the functionality of the restart game

restartButtons.forEach( button => {
    button.addEventListener('click', () => {
        location.reload();
    })
} )


// the functionality checking the winner

const winning = () => {


    winSets.forEach( set => {

        let matches = [];

        set.forEach( index => {
            // checking that the box with that index is not empty
            if( cells[index].textContent ){
                matches.push(cells[index].textContent);
            }
        } );

        // checking that there are 3 elements with unique value
        if( matches.length === 3 && new Set(matches).size === 1 ){
            // displaying the layer
            layer.style.visibility = 'visible';

             // displaying the winner name
            if(matches[0] === 'x'){
                winnerName.textContent = 'Congratulations! You are the winner. 🏆';
                winning_sound.play();
            } else {
                winnerName.textContent = 'Hard Luck! Try again!';
            }
        }

    } )

}


/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, count, thisRoll, lastRoll, index;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(gamePlaying) {
        
        //1. Ramdom number
        var dice = Math.floor(Math.random() * 6) + 1;
        thisRoll = dice;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        thisRoll = dice2;
        
        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        //3. Hide set score input and OK buttton
        document.querySelector('#set-winning-score').style.display = 'none';
        document.querySelector('.btn-ok').style.display = 'none';

        //4. Update the round score IF the round number is NOT a 1    
        if(dice !== 1 && dice2 !== 1) {
            //Add score
            roundScore += (dice + dice2);
            //roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';         
        }else if(dice === 1 || dice2 === 1) {
            // Set active player's score to 0 and switch to next player
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }else {
            //switch to other player
            nextPlayer();
        }

        //If player gets two sixes in a row the player loses his ENTIRE score
        if(thisRoll === 6) {
            lastRoll = thisRoll;
            count += 1;
        }else {
            lastRoll = 0;
            count = 0;
        }

        if(thisRoll === 6 && lastRoll === 6 && count === 2) {
            lastRoll = 0;
            count    = 0;
            // Set active player's score to 0 and switch to next player
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
            return;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        //scores[activePlayer] = scores[activePlayer] + roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer] >= index) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else {
            //switch to other player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    count = 0;
    thisRoll = 0;
    lastRoll = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('set-winning-score').style.display = 'block';
    document.getElementById('set-winning-score').value = 0;
    document.querySelector('.btn-ok').style.display = 'block';
    document.getElementById('set-score-par').style.display = 'none';
    document.getElementById('set-score').style.display = 'none';
}


function nextPlayer() {
    //switch to other player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function setWinningScore() {
    //Players can set the winning score
    index = document.getElementById('set-winning-score').value;
    if(index.value = 0) {
        gamePlaying = false;
    
    }else {
        document.getElementById('set-winning-score').style.display = 'none';
        document.querySelector('.btn-ok').style.display = 'none';
        document.getElementById('set-score').innerHTML = index;
        document.getElementById('set-score-par').style.display = 'block';
        document.getElementById('set-score').style.display = 'block';
    }
    console.log(index);
}








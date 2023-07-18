# Game Mechanics

Rock paper scissors is a simple game played using hands. The game is played between two players.
Simultaneously, both players pick from three choices (Rock, paper, scissors). The winner is decided
using the following rules:

1. Rock beats paper
2. Paper beats scissors
3. Scissors beat rock

A draw happens when both players pick the same choice. The game's runtime is decided beforehand
by both players. Typically, the game ends when a player has reached a set score or when a timer runs
out and the player with the most points wins.

To create an onchain game version of rock paper scissors require the following:

1. a way to pit two players against each other
2. a way to choose without divulging the choice to the opponent
3. a way to reveal the choices by both players to determine the winner

## Game States 

Because this version of rock paper scissors happens over the blockchain, it would not be feasible
to actually simultaneously choose an option, reveal it, then keep score. As such, the author separated
the game into different states:

1. Idle State - in this phase, a player waits for another player to join in
2. Commit 1 State - in this phase, someone has chosen an option
3. Commit 2 State - in this phase, both have chosen options
4. Reveal 1 State - in this phase, a player has revealed his or her option
5. Decided State - in this phase, both players have revealed their options

## Entities

This version is a fairly easy rock paper scissors. As such there's only one entity: the player.
The player is a being that represents the user on the blockchain. Therefore, each public address
is essentially a player.

## Components

Even in its simplistic nature, there are various components involved that make up a player:

1. Wins - a number that keeps track of how many wins the player has
2. HashedChoice - the player's choice hashed to keep it hidden from the opponent
3. Choice - the actual player choice when the reveal happens
4. Opponent - represents the player's opponent
5. Total Games - the number of games played with an opponent
6. RoundStartTime - the time that defines when a round has started

## System

To actually execute the game, these are the functions each player can do:

1. Play against anyone without an opponent or wait until someone joins
2. Choose an option and hashes it without revealing the choice onchain
3. Reveal the choice and add a point to the winner
4. Reset everything so that the player can play with the opponent again


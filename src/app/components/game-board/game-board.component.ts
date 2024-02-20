import {Component, Input} from '@angular/core';
import {TileComponent} from "../tile/tile.component";
import {NgForOf} from "@angular/common";
import {InputFieldComponent} from "../input-field/input-field.component";
import {Tile} from "../../interfaces/Tile";
import {AttemptRemainingComponent} from "../attempt-remaining/attempt-remaining.component";

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    TileComponent,
    NgForOf,
    InputFieldComponent,
    AttemptRemainingComponent
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
  @Input() word: string = '';
  attempts: Tile[][] = Array(0).fill(null).map(() => Array(5).fill(''));
  isDisabled = false;
  totalAttempts = 6

  onAttemptSubmission(attempt: string): void {
    if (!attempt || attempt.length !== this.word.length) {
      alert('Guess must be 5 letters')
      return;
    }

    this.attempts.push(this.createTilesFromGuess(attempt));
    //check for a win
    if (this.checkForWin(attempt)){
      alert(`You correctly guessed the word in ${this.attempts.length} tries!`);

      //disable keyboard
      this.isDisabled = true;
      return;
    }
    //check for a number of attempts
    if (this.attempts.length >= this.totalAttempts){
      alert(`Sorry, you have run out of attempts. The word was ${this.word}`);
      //disable keyboard
      this.isDisabled = true;
      return;
    }

  }

  calculateRemainingAttempts(): number {
    return this.totalAttempts - this.attempts.length;
  }

  createTilesFromGuess(attempt: string): Tile[] {
    const tiles: Tile[] = [];
    const currentWordArray = this.word.toUpperCase().split('');
    const attemptArray = attempt.toUpperCase().split('');

    //firstPass
    attemptArray.forEach((letter, idx) => {
      if (letter === currentWordArray[idx]){
        tiles.push({letter, state: 'correct'});
        currentWordArray[idx] = '';
      } else {
        tiles.push({letter, state: 'absent'});
      }
    });

    //second pass
    attemptArray.forEach((letter, idx) => {
      if (tiles[idx].state === 'absent' && currentWordArray.includes(letter)){
        tiles[idx].state = 'present';

        const letterIdx = currentWordArray.indexOf(letter);
        if (letterIdx !== -1){
          currentWordArray[letterIdx] = '';
        }
      }
    });
    return tiles;
  }

  checkForWin(guess: string){
    return this.word.toLowerCase() === guess.toLowerCase();
  }
}

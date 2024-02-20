import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-attempt-remaining',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './attempt-remaining.component.html',
  styleUrl: './attempt-remaining.component.css'
})
export class AttemptRemainingComponent {
  @Input() attemptsRemaining: number = 0;
  @Input() isDisabled = false;
}

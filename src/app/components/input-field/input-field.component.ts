import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  currentAttempt: string = '';
  @Input() isDisabled = false;
  @Output() attemptSubmission: EventEmitter<string> = new EventEmitter<string>();

  handleKeyDownEvent(event: KeyboardEvent): void {
    if (this.isDisabled){
      return;
    }
    const letter = event.key.toUpperCase();

    if (letter.match(/^[A-Z]$/) && this.currentAttempt.length < 5)
      this.currentAttempt += letter;

    if (event.key === 'Enter' && this.currentAttempt.length === 5){
      this.attemptSubmission.emit(this.currentAttempt);
      this.currentAttempt = '';
    }

    if (event.key === 'Backspace')
      this.currentAttempt = this.currentAttempt.slice(0, -1);
  }
}

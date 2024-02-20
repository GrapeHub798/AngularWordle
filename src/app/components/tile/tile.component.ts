import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {
  @Input() letter: string = '';
  @Input() state: 'correct' | 'present' | 'absent' | 'default' = 'default';
}

import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GameBoardComponent} from "./components/game-board/game-board.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameBoardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-wordle-clone';
  sampleWord = 'slice';
  wordUrl = 'https://api.frontendeval.com/fake/word'

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchWord();
  }

  fetchWord() {
    this.http.get(this.wordUrl, {responseType: 'text'})
      .subscribe((response: string) => {
        this.sampleWord = response;
      })
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isGameOn: boolean = false
  fieldSize: number
  gameMessage: string
  shuffleSteps: number

  setGameStatus(status: boolean) {
    this.isGameOn = status
  }

  setFieldSize(size: number) {
    this.fieldSize = size
  }

  setGameMessage(msg: string) {
    this.gameMessage = msg
  }

  setShuffleSteps(steps: number) {
    this.shuffleSteps = steps
  }

}

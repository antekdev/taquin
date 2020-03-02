import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isGameOn: boolean = false
  fieldSize: number

  toggleGameStatus(status: boolean) {
    console.log('New game status', status)
    this.isGameOn = status
  }

  changeFieldSize(size: number) {
    console.log('New field size', size)
    this.fieldSize = size
  }

}

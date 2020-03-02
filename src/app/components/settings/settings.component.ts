import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FIELD_SIZE, SHUFFLE_STEPS } from 'src/app/constants'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  size = FIELD_SIZE
  shuffleSteps = SHUFFLE_STEPS

  @Input() isGameOn: boolean

  @Output() handleSizeChange = new EventEmitter<number>()
  @Output() handleShuffleStepsChange = new EventEmitter<number>()
  @Output() handleGameStatusToggle = new EventEmitter<boolean>()  

  constructor() { }

  ngOnInit() {
    this.handleSizeChange.emit(FIELD_SIZE)
    this.handleShuffleStepsChange.emit(SHUFFLE_STEPS)
  }

  increaseSize() {
    if (this.size < 6) {
      this.size++
      this.handleSizeChange.emit(this.size)
    }
  }

  decreaseSize() {
    if (this.size > 3) {
      this.size--
      this.handleSizeChange.emit(this.size)
    }
  }

  moreSteps() {
    if (this.shuffleSteps < 50) {
      this.shuffleSteps += 5
      this.handleShuffleStepsChange.emit(this.shuffleSteps)
    }
  }

  fewerSteps() {
    if (this.shuffleSteps > 0) {
      this.shuffleSteps -= 5
      this.handleShuffleStepsChange.emit(this.shuffleSteps)
    }
  }

  startGame() {
    this.handleGameStatusToggle.emit(true)
  }

  endGame() {
    this.handleGameStatusToggle.emit(false)
  }

}

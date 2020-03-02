import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  size = 4
  @Output() handleSizeChange = new EventEmitter<number>()
  @Input() isGameOn: boolean
  @Output() handleGameStatusToggle = new EventEmitter<boolean>()
  

  constructor() { }

  ngOnInit() {
    this.handleSizeChange.emit(4)
  }

  increaseSize() {
    if (this.size < 6) {
      this.size++
      this.handleSizeChange.emit(this.size)
    }
  }

  decreaseSize() {
    if (this.size > 3)  {
      this.size--
      this.handleSizeChange.emit(this.size)
    }
  }

  startGame() {
    this.handleGameStatusToggle.emit(true)
  }

  endGame() {
    this.handleGameStatusToggle.emit(false)
  }

}

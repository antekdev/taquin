import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import getRandomInt from 'src/app/helpers/get-random-int'

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnChanges {

  @Input() fieldSize: number
  @Input() shuffleSteps: number
  @Output() gameMessage = new EventEmitter<string>()
  
  columnsProperty: Object

  tiles: Array<number>
  turns: number = 0

  constructor() { }

  ngOnChanges() {
    this.tiles = this.buildTileArray()
    this.columnsProperty = {
      'grid-template-columns': `repeat(${this.fieldSize}, 1fr)`
    }
    console.log(this.shuffleSteps, 'shuffle steps on changes')
    this.shuffle()
    this.gameMessage.emit('Good luck!')
  }

  shuffle() {
    console.log('Shuffling with', this.shuffleSteps, 'steps')
    if (this.shuffleSteps) {
      let stepsTaken = 0
      let currentTileId = this.generateNewTileId()
      //while (stepsTaken < this.shuffleSteps) {
      for (let i=0;i<15;i++) {
        let shifted = this.tryToShift(currentTileId)
        console.log('shifted', shifted)
        if (shifted) stepsTaken++
        currentTileId = this.generateNewTileId(currentTileId)
      }
      console.log('stepsTaken', stepsTaken)
    }    
  }

  private generateNewTileId(prevId: number = -1): number {
    let maxTileId = this.tiles.length - 1
    let newTileId = getRandomInt(0, maxTileId)
    let idsAreTheSame = newTileId == prevId
    console.warn('ID OVERLAP', idsAreTheSame)
    while (idsAreTheSame) {
      newTileId = getRandomInt(0, maxTileId)
      idsAreTheSame = newTileId == prevId
    }
    return newTileId
  }

  private tryToShift(fromId: number): boolean {
    let shiftCases = [1, -1, this.fieldSize, -this.fieldSize]
    let fromPos = this.tiles.indexOf(fromId)
    let zeroPos = this.tiles.indexOf(0)
    let diff = fromPos - zeroPos;
    // let debugObj = {fromPos, zeroPos, diff}
    // console.table(debugObj)
    if (shiftCases.includes(diff)) {
      this.tiles[fromPos] = 0
      this.tiles[zeroPos] = fromId
      return true
    } return false
  }

  handleTileClick(e) {
    let tileId = parseInt(e.target.innerText)
    if (tileId) {
      let shifted = this.tryToShift(tileId)
      let won = this.hasWon()
      if (won) {
        this.turns++
        this.gameMessage.emit(`Victory! Turns taken: ${this.turns}`)
      } else if (shifted) {
        this.turns++
        this.gameMessage.emit(`Turns taken: ${this.turns}`)
      } else this.gameMessage.emit(`Impossible turn! Total: ${this.turns}`)
    }
  } 

  private hasWon(): boolean {
    let zeroPos = this.tiles.indexOf(0)
    if (zeroPos == this.tiles.length - 1) {
      console.log('Checking if won')
      let tileArray = this.buildTileArray()
      return tileArray.every((x, i) => x == this.tiles[i])
    } return false    
  }

  private buildTileArray(): Array<number> {
    const totalTiles = Math.pow(this.fieldSize, 2)
    return Array.from(Array(totalTiles), (x, i) => i == totalTiles - 1 ? 0 : i + 1)
  }

}

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
    if (this.shuffleSteps) this.shuffle()
    this.gameMessage.emit('Good luck!')
  }

  shuffle() {
    let prevShuffledTile = 0;
    let stepsTaken = 0
    while (stepsTaken < this.shuffleSteps) {
      let tileId = this.buildShiftableTileId(prevShuffledTile)
      this.shift(tileId)
      prevShuffledTile = tileId
      stepsTaken++
    }
  }

  handleTileClick(e) {
    let tileId = parseInt(e.target.innerText)
    if (tileId) {
      let won = false
      let shifting = this.isTileSuitable(tileId)
      if (shifting) {
        this.shift(tileId)
        won = this.hasWon()
      }
      if (won) {
        this.turns++
        this.gameMessage.emit(`Victory! Turns taken: ${this.turns}`)
      } else if (shifting) {
        this.turns++
        this.gameMessage.emit(`Turns taken: ${this.turns}`)
      } else this.gameMessage.emit(`Impossible turn! Total: ${this.turns}`)
    }
  } 


  private buildShiftableTileId(prevId: number): number {
    let suitableTiles = this.tiles.filter(tileId => this.isTileSuitable(tileId, prevId))
    let randomlyChosenTileId = suitableTiles[Math.floor(Math.random() * suitableTiles.length)]
    console.log('Tile chosen when shuffling', randomlyChosenTileId)
    return randomlyChosenTileId
  }

  private isTileSuitable(tileId: number, prevId?: number): boolean {
    // Tile shiftability conditions:
    // 1. Haven't shifted in the last turn
    // 2. Is adjacent to empty tile
    // 3. If shifting horizontally, only the same row turns are allowed
    let tilePos = this.tiles.indexOf(tileId)
    let result = true
    if (prevId) result = tileId !== prevId
    if (result) {
      let zeroPos = this.tiles.indexOf(0)
      let suitabilityCases = [1, -1, this.fieldSize, -this.fieldSize]
      let adjacency = suitabilityCases.findIndex(x => tilePos + x == zeroPos)
      result = adjacency > -1
      if (result) {
        let isAdjacentHorizontally = [0, 1].includes(adjacency)
        if (isAdjacentHorizontally) result = this.checkSameRowCondition(tilePos, zeroPos)
      }
    }
    return result
  }

  private checkSameRowCondition(tilePos: number, zeroPos: number): boolean {
    let tilePosRow = Math.floor(tilePos /  this.fieldSize)
    let zeroPosRow = Math.floor(zeroPos /  this.fieldSize)
    return tilePosRow == zeroPosRow
  }

  private shift(tileId: number): void {
    let tilePos = this.tiles.indexOf(tileId)
    let zeroPos = this.tiles.indexOf(0)
    this.tiles[tilePos] = 0
    this.tiles[zeroPos] = tileId
  }

  private hasWon(): boolean {
    let zeroPos = this.tiles.indexOf(0)
    if (zeroPos == this.tiles.length - 1) {
      // We only check winning condition if the last tile is empty
      let tileArray = this.buildTileArray()
      return tileArray.every((x, i) => x == this.tiles[i])
    } return false    
  }

  private buildTileArray(): Array<number> {
    const totalTiles = Math.pow(this.fieldSize, 2)
    return Array.from(Array(totalTiles), (x, i) => i == totalTiles - 1 ? 0 : i + 1)
  }

}

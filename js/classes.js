import { c, canvas } from "./scripts/canvas.js"

export class Sprite {
  constructor({name, position, img}){
    this.name = name
    this.position = position,
    this.img = img
  }

  draw(){
    if(this.name === 'player'){
      c.drawImage(
        this.img,
        0,
        0,
        this.img.width / 2,
        this.img.height,
        canvas.width / 2 - this.img.width / 2, 
        canvas.height / 2  - this.img.height / 2,
        this.img.width / 2,
        this.img.height
      )
    } else {
      c.drawImage(this.img, this.position.x, this.position.y)
    }
  }
}

const tileSetPixelSize = 16
const zoom = 4
export const tileSize = tileSetPixelSize * zoom

export class Boundary {
  static width = tileSize
  static height = tileSize
  constructor({position, type}){
    this.position = position
    this.type = type
    this.width = tileSize
    this.height = tileSize
  }

  draw(){
    c.fillStyle = 'rgba(255,0,0,0.05)'
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}
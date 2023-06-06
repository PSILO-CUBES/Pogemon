import { c, canvas } from "./scripts/canvas.js"

export class Sprite {
  constructor({position, img, frames = {max : 1}}){
    this.position = position,
    this.img = img
    this.frames = frames
    this.img.onload = () =>{
      this.width = this.img.width / this.frames.max
      this.height = this.img.height
    }
  }

  draw(){
    c.drawImage(
      this.img,
      0,
      0,
      this.img.width / this.frames.max,
      this.img.height,
      this.position.x,
      this.position.y,
      this.img.width / this.frames.max,
      this.img.height
    )
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
    c.fillStyle = 'rgba(255,0,0,0.5)'
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}
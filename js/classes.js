import { c } from "./scripts/canvas.js"

export class Sprite {
  constructor({position, img, frames = {max : 1}, sprites}){
    this.position = position,
    this.img = img
    this.frames = {...frames, val: 0, elapsed: 0}
    this.img.onload = () =>{
      this.width = this.img.width / this.frames.max
      this.height = this.img.height
    }
    this.moving = false
    this.running = false
    this.sprites = sprites
  }

  draw(){
    c.drawImage(
      this.img,
      this.frames.val * this.width,
      0,
      this.img.width / this.frames.max,
      this.img.height,
      this.position.x,
      this.position.y,
      this.img.width / this.frames.max,
      this.img.height
    )

    if (!this.moving) {
      this.frames.val = 0 
      return
    }

    if(this.frames.max > 1) this.frames.elapsed++

    if(!this.running){
      if (this.frames.elapsed % 10 === 0){
        if(this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
      }
    } else {
      if (this.frames.elapsed % 5 === 0){
        if(this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
      }
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
    this.color
    this.generateInfo()
  }

  generateInfo(){
    switch(this.type){
      case 1:
        this.color = 'rgba(255,0,0,0.5)'
        break
    }
  }

  draw(){
    c.fillStyle = this.color
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}
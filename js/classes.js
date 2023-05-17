import { c, canvas } from "./scripts/canvas.js"

export class Sprite {
  constructor({name,position,img}){
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
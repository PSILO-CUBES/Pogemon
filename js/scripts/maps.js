import { Sprite } from "../classes.js"

export function generateMap() {
  const mapImg = new Image()
  mapImg.src = './img/maps/paccIsle/paccIsle.png'

  const background = new Sprite({
    name: 'map',
    position: {
      x: -512.5,
      y: -575
    },
    img: mapImg
  })

  return background
}
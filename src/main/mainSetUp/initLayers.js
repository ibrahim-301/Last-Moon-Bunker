import { g, K, surfaceHeight, surfaceWidth } from '../../main.js'
import { circle, makeEarth, rectangle } from '../../drawings.js'
import { moreProperties } from '../../unitObject.js'
import { randomNum } from '../../functions.js'
export let world, uiLayer, floorLayer, objLayer, sun, earth, ground, space
export const initLayers = () => {
  space = rectangle(surfaceWidth + 50, 400, '#000', 0, -25, -400)
  moreProperties(space)
  sun = circle(130, '#fb0', 0, false, 800, -250)
  earth = makeEarth(150, 260, -200)
  earth.blendMode = 'source-atop'
  floorLayer = g.group()
  objLayer = g.group()
  let stars = g.group()
  for (let i = 0; i < 222; i++) {
    const c = circle(randomNum(1, 3, 0), K.w, 0, 0, randomNum(0, surfaceWidth), randomNum(-300, -7))
    stars.addChild(c)
  }

  world = g.group(space, stars, sun, earth, floorLayer, objLayer)
  uiLayer = g.group()
}

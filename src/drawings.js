// import { debugShape } from "../extra/debug.js"
import { surfaceHeight, surfaceWidth, world, floorLayer, objLayer, solids, g } from "./main.js"
import { makeGeneralObject, makeMovableObject, moreProperties, newmMakeGeneralObject } from "./unitObject.js"
import { randomNum } from "./functions.js"
const PI = Math.PI

const makeCircle = (d, k, l, movable = false, x = 0, y = 0) => {
  let g
  if (!movable) g = makeGeneralObject(d, d, x, y)
  else g = makeMovableObject(d, d, x, y)
  const o = {
    ...g,
    fillStyle: k,
    radius: d / 2 
  }

  o.render = (c) => {
    c.strokeStyle = 'black'
    c.lineWidth = l
    c.fillStyle = o.fillStyle
    c.beginPath()
    c.arc(o.radius + (-o.radius * 2 * o.pivotX), o.radius + (-o.radius * 2 * o.pivotY), o.radius, 0, 2 * PI, false)
    if (l) c.stroke()
    c.fill()
  }
  moreProperties(o)
  return o
}
const makeRectangle = (w, h, k, s = 1, x = 0, y = 0) => {
  const g = makeGeneralObject(w, h, x, y)
  const o = {
    ...g,
    x: x,
    y: y,
    width: w,
    height: h,
    fillStyle: k,
    strokeStyle: 'black' 
  }
  o.render = (c) => {
    c.strokeStyle = o.strokeStyle
    c.lineWidth = s
    c.fillStyle = o.fillStyle
    c.beginPath()
    c.moveTo(x, y)
    c.rect(-o.width * o.pivotX, -o.height * o.pivotY, o.width, o.height)
    c.fill()
    if (s) c.stroke()
  }
  moreProperties(o)


  return o
}
const makeSelectionBox = () => {
  const g = makeGeneralObject(1, 1)
  const o = {
    ...g,
    WIDTH: 1,
    HEIGHT: 1,
    render(c) {
      c.strokeStyle = '#FFF'
      c.lineWidth = 4
      c.beginPath()
      c.rect(o.WIDTH, o.HEIGHT, -o.WIDTH, -o.HEIGHT)
      c.stroke()
    } 
  }
  moreProperties(o)
  return o
}
const makeSlash = (n) => {
  const g = makeGeneralObject(140, 140)
  const o = {
    ...g,
    visible: false,
    render(c) {
      c.fillStyle = '#fff'
      if (n) {
        c.beginPath()
        c.arc(0, 160, 160, PI * 1.5, PI * 0.165, false)
        c.arc(65, 195, 85, PI * 0.165, PI * 1.225, true)
        c.fill()
      } else {
        c.beginPath()
        c.arc(0, 160, 160, PI * 1.5, PI * 0.835, true)
        c.arc(-65, 195, 85, PI * 0.835, PI * 1.772, false)
        c.fill()
      }
    } 
  }
  moreProperties(o)
  return o
}
const makeTwoEyes = (two = 1, x = 0, y = 0) => {
  const g = makeGeneralObject(34, 10)
  const o = {
    ...g,
    render(c) {
      c.lineJoin = 'round'
      c.strokeStyle = 'black'
      c.fillStyle = 'red'
      c.lineWidth = 0.7
      c.beginPath()
      c.moveTo(x, y)
      c.lineTo(x + 14, y + 10)
      c.lineTo(x, y + 5)
      c.lineTo(x, y)
      c.fill()
      // Right eye
      if (two) {
        c.moveTo(x + 34, y)
        c.lineTo(x + 20, y + 10)
        c.lineTo(x + 34, y + 5)
        c.lineTo(x + 34, y)
        c.fill()
      }
      c.stroke()
    } 
  }
  moreProperties(o)
  return o
}
const makeThirdEye = (x = -3, y = -80) => {
  const g = makeGeneralObject(6, 15)
  const o = {
    ...g,
    render(c) {
      c.strokeStyle = 'black'
      c.fillStyle = 'red'
      c.lineWidth = 0.5
      c.beginPath()
      c.moveTo(x, y)
      c.lineTo(x + 6, y)
      c.lineTo(x + 3, y + 15)
      c.lineTo(x, y)
      c.fill()
      c.stroke()
    } 
  }
  moreProperties(o)
  return o
}
const makeLeg = (x) => {
  const g = makeGeneralObject(7, 5)
  const o = {
    ...g,
    x: x, 
    render(c) {
      c.strokeStyle = '#000'
      c.fillStyle = '#555'
      c.lineWidth = 1
      c.beginPath()
      c.moveTo(0, 0)
      c.lineTo(6, 0)
      c.lineTo(6, 4)
      c.lineTo(0, 4)
      c.lineTo(0, 0)
      c.fill()
      c.stroke()
    } 
  }
  moreProperties(o)
  return o
}
const makeBorder = (w, h) => {
  const g = makeGeneralObject(w, h)
  const o = {
    ...g,
    render(c) {
      c.strokeStyle = '#FFF'
      c.lineWidth = 2
      c.beginPath()
      c.moveTo(0, 0)
      c.lineTo(w / 4, 0)
      c.moveTo(w - w / 4, 0)
      c.lineTo(w, 0)
      c.lineTo(w, w / 4)
      c.moveTo(w, h - w / 4)
      c.lineTo(w, h)
      c.lineTo(w - w / 4, h)
      c.moveTo(w / 4, h)
      c.lineTo(0, h)
      c.lineTo(0, h - w / 4)
      c.moveTo(0, w / 4)
      c.lineTo(0, 0)
      c.stroke()
    } 
  }
  moreProperties(o)
  return o
}

const makeHeadDetails = (two = 1) => {
  const g = makeGeneralObject(50, 50)
  const o = {
    ...g,
    render(c) {
      c.strokeStyle = 'black'
      c.lineWidth = 1.5
      c.beginPath()
      c.arc(14, 12, 35, Math.PI * 0.20, Math.PI * 0.4, false)
      c.stroke()
      c.beginPath()
      c.arc(47, 20, 22, Math.PI * 0.55, Math.PI * 0.85, false)
      c.stroke()
      c.beginPath()
      c.arc(43, 22, 22, Math.PI * 0.55, Math.PI * 0.85, false)
      c.stroke()
    } 
  }
  moreProperties(o)
  return o
}

const makeHead = () => {
  const g = makeGeneralObject(50, 50)
  const o = {
    ...g,
    fillStyle: '#555',
    render(c) {
      const grad = c.createRadialGradient(2, -3, 27, 10, -20,0)
      grad.addColorStop(0, '#222')
      grad.addColorStop(0.1, this.fillStyle)
      c.strokeStyle = '#000'
      c.fillStyle = grad
      c.lineWidth = 2
      c.beginPath()
      c.arc(0, 0, 25, 0, 2 * PI, false)
      c.stroke()
      c.fill()
    } 
  }
  moreProperties(o)
  return o
}

const shotHit = (x, y) => {
  const g = makeGeneralObject(10, 10, x, y)
  const o = {
    ...g,
    render(c) {
      c.strokeStyle = '#F00'
      c.fillStyle = '#FF0'
      c.lineWidth = 4
      c.beginPath()
      c.arc(-1, -1, 2, 0, 2 * PI, false)
      c.stroke()
      c.fill()
    } 
  }
  moreProperties(o)
  return o
}
const flash = (x = 0, y = 0) => {
  const g = makeGeneralObject(10, 10, x, y)
  const o = {
    ...g,
    visible: false,
    render(c) {
      c.strokeStyle = '#F00'
      c.fillStyle = '#FF0'
      c.lineWidth = 2
      c.beginPath()
      c.lineTo(0, 1)
      c.lineTo(50, 0)
      c.lineTo(0, -1)
      c.stroke()
      c.fill()
    } 
  }
  moreProperties(o)
  return o
}

const laser = (shooterX, shooterY, targetX, targetY) => {
  
  const g = makeGeneralObject(1, 1)
  const o = {
    ...g,
    alwaysVisible: true,
    render(c) {
      c.strokeStyle = '#F33'
      c.lineWidth = 2
      c.beginPath()
      c.moveTo(shooterX, shooterY)
      c.lineTo(targetX, targetY)
      // c.lineTo(x2, y2)
      c.stroke()
    },
  }
  moreProperties(o)
  return o
}

const actionMark = (x = 0, y = 0, attack = true) => {
  const g = makeGeneralObject(10, 10, x, y)
  const o = {
    ...g,
    render(c) {
      c.lineWidth = 8
      c.beginPath()
      if (attack) {
        c.strokeStyle = '#F00'
        c.arc(20, 22, 35, 0, 2 * PI, false)
        c.stroke()
      } else {
        c.strokeStyle = '#0F0'
        c.moveTo(-10, -10)
        c.lineTo(10, 10)
        c.moveTo(10, -10)
        c.lineTo(-10, 10)
        c.stroke()
      }
    } 
  }
  moreProperties(o)
  return o
}

const moonSurface1 = (w, h) => {
  const g = makeGeneralObject(w, h)
  const o = {
    ...g,
    render(c) {
      c.strokeStyle = '#FFF'
      c.lineWidth = 2
      c.beginPath()
      c.rect(0, 0, 100, 100)
      c.stroke()
    }
  }
  moreProperties(o)
  return o
}

const moonGround = (w = surfaceWidth, h = surfaceHeight ) => {
  const g = makeGeneralObject(w, h, 0, 0)
  const o = {
    ...g,
    render(c) {
      // c.strokeStyle = '#FFF'
      // c.lineWidth = 2
      // const grad = c.createLinearGradient(surfaceWidth /10, -surfaceHeight * 2, -surfaceWidth / 2, surfaceHeight)
      const grad = c.createLinearGradient(0, 0, -100, 500)
      grad.addColorStop(0, '#444')
      grad.addColorStop(0.2, '#333')
      // grad.addColorStop(0.3, '#333')
      grad.addColorStop(1, '#222')
      // grad.addColorStop(1, '#111')
      c.beginPath()
      c.rect(-surfaceWidth / 2, -surfaceHeight/2, surfaceWidth, surfaceHeight)
      c.fillStyle = grad
      c.fill()
    }
  }
  moreProperties(o)
  return o
}

const HQ = (x, y) => {
  const g = makeGeneralObject(100, 100, x, y)
  const o = {
    ...g,
    render(c) {
      c.lineWidth = 3
      c.beginPath()
      const grad = c.createLinearGradient(30, -100,-100, 100)
      const gradTop = c.createLinearGradient(50, -30, 0, 40)
      grad.addColorStop(0, '#999')
      grad.addColorStop(0.5, '#444')
      grad.addColorStop(1, '#000')
      gradTop.addColorStop(0, '#777')
      gradTop.addColorStop(1, '#000')

      c.arc(0, 7, 60, 0, 2*PI, false)
      c.clip()

      c.fillStyle = gradTop
      c.fillRect(-35, -50, 70, 50)
      
      c.fillStyle = grad
      c.fillRect(-50, 0, 100, 50)

      c.fillStyle = '#00F'
      c.fillRect(-20,20, 40, 30)

    }
  }
  moreProperties(o)


  // const de = debugShape(o)
  // world.addChild(de)
  return o
}


const tempDrawing = (d, x, y) => {

  const j = makeGeneralObject(d, d, x, y)

  // const b = {
  //   ...j,
  //   render(c) {
  //     var lingrad2 = c.createLinearGradient(100, 0, 100, 100)
  //     lingrad2.addColorStop(0, '#200')
  //     lingrad2.addColorStop(0.5, '#F00')
  //     // c.fillStyle = '#000'
  //     c.beginPath()
  //     // c.arc(0, 0, 100, 0, 2*PI, false)
  //     // c.ellipse(0, 0, 90, 25, 0, 0, 2 * PI,false)
  //     c.ellipse(0, -d*0.8, d * 0.9, d / 4, 0, 0, 2 * PI,false)
  //     c.fillStyle = lingrad2
  //     c.fill()
  //   }
  // }
  // const o = {
  //   ...j,
  //   render(c) {
  //     c.beginPath()
  //     // c.arc(0, -300, d * 4, PI * 0.62, 1.1, true)
  //     c.ellipse(0, 0, d * 1.3, d / 2, 0, PI, 2 * PI, true)
  //     c.ellipse(0, -d * 0.8, d * 0.9, d / 4, 0, PI * 2, PI, false)
  //     // c.arc(0, -260, d * 2, 1.2, 1.8, false)
  //     var lingrad2 = c.createLinearGradient(-50, 200, 100, -100)
  //     lingrad2.addColorStop(0, '#000')
  //     lingrad2.addColorStop(0.55, '#333')
  //     lingrad2.addColorStop(1, '#666')
  //     c.fillStyle = lingrad2
  //     c.fill()
  //     // c.stoke()
  //   }
  // }
  
  const a = [0, 0, d, d / 2, 0, 0, 2 * PI, true]
  // const z = [d * -0.2, d * .5, d, d / 1.2, 0, 0, 2 * PI, false]
  const z = [d * -0.15, d * 0.45, d, d / 1.2, 0, 0, 2 * PI, false]

  const o = {
    ...j,
    render(c) {
      // c.lineWidth = 10
      c.strokeStyle = '#333'
      c.beginPath()
      c.ellipse(...a)
      c.fillStyle = '#222'
      c.fill()
      c.stroke()
    }
  }
  let circlePath = new Path2D()
  circlePath.ellipse(...a)
  const b = {
    ...j,
    render(c) {
      c.lineWidth = 3
      // c.strokeStyle = '#444'
      c.strokeStyle = '#333'
      c.beginPath()
      c.ellipse(...a)
      c.stroke()
      c.clip(circlePath)
      c.ellipse(...z)
      // c.fillStyle = '#666'
      c.fillStyle = '#555'
      c.fill()
    }
  }

  // b.alpha = 0.5

  moreProperties(b)
  moreProperties(o)
  // b.x = o.x / 2 - d
  // b.y = o.y / 2 - d
  floorLayer.addChild(o)
  floorLayer.addChild(b)

  o.rotation = PI
  b.rotation = PI
  // o.rotation = PI / 4
  // b.rotation = PI / 4
  // o.scaleX *= -1
  // b.scaleX *= -1
  // o.alpha = 0.2
  o.alpha = 1

  const base = makeGeneralObject(Math.floor(d * 2.2), Math.floor(d * 1.2), Math.floor(x - d / 1.8), Math.floor(y - d * 0.1))
  moreProperties(base)
  objLayer.addChild(base)
  solids.push(base)
  // solids.push(base)
  // debugShape(base)

  return o
}

const tempDrawing_2 = (w, h, x, y, lineWidth = 2, yOff = 0) => {
  const j = makeGeneralObject(w, h, x, y)
  const o = {
    ...j,
    render(c) {
      c.lineWidth = lineWidth
      c.strokeStyle = '#000'
      c.lineJoin = "round"
      c.lineCap = 'round'
      c.beginPath()
      c.ellipse(0, 0, w/2, yOff, 0, PI, 2 * PI, false)
      c.stroke()
    }
  }
  o.alpha = 1 - (lineWidth / 3)
  moreProperties(o)
  floorLayer.addChild(o)
  o.rotation = randomNum(-0.15, 0.15, 0)
  return o
}

const tempLaser = (x = 0, y = 0) => {
  // let length = 100
  const g = makeGeneralObject(100, 100, x, y)
  const o = {
    ...g,
    length: 100,
    visible: false,
    // alwaysVisible: true,
    render(c) {
      c.strokeStyle = '#F00'
      // c.fillStyle = '#FFb'
      c.lineWidth = 2
      c.beginPath()
      c.moveTo(0, 0)
      c.lineTo(this.length, 0)
      c.stroke()
      // c.moveTo(270, 0)
      // c.strokeStyle = '#FF0'
      // c.arc(250, 0, 4, 0, 2 * PI, false)
      // c.stroke()
      // c.fill()
    },

    setLength(l) {
      this.length = l -40
    }


  }
  moreProperties(o)
  return o
}

const gun = (owner, rifle = true, x = 40, y = 17, w = 70, h = 5) => {
  const j = makeGeneralObject(w, h * 10, x, y)
  const o = {
    ...j,
    render(c) {
      c.lineWidth = 2
      c.beginPath()
      c.moveTo(x, y)
      c.fillStyle = '#000'
      c.fillRect(-w/2, -h/2, w, h)
      c.fillStyle = '#222'
      c.fillRect(-w * 0.1, h / 2, -w / 10, 17)
      c.stroke()
      c.fill()
    },
  }
  moreProperties(o)
  if (rifle) {
    const gunFlash = flash(0, 0)
    o.addChild(gunFlash)
    o.flash = gunFlash
    gunFlash.x = 65
    gunFlash.y = 20
  } else {
    var laser1 = tempLaser()
    o.addChild(laser1)
    laser1.y = -25
    laser1.x = 20
    

    // laser.x = -100
    // laser.y = 110

  }



  const k = makeGeneralObject(100,100, -24, -9)
  const handle = {
    ...k,
    render(c) {
      c.lineWidth = 2
      c.beginPath()
      c.moveTo(x, y)
      c.fillStyle = '#433'
      c.rect(-2, -5, 4, 10)
      c.stroke()
      c.fill()
    },
    fire() {
      o.flash.visible = true
      g.wait(50, () => o.flash.visible = false)
    }
  }
  
  moreProperties(handle)
  handle.addChild(o)

 
  
  owner.playerHand.addChild(handle)
  owner.weapon = handle
  // owner.weapon.rotation = -0.25
  owner.weapon.rotation = owner.weaponRotation

  if (!rifle) owner.laser = laser1
  
  // debugShape(o)
  // return handle
}

const tempEarth = (d, x, y) => {
  const j = makeGeneralObject(d, d, x, y)
  const b = {
    ...j,
    render(c) {
      // var lingrad2 = c.createLinearGradient(100, 0, 100, 100)
      // lingrad2.addColorStop(0, '#000')
      // lingrad2.addColorStop(1, '#999')
      // c.fillStyle = '#000'
      c.beginPath()
      c.arc(0, 0, d, 0, 2 * PI, false)
      // c.ellipse(0, -d*0.8, d * 0.9, d / 4, 0, 0, 2 * PI,false)
      c.fillStyle = '#00F'
      c.fill()
    }
  }

  const l = {
    ...j,
    render(c) {
      c.beginPath()
      c.fillStyle = '#080'
      c.moveTo(-2,-35)
      c.lineTo(75, -28)
      c.lineTo(75, 15)
      c.lineTo(24, 65)
      
      c.moveTo(25, 100)
      c.lineTo(35, 70)
      c.lineTo(80, 100)
      c.lineTo(50, 180)
      c.lineTo(38, 120)

      c.moveTo(220, 120)
      c.lineTo(190, 60)
      c.lineTo(150, 45)
      c.lineTo(170, 0)
      c.lineTo(240, 0)
      c.lineTo(260, 40)

      c.fill()
    }
  }
  moreProperties(l)
  moreProperties(b)
  b.addChild(l)
  l.x = -120
  l.y = -50

  return b
}

const makeEnemyEyes = () => {
  const g = makeGeneralObject(50, 50)
  const o = {
    ...g,
    render(c) {
      c.strokeStyle = '#000'
      c.fillStyle = '#0F0'
      c.lineWidth = 2
      c.beginPath()
      // c.ellipse(25, 20, 10, 12, 0, 0, 2*PI, false)
      c.ellipse(0, -14, 10, 12, 0, 0, 2*PI, false)
      c.stroke()
      c.fill()
    }
  }
  moreProperties(o)
  return o
}


const newMakeEnemyEyes = () => {
  const o = {
    render(c) {
      c.strokeStyle = '#000'
      c.fillStyle = '#0F0'
      c.lineWidth = 2
      c.beginPath()
      c.ellipse(0, -14, 10, 12, 0, 0, 2*PI, false)
      c.stroke()
      c.fill()
    }
  }
  newmMakeGeneralObject(o, 50, 50, 0, 0)
  return o
}

export { 
  makeCircle, 
  makeRectangle, 
  makeSelectionBox, 
  makeSlash, 
  makeTwoEyes, 
  makeThirdEye, 
  makeLeg, 
  makeBorder, 
  makeHeadDetails, 
  shotHit, 
  flash, 
  actionMark,
  HQ,
  moonGround,
  laser,
  makeHead,
  tempDrawing_2,
  tempDrawing,
  tempEarth,
  makeEnemyEyes,
  gun,

  newMakeEnemyEyes,
 }

import { world, objLayer } from './main/mainSetUp/initLayers.js'
import { g } from './main.js'
import { checkCollisions, removeItem } from './functions.js'
import { bottomPanel, tip } from './main/mainSetUp/initBottomPanel.js'
import { selectedUnits } from './mouse.js'
import { attackingTarget } from './main/mainLoop/attackTarget.js'
import { movingUnits } from './main/mainLoop/moveUnits.js'

let currentPlayer, UC
const keys = {
  'w': false,
  's': false,
  'a': false,
  'd': false,
  'q': false,
  'z': false
}

window.addEventListener('keydown', (k) => {
  if (k.key in keys) {
    keys[k.key] = true
    if (UC) currentPlayer.isMoving = true
  }
})
window.addEventListener('keyup', (k) => {
  if (k.key in keys) {
    keys[k.key] = false
    if (UC) {
      if (Object.values(keys).every(v => v === false)) currentPlayer.isMoving = false
    }

  } else if (k.key === 'r') switchMode()
})

const moveCamera = (SURFACE_WIDTH, SURFACE_HEIGHT) => {
  if (keys['w'] || keys['z']) {
    if (world.y < 300) world.y += 20
  }
  if (keys['s']) {
    if (world.y > g.stage.height - SURFACE_HEIGHT) world.y -= 20
  }
  if (keys['a'] || keys['q']) {
    if (world.x < 0) world.x += 20
  }
  if (keys['d']) {
    if (world.x > g.stage.width - SURFACE_WIDTH) world.x -= 20
  }
}
const movePlayer = () => {
  if (keys['w'] || keys['z']) {
    currentPlayer.y -= currentPlayer.speed
    checkCollisions('bot')
    currentPlayer.scan()
    objLayer.children.sort((a, b) => a.bottom - b.bottom)
  }
  if (keys['s']) {
    currentPlayer.y += currentPlayer.speed
    checkCollisions('top')
    currentPlayer.scan()
    objLayer.children.sort((a, b) => a.bottom - b.bottom)
  }
  if (keys['a'] || keys['q']) {
    currentPlayer.x -= currentPlayer.speed
    checkCollisions('right')
    currentPlayer.scan()
  }
  if (keys['d']) {
    currentPlayer.x += currentPlayer.speed
    checkCollisions('left')
    currentPlayer.scan()
  }
}




const switchMode = () => {
  if (!UC) {
    if (selectedUnits.length === 1) {
      UC = true
      tip.visible = false
      bottomPanel.visible = false
      currentPlayer = selectedUnits[0]
      currentPlayer.isMoving = false
      currentPlayer.target = null
      currentPlayer.rollOnCooldown = false
      removeItem(movingUnits, currentPlayer)
      removeItem(attackingTarget, currentPlayer)
      currentPlayer.deselect()
      selectedUnits.length = 0
    }
  }
  else {
    UC = false
    bottomPanel.visible = true
    if (!currentPlayer.isDead) {
      currentPlayer.isMoving = false
      currentPlayer.weapon.rotation = currentPlayer.weaponRotation
      currentPlayer = null
    }
  }
}

export { 
  keys,
  moveCamera,
  movePlayer,
  switchMode,
  currentPlayer,
  UC
}

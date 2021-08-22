import { g, uiLayer, playerUnits, selectedUnits, movingUnits, MK, currentPlayer, enemies, world, attackingTarget } from './main.js'
import { getUnitVector, removeItem, sortUnits } from './functions.js'
import { actionMark, makeRectangle, makeSelectionBox } from './drawings.js'
let selectionBox
let selectionStarted
let boxSet
const initSelectionBox = () => {
  selectionStarted = false
  boxSet = false
  selectionBox = makeSelectionBox()
  selectionBox.alpha = 0
  uiLayer.addChild(selectionBox)
}
const pointerDown = (e) => {
  if (e.button === 0) leftMouseDown()
  else if (e.button === 2) rightMouseDown()
}
const pointerUp = (e) => {
  if (MK) return false
  if (e.button === 0) leftMouseUp()
  else if (e.button === 2) rightMouseUp()
}
const leftMouseDown = () => {
  if (!MK) {
    selectionStarted = true
    selectionBox.alpha = 1
  }
  else currentPlayer.attack()
}
const rightMouseDown = () => {
  if (!MK) {
    if (selectedUnits.length > 0) {
      if (enemies.length > 0) {
        for (const enemy of enemies) {
          if (g.GlobalDistance(enemy, g.pointer) <= 25) {
            const a = actionMark(0, 0, true)
            enemy.addChild(a)
            g.wait(300, () => g.remove(a))
            selectedUnits.forEach(unit => {
              unit.isMoving = false
              unit.target = enemy
              attackingTarget.push(unit)
            })
            return
          }
        }
      }
      // sortUnits(selectedUnits, g.pointer.x + pointerOffsetX, g.pointer.y + pointerOffsetY, movingUnits)
      sortUnits(selectedUnits, g.pointer.x - world.x, g.pointer.y - world.y, movingUnits)
    }
  } else {
    // if (!g.state) return false
    // if (g.state.name !== 'play') return false
    if (currentPlayer.type == 'main') {
      if (currentPlayer.rollOnCooldown) return false
      currentPlayer.rollOnCooldown = true
      const uv = getUnitVector(currentPlayer, g.pointer, true)
      currentPlayer.vx = uv.x
      currentPlayer.vy = uv.y
      const sides = []
      if (uv.x > 0) sides.push('left')
      else sides.push('right')
      if (uv.y > 0) sides.push('top')
      else sides.push('down')
      currentPlayer.isRolling = true
      currentPlayer.scan(1500, 350)
      currentPlayer.roll()
      g.wait(200, () => currentPlayer.rollOnCooldown = false)
    }
  }
}
const leftMouseUp = () => {
  if (selectionStarted) {
    selectedUnits.forEach(v => v.deselect())
    selectedUnits.length = 0
    const w = selectionBox.WIDTH
    const h = selectionBox.HEIGHT
    const tempBox = makeRectangle(w ? Math.abs(w) : 1, h ? Math.abs(h) : 1, '#FFF', 0, w < 0 ? selectionBox.gx + w : selectionBox.gx, h < 0 ? selectionBox.gy + h : selectionBox.gy)
    g.stage.addChild(tempBox)
    // for (const unit of playerUnits) {
    playerUnits.forEach(unit => {
      if (g.hitTestRectangle(tempBox, unit, true)) {
        if (selectedUnits.findIndex((value) => value == unit) == -1) unit.select()
      }
    })
    selectionStarted = false
    selectionBox.alpha = 0
    boxSet = false
    g.wait(80, () => g.remove(tempBox))
  }
}
const beginSelection = () => {
  if (selectionStarted) {
    if (!boxSet) {
      selectionBox.x = g.pointer.x
      selectionBox.y = g.pointer.y
      boxSet = true
    }
    selectionBox.WIDTH = g.pointer.x - selectionBox.x
    selectionBox.HEIGHT = g.pointer.y - selectionBox.y
  }
}
const rightMouseUp = () => {
    // rightClicked = false
}
export { initSelectionBox, beginSelection, pointerDown, pointerUp, }

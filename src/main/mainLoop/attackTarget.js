import { g } from "../../main.js"
import { removeItem } from "../../functions.js"
import { movingUnits } from "./moveUnits.js"


export let attackingTarget = []

export const attackTarget = () => {
  if (attackingTarget.length > 0) {
    attackingTarget.forEach(unit => {
      if (!unit.target || unit.isDead || unit.target.isDead) {
        removeItem(attackingTarget, unit)
        unit.target = null
        if (unit.canBleed) {
          unit.isMoving = true
          if (movingUnits.indexOf(unit) == -1) movingUnits.push(unit)
        }
        g.wait(150, () => unit.weapon.rotation = unit.weaponRotation)
      } else unit.attack(unit.target)
    })
  }
}
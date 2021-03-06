import { g } from "../../main.js"
import { removeItem, setDirection } from "../../functions.js"
import { goldDisplay } from "../mainSetUp/initBottomPanel.js"
import { world } from "../mainSetUp/initLayers.js"
import { HQ, mine } from "../mainSetUp/initMap.js"
import { movingUnits } from "./moveUnits.js"

const mining = []
export let miners = []
let readyToMine =  true

export const moveMiners = () => {
  if (miners.length > 0) {
    miners.forEach(miner => {
      if (!miner.isMining || miner.isDead) {
        removeItem(miners, miner)
        return
      }

      if (miner.readyForOrder) {
        if (miner.mined) {
          miner.destinationX = HQ.centerX - world.x
          miner.destinationY = HQ.centerY - world.y

          setDirection(miner)
          if (!miner.isMoving) {
            miner.isMoving = true
            movingUnits.push(miner)
          }
          miner.readyForOrder = false
        } else {
          miner.destinationX = mine.centerX - world.x - 20
          miner.destinationY = mine.centerY - world.y - 50
          setDirection(miner)

          if (!miner.isMoving) {
            miner.isMoving = true
            movingUnits.push(miner)
          }
          miner.readyForOrder = false
        }
        
      } else {
        const distHQ = g.GlobalDistance(miner, HQ)
        const distMI = g.GlobalDistance(miner, mine)
  
        if (miner.mined && distHQ <= 90) {
          miner.mined = false
          miner.gb.visible = false
          goldDisplay.add(1)
          miner.readyForOrder = true

        } else if (!miner.mined && !miner.mining && distMI < 60) {
          miner.mining = true
          mining.push(miner)
        }
      }
    })
  }

  if (mining.length > 0) {
    if (readyToMine) {
      readyToMine = false
      g.wait(1000, () => {
        const miner = mining.shift()
        if (miner) {
          miner.mined = true
          miner.mining = false
          miner.gb.visible = true
          miner.readyForOrder = true
        }

        readyToMine = true
      })

    }
  }
}

import { nanoid } from "nanoid"
import calculateAverageDamage from "../Functions/calculateAverageDamage"

const normalWeapon = () => {

const normalWeapon = {
    componentId: nanoid(),
    showAttackCounter: true,
    type: 'normal',
    diceMlt: 1,
    diceSngl: 6,
    staticNr: 0,
    reroll: 0,
    attackNr: 1,
    avgDamage: 0
  }

  normalWeapon.avgDamage = calculateAverageDamage(normalWeapon.diceSngl, normalWeapon.reroll) * normalWeapon.diceMlt
  return normalWeapon
}

  export default normalWeapon
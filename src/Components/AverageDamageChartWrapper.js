import React from "react";
import calculateToHit from "../Functions/calculateToHit";
import calculateSingleAttacks from "../Functions/calculateSingleAttacks";
import AverageDamageChart from "./AverageDamageChart";

const AverageDamageChartWrapper = (props) => {
    const toHitArray = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28] 
    const damages = {
      regular: calculateSingleAttacks(props.allDamage, false),
      powerAttack: calculateSingleAttacks(props.allDamage, true)
    }

    const toHitChances = {
      regular: calculateToHit(props.toHit, toHitArray, damages.regular.totalAttacks, props.toCrit, props.toCritFail, false),
      powerAttack: calculateToHit(props.toHit, toHitArray, damages.regular.totalAttacks, props.toCrit, props.toCritFail, true)
    }

    return (
      <AverageDamageChart 
        damages={damages}
        toHitChances={toHitChances}
        toHitArray={toHitArray}
      />
    )
}

export default AverageDamageChartWrapper
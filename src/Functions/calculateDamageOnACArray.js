const calculateDamageOnACArray = (array, damage, extraOnCrit) => {
    let payload = []    
    let adjustedToHit = 0
    let attackOnCrit = 0
    
    for (let key in array.toHit) {
        if (array.toHit[key] < array.toCrit[key]) { adjustedToHit = array.toCrit[key] }
        else if (array.toCritMiss[key] > (1 - array.toHit[key])) { adjustedToHit = (1 - array.toCritMiss[key]) }
        else { adjustedToHit = array.toHit[key] }

        if (extraOnCrit) {
            attackOnCrit = ((damage.totalAttacks * ((adjustedToHit - array.toCrit[key]) * damage.normal.regular) + 
            (array.toCrit[key] * (damage.normal.crit + damage.onCrit))) * array.toCritOnce[key])
        }
        payload.push(            
            (damage.totalAttacks * ((adjustedToHit - array.toCrit[key] - array.toCritMiss[key]) * damage.normal.regular)
        + (damage.totalAttacks * array.toCrit[key] * (damage.normal.crit + damage.onCrit)))
        + (((array.toHitOnce[key] - array.toCritOnce[key]) * damage.perTurn.regular) 
        + (array.toCritOnce[key] * damage.perTurn.crit))
        + (array.toCritOnce[key] * attackOnCrit)
        )
    }
    return payload
}

export default calculateDamageOnACArray
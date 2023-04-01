const calculateSingleAttacks = (damageArray, powerAttack) => {   
    let pa = (powerAttack ? 10 : 0)
    let addToAllAttacks = {
        regular: 0,
        crit: 0
    }
    let payload = {
        totalAttacks: 0,
        normal: {
            regular: 0,
            crit: 0
        },
        perTurn: {
            regular: 0,
            crit: 0
        },
        onCrit: 0
    }

    for (let key in damageArray) {
        if (damageArray[key].type === 'normal') {
            if (parseInt(damageArray[key].attackNr) !== 0) {
                payload.totalAttacks += (parseInt(damageArray[key].attackNr) === -1 ? 0 : parseInt(damageArray[key].attackNr))
                payload.normal.regular += (((damageArray[key].avgDamage + parseInt(damageArray[key].staticNr) + (parseInt(damageArray[key].attackNr) === -1 ? 0 : pa)) * (parseInt(damageArray[key].attackNr) === -1 ? 1 : parseInt(damageArray[key].attackNr))))
                payload.normal.crit += ((((damageArray[key].avgDamage * 2) + parseInt(damageArray[key].staticNr) + (parseInt(damageArray[key].attackNr) === -1 ? 0 : pa)) * (parseInt(damageArray[key].attackNr) === -1 ? 1 : parseInt(damageArray[key].attackNr))))
            } else {
                addToAllAttacks.regular += (damageArray[key].avgDamage + parseInt(damageArray[key].staticNr))
                addToAllAttacks.crit += ((damageArray[key].avgDamage * 2) + parseInt(damageArray[key].staticNr))
            }
        } else if (damageArray[key].type === 'oncePerTurn') {
            payload.perTurn.regular += (damageArray[key].avgDamage + parseInt(damageArray[key].staticNr))
            payload.perTurn.crit += ((damageArray[key].avgDamage * 2) + parseInt(damageArray[key].staticNr))
        } else if (damageArray[key].type === 'onCrit') {
            payload.onCrit += (damageArray[key].avgDamage + parseInt(damageArray[key].staticNr))
        }
    }
    payload.normal.regular /= payload.totalAttacks
    payload.normal.crit /= payload.totalAttacks
    payload.normal.regular += addToAllAttacks.regular
    payload.normal.crit += addToAllAttacks.crit

    return payload
}

export default calculateSingleAttacks
const calculateToHit = (toHitBonus, acArray, attackNr, critChance, critFailChance, allowPowerAttack) => {

    let powerAttack = (allowPowerAttack ? 5 : 0)
    let payload = {
        normal: {
            toCrit: [],
            toHit: [],
            toHitOnce: [],
            toCritOnce: [],
            toCritMiss: []
        },
        advantage: {
            toCrit: [],
            toHit: [],
            toHitOnce: [],
            toCritOnce: [],
            toCritMiss: []
        },
        elvenAccuracy: {
            toCrit: [],
            toHit: [],
            toHitOnce: [],
            toCritOnce: [],
            toCritMiss: []
        }          
    }

    let toHit
    let toCrit
    let toHitOnce
    let toCritOnce
    let toCritMiss
    
    for (let key in acArray) {
        toCrit = (critChance * 0.05)
        toCritMiss = (critFailChance * 0.05)
        toHit = (21 - acArray[key] + toHitBonus - powerAttack) / 20

        if (toHit > 1) { toHit = 1 }
        else if (toHit < 0) { toHit = 0 }

        toHitOnce = 1 - (Math.pow((1 - toHit), attackNr))
        toCritOnce = 1 - (Math.pow((1 - toCrit), attackNr))

        payload.normal.toCrit.push(toCrit)
        payload.normal.toCritMiss.push(toCritMiss)
        payload.normal.toHit.push(toHit)
        payload.normal.toHitOnce.push(toHitOnce)
        payload.normal.toCritOnce.push(toCritOnce)       
    }

    for (let i = 0; i < payload.normal.toHit.length; i++) {
        toCrit = 1 - (Math.pow((1 - payload.normal.toCrit[i]), 2))        
        payload.advantage.toCrit.push(toCrit)
        toCritOnce = 1 - (Math.pow((1 - toCrit), attackNr))
        payload.advantage.toCritOnce.push(toCritOnce)

        toCrit = 1 - (Math.pow((1 - payload.normal.toCrit[i]), 3))        
        payload.elvenAccuracy.toCrit.push(toCrit)
        toCritOnce = 1 - (Math.pow((1 - toCrit), attackNr))
        payload.elvenAccuracy.toCritOnce.push(toCritOnce)

        toCritMiss = (Math.pow((payload.normal.toCritMiss[i]), 2))        
        payload.advantage.toCritMiss.push(toCritMiss)
        toCritMiss = (Math.pow((payload.normal.toCritMiss[i]), 3))        
        payload.elvenAccuracy.toCritMiss.push(toCritMiss)

        toHit = 1 - (Math.pow((1 - payload.normal.toHit[i]), 2))        
        payload.advantage.toHit.push(toHit)
        toHitOnce = 1 - (Math.pow((1 - toHit), attackNr))
        payload.advantage.toHitOnce.push(toHitOnce)
        toHit = 1 - (Math.pow((1 - payload.normal.toHit[i]), 3))        
        payload.elvenAccuracy.toHit.push(toHit)
        toHitOnce = 1 - (Math.pow((1 - toHit), attackNr))
        payload.elvenAccuracy.toHitOnce.push(toHitOnce)

    }
    return payload
}

export default calculateToHit
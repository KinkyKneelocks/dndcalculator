const calculateAverageDamage = (dieSize, rerollSize) => {
    let average = 0
    
    for (let i = 1; i < dieSize + 1; i++) {
        average += i
    }

    average /= dieSize

    if (rerollSize === 0) {
        return (average)
    } else {
        let rerolledAverage = 0
        for (let i = 1; i < dieSize + 1; i++) {
            if (rerollSize < i) {
                rerolledAverage += i
            } else {
                rerolledAverage += average
            }
        }
        return (rerolledAverage / dieSize)
    }
}

export default calculateAverageDamage
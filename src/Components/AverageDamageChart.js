import React from "react";
import Chart from "react-apexcharts";
import calculateDamageOnACArray from "../Functions/calculateDamageOnACArray";

const AverageDamageChart = (props) => {

    const [chartFunctions, setChartFunctions] = React.useState({
        plusHitOnCrit: false,
        normal: true,
        advantage: true,
        elvenAccuracy: true,
        powerAttack: 'off',
        handlePowerAttack: {
            powerAttackValues: ['off', 'both', 'only'],
            index: 0
        }
    })
    let customClass = null
    console.log(props.damages.regular)
    if (chartFunctions.powerAttack === 'off') {
        customClass = 'buttons__element'
    } else if (chartFunctions.powerAttack === 'only') {
        customClass = 'buttons__element buttons__element--active'
    } else if (chartFunctions.powerAttack === 'both') {
        customClass = 'buttons__element buttons__element--halfactive'
    }

    const handleClick = (event) => {        
        let target = event.target.attributes.name.value
        setChartFunctions((prevChartFunctions) => {
            return (
                {
                    ...prevChartFunctions,
                    [target]: !prevChartFunctions[target]
                }
            )
        })
    }

    const handlePowerAttackClick = () => {
        setChartFunctions((prevChartFunctions) => {
            let number = prevChartFunctions.handlePowerAttack.index            
            number += 1
            if (number > 2) {
                number = 0
            }
            let values = prevChartFunctions.handlePowerAttack.powerAttackValues
            let label = values[number]
            
            return ({
                ...prevChartFunctions,
                powerAttack: label,
                handlePowerAttack: {
                    index: number,
                    powerAttackValues: values
                }
            })
        })
    }

    const chartData = {
        options: {
            yaxis: {
                labels: {
                  formatter: function(val, index) {
                    return val.toFixed(3);
                  }
                }
              },
            theme: {
                mode: 'dark'
            },  
          chart: {
            toolbar: {
                show: false,
            },
            id: "basic-bar"
          },
          xaxis: {
            categories: props.toHitArray
          }
        },
        series: []
      }

      if (chartFunctions.powerAttack === 'off' || chartFunctions.powerAttack === 'both') {
        if (chartFunctions.normal) {
            chartData.series.push(
                {
                    name: 'Normal',
                    data: calculateDamageOnACArray(props.toHitChances.regular.normal, props.damages.regular, chartFunctions.plusHitOnCrit)
                }
            )
        }
        if (chartFunctions.advantage) {
            chartData.series.push(
                {
                    name: 'Advantage',
                    data: calculateDamageOnACArray(props.toHitChances.regular.advantage, props.damages.regular, chartFunctions.plusHitOnCrit)
                }
            )
        }
        if (chartFunctions.elvenAccuracy) {
            chartData.series.push(
                {
                    name: 'Elven Accuracy',
                    data: calculateDamageOnACArray(props.toHitChances.regular.elvenAccuracy, props.damages.regular, chartFunctions.plusHitOnCrit)
                }
            )
        }
    } 
    
    if (chartFunctions.powerAttack === 'only' || chartFunctions.powerAttack === 'both') {
        if (chartFunctions.normal) {
            chartData.series.push(
                {
                    name: 'Normal w/ Power Attack',
                    data: calculateDamageOnACArray(props.toHitChances.powerAttack.normal, props.damages.powerAttack, chartFunctions.plusHitOnCrit)
                }
            )
        }
        if (chartFunctions.advantage) {
            chartData.series.push(
                {
                    name: 'Advantage w/ Power Attack',
                    data: calculateDamageOnACArray(props.toHitChances.powerAttack.advantage, props.damages.powerAttack, chartFunctions.plusHitOnCrit)
                }
            )
        }
        if (chartFunctions.elvenAccuracy) {
            chartData.series.push(
                {
                    name: 'Elven Accuracy w/ Power Attack',
                    data: calculateDamageOnACArray(props.toHitChances.powerAttack.elvenAccuracy, props.damages.powerAttack, chartFunctions.plusHitOnCrit)
                }
            )
        }
    }

    return (
        <section>
            <div className="buttons">
                <div className={chartFunctions.normal ? "buttons__element buttons__element--active" : "buttons__element"}  name="normal" onClick={handleClick}>Normal</div>
                <div className={chartFunctions.advantage ? "buttons__element buttons__element--active" : "buttons__element"} name="advantage" onClick={handleClick}>Advantage</div>
                <div className={chartFunctions.elvenAccuracy ? "buttons__element buttons__element--active" : "buttons__element"} name="elvenAccuracy" onClick={handleClick}>Elven Accuracy</div>
                <div className={chartFunctions.plusHitOnCrit ? "buttons__element buttons__element--active" : "buttons__element"} name="plusHitOnCrit" onClick={handleClick}>Additional hit on crit</div>
                <div className={customClass} name="powerAttack" onClick={handlePowerAttackClick}>Power Attack</div>
            </div>
            <Chart
            options={chartData.options}
            series={chartData.series}
            type="line" 
            height={500}             
            />
        </section>
    )
}

export default AverageDamageChart
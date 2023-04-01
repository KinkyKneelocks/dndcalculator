import React from "react";
import AverageDamageChartWrapper from "./Components/AverageDamageChartWrapper";
import BaseData from "./Components/BaseData";
import WeaponDamage from "./Components/WeaponDamage";
import normalWeapon from "./Models/normalWeapon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function App() {
  const [baseData, setBaseData] = React.useState({
    toHit: 8,
    toCrit: 1,
    toCritFail: 1
  })
  const [counters, setCounters] = React.useState([normalWeapon()])

  const updateParent = (compObject) => {
    setCounters((prevSetCounters) => {
      let data = []
      for (const counter of prevSetCounters) {
        if (compObject.componentId === counter.componentId) {
          data.push(compObject)
        } else {
          data.push(counter)
        }
      }
      return data
    })
  }

  const updateBaseData = (compObject) => {
    setBaseData(() => compObject)
  }

  const addNewRow = (rowtype) => {
    let elem = {
      componentId: counters.length,
      showAttackCounter: true,
      type: 'normal',
      diceMlt: 1,
      diceSngl: 6,
      staticNr: 0,
      reroll: 0,
      attackNr: 0,
      avgDamage: 3.5
    }
    if (rowtype === 'oncePerTurn') {
      elem.type = 'oncePerTurn'
      elem.showAttackCounter = false
    } else if (rowtype === 'onCrit') {
      elem.type = 'onCrit'
      elem.showAttackCounter = false
    }
    setCounters(prevCounters => [...prevCounters, elem])
  }

  const removeRow = (compId) => {
    setCounters(oldCounters => oldCounters.filter(elem => elem.componentId !== compId ))    
  }

  let mainWeaponDamage = []
  let oncePerTurnDamage = []
  let onCritDamage = []
  for (let i = 0; i < counters.length; i++) {
    if (counters[i].type === 'normal') {
      mainWeaponDamage.push(
        <WeaponDamage 
        key={counters[i].componentId}
        showAttackCounter={counters[i].showAttackCounter}    
        componentId={counters[i].componentId}
        type={counters[i].type}
        diceMlt={counters[i].diceMlt}
        diceSngl={counters[i].diceSngl}
        staticNr={counters[i].staticNr}
        reroll={counters[i].reroll}
        attackNr={counters[i].attackNr}
        updateParent={(compObject) => {updateParent(compObject)}}
        removeRow={(compId) => {removeRow(compId)}}
      />
      )
    } else if (counters[i].type === 'oncePerTurn') {
      oncePerTurnDamage.push(
        <WeaponDamage 
        key={counters[i].componentId}
        showAttackCounter={counters[i].showAttackCounter}    
        componentId={counters[i].componentId}
        type={counters[i].type}
        diceMlt={counters[i].diceMlt}
        diceSngl={counters[i].diceSngl}
        staticNr={counters[i].staticNr}
        reroll={counters[i].reroll}
        attackNr={counters[i].attackNr}
        updateParent={(compObject) => {updateParent(compObject)}}
        removeRow={(compId) => {removeRow(compId)}}
      />
      )
    } else if (counters[i].type === 'onCrit') {
      onCritDamage.push(
        <WeaponDamage 
        key={counters[i].componentId}
        showAttackCounter={counters[i].showAttackCounter}    
        componentId={counters[i].componentId}
        type={counters[i].type}
        diceMlt={counters[i].diceMlt}
        diceSngl={counters[i].diceSngl}
        staticNr={counters[i].staticNr}
        reroll={counters[i].reroll}
        attackNr={counters[i].attackNr}
        updateParent={(compObject) => {updateParent(compObject)}}
        removeRow={(compId) => {removeRow(compId)}}
      />
      )
    }
  }

  return (
    <section>
      <h1>Damage calculator</h1>
      <section>
        <BaseData 
          toHit={baseData.toHit}
          toCrit={baseData.toCrit}
          toCritFail={baseData.toCritFail}
          updateBaseData={(compObject) => {updateBaseData(compObject)}}
        />
      </section>
      <section>
        <h2>Normal weapon attacks</h2>
        {mainWeaponDamage}
        <div className="addNewRow" onClick={() => {addNewRow('normal')}} ><FontAwesomeIcon icon={faPlus} /> Add new row</div>
      </section>

      <section>
        <h2>Once per turn damage</h2>
        {oncePerTurnDamage}
        <div className="addNewRow" onClick={() => {addNewRow('oncePerTurn')}} ><FontAwesomeIcon icon={faPlus} /> Add new row</div>
      </section>

      <section>
        <h2>Additional on crit damage</h2>
        {onCritDamage}
        <div className="addNewRow" onClick={() => {addNewRow('onCrit')}} ><FontAwesomeIcon icon={faPlus} /> Add new row</div>
      </section>

      <section>
        <AverageDamageChartWrapper 
          toHit={baseData.toHit}
          toCrit={baseData.toCrit}
          toCritFail={baseData.toCritFail}
          allDamage={counters}
        />
      </section>
    </section>
  )
}

export default App;

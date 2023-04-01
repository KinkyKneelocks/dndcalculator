import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import calculateAverageDamage from "../Functions/calculateAverageDamage";

const WeaponDamage =(props) => {
  const showAttackCounter = props.showAttackCounter  
  let dieSum = {
    componentId: props.componentId,
    type: props.type,
    diceMlt: parseInt(props.diceMlt),
    diceSngl: parseInt(props.diceSngl),
    staticNr: parseInt(props.staticNr),
    attackNr: parseInt(props.attackNr),
    reroll: props.reroll,
    avgDamage: null
  }

  const handleChange = (event) => {       
        let sendBackObject ={
            ...dieSum,
            reroll: 0,
          [event.target.name]: event.target.value,
          showAttackCounter: showAttackCounter
        }
        sendBackObject.avgDamage = calculateAverageDamage(parseInt(sendBackObject.diceSngl), sendBackObject.reroll) * parseInt(sendBackObject.diceMlt)
        props.updateParent(sendBackObject)
  }

  const handleCheckboxChange = (event) => {
      let sendBackObject ={
        ...dieSum,
        reroll: (event.target.value === dieSum.reroll ? 0 : event.target.value),
        showAttackCounter: showAttackCounter
    }
    sendBackObject.avgDamage = calculateAverageDamage(parseInt(sendBackObject.diceSngl), sendBackObject.reroll) * parseInt(sendBackObject.diceMlt)
    props.updateParent(sendBackObject)
  }

  const handlePlusMinus = (name, value) => {
    let sendBackObject = {
      ...dieSum,
      [name]: dieSum[name] + value,
      showAttackCounter: showAttackCounter
    }
    sendBackObject.avgDamage = calculateAverageDamage(parseInt(sendBackObject.diceSngl), sendBackObject.reroll) * parseInt(sendBackObject.diceMlt)
    props.updateParent(sendBackObject)
  }

  const removeRow = () => {
    props.removeRow(dieSum.componentId)
  }

  const diceMlt = []
  for (let i = 1; i < 13; i++) {
    diceMlt.push(
      <option key={'option' + i} className="diceInput__list__element" value={i}>{i}</option>
    )
  }

  return (
    <div className="diceInput">
        <form className="diceInput__wrapper">
          <select className="diceInput__wrapper__list" name="diceMlt" onChange={handleChange} value={dieSum.diceMlt}>
              {diceMlt}
          </select>
          <span>d</span>
          <select className="diceInput__wrapper__list" name="diceSngl" onChange={handleChange} value={dieSum.diceSngl}>
              <option className="diceInput__wrapper__list__element" key='diceSngl_4' value={4}>4</option>
              <option className="diceInput__wrapper__list__element" key='diceSngl_6' value={6}>6</option>
              <option className="diceInput__wrapper__list__element" key='diceSngl_8' value={8}>8</option>
              <option className="diceInput__wrapper__list__element" key='diceSngl_10' value={10}>10</option>
              <option className="diceInput__wrapper__list__element" key='diceSngl_12' value={12}>12</option>
          </select>
          <span>+</span>
          <div className="diceInput__wrapper__buttons">
            <div className="diceInput__wrapper__buttons__minus" onClick={() => {handlePlusMinus('staticNr', -1)}}><FontAwesomeIcon icon={faMinus} /></div>
            <input className="diceInput__wrapper__input" name="staticNr" type='number' min='0' step='1' value={dieSum.staticNr} onInput={handleChange}></input>
            <div className="diceInput__wrapper__buttons__plus" onClick={() => {handlePlusMinus('staticNr', 1)}}><FontAwesomeIcon icon={faPlus} /></div>
          </div>
          {showAttackCounter && <span>for</span> }
          {showAttackCounter && <div className="diceInput__wrapper__buttons">
                                  { dieSum.attackNr > -1 && <div className="diceInput__wrapper__buttons__minus" onClick={() => {handlePlusMinus('attackNr', -1)}}><FontAwesomeIcon icon={faMinus} /></div> }
                                     { dieSum.attackNr > 0 && <input className="diceInput__wrapper__input" name="attackNr" type='number' min='0' step='1' value={dieSum.attackNr} onInput={handleChange}></input> }
                                     { dieSum.attackNr === 0 && <div className="diceInput__wrapper__input diceInput__wrapper__input--alt">all</div>}
                                     { dieSum.attackNr < 0 && <div className="diceInput__wrapper__input diceInput__wrapper__input--alt">one</div>}
                                     
                                    <div className="diceInput__wrapper__buttons__plus" onClick={() => {handlePlusMinus('attackNr', 1)}}><FontAwesomeIcon icon={faPlus} /></div>
                                </div> }
          <div  className="diceInput__wrapper__radios">
              <div className="diceInput__wrapper__radios__label">Reroll:</div>
              <label className={parseInt(dieSum.reroll) === 1 ? "diceInput__wrapper__radios__element diceInput__wrapper__radios__element--active" : "diceInput__wrapper__radios__element"}><input type="radio" name="reroll" value='1' checked={dieSum.reroll === '1'} onClick={handleCheckboxChange} onChange={handleChange} />1</label>
              <label className={parseInt(dieSum.reroll) === 2 ? "diceInput__wrapper__radios__element diceInput__wrapper__radios__element--active" : "diceInput__wrapper__radios__element"}><input type="radio" name="reroll" value='2' checked={dieSum.reroll === '2'} onClick={handleCheckboxChange} onChange={handleChange} />2</label>
              <label className={parseInt(dieSum.reroll) === 3 ? "diceInput__wrapper__radios__element diceInput__wrapper__radios__element--active" : "diceInput__wrapper__radios__element"}><input type="radio" name="reroll" value='3' checked={dieSum.reroll === '3'} onClick={handleCheckboxChange} onChange={handleChange} />3</label>
              {dieSum.diceSngl > 5 && <label className={parseInt(dieSum.reroll) === 4 ? "diceInput__wrapper__radios__element diceInput__wrapper__radios__element--active" : "diceInput__wrapper__radios__element"}><input type="radio" name="reroll" value='4' checked={dieSum.reroll === '4'} onClick={handleCheckboxChange} onChange={handleChange} />4</label>}
              {dieSum.diceSngl > 5 && <label className={parseInt(dieSum.reroll) === 5 ? "diceInput__wrapper__radios__element diceInput__wrapper__radios__element--active" : "diceInput__wrapper__radios__element"}><input type="radio" name="reroll" value='5' checked={dieSum.reroll === '5'} onClick={handleCheckboxChange} onChange={handleChange} />5</label>}
              {dieSum.diceSngl > 7 && <label className={parseInt(dieSum.reroll) === 6 ? "diceInput__wrapper__radios__element diceInput__wrapper__radios__element--active" : "diceInput__wrapper__radios__element"}><input type="radio" name="reroll" value='6' checked={dieSum.reroll === '6'} onClick={handleCheckboxChange} onChange={handleChange} />6</label>}        
          </div>
        </form>
        <div className="diceInput__remove" onClick={removeRow}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
    </div>
  );
}

export default WeaponDamage;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const BaseData = (props) => {

    let baseData = {
        toHit: props.toHit,
        toCrit: props.toCrit,
        toCritFail: props.toCritFail
    }

    const updateFormElement = (event) => {
        let sendBackObject = {
            ...baseData,
            [event.target.name]: event.target.value
        }
        props.updateBaseData(sendBackObject)
    }

    const updateToHit = (value) => {
        baseData.toHit += parseInt(value)
        props.updateBaseData(baseData)
    }

    return (
        <form className="baseData">
            
            <div className="baseData__wrapper">
                <p>To hit</p>
                <div className="baseData__wrapper__buttons">
                    <span className="baseData__wrapper__buttons__minus" onClick={() => {updateToHit(-1)}}><FontAwesomeIcon icon={faMinus} /></span>
                    <span className="baseData__wrapper__buttons__number">{props.toHit}</span>
                    <span className="baseData__wrapper__buttons__plus" onClick={() => {updateToHit(1)}}><FontAwesomeIcon icon={faPlus} /></span>
                </div>
            </div>
                <div className="baseData__wrapper">
                <p>Crit chance</p>
                <select className="baseData__wrapper__list" name="toCrit" value={props.toCrit} onChange={updateFormElement}>
                    <option key='toCrit1' value={1}>20</option>
                    <option key='toCrit2' value={2}>19-20</option>
                    <option key='toCrit3' value={3}>18-20</option>
                </select>
                </div>

                <div className="baseData__wrapper">
                <p>Crit Fail chance</p>
                <select className="baseData__wrapper__list" name="toCritFail" value={props.toCritFail} onChange={updateFormElement}>
                    <option key='toCritFail0' value={0}>0</option>
                    <option key='toCritFail1' value={1}>1</option>
                    <option key='toCritFail2' value={2}>1-2</option>
                    <option key='toCritFail3' value={3}>1-3</option>
                </select>
                </div>
        </form>
    )
}

export default BaseData
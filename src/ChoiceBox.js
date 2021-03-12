import React, { useContext } from 'react'
import {Context} from './Context'

function ChoiceBox(props){
    const {toggleDialog} = useContext(Context)
    const {title, content, choice1, choice2} = props
    return (
    <div className="choicebox">
        <div className="box">
            <div className="title">
                {title}
            </div>
            <div className="dialog">
                {content}
            </div>
            <div className="choices">
                <div className="btn" id="choice1" onClick={choice1.effect}>
                    {choice1.name}
                </div>
                <div className="btn" id="choice2" onClick={choice2.effect}>
                    {choice2.name}
                </div>
                <div className="btn" onClick={()=>toggleDialog()}>
                    Cancel
                </div>
            </div>
        </div>
    </div>
    )
}
export default ChoiceBox
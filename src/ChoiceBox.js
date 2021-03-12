import React, { useContext } from 'react'
import {Context} from './Context'

function ChoiceBox(props){
    const {toggleDialog} = useContext(Context)
    const {dialog} = props
    return (
    <div className="choicebox">
        <div className="box">
            <div className="title">
                {dialog.title}
            </div>
            <div className="dialog">
                {dialog.content}
            </div>
            <div className="choices">
                <div className="btn" id="choice1" onClick={dialog.choice1.effect}>
                    {dialog.choice1.name}
                </div>
                {dialog.choice2 && 
                    <div className="btn" id="choice2" onClick={dialog.choice2.effect}>
                        {dialog.choice2.name}
                    </div>
                }
            </div>
        </div>
    </div>
    )
}
export default ChoiceBox
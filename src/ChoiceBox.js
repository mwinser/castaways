import React, {useContext} from 'react'
import { Context } from "./Context"


function ChoiceBox(){
    const {isDialogOpen, dialogData} = useContext(Context)
    return isDialogOpen ?
    (
    <div className="choicebox">
        <div className="box">
            <div className="title">
                {dialogData.title}
            </div>
            <div className="dialog">
                {dialogData.content}
            </div>
            <div className="choices">
                {dialogData.choices.map((choice, index)=>(
                    <div className="btn" key={index} id={`choice${index}`} onClick={choice.effect}>
                        {choice.name}
                    </div>
                ))}
                
            </div>
        </div>
    </div>
    )
    : null
    
}
export default ChoiceBox
import React from 'react'

function ChoiceBox(props){
    const {title, content, choices} = props
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
                <div className="btn" id="choice1">
                    {choices[0]}
                </div>
                <div className="btn" id="choice2">
                    {choices[1]}
                </div>
            </div>
        </div>
    </div>
    )
}
export default ChoiceBox
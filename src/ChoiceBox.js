function ChoiceBox(props){
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
                {dialog.choices.map((choice, index)=>(
                    <div className="btn" id={`choice${index}`} onClick={choice.effect}>
                        {choice.name}
                    </div>
                ))}
                
            </div>
        </div>
    </div>
    )
}
export default ChoiceBox
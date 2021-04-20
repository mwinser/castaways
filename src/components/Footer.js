import PhaseManager from "../PhaseManager"
import EventLog from "./EventLog"


export default function Footer() {
    const {phase, handlePhaseEvent, isPaused} = PhaseManager()
    return (
        <div className="footer">
            <EventLog/>
            <button disabled={isPaused} className='btn' onClick={()=>handlePhaseEvent()}>Begin {phase}</button>
        </div>
    )
}
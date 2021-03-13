import {useContext, useState} from 'react'
import { Context } from './Context'



function PhaseManager(){
    const {playerState} = useContext(Context)
    const [phase, setPhase] = useState('NEW GAME')

    function advancePhase(){
        switch(phase){
            case 'NEW GAME':
                setPhase('MORNING MINGLE')
                break
            case 'MORNING MINGLE':
                setPhase('AFTERNOON CHALLENGE')
                break
            case 'AFTERNOON CHALLENGE':
                setPhase('EVENING EXILE')
                break
            case 'EVENING EXILE':
                playerState.length>3 ? setPhase('MORNING MINGLE') : setPhase('JURY VOTE')
                break
            case 'GAME OVER':
            case 'JURY VOTE':
                setPhase('NEW GAME')
                break
            
            default:
                break
        }
    }
    function gameOverPhase (){
        setPhase('GAME OVER')
    }
    return {phase, advancePhase, gameOverPhase}
}

export default PhaseManager
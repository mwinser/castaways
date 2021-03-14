import {useContext, useState} from 'react'
import { Context } from './Context'



function PhaseManager(){
    const {playerState} = useContext(Context)
    const [phase, setPhase] = useState('CASTING')

    function advancePhase(){
        switch(phase){
            case 'CASTING':
                setPhase('MORNING')
                break
            case 'MORNING':
                setPhase('AFTERNOON')
                break
            case 'AFTERNOON':
                setPhase('EVENING')
                break
            case 'EVENING':
                playerState.length>3 ? setPhase('MORNING') : setPhase('FINALE')
                break
            case 'EXIT INTERVIEW':
            case 'FINALE':
                setPhase('CASTING')
                break
            
            default:
                break
        }
    }
    function gameOverPhase (){
        setPhase('EXIT INTERVIEW')
    }
    return {phase, advancePhase, gameOverPhase}
}

export default PhaseManager
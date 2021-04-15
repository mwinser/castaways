import { useContext} from 'react';
import './App.css';
import PlayerCard from './components/PlayerCard';
import { Context } from './Context';
import PhaseManager from './PhaseManager';
import ChoiceBox from './ChoiceBox';
import EventLog from './components/EventLog';
import compareByName from './utils/compareByName'



function App() {
  const {playerState} = useContext(Context)
  const {phase, handlePhaseEvent} = PhaseManager()
  


  

  return (
    <div className="fullscreen">
      <div className="header">
        <div className="logo">CASTAWAYS</div>
      </div>
      
      <div className="content">
        {phase==='EXIT INTERVIEW'? 
          (
          <h1>
            OH NO YOU LOST.
          </h1>
          ):
          phase!=='CASTING' &&
            playerState.sort(compareByName).map((player)=>(
                <PlayerCard key={player.name} player={player}/>
            ))
        }
      </div>
      
      <div className="footer">
        <EventLog/>
        <button onClick={()=>handlePhaseEvent()}>Begin {phase}</button>
      </div>

      
        <ChoiceBox />
      
    </div>
  )
}

export default App;

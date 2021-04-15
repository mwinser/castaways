import { useContext} from 'react';
import './App.css';
import PlayerCard from './components/PlayerCard';
import { Context } from './Context';
import PhaseManager from './PhaseManager';
import ChoiceBox from './ChoiceBox';
import EventLog from './components/EventLog';



function App() {
  const {playerState, isDialogOpen} = useContext(Context)
  const {phase, dialogData, handlePhaseEvent} = PhaseManager()
  
  //for sorting player cards alphabetically
  function compareByName(a,b){
    const playerA = a.name.toUpperCase();
    const playerB = b.name.toUpperCase();
  
    let comparison = 0;
    if (playerA > playerB) {
      comparison = 1;
    } else if (playerA < playerB) {
      comparison = -1;
    }
    return comparison;
  }

  

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

      {/* popup choice box */}
      {isDialogOpen && dialogData &&
        <ChoiceBox 
          dialog = {dialogData}
        />
      }
    </div>
  )
}

export default App;

import { useContext } from 'react';
import './App.css';
import PlayerCard from './components/PlayerCard';
import { Context } from './Context';
import PhaseManager from './PhaseManager';
import ChoiceBox from './ChoiceBox';



function App() {
  const {
    playerState, 
    juryPlayers, 
    voteOff, 
    setPlayerIdol, 
    removePlayer, 
    randomSocialEvent, 
    immunityChallenge, 
    resetPlayers} = useContext(Context)
  const {phase, advancePhase} = PhaseManager()

 
  function handlePhaseEvent (){
    switch(phase){
      case 'NEW GAME':
        resetPlayers(8)
        break
      case 'MORNING MINGLE':
        randomSocialEvent()
        break
      case 'AFTERNOON CHALLENGE':
        immunityChallenge(playerState)
        break
      case 'EVENING EXILE':
        handleVote()
        break
      case 'JURY VOTE':
        juryVote()
        break
      default:
        break
    }
    advancePhase()
  }

  function handleVote(){
    const voteLog = voteOff(playerState, playerState)
    console.log("Vote-off called!")
    Object.entries(voteLog.voteAgainstHistory).forEach(vote=>{
      console.log(vote[0] + " voted for " + vote[1])
    })
    console.log(voteLog.loserName + " voted off with " + voteLog.loserVotesAgainst + " votes.")
    removePlayer(voteLog.loserName)
  }
  function juryVote(){
    const voteLog = voteOff(juryPlayers, playerState)
    console.log(voteLog.winnerName + " won the game with " + voteLog.winnerVotesFor +" jury votes!")
  }

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
        <div>Castaways</div>
        <div>{phase}</div>
        
      </div>
      <div className="content">
        {playerState.sort(compareByName).map((player, index)=>(
            <PlayerCard key={index} player={player}/>
        ))
        }
      </div>
      <div className="footer">
        
        <button onClick={()=>console.table(juryPlayers.map(juror=>juror.loyalty))}>Jury Players</button>
        <button onClick={()=>console.log(playerState)}>Remaining Players</button>
        <button onClick={()=>handlePhaseEvent()}>Resolve {phase}</button>
        
      
      
      </div>
      <ChoiceBox title="Hello" content="This is a choice box" choices={["ChoiceA", "ChoiceB"]}/>
    </div>
  )
}

export default App;

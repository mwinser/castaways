import { useContext, useState } from 'react';
import './App.css';
import PlayerCard from './components/PlayerCard';
import { Context } from './Context';
import PhaseManager from './PhaseManager';
import ChoiceBox from './ChoiceBox';



function App() {
  const {
    playerState, 
    juryPlayers, 
    isDialogOpen,
    toggleDialog,
    voteOff, 
    removePlayer, 
    randomSocialEvent,
    campEvent,
    leftCampEvent,
    immunityChallenge, 
    resetPlayers} = useContext(Context)
  const {phase, advancePhase} = PhaseManager()
  const [dialogData, setDialogData] = useState()
 
  function handlePhaseEvent (){

    switch(phase){
      case 'NEW GAME':
        resetPlayers(8)
        break
      case 'MORNING MINGLE':
        setDialogData({
          title:"Morning Mingle" ,
          content:"Camp life requires near constant work and everyone should pull their own weight. Will you leave camp to gather resources or stay in camp to help out there?" ,
          choice1:{name: "Leave camp", effect: ()=>{leftCampEvent(); advancePhase(); toggleDialog()}},
          choice2:{name: "Stay at camp", effect: ()=>{campEvent(); advancePhase(); toggleDialog()}}
        })
        toggleDialog()
        break
      case 'AFTERNOON CHALLENGE':
        setDialogData({
          title:"Afternoon Immunity Challenge" ,
          content:"Everyday is a challenge, literally. Today will you be extra competitive or take it easy?" ,
          choice1:{name: "CHALLENGE BEAST", effect: ()=>{immunityChallenge(playerState); advancePhase(); toggleDialog()}},
          choice2:{name: "Lay low", effect: ()=>{immunityChallenge(playerState); advancePhase(); toggleDialog()}}
        })
        toggleDialog()
        break
      case 'EVENING EXILE':
        setDialogData({
          title:"Evening Exile" ,
          content:"Every evening someone goes home. Who will you vote for?" ,
          choice1:{name: "Physical Threat", effect: ()=>{handleVote(); advancePhase(); toggleDialog()}},
          choice2:{name: "Social Threat", effect: ()=>{handleVote(); advancePhase(); toggleDialog()}}
        })
        toggleDialog()
        break
      case 'JURY VOTE':
        setDialogData({
          title:"And the winner is..." ,
          content:"The Jury will vote for the winner." ,
          choice1:{name: "See the results", effect: ()=>{juryVote(); advancePhase(); toggleDialog()}}
        })
        toggleDialog()
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
      {isDialogOpen && dialogData &&
        <ChoiceBox 
          dialog = {dialogData}
        />
      }
    </div>
  )
}

export default App;

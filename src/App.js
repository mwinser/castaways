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
    userPlayer,
    toggleDialog,
    voteOff, 
    removePlayer, 
    randomSocialEvent,
    campEvent,
    leftCampEvent,
    immunityChallenge, 
    resetPlayers} = useContext(Context)
  const {phase, advancePhase, gameOverPhase} = PhaseManager()
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
          choices:[
            {
              name: "Leave camp", 
              effect: ()=>{leftCampEvent(); advancePhase(); toggleDialog()}
            },
            {
              name: "Stay at camp", 
              effect: ()=>{campEvent(); advancePhase(); toggleDialog()}
            }
          ]
        })
        toggleDialog()
        break
      case 'AFTERNOON CHALLENGE':
        setDialogData({
          title:"Afternoon Immunity Challenge" ,
          content:"Everyday is a challenge, literally. Today will you be extra competitive or take it easy?" ,
          choices:[
            {
              name: "BEAST MODE", 
              effect: ()=>{immunityChallenge(playerState, 'beast mode'); advancePhase(); toggleDialog()}
            },
            {
              name: "Lay low", 
              effect: ()=>{immunityChallenge(playerState, "lay low"); advancePhase(); toggleDialog()}
            }
        ]
        })
        toggleDialog()
        break
      case 'EVENING EXILE':
        const choices = playerState
          .filter(player=>!player.hasIdol && player.name!==userPlayer)
          .map(player=>
            ({
              name: player.name, 
              effect: ()=> {handleVote(player.name)}
            })
          )
        
        setDialogData({
          title:"Evening Exile" ,
          content:"Every evening someone goes home. Who will you vote for?" ,
          choices: choices
        })
        toggleDialog()
        break
      case 'JURY VOTE':
        setDialogData({
          title:"And the winner is..." ,
          content:"The Jury will vote for the winner." ,
          choices:[
            {
              name: "See the results", 
              effect: ()=>{juryVote(); advancePhase(); toggleDialog()}
            }
          ]
        })
        toggleDialog()
        break
      case 'GAME OVER':
        setDialogData({
          title:"The tribe has spoken" ,
          content:"You were voted off the island! Play again?" ,
          choices:[
            {
              name: "New Game", 
              effect: ()=>{advancePhase(); toggleDialog()}
            }
          ]
        })
        toggleDialog()
        break
      default:
        break
    }
    advancePhase()
  }

  function handleVote(userChoice){
    const voteLog = voteOff(playerState, playerState, userChoice)
    console.log("Vote-off called!")
    Object.entries(voteLog.voteAgainstHistory).forEach(vote=>{
      console.log(vote[0] + " voted for " + vote[1])
    })
    console.log(voteLog.loserName + " voted off with " + voteLog.loserVotesAgainst + " votes.")
    removePlayer(voteLog.loserName)

    if (voteLog.loserName===userPlayer){
      console.log("you lose")
      gameOverPhase()
    } else {
      advancePhase()
    }
    toggleDialog()

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
      {phase==='GAME OVER'? 
        (
          <div className="content">
            <h1>
              OH NO YOU LOST.
            </h1>
          </div>
        ):(
          <div className="content">
            {playerState.sort(compareByName).map((player, index)=>(
                <PlayerCard key={index} player={player}/>
            ))
            }
          </div>
        )
      }
      <div className="footer">
        <div>Playing as: {userPlayer}</div>
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

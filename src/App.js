import { useContext } from 'react';
import './App.css';
import PlayerCard from './components/PlayerCard';
import { Context } from './Context';


function App() {
  const {playerState, juryPlayers, voteOff, removePlayer, randomSocialEvent} = useContext(Context)

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
    const voteLog = voteOff(juryPlayers.slice(1), playerState)
    console.log(voteLog.winnerName + " won the game with " + voteLog.winnerVotesFor +" jury votes!")
  }

  function comparePlayerNames(a,b){
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
        Castaways
      </div>
      <div className="content">
        {playerState.sort(comparePlayerNames).map((player, index)=>(
            <PlayerCard key={index} player={player}/>
        ))
        }
      </div>
      <div className="footer">
        {playerState.length>3 ?
          <button onClick={()=>handleVote()}>VoteOff</button>
          :
          <button onClick={()=>juryVote()}>Jury Vote</button>
        }
        <button onClick={()=>randomSocialEvent()}>Random</button>
      
      
      </div>
      
    </div>
  )
}

export default App;

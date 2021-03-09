import { useContext } from 'react';
import './App.css';
import PlayerCard from './components/PlayerCard';
import { Context } from './Context';


function App() {
  const {players, voteOff, removePlayer, increaseLoyalty} = useContext(Context)
  
  function handleVote(){
    const voteLog = voteOff()
    console.log("Vote-off called!")
    Object.entries(voteLog.voteHistory).forEach(vote=>{
      console.log(vote[0] + " voted for " + vote[1])
    })
    console.log(voteLog.loserName + " voted off with " + voteLog.loserVotesAgainst + " votes.")
    removePlayer(voteLog.loserName)
  }

  return (
    <div className="fullscreen">
      {players.map((player, index)=>(
          <PlayerCard key={index} player={player}/>
      ))
      }
      <button onClick={()=>handleVote()}>VoteOff</button>
      <button onClick={()=>increaseLoyalty("Mary", "Dan", 50)}>Mary likes Dan more</button>
    </div>
  )
}

export default App;

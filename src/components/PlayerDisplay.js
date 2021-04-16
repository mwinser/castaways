import { useContext } from "react"
import PlayerCard from "./PlayerCard"
import { Context } from "../Context"
import PhaseManager from "../PhaseManager"
import compareByName from "../utils/compareByName"




export default function PlayerDisplay(){
  const {playerState} = useContext(Context)
  const {phase} = PhaseManager
    return(
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
    )
}
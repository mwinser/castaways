import { useContext } from "react"
import PlayerCard from "./PlayerCard"
import { Context } from "../Context"
import compareByName from "../utils/compareByName"




export default function PlayerDisplay(){
  const {playerState} = useContext(Context)
    return(
      <div className="content">
          {playerState.sort(compareByName).map((player)=>(
              <PlayerCard key={player.name} player={player}/>
          ))}
    </div>
    )
}
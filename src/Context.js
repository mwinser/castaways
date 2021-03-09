import React, {useState} from 'react'
import playerData from './player_data'

const Context = React.createContext(null)

function ContextProvider ({children}) {

    const [players, setPlayers] = useState(playerData)

    function removePlayer(name) {
        setPlayers(players.filter(player=>player.name!==name))
    }
    function increaseLoyalty(playerName, rivalName, amount){
        
        players.forEach(player=> {
            if (player.name===playerName) {
                player.loyalty[rivalName] = (player.loyalty[rivalName]>=(100-amount)? 100 : player.loyalty[rivalName] + amount)
            }
        })
        console.log(players)
    }

    function voteOff() {
        var voteLog ={
            voteHistory: {},
            votesAgainst: {},
            loserName: "",
            loserVotesAgainst: 0,
            wasTie: false
        }

        //get names
        const names = players.map(rival=>{
            voteLog.votesAgainst[rival.name] = 0
            return rival.name
        })

        //get individual votes base on loyalty
        players.forEach((player)=>{
            //voteHistory
            voteLog.voteHistory[player.name] = names.reduce((min, name)=>
                player.loyalty[name]<player.loyalty[min]? name : min
                )
        })

        //votesAgainst
        names.forEach(name=> voteLog.votesAgainst[voteLog.voteHistory[name]]+=1)

        //loserName and loserVotesAgainst
        voteLog.loserVotesAgainst = names.reduce((max, name)=> voteLog.votesAgainst[name]>max ? voteLog.votesAgainst[name] : max, 0 )
        voteLog.loserName = names.reduce((max, name)=> voteLog.votesAgainst[name]>voteLog.votesAgainst[max] ? name : max )
        
        //wasTie

        return voteLog
    }
    
    

    
    return(
        <Context.Provider 
            value={{
                players,
                voteOff,
                removePlayer,
                increaseLoyalty
            }}
        >
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
import React, {useReducer} from 'react'
import playerData from './player_data'

const Context = React.createContext(null)

function ContextProvider ({children}) {
    const [playerState, dispatch] = useReducer(playersReducer, playerData)
    
    function playersReducer(playerState, action){
        switch (action.type) {
            case 'REMOVE_PLAYER':
                return [...playerState.filter((player)=>player.name!==action.payload)];
            case 'CHANGE_LOYALTY':
                return [...playerState]
            default:
                return playerState;
        }
    }
    function removePlayer(name){
        dispatch({
            type: "REMOVE_PLAYER",
            payload: name
        })
    }

    function changeLoyalty(playerName, rivalName, diff){
        
        dispatch({
            type: "CHANGE_LOYALTY",
            payload: {player: playerName, rival: rivalName, amount: diff}
        })

        playerState.forEach(player=> {
            if (player.name===playerName) {
                player.loyalty[rivalName] = (player.loyalty[rivalName]>=(100-diff)? 100 : player.loyalty[rivalName] + diff)
            }
        })
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
        const names = playerState.map(rival=>{
            voteLog.votesAgainst[rival.name] = 0
            return rival.name
        })

        //get individual votes base on loyalty
        playerState.forEach((player)=>{
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
                playerState,
                voteOff,
                removePlayer,
                changeLoyalty
            }}
        >
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
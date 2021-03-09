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
                const player = playerState.find((player)=>player.name===action.payload.playerName)
                
                return [
                    ...playerState.filter((player)=>player.name!==action.payload.playerName), 
                    {
                    ...player,
                    loyalty: 
                        {
                        ...player.loyalty, 
                        [action.payload.rivalName]: Math.max(0, Math.min(100, player.loyalty[action.payload.rivalName]+action.payload.amount))
                        }
                    }
                    ]
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

    function changeLoyalty(playerName, rivalName, amount){
        
        dispatch({
            type: "CHANGE_LOYALTY",
            payload: {playerName, rivalName, amount}
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
import React, {useReducer} from 'react'
import playerData from './player_data'
import {onePlayerEvents, twoPlayerEvents} from './randomEvent'

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
    
    function randomPlayers(number){
        const output = []
        var playerNames = playerState.map(player=>player.name)
        for (var i=0;i<number;i++) {
            const selected = ~~(Math.random()*playerNames.length)
            output.push(playerNames[selected])
            playerNames = playerNames.filter((name, index)=>index!==selected)
        }
        return output
    }
    function randomSocialEvent() {
        const numInvolved = ~~(Math.random()*2)+1
        const playersInvolved = randomPlayers(numInvolved)
        
        switch (numInvolved){
            case 1:
                var {string, change} = onePlayerEvents[~~(Math.random()*onePlayerEvents.length)]
                console.log(playersInvolved[0] + string + ' Group loyalty changed by ' + change)
                const everyoneElse = playerData.filter(player=>player.name!==playersInvolved[0]).map(player=>player.name)
                everyoneElse.map(playerName=>changeLoyalty(playerName,playersInvolved[0], change))
                return null
            case 2:
                var {string, change} = twoPlayerEvents[~~(Math.random()*twoPlayerEvents.length)]

                console.log(playersInvolved[0] + " and " + playersInvolved[1] + string + ' Loyalty changed by ' + change)
                changeLoyalty(playersInvolved[0], playersInvolved[1], change)
                changeLoyalty(playersInvolved[1], playersInvolved[0], change)
                return null
            default:
                return null
        }
    }

    
    return(
        <Context.Provider 
            value={{
                playerState,
                voteOff,
                removePlayer,
                changeLoyalty,
                randomSocialEvent
            }}
        >
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
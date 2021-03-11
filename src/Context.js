import React, {useReducer, useState} from 'react'
import playerData from './player_data'
import {onePlayerEvents, twoPlayerEvents} from './randomEvent'

const Context = React.createContext(null)

function ContextProvider ({children}) {
    const [juryPlayers, setJuryPlayers] = useState([])
    const [playerState, dispatch] = useReducer(playersReducer, playerData)
    
    
    function playersReducer(playerState, action){
        switch (action.type) {
            case 'REMOVE_PLAYER':
                setJuryPlayers([...juryPlayers, playerState.find(player=>player.name===action.payload)])
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

    function voteOff(voters, votees) {
        var voteLog ={
            voteAgainstHistory: {},
            voteForHistory: {},
            votesAgainst: {},
            loserName: "",
            loserVotesAgainst: 0,
            votesFor: {},
            winnerName: "",
            winnerVotesFor: 0,
            wasTie: false
        }

        //get names
        const names = votees.map(rival=>{
            voteLog.votesAgainst[rival.name] = 0
            voteLog.votesFor[rival.name] = 0
            return rival.name
        })

        //get individual votes based on loyalty
        voters.forEach((player)=>{
            //voteAgainstHistory

            voteLog.voteAgainstHistory[player.name] = names.reduce((min, name)=>
                player.loyalty[name]<player.loyalty[min]? name : min
                )
            voteLog.voteForHistory[player.name] = names.reduce((max, name)=>
            player.loyalty[name]>player.loyalty[max]? name : max
            )
            
        })

        //votesAgainst
        voters.forEach(voter=> voteLog.votesAgainst[voteLog.voteAgainstHistory[voter.name]]+=1)
        //votesFor
        voters.forEach(voter=> voteLog.votesFor[voteLog.voteForHistory[voter.name]]+=1)

        //loserName and loserVotesAgainst
        voteLog.loserVotesAgainst = names.reduce((max, name)=> voteLog.votesAgainst[name]>max ? voteLog.votesAgainst[name] : max, 0 )
        voteLog.loserName = names.reduce((max, name)=> voteLog.votesAgainst[name]>voteLog.votesAgainst[max] ? name : max )
        
        //winnerName and winnerVotesFor
        voteLog.winnerVotesFor = names.reduce((max, name)=> voteLog.votesFor[name]>max ? voteLog.votesFor[name] : max, 0 )
        voteLog.winnerName = names.reduce((max, name)=> voteLog.votesFor[name]>voteLog.votesFor[max] ? name : max )
        
        //wasTie

        return voteLog
    }
    
    function randomPlayers(number){
        const output = []
        var playerNames = playerState.map(player=>player.name)
        for (var i=0;i<number;i++) {
            const selected = ~~(Math.random()*playerNames.length)
            const selectedPlayer = playerNames[selected]
            output.push(selectedPlayer)
            playerNames = playerNames.filter((name)=>name!==selectedPlayer)
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
                const everyoneElse = playerState.filter(player=>player.name!==playersInvolved[0]).map(player=>player.name)
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
                juryPlayers,
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
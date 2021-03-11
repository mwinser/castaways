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
                return [...playerState.filter((player)=>player.name!==action.payload)];
            case 'REMOVE_ALL_IDOLS':
                return playerState.map(player=>({...player, hasIdol: false}))
            case 'SET_PLAYER_IDOL':
                var player = playerState.find((player)=>player.name===action.payload.playerName)
                
                return [
                    ...playerState.filter((player)=>player.name!==action.payload.playerName), 
                    {
                    ...player,
                    hasIdol: action.payload.value
                    }
                    ]
            case 'CHANGE_LOYALTY':
                var player = playerState.find((player)=>player.name===action.payload.playerName)
                
                return [
                    ...playerState.filter((player)=>player.name!==action.payload.playerName), 
                    {
                    ...player,
                    loyalty: 
                        {
                        ...player.loyalty, 
                        [action.payload.voteeName]: Math.max(0, Math.min(100, player.loyalty[action.payload.voteeName]+action.payload.amount))
                        }
                    }
                    ]
            default: 
                return playerState;
        }
    }
    function removePlayer(name){
        setJuryPlayers([...juryPlayers, playerState.find(player=>player.name===name)])
        dispatch({
            type: "REMOVE_PLAYER",
            payload: name
        })
    }
    function setPlayerIdol(playerName, value){
        dispatch({
            type: "SET_PLAYER_IDOL",
            payload: {playerName, value}
        })
    }
    function removeAllIdols(){
        
        dispatch({
            type: "REMOVE_ALL_IDOLS"
        })
    }
    function changeLoyalty(playerName, voteeName, amount){
        dispatch({
            type: "CHANGE_LOYALTY",
            payload: {playerName, voteeName, amount}
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
            idolWasUsed: false
        }

        //get voteeNames
        const voteeNames = votees.filter(votee=>!votee.hasIdol).map(votee=>{
            voteLog.votesAgainst[votee.name] = 0
            voteLog.votesFor[votee.name] = 0
            return votee.name
        })
        //check that idol was used
        if (voteeNames.length!==votees.length){
            voteLog.idolWasUsed = true
        }

        //get individual votes based on loyalty
        voters.forEach((voter)=>{
            //voteAgainstHistory
            voteLog.voteAgainstHistory[voter.name] = voteeNames.reduce((min, name)=>
                voter.loyalty[name]<voter.loyalty[min]? name : min
                )
            //voteForHistory
            voteLog.voteForHistory[voter.name] = voteeNames.reduce((max, name)=>
            voter.loyalty[name]>voter.loyalty[max]? name : max
            )
        })

        //votesAgainst
        voters.forEach(voter=> voteLog.votesAgainst[voteLog.voteAgainstHistory[voter.name]]+=1)
        //votesFor
        voters.forEach(voter=> voteLog.votesFor[voteLog.voteForHistory[voter.name]]+=1)

        //loserName and loserVotesAgainst
        voteLog.loserVotesAgainst = voteeNames.reduce((max, name)=> voteLog.votesAgainst[name]>max ? voteLog.votesAgainst[name] : max, 0 )
        voteLog.loserName = voteeNames.reduce((max, name)=> voteLog.votesAgainst[name]>voteLog.votesAgainst[max] ? name : max )
        
        //winnerName and winnerVotesFor
        voteLog.winnerVotesFor = voteeNames.reduce((max, name)=> voteLog.votesFor[name]>max ? voteLog.votesFor[name] : max, 0 )
        voteLog.winnerName = voteeNames.reduce((max, name)=> voteLog.votesFor[name]>voteLog.votesFor[max] ? name : max )
        
        //idols automatically used up each vote
        removeAllIdols()
        console.log(voteLog)
        return voteLog
    }
    function immunityChallenge(participants){
        // random type of challenge mental, physical, social
        const trait = ["stamina","willpower", "dexterity", "intelligence"][~~(Math.random()*4)]
        //calculate winner
        const winnerName = participants.reduce((best, participant)=>participant[trait]>best[trait]? participant : best).name
        console.log(winnerName + " has won immunity in a "+ trait + "-based challenge!")
        //apply idol
        setPlayerIdol(winnerName, true)

    }
    function randomPlayers(number){
        const output = []
        var playervoteeNames = playerState.map(player=>player.name)
        for (var i=0;i<number;i++) {
            const selected = ~~(Math.random()*playervoteeNames.length)
            const selectedPlayer = playervoteeNames[selected]
            output.push(selectedPlayer)
            playervoteeNames = playervoteeNames.filter((name)=>name!==selectedPlayer)
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
                setPlayerIdol,
                removePlayer,
                changeLoyalty,
                immunityChallenge,
                randomSocialEvent
            }}
        >
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
import React, {useReducer, useState} from 'react'
import NewGame from './NewGame'
import {onePlayerEvents, twoPlayerEvents, stayedAtCamp, leftCamp} from './randomEvent'

const Context = React.createContext(null)

function ContextProvider ({children}) {
    const playerData = []
    const [eventLogs, setEventLogs] = useState(['Welcome to Castaways!'])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [juryPlayers, setJuryPlayers] = useState([])
    const [userPlayer, setUserPlayer] = useState("")
    const [playerState, dispatch] = useReducer(playersReducer, playerData)
    const [dialogData, setDialogData] = useState()
    

    function changeDialogData(input) {
        setDialogData(input)
    }
    function addToLogs (newEvent) {
        setEventLogs(prevState=>[...prevState, newEvent])
    }
    function toggleDialog(){
        setIsDialogOpen(prevState=>!prevState)
    }
    
    function playersReducer(playerState, action){
        switch (action.type) {
            case 'NEW_GAME':
                setEventLogs(["Welcome to Castaways!"])
                const incomingCast = NewGame(action.payload)
                const randoCastaway = incomingCast[~~(Math.random()*incomingCast.length)].name
                setUserPlayer(randoCastaway)
                addToLogs("8 new players have been announced.")
                addToLogs("You are playing as "+randoCastaway + ".")
                return incomingCast
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
                player = playerState.find((player)=>player.name===action.payload.playerName)
                
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
    function resetPlayers(numPlayers){
        setJuryPlayers([])
        dispatch({
            type: "NEW_GAME",
            payload: numPlayers
        })
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






    function voteOff(voters, votees, userChoice) {
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
            if (voter.name!==userPlayer){
                //voteAgainstHistory
                voteLog.voteAgainstHistory[voter.name] = voteeNames.reduce((min, name)=>
                    voter.loyalty[name]<voter.loyalty[min]? name : min
                    )
                //voteForHistory
                voteLog.voteForHistory[voter.name] = voteeNames.reduce((max, name)=>
                voter.loyalty[name]>voter.loyalty[max]? name : max
                )
            } else {
                voteLog.voteAgainstHistory[voter.name] = userChoice
                voteLog.voteForHistory[voter.name] = userChoice
            }
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
    function immunityChallenge(participants, effort){
        // random type of challenge mental, physical, social
        const trait = ["stamina","willpower", "dexterity", "intelligence"][~~(Math.random()*4)]
        //calculate winner
        const winner = participants.reduce((best, participant)=>{
            var value = participant[trait]
            if (participant.name===userPlayer){
                effort==="beast mode"? (value+=3) : (value-=3)
            }
            return value>best[trait]? participant : best}
            , {[trait]: 0 })
       addToLogs(winner.name + " has won immunity in a "+ trait + "-based challenge!")
        //apply idol
        setPlayerIdol(winner.name, true)

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
    function morningEvent(playerChoice){
        let event
        if (playerChoice==='stay'){
            event = stayedAtCamp[~~(Math.random()*stayedAtCamp.length)]
        }
        if (playerChoice==='leave'){
            event = leftCamp[~~(Math.random()*leftCamp.length)]
        }
        if (event.players===1){
            if (event.idol){
                setPlayerIdol(userPlayer, true)
                addToLogs(event.string)
                return null
            }
            const everyoneElse = playerState.filter(player=>player.name!==userPlayer).map(player=>player.name)
            everyoneElse.map(playerName=>changeLoyalty(playerName,userPlayer, event.change))
            addToLogs(event.string + " Group loyalty changed by " + event.change)
            return null
        }
        if (event.players===2){
        const otherPlayer = randomPlayers(1)[0]
        
        changeLoyalty(userPlayer, otherPlayer, event.change)
        changeLoyalty(otherPlayer, userPlayer, event.change)
        addToLogs("You and " + otherPlayer + event.string + ' Loyalty changed by ' + event.change)
        }
        
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
                // eslint-disable-next-line
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
                isDialogOpen,
                userPlayer,
                eventLogs,
                dialogData,
                addToLogs,
                toggleDialog,
                voteOff,
                setPlayerIdol,
                removePlayer,
                changeLoyalty,
                immunityChallenge,
                randomSocialEvent,
                morningEvent,
                resetPlayers,
                changeDialogData
            }}
        >
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
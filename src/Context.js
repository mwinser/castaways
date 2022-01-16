import React, {useReducer, useState} from 'react'
import NewGame from './NewGame'
import {stayedAtCamp, leftCamp} from './randomEvent'

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
            case 'ADD_CHALLENGE_WIN':
                player = playerState.find((player)=>player.name===action.payload.playerName)
                return [
                    ...playerState.filter((player)=>player.name!==action.payload.playerName), 
                    {
                    ...player,
                    challengeWins: player.challengeWins++
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
    function addChallengeWin(playerName){
        dispatch({
            type: "ADD_CHALLENGE_WIN",
            payload: {playerName}
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

        //get voteePlayers - default idol use
        const voteePlayers = votees.filter(votee=>!votee.hasIdol).map(votee=>{
            voteLog.votesAgainst[votee.name] = 0
            voteLog.votesFor[votee.name] = 0
            return votee
        })
        //check that idol was used 
        if (voteePlayers.length!==votees.length){
            voteLog.idolWasUsed = true
        }

        //get individual votes based on loyalty and threatLevel/challengeWins
        voters.forEach((voter)=>{
            if (voter.name!==userPlayer){
                //voteAgainstHistory - for removal
                voteLog.voteAgainstHistory[voter.name] = voteePlayers.reduce((worst, votee)=>
                    (voter.loyalty[votee.name]-votee.challengeWins) < (voter.loyalty[worst.name]-worst.challengeWins) 
                        ? votee 
                        : worst
                    ).name
                //voteForHistory - for winner
                voteLog.voteForHistory[voter.name] = voteePlayers.reduce((best, votee)=>
                    (voter.loyalty[votee.name]+votee.challengeWins) > (voter.loyalty[best.name]+best.challengeWins)
                        ? votee 
                        : best
                    ).name
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
        voteLog.loserVotesAgainst = voteePlayers.reduce((max, votee)=> voteLog.votesAgainst[votee.name]>max ? voteLog.votesAgainst[votee.name] : max, 0 )
        voteLog.loserName = voteePlayers.reduce((max, votee)=> voteLog.votesAgainst[votee.name]>voteLog.votesAgainst[max.name] ? votee : max ).name
        
        //winnerName and winnerVotesFor
        voteLog.winnerVotesFor = voteePlayers.reduce((max, votee)=> voteLog.votesFor[votee.name]>max ? voteLog.votesFor[votee.name] : max, 0 )
        voteLog.winnerName = voteePlayers.reduce((max, votee)=> voteLog.votesFor[votee.name]>voteLog.votesFor[max] ? votee : max ).name
        
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
                switch (effort){
                    case 'beast mode':
                        value+=3
                        break
                    case 'lay low':
                        value-=3
                        break
                    default:
                        break
                }
            }
            return value>best[trait]? participant : best}
            , {[trait]: 0 })
        addToLogs(winner.name + " has won immunity in a "+ trait + "-based challenge!")
        addChallengeWin(winner.name)
        setPlayerIdol(winner.name, true)

    }
    function randomPlayers(number){
        const output = []
        var availablePlayers = playerState.map(player=>player.name).filter(name=>name!==userPlayer)
        for (var i=0;i<number;i++) {
            const selected = ~~(Math.random()*availablePlayers.length)
            const selectedPlayer = availablePlayers[selected]
            output.push(selectedPlayer)
            availablePlayers = availablePlayers.filter((name)=>name!==selectedPlayer)
        }
        return output
    }
    function morningEvent(playerChoice){
        let event = {}
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
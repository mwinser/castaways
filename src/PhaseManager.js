import {useContext, useState} from 'react'
import { Context } from './Context'



function PhaseManager(){
    const {playerState, toggleDialog, resetPlayers, campEvent, leftCampEvent, immunityChallenge, userPlayer, voteOff, addToLogs,removePlayer, juryPlayers, changeDialogData} = useContext(Context)
    const [phase, setPhase] = useState('CASTING')



    function handlePhaseEvent (){
        switch(phase){
          case 'CASTING':
            resetPlayers(8)
            break
          case 'MORNING':
            changeDialogData({
              title:"Camp Life" ,
              content:"Camp life requires near constant work and everyone should pull their own weight. Will you leave camp to gather resources or stay in camp to help out there?" ,
              choices:[
                {
                  name: "Leave camp", 
                  effect: ()=>{leftCampEvent(); advancePhase(); toggleDialog()}
                },
                {
                  name: "Stay at camp", 
                  effect: ()=>{campEvent(); advancePhase(); toggleDialog()}
                }
              ]
            })
            toggleDialog()
            break
          case 'AFTERNOON':
            changeDialogData({
              title:"Immunity Challenge" ,
              content:"Everyday is a challenge, literally. Today will you be extra competitive or take it easy?" ,
              choices:[
                {
                  name: "BEAST MODE", 
                  effect: ()=>{immunityChallenge(playerState, 'beast mode'); advancePhase(); toggleDialog()}
                },
                {
                  name: "Lay low", 
                  effect: ()=>{immunityChallenge(playerState, "lay low"); advancePhase(); toggleDialog()}
                }
            ]
            })
            toggleDialog()
            break
          case 'EVENING':
            const choices = playerState
              .filter(player=>!player.hasIdol && player.name!==userPlayer)
              .map(player=>
                ({
                  name: player.name, 
                  effect: ()=> {handleVote(player.name)}
                })
              )
            
            changeDialogData({
              title:"Casting Away" ,
              content:"Every evening someone goes home. Who will you vote for?" ,
              choices: choices
            })
            toggleDialog()
            break
          case 'FINALE':
            changeDialogData({
              title:"And the winner is..." ,
              content:"The Jury will vote for the winner." ,
              choices:[
                {
                  name: "See the results", 
                  effect: ()=>{juryVote(); advancePhase(); toggleDialog()}
                }
              ]
            })
            toggleDialog()
            break
          case 'EXIT INTERVIEW':
            changeDialogData({
              title:"The tribe has spoken" ,
              content:"You were voted off the island! Play again?" ,
              choices:[
                {
                  name: "Restart", 
                  effect: ()=>{advancePhase(); toggleDialog()}
                }
              ]
            })
            toggleDialog()
            break
          default:
            break
        }
        advancePhase()
      }

      
  function handleVote(userChoice){
    const voteLog = voteOff(playerState, playerState, userChoice)
    Object.entries(voteLog.voteAgainstHistory).forEach(vote=>{
      console.log(vote[0] + " voted for " + vote[1])
    })
    addToLogs(voteLog.loserName + " voted off with " + voteLog.loserVotesAgainst + " votes.")
    document.getElementById(voteLog.loserName).classList.add("dying")
    setTimeout(()=>{
      removePlayer(voteLog.loserName)
    },1000)
    

    if (voteLog.loserName===userPlayer){
      addToLogs("You lost.")
      gameOverPhase()
    } else {
      advancePhase()
    }
    toggleDialog()

  }
  
  function juryVote(){
    const voteLog = voteOff(juryPlayers, playerState)
    addToLogs(voteLog.winnerName + " won the game with " + voteLog.winnerVotesFor +" jury votes!")
  }
  


    function advancePhase(){
        switch(phase){
            case 'CASTING':
                setPhase('MORNING')
                break
            case 'MORNING':
                setPhase('AFTERNOON')
                break
            case 'AFTERNOON':
                setPhase('EVENING')
                break
            case 'EVENING':
                playerState.length>3 ? setPhase('MORNING') : setPhase('FINALE')
                break
            case 'EXIT INTERVIEW':
            case 'FINALE':
                setPhase('CASTING')
                break
            
            default:
                break
        }
    }
    function gameOverPhase (){
        setPhase('EXIT INTERVIEW')
    }
    return {phase, handlePhaseEvent}
}

export default PhaseManager
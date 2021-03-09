import React from 'react'

function PlayerCard(props){
    const player = props.player
    return(
        <div className="player-card">
        <div className="card-chunk">
            <div className="card-name">
            {player.name}
            </div>
            <div className="card-personality">
            {player.personality}
            </div>
        </div>
        <div className="card-chunk">
            <div className="age">
            Age:{player.age}
            </div>
            <div className="job">
            {player.job}
            </div>
        </div>
        <div className="card-chunk">
            <div className="family">
            {player.family}
            </div>
            <div className="region">
            {player.region}
            </div>
        </div>
        </div>
    )
}

export default PlayerCard
import React, {useContext} from 'react'
import {Context} from '../Context'

function PlayerCard(props){
    const {userPlayer} = useContext(Context)
    const player = props.player
    return(
        <div id={player.name} className="player-card">
            <div className="card-name">
                <div>
                    {player.name} {userPlayer===player.name && " (You)"}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <div className="attributes">
                <div>
                    <div>Stamina:</div>
                    <div>{player.stamina}</div>
                </div>
                <div>
                    <div>Dexterity</div>
                    <div>{player.dexterity}</div>
                </div>
                <div>
                    <div>Willpower</div>
                    <div>{player.willpower}</div>
                </div>
                <div>
                    <div>Intelligence</div>
                    <div>{player.intelligence}</div>
                </div>
                <div>
                    <div>Personality</div>
                    <div>{player.personality}</div>
                </div>
            </div>
            <div className="card-chunks">
                <div className="card-chunk">
                    <div className="age">
                    {player.age}yrs old
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
            
        </div>
    )
}

export default PlayerCard
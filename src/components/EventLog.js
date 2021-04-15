import React, { useContext } from 'react'
import { Context } from '../Context'

function EventLog (props) {
    const {eventLogs} = useContext(Context)

    return (
        <div className="event-log-wrapper">
            <div className="event-log">
                {eventLogs.map((log, index)=>(<p key={index}>{log}</p>))}
            </div>
        </div>
    )
}

export default EventLog
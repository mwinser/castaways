import React, { useContext } from 'react'
import { Context } from '../Context'

function EventLogs (props) {
    const {eventLogs} = useContext(Context)

    return (
        <div className="EventLog">
            {eventLogs.map((log, index)=>(<p key={index}>{log}</p>))}
        </div>
    )
}

export default EventLogs
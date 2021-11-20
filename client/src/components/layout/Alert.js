import React from 'react'
import {useSelector} from "react-redux"

const Alert = () => {
    const alerts = useSelector(state => state.alert)
    return (
            alerts !== null && alerts.length !== 0 &&  alerts.map(alert => (
                <Alert key = {alert.id} severity={alert.type}>{alert.message}</Alert>
            ))
    )
}

export default Alert

import {Box} from '@mui/system'
import React from 'react'
import Message from './Message'

const Messages = () => {
    return (
        <Box sx = {{px : 2, display : "flex", flexDirection : "column", height : "100%", overflowY : "scroll"}}>
            <Message />
            <Message own={true}/>
            <Message />
            <Message own={true}/>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            
        </Box>
    )
}

export default Messages

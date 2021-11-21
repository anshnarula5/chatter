import {Box} from '@mui/system'
import React from 'react'
import Message from './Message'

const Messages = () => {
    return (
        <Box sx = {{px : 2}}>
            <Message />
            <Message />
            <Message />
            <Message />
        </Box>
    )
}

export default Messages

import React from 'react'
import {useSelector} from 'react-redux'
import Conversation from './Conversation'

const Conversations = () => {
    const {conversations, loading} = useSelector(state => state.chat)
   
    if (conversations.length === 0 || !conversations && !loading) {
        return "No convos"
    }
    return (
        <>
            {conversations.length > 0 && !loading && conversations.map(conversation => (
                <Conversation conversation = {conversation} />
            ))}
        </>
    )
}

export default Conversations

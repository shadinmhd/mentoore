import React from 'react'

interface Props {
    name: string,
    content: string
}

const MessageNotification: React.FC<Props> = ({ name, content }) => {
    return (
        <div className='toast-container'>
            <div className='toast'>
                <div className='toast-header'>{name}: </div>
                <div className='toast-body'>{content}</div>
                <div className='toast-footer'></div>
            </div>
        </div>
    )
}

export default MessageNotification
'use client'

import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook'

const MessengerChat = () => {
    return (
        <FacebookProvider appId={process.env.FB_MESSENGER_APP_ID!} chatSupport>
            <CustomChat pageId={process.env.NEXT_PUBLIC_FB_MESSENGER_PAGE_ID!} minimized={false} />
        </FacebookProvider>
    )
}

export default MessengerChat
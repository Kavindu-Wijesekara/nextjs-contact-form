'use client'

import Script from 'next/script'
import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook'

const MessengerChat = () => {
    const value: boolean = true
    return (
        <>
            <div id="fb-root"></div>
            {/* <!-- Your Chat plugin code --> */}
            <div id="fb-customer-chat" className="fb-customerchat"></div>
            <Script id="fb-chat" strategy="lazyOnload">
                {`
                    var chatbox = document.getElementById('fb-customer-chat');
                    chatbox.setAttribute("page_id", ${process.env.NEXT_PUBLIC_FB_MESSENGER_PAGE_ID});
                    chatbox.setAttribute("attribution", "biz_inbox");
                
                    window.fbAsyncInit = function() {
                        FB.init({
                            xfbml            : true,
                            version          : 'v18.0'
                        });
                    };

                    (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s); js.id = id;
                        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                `}
            </Script>
        </>
    )
}

export default MessengerChat





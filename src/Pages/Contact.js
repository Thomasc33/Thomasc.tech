import React from 'react';

function ContactPage(props) {
    let headerHeight = document.getElementsByClassName('HeaderBar')
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight
    else headerHeight = 68
    return (
        <div style={{ position: 'absolute', top: `${headerHeight}px`, width: '100vw', color: 'white' }}>
            <h1>Contact Page</h1>
        </div>
    )
}

export default ContactPage

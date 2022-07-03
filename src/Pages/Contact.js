import React from 'react';

function ContactPage(props) {
    let headerHeight = document.getElementById('HeaderNavBar')
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight
    else headerHeight = 68
    return (
        <div style={{ position: 'absolute', top: `${headerHeight}px`, width: '100vw', color: 'white', textAlign: 'center', padding: '5rem' }}><div className='InfoContainer'>
            <h2>Email: Thomas@thomasc.tech</h2>
            <div className='break' />
        </div></div>
    )
}

export default ContactPage

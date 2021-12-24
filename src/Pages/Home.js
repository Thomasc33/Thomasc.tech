import React from 'react';
import '../css/Home.css'

function HomePage(props) {
    let headerHeight = document.getElementById('HeaderNavBar')
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight
    else headerHeight = 68
    return (
        <div style={{ position: 'absolute', top: `${headerHeight}px`, width: '100vw', height: '92vh', color: 'white', overflow: 'scroll' }}>
            <div className='HomePage'>
                <div className='Photo'>
                    <h3>Image will be here soon</h3>
                    </div>
                <div className='HomeInfo'>
                    <h1>Hi! I'm Thomas</h1>
                    <div className='break' />
                    <h3>I'm a Masters Computer Science student concentrating in Artificial Intelligence</h3>
                    <div className='break' />
                    <h3>Currently, I have professional experience in full-stack web development and personal experience with software development</h3>
                    <div className='break' />
                </div>
            </div>
        </div>
    )
}

export default HomePage

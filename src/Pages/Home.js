import React from 'react';
import '../css/Home.css'
import useWindowDimensions from '../Components/useWindowDimensions';

function HomePage(props) {
    let headerHeight = document.getElementById('HeaderNavBar')
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight
    else headerHeight = 68

    return (
        <div style={{ position: 'absolute', top: `${headerHeight}px`, width: '100vw', height: '50vh', color: 'white', overflow: 'scroll' }}>
            <div className='HomePage'>
                {/* <div className='Photo'>
                    <img />
                </div> */}
                <div className='HomeInfo'>
                    <h1>Hi! I'm Thomas</h1>
                    <div className='break' />
                    <h3>I'm a Computer Science Ph.D. student currently researching Ethical Machine Learning, Privacy, and Fairness</h3>
                    <div className='break' />
                    <h3>I have professional experience in full-stack web development and personal/academic experience with software development</h3>
                    <div className='break' />
                </div>
            </div>
        </div>
    )
}

export default HomePage

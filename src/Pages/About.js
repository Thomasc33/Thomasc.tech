import React from 'react';

function AboutPage(props) {
    let headerHeight = document.getElementsByClassName('HeaderBar')
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight
    else headerHeight = 68
    return (
        <div style={{ position: 'absolute', top: `${headerHeight}px`, width: '100vw', color: 'white', overflow: 'scroll' }}> <div className='InfoContainer'>
            <h1>Hi! I'm Thomas</h1>
            <div className='break' />
            <h3>I'm a Computer Science major with professional experience in full-stack web development and personal experience with software development</h3>
            <div className='break' />
            <hr />
            <h2>Education</h2>
            <div className='break' />
            <h3>The University of North Carolina at Charlotte</h3>
            <div className='break' />
            <p>B.S. Computer Science</p>
            <p>Fall 2021</p>
            <div className='break' />
            <p>AI, Robotics, and Gaming</p>
            <p>3.68 GPA</p>
            <hr />
            <h2>Technical Skills</h2>
            <div className='break' />
            <h3>Languages</h3>
            <div className='break' />
            <div className='HoverableList'><p>Node.js</p></div>
            <div className='HoverableList'><p>Java</p></div>
            <div className='HoverableList'><p>C#</p></div>
            <div className='HoverableList'><p>Python</p></div>
            <div className='HoverableList'><p>C++</p></div>
            <div className='HoverableList'><p>C</p></div>
            <div className='HoverableList'><p>PHP</p></div>
            <div className='HoverableList'><p>HTML/CSS</p></div>
            <div className='HoverableList'><p>SQL</p></div>
            <div className='HoverableList'><p>Typescript</p></div>
            <div className='HoverableList'><p>VB.net</p></div>
            <div className='HoverableList'><p>JSX</p></div>
            <div className='break' />
            <h3>Frameworks</h3>
            <div className='break' />
            <div className='HoverableList'><p>React.js</p></div>
            <div className='HoverableList'><p>Tensorflow.js</p></div>
            <div className='HoverableList'><p>PyTorch</p></div>
            <div className='HoverableList'><p>Express</p></div>
            <div className='HoverableList'><p>REST</p></div>
            <div className='HoverableList'><p>Discord.js</p></div>
            <div className='HoverableList'><p>MySQL</p></div>
            <div className='HoverableList'><p>SQL Server</p></div>
            <div className='break' />
            <h3>Web Services</h3>
            <div className='break' />
            <div className='HoverableList'><p>Google Cloud</p></div>
            <div className='HoverableList'><p>AWS</p></div>
            <div className='HoverableList'><p>GitHub</p></div>
            <div className='HoverableList'><p>Discord OAuth2.0</p></div>
            <div className='HoverableList'><p>Miscrosoft OAuth2.0</p></div>
            <div className='HoverableList'><p>Web-Scraping</p></div>
            <div className='HoverableList'><p>SSL Certificates</p></div>
            <div className='break' />
            <h3>IDE / Applications</h3>
            <div className='break' />
            <div className='HoverableList'><p>VS Code</p></div>
            <div className='HoverableList'><p>Visual Studios</p></div>
            <div className='HoverableList'><p>IntelliJ</p></div>
            <div className='HoverableList'><p>NetBeans</p></div>
            <div className='HoverableList'><p>PHP Storm</p></div>
            <div className='HoverableList'><p>PyCharm</p></div>
            <div className='HoverableList'><p>Atom</p></div>
            <div className='HoverableList'><p>Notepad++</p></div>
            <div className='HoverableList'><p>SSMS</p></div>
            <div className='HoverableList'><p>IGEL UMS</p></div>
            <div className='break' />
            <h3>Operating Systems</h3>
            <div className='break' />
            <div className='HoverableList'><p>Windows XP-11</p></div>
            <div className='HoverableList'><p>MacOS</p></div>
            <div className='HoverableList'><p>Android 4+</p></div>
            <div className='HoverableList'><p>iPadOS</p></div>
            <div className='HoverableList'><p>Ubuntu</p></div>
            <div className='HoverableList'><p>Ubuntu Server</p></div>
            <div className='HoverableList'><p>Linux Mint</p></div>
            <div className='HoverableList'><p>lubuntu</p></div>
            <div className='HoverableList'><p>IGEL</p></div>
            <div className='break' />
            <h3>Misc</h3>
            <div className='break' />
            <div className='HoverableList'><p>Machine Learning</p></div>
            <div className='HoverableList'><p>Audio Engineering</p></div>
            <div className='HoverableList'><p>Sound Systems</p></div>
            <div className='HoverableList'><p>Car Repairs</p></div>
            <hr />
            <h2>Work History</h2>
            <div className='break' />
            <h3>Might remove this</h3>
        </div></div>
    )
}

export default AboutPage

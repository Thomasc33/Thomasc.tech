/* eslint-disable eqeqeq */
import React from 'react'
import { Link } from 'react-router-dom'
import ParticlesElement from './Particles';
import HomeIcon from '@material-ui/icons/Home'
import CodeIcon from '@material-ui/icons/Code';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import '../css/Template.css';

function PageTemplate(props) {
    const accent = localStorage.getItem('accentColor') || '#aa00ff'

    return (
        <div className="App">
            <ParticlesElement color={accent} />
            <div className='HeaderBar' id='HeaderNavBar'>
                <div className='TitleArea'>
                    <h1>{props.title ? props.title : document.title ? document.title : 'Thomas'}</h1>
                </div>
                <div className='NavigationIcons'>
                    <div className='HeaderIcon' onClick={e => { props.setPage(0) }}><Link to='/'><HomeIcon style={{ fill: props.Page == '0' ? accent : 'white' }} /></Link></div>
                    <div className='HeaderIcon' onClick={e => { props.setPage(1) }}><Link to='/projects'><CodeIcon style={{ fill: props.Page == '1' ? accent : 'white' }} /></Link></div>
                    <div className='HeaderIcon' onClick={e => { props.setPage(2) }}><Link to='/about'><PersonIcon style={{ fill: props.Page == '2' ? accent : 'white' }} /></Link></div>
                    <div className='HeaderIcon' onClick={e => { props.setPage(3) }}><Link to='/contact'><MailIcon style={{ fill: props.Page == '3' ? accent : 'white' }} /></Link></div>
                </div>
                <div className='ConnectionIcons'>
                    <div className='HeaderIcon'><a href='https://github.com/Tcarr9442' target="_blank" rel="noreferrer" style={{ color: 'white' }}><GitHubIcon /></a></div>
                    <div className='HeaderIcon'><a href='https://www.linkedin.com/in/thomasc33/' target="_blank" rel="noreferrer" style={{ color: 'white' }}><LinkedInIcon /></a></div>
                </div>
            </div>
        </div>
    )
}

export default PageTemplate
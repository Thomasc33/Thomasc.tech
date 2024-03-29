/* eslint-disable eqeqeq */
import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import CodeIcon from '@material-ui/icons/Code';
import PersonIcon from '@material-ui/icons/Person';
import ArticleIcon from '@mui/icons-material/Article';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import '../css/Template.css';
const isUNCC = require('../isUNCC.json').isUNCC


function PageTemplate(props) {
    const accent = localStorage.getItem('accentColor') || '#aa00ff'

    return (
        <div className="App">
            <div className='HeaderBar' id='HeaderNavBar' style={{ zIndex: 999 }}>
                <div className='TitleArea'>
                    <h1>{props.title ? props.title : document.title ? document.title : 'Thomas'}</h1>
                </div>
                <div className='NavigationIcons'>
                    <div className='HeaderIcon' onClick={e => { props.setPage(0) }}><Link to={`${isUNCC ? '/tcarr23' : ''}/`}><HomeIcon style={{ fill: props.Page == '0' ? accent : 'white' }} /></Link></div>
                    <div className='HeaderIcon' onClick={e => { props.setPage(1) }}><Link to={`${isUNCC ? '/tcarr23' : ''}/projects`}><CodeIcon style={{ fill: props.Page == '1' ? accent : 'white' }} /></Link></div>
                    <div className='HeaderIcon' onClick={e => { props.setPage(2) }}><Link to={`${isUNCC ? '/tcarr23' : ''}/about`}><PersonIcon style={{ fill: props.Page == '2' ? accent : 'white' }} /></Link></div>
                    <div className='HeaderIcon' onClick={e => { props.setPage(3) }}><Link to={`${isUNCC ? '/tcarr23' : ''}/publications`}><ArticleIcon style={{ fill: props.Page == '3' ? accent : 'white' }} /></Link></div>
                    <div className='HeaderIcon' onClick={e => { props.setPage(4) }}><Link to={`${isUNCC ? '/tcarr23' : ''}/contact`}><MailIcon style={{ fill: props.Page == '4' ? accent : 'white' }} /></Link></div>
                </div>
                <div className='ConnectionIcons'>
                    <div className='HeaderIcon'><a href='https://github.com/thomasc33' target="_blank" rel="noreferrer" style={{ color: 'white' }}><GitHubIcon /></a></div>
                    <div className='HeaderIcon'><a href='https://www.linkedin.com/in/thomasc33/' target="_blank" rel="noreferrer" style={{ color: 'white' }}><LinkedInIcon /></a></div>
                </div>
            </div>
        </div>
    )
}

export default PageTemplate
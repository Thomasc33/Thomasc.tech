import React from 'react'
import { Link } from 'react-router-dom';
import ParticlesElement from './Particles';
import HomeIcon from '@material-ui/icons/Home'
import CodeIcon from '@material-ui/icons/Code';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import '../css/Template.css';

function PageTemplate(props) {
    const accent = localStorage.getItem('accentColor') || '#aa00ff'

    return (
        <div className="App">
            <ParticlesElement color={accent} />
            <div className='Header'>
                <div><Link className='Link' to='/' style={{ color: props.highLight === "0" ? accent : 'white' }}><HomeIcon /></Link></div>
                <div><Link to='/projects' style={{ color: props.highLight === "1" ? accent : 'white' }}><CodeIcon /></Link></div>
                <div><Link to='/about' style={{ color: props.highLight === "2" ? accent : 'white' }}><PersonIcon /></Link></div>
                <div><Link to='/contact' style={{ color: props.highLight === "3" ? accent : 'white' }}><MailIcon /></Link></div>
            </div>
        </div>
    )
}

export default PageTemplate
//
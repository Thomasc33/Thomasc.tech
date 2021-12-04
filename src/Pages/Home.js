import React from 'react';
import '../css/Home.css'

function HomePage(props) {
    let headerHeight = document.getElementsByClassName('HeaderBar')
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight
    else headerHeight = 68
    return (
        <div style={{ position: 'absolute', top: `${headerHeight}px`, width: '100vw', height: '92vh', color: 'white', overflow: 'scroll' }}>
            <div className='HomePage'>
                <div className='Photo'>
                    <img style={{ maxWidth: '90%', maxHeight: '75%' }} alt='thomas' src='https://lh3.googleusercontent.com/ZQOdq7hAPjhJJub4W4z9ZV7SfXV3XPmqpWEhmSP8k7CgYm8tsYguknek_cjegAa37TGs5cXcyBRAUrH3u2owkSNai4VVCkxQBDWHCNcHzoiQox3nBoUlkcoIewARdrl20BWRds6qR61Uwl60JIe8spWRb7ODOgvaD74_YcvrsWgyypfUMDZMvSCR5coKQg2xno7EAJtTnRQLzmksDvhN5VVe73eyC9zZguWY5MlFkZQDGLqkbekijbAJHBqJW9ocCLjgLdHMUaIO9dXlNC1-yYpmhzoO4ninJpeDLE2b0ub8f0jSGcCyx78wuY17SwSps7bIKOq7aavOAoPPn1-h67VbvKu9bY6XIb1pRb9opnmkEEWCw0sXnagnCpIRNbD2_2R_AhfYJj0OQ4gGr1nAMSDsuAIBo5Y4s15eGAu1vnZSbSBQOV2X9E5Ai6xJGytUfx7lVMqeg9HTCrsBEfGULY3avXsUv677zUPJ84cIQPZQmIn_CUBYoX3jX45yU-tA3wskFeXusnHJtxfzbl896qjHlv-vhDYvZ-HHyVqabiAyym7MRr754HXk_K4yOj5wQMRm1bfwKeCsmgYonDqsePbp0NbhYxaTMKpUjNB7IUlp5zSH1XNkHLPFgzZRpQjIh5Y-Z9Aisam6CPBXw1KW-SBCLFqBSnyFSQ8nPSMp3PiDpFZnSjRh8vzBe850alx0-RP2Q2NwL1tIutwG65HitBW0=w440-h977-no?authuser=0' />
                    <div className='break' />
                    <p>*This photo will be changed once i get professional shots</p>
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

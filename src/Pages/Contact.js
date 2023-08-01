import React from 'react';
import ContactForm from '../Components/ContactForm'
// Recaptcha
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function ContactPage(props) {
    let headerHeight = document.getElementById('HeaderNavBar')
    if (headerHeight && headerHeight[0] && headerHeight[0].offsetHeight) headerHeight = headerHeight[0].offsetHeight
    else headerHeight = 68
    return (
        <div style={{ position: 'absolute', top: `${headerHeight}px`, width: '100vw', color: 'white', textAlign: 'center', padding: '5rem 0', display: 'flex', justifyContent: 'center' }}>
            <GoogleReCaptchaProvider reCaptchaKey="6LfeKHAnAAAAAEMhaDCTuwgrIT4HvxG3Ur3AXnjs">
                <ContactForm />
            </GoogleReCaptchaProvider>
        </div>
    )
}

export default ContactPage

import React from 'react';
import ContactForm from '../Components/ContactForm'
// Recaptcha
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function ContactPage(props) {
    // No need to manually calculate header height anymore as we use CSS variables
    return (
        <section className="contact-page">
            <div className="contact-container">
                <header>
                    <h1 className="visually-hidden">Contact Thomas Carr</h1>
                    <p className="visually-hidden">Get in touch with Thomas Carr for research collaborations, speaking engagements, or academic inquiries.</p>
                </header>
                <div className="contact-form-section">
                    <GoogleReCaptchaProvider reCaptchaKey="6LfeKHAnAAAAAEMhaDCTuwgrIT4HvxG3Ur3AXnjs">
                        <ContactForm />
                    </GoogleReCaptchaProvider>
                </div>
            </div>
        </section>
    )
}

export default ContactPage

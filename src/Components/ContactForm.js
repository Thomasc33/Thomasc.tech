import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import '../css/Contact.css'

function ContactForm() {
    const accent = localStorage.getItem('accentColor') || '#aa00ff'
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [state, handleSubmit] = useForm("xoqojdgv", {
        data: { "g-recaptcha-response": executeRecaptcha }
    });
    if (state.succeeded) {
        return (
            <div className="success-message">
                <h2>Message Received!</h2>
                <p>Thank you for contacting Thomas Carr. Your message has been received and will be responded to promptly.</p>
            </div>
        );
    }
    return (
        <form onSubmit={handleSubmit} aria-label="Contact Form" className="contact-form">
            <h2>Get in Touch</h2>
            <p className="form-description">Send a message to Thomas Carr regarding research collaborations, speaking engagements, or academic inquiries.</p>

            <div className="form-group">
                <label htmlFor="email">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    aria-required="true"
                    placeholder="your.email@example.com"
                />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                />
            </div>

            <div className="form-group">
                <label htmlFor="message">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    aria-required="true"
                    placeholder="Your message here..."
                    rows="5"
                />
                <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                />
            </div>

            <button
                type="submit"
                disabled={state.submitting}
                style={{ backgroundColor: accent }}
                aria-label="Submit Contact Form"
            >
                {state.submitting ? 'Sending...' : 'Submit'}
            </button>
        </form>
    );
}

export default ContactForm
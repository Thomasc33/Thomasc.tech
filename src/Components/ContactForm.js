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
        return <p>Message Received!</p>;
    }
    return (<form onSubmit={handleSubmit}>
        <label htmlFor="email">
            Email Address
        </label>
        <input
            id="email"
            type="email"
            name="email"
        />
        <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
        />
        <label htmlFor="message">
            Message
        </label>
        <textarea
            id="message"
            name="message"
        />
        <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
        />
        <button type="submit" disabled={state.submitting} style={{ backgroundColor: accent }}>
            Submit
        </button>
    </form>);
}

export default ContactForm
import React from 'react';

export default function FinalSummary({ firstStep }) {
    return (
        <div className="final-summary">
            <h1>How to stay safe</h1>
                Without knowing anything whatsoever about which threat brought you here, here are some tips that are
                almost certain to help:
            <ul>
                <li>Don't panic</li>
                <li>Get vaccinated</li>
                <li>Wash your hands regularly</li>
                <li>Get a regular check-up with your doctor, even when you're healthy</li>
                <li>Get your news from reliable, low-panic sources</li>
                <li>Maybe avoid knife-fights?</li>
                <li>Don't panic</li>
            </ul>
            <div>
                <button type="button" onClick={firstStep}>Try another threat</button>
            </div>
        </div>
    );
}

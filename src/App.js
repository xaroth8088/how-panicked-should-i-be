import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import AsDeadlyAs from './AsDeadlyAs.js';
import PanicStats from './PanicStats.js';
import AffectedCountries from './AffectedCountries.js';
import DeathCount from './DeathCount.js';
import 'flag-icon-css/css/flag-icon.min.css';
import './App.css';
import './odometer-theme-car.css';

function App() {
    const [magnitude, setMagnitude] = useState(3);
    const [countries, setCountries] = useState(new Set([]));

    return (
        <div className="App">
            <StepWizard isLazyMount initialStep={0}>
                <DeathCount magnitude={magnitude} setMagnitude={setMagnitude} />
                <AffectedCountries countries={countries} setCountries={setCountries} />
                <PanicStats countries={countries} magnitude={magnitude} />
                <AsDeadlyAs countries={countries} magnitude={magnitude} />
            </StepWizard>
        </div>
    );
}

export default App;

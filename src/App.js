import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import AsDeadlyAs from './AsDeadlyAs.js';
import PanicStats from './PanicStats.js';
import Introduction from './Introduction.js';
import AffectedCountries from './AffectedCountries.js';
import DeathCount from './DeathCount.js';
import FinalSummary from './FinalSummary.js';
import 'flag-icon-css/css/flag-icon.min.css';
import './App.css';
import './odometer-theme-car.css';
import 'animate.css/animate.min.css'

function App() {
    const [magnitude, setMagnitude] = useState(2);
    const [countries, setCountries] = useState(new Set([]));

    return (
        <div className="App">
            <StepWizard
                isLazyMount
                transitions={{
                    enterLeft: 'fadeIn animated',
                    enterRight: 'fadeIn animated',
                    exitLeft: 'fadeOut animated',
                    exitRight: 'fadeOut animated'
                }}
            >
                <Introduction />
                <DeathCount magnitude={magnitude} setMagnitude={setMagnitude} />
                <AffectedCountries countries={countries} setCountries={setCountries} />
                <PanicStats countries={countries} magnitude={magnitude} />
                <AsDeadlyAs countries={countries} magnitude={magnitude} />
                <FinalSummary />
            </StepWizard>
        </div>
    );
}

export default App;

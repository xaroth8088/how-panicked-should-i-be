import React from 'react';
import countryData from './countryData.json';
import deathData from './deathData.json';

export default function AsDeadlyAs({ magnitude, countries, nextStep }) {
    const population = [...countries].reduce(
        (acc, key) => acc + countryData[key].population,
        0
    );
    const risk = (10 ** magnitude) / population;
    let riskString = 'Unknowable, because this webpage had a problem';
    const moreLikelyDeaths = deathData
        .filter(   // Get rid of anything less dangerous that what's been given to us
            (datum) => (datum.deaths / countryData['us'].population) > risk
        )
        .sort(   // Get the remaining list in ascending order of deaths
            (a, b) => a.deaths - b.deaths
        )
        .slice(0,5); // grab a small number of them to pick from

    if (moreLikelyDeaths.length === 0) {
        return (
            <div className="as-deadly-as">
                <h1>So, how bad is it?</h1>
                <h2>If it were possible for that many people to have died, this would be a good time to panic!</h2>
            </div>
        );
    }

    const stack = moreLikelyDeaths.reverse().map(
        (moreLikelyDeath) => {
            const deathEstimate = (moreLikelyDeath.deaths / countryData['us'].population) / risk;

            return (
                <tr className="animated fadeInDownBig" key={moreLikelyDeath.code}>
                    <td>{moreLikelyDeath.cause}</td>
                    <td>{`${deathEstimate.toFixed(1)}x`}</td>
                </tr>
            )
        }
    );

    stack.push(
        <tr className="animated fadeInDownBig" key="whatever-brought-you-here">
            <td>Whatever brought you here</td>
            <td>1.0x</td>
        </tr>
    );

    return (
        <div className="as-deadly-as">
            <h1>How does it compare?</h1>
            <table>
                <thead>
                    <th>
                        Cause of death
                    </th>
                    <th>
                        Annual death rate
                    </th>
                </thead>
                <tbody>
                    {stack}
                </tbody>
            </table>
            <div className="animated fadeIn">
                <button type="button" onClick={nextStep}>How can I protect myself?</button>
            </div>
        </div>
    );
}

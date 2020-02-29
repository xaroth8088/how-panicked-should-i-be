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
    const moreLikelyDeath = deathData
        .filter(   // Get rid of anything less dangerous that what's been given to us
            (datum) => (datum.deaths / countryData['us'].population) > risk
        )
        .sort(   // Get the remaining list in ascending order of deaths
            (a, b) => a.deaths - b.deaths
        )
        .slice(0,5) // grab a small number of them to pick from
        .sort(  // Randomize, so that it's not always the same reason
            () => 0.5 - Math.random()
        )[0];   // get the first element, if any

    if (moreLikelyDeath === undefined) {
        return (
            <div className="as-deadly-as">
                <h1>So, how bad is it?</h1>
                <h2>If it were possible for that many people to have died, this would be a good time to panic!</h2>
            </div>
        );
    }

    const deathEstimate = (moreLikelyDeath.deaths / countryData['us'].population) / risk;

    riskString = `You are more likely to be killed due to "${moreLikelyDeath.cause}", which kills something like ${deathEstimate.toFixed(1)} times more people.`;

    return (
        <div className="as-deadly-as">
            <h1>So, how bad is it?</h1>
            <h2>{riskString}</h2>
            <i>Scary stuff, eh?</i>
        </div>
    );
}

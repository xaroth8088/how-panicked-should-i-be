import React from 'react';
import countryData from './countryData.json';
import deathData from './deathData.json';

const USER_ENTERED_DEATH_REASON_CODE = 'affc763f-8049-4d22-aed5-212b5bd0beb4';

export default function AsDeadlyAs({ magnitude, countries, nextStep, firstStep }) {
    const population = [...countries].reduce(
        (acc, key) => acc + countryData[key].population,
        0
    );
    const risk = (10 ** magnitude) / population;

    const deathLikelihoods = [
        ...deathData,
        {
            code: USER_ENTERED_DEATH_REASON_CODE,
            cause: 'Whatever Brought You Here',
            deaths: risk * countryData['us'].population
        }
    ]
        .sort(  // Sort in descending order
            (a, b) => b.deaths - a.deaths
        );

    // Ideally, we want 4 worse causes of death.  But, if we can't find 4, we still want to display 5 items.
    let startIndex = deathLikelihoods.findIndex((e) => e.code === USER_ENTERED_DEATH_REASON_CODE);
    if (startIndex === 0) {
        return (
            <div className="as-deadly-as">
                <h1>So, how bad is it?</h1>
                <p>
                    If what you&apos;ve entered is accurate, it&apos;ll be worse than any known cause of death.
                </p>
                <p>
                    Double-check those numbers, but if they're right then go ahead and panic to your heart's content.
                </p>
                <div>
                    <button type="button" className="animated fadeIn" onClick={firstStep}>Try again</button>
                </div>
            </div>
        );
    }

    startIndex -= 4;
    if (startIndex < 0) {
        startIndex = 0;
    }
    const moreLikelyDeaths = deathLikelihoods.slice(startIndex, startIndex + 5).reverse();

    const stack = moreLikelyDeaths.reverse().map(
        (moreLikelyDeath) => {
            const deathEstimate = (moreLikelyDeath.deaths / countryData['us'].population) / risk;

            return (
                <tr className="animated fadeInDownBig" key={moreLikelyDeath.code}>
                    <td>{moreLikelyDeath.cause}</td>
                    <td>{
                        moreLikelyDeath.code === USER_ENTERED_DEATH_REASON_CODE
                            ? '1.0x'    // To prevent rounding problems from preventing this from coming out at 1.0x
                            : `${deathEstimate.toFixed(1)}x`
                    }</td>
                </tr>
            );
        }
    );

    let reaction;
    if (risk > 0.1) {
        reaction = (
            <>
                Believe it or not, humanity has survived worse than this.  Stay safe and good luck!
            </>
        );
    } else if (risk > 0.02) {
        reaction = (
            <>
                If accurate, this seems pretty bad.  Take reasonable precautions and <em>don&apos;t panic</em>.
            </>
        );
    } else if (risk > 0.0002) {
        reaction = (
            <>
                While this <em>is</em> pretty bad, it&apos;s not bad enough to warrant panic.
            </>
        );
    } else if (risk > 0.000002) {
        reaction = (
            <>
                It seems that common sense aught to be enough to keep you safe.
            </>
        );
    } else {
        reaction = (
            <>
                Why are you here?  Is this even worth worrying about?
            </>
        );
    }

    return (
        <div className="as-deadly-as">
            <h1>How does it compare?</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            Cause of death
                        </th>
                        <th>
                            Annual deaths
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stack}
                </tbody>
            </table>
            <div className="animated fadeIn reaction">
                {reaction}
            </div>
            <div className="animated fadeIn">
                <button type="button" onClick={nextStep}>How can I protect myself?</button>
            </div>
        </div>
    );
}

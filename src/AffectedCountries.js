import CheckBox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import React from 'react';
import Odometer from 'react-odometerjs';
import countryData from './countryData.json';

export default function AffectedCountries({ countries, setCountries, nextStep }) {
    return (
        <div>
            <div className="affected-countries">
                <div className="affected-countries__risk-count">
                    <h1>Which countries are affected?</h1>
                    <Odometer
                        value={
                            [...countries].reduce(
                                (acc, key) => acc + countryData[key].population,
                                0
                            )
                        }
                        format="(,ddd)"
                    />
                </div>
                <div className="affected-countries__country-checkboxes">
                    {
                        Object.keys(countryData).reduce(
                            (acc, key) => {
                                acc.push(
                                    <div className="countryCheckbox" key={key}>
                                        <label>
                                            <CheckBox
                                                checked={countries.has(key)}
                                                onChange={
                                                    ({ target }) => {
                                                        const newCountries = new Set(countries);
                                                        if (target.checked) {
                                                            newCountries.add(key);
                                                        } else {
                                                            newCountries.delete(key);
                                                        }
                                                        setCountries(newCountries);
                                                    }
                                                }
                                            />
                                            <span className={`flag-icon flag-icon-${key}`}></span>
                                            {countryData[key].name}
                                        </label>
                                    </div>
                                );
                                return acc;
                            },
                            []
                        )
                    }
                </div>
            </div>
            <div>
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={countries.size === 0}
                >
                    Let's look at the math
                </button>
            </div>
        </div>
    );
}

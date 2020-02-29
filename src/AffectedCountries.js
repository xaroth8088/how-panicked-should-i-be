import CheckBox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import React from 'react';
import Odometer from 'react-odometerjs';
import countryData from './countryData.json';

export default function AffectedCountries({ countries, setCountries, nextStep, previousStep }) {
    return (
        <div className="affected-countries">
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
                                            ({target}) => {
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
            <h2>Total number of people at risk</h2>
            <Odometer
                value={
                    [...countries].reduce(
                        (acc, key) => acc + countryData[key].population,
                        0
                    )
                }
                format="(,ddd)"
            />
            <button
                type="button"
                onClick={previousStep}
            >
                Previous Step
            </button>
            <button
                type="button"
                onClick={nextStep}
            >
                Next Step
            </button>

        </div>
    );
}

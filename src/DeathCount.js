import React from 'react';
import Odometer from 'react-odometerjs';

export default function DeathCount({ magnitude, setMagnitude, nextStep }) {
    return (
        <div className="death-count">
            <h1>
                How many have died so far?
            </h1>
            <Odometer
                value={10 ** magnitude}
                format="(,ddd)"
                duration={1500}
            />
            <div className="buttons">
                <button
                    type="button"
                    onClick={
                        () => {
                            setMagnitude(magnitude < 5.75 ? magnitude + 0.25 : magnitude);
                        }
                    }
                >
                    More
                </button>
                <button
                    type="button"
                    onClick={
                        () => {
                            setMagnitude(magnitude > 0 ? magnitude - 0.25 : magnitude);
                        }
                    }
                >
                    Fewer
                </button>
            </div>
            <div>
                <button
                    type="button"
                    onClick={nextStep}
                >
                    Next Step
                </button>
            </div>
        </div>
    );
}

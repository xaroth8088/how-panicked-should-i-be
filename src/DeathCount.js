import React from 'react';
import Odometer from 'react-odometerjs';

export default function DeathCount({ magnitude, setMagnitude, nextStep }) {
    return (
        <div>
            <h1>
                Roughly how many have died from this threat so far?
            </h1>
            <Odometer
                value={10 ** magnitude}
                format="(,ddd)"
                duration={1500}
            />
            <button
                type="button"
                onClick={
                    () => {
                        setMagnitude(magnitude < 6 ? magnitude + 0.25 : magnitude);
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
            <button
                type="button"
                onClick={nextStep}
            >
                Next Step
            </button>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import countryData from './countryData.json';

export default function PanicStats({ magnitude, countries, nextStep }) {
    const population = [...countries].reduce(
        (acc, key) => acc + countryData[key].population,
        0
    );

    const [options, setOptions] = useState({
        chart: {
            animations: {
                enabled: true,
                speed: 3000,
                easing: 'easeinout',
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        labels: [`Population: ${population}`],
        dataLabels: {
            formatter: (val, { seriesIndex }) => {
                return `${seriesIndex === 0 ? 'Alive' : 'Dead'}: ${val.toFixed(5)}%`;
            }
        }
    });
    const [series, setSeries] = useState([population]);
    const [showingNext, setShowingNext] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOptions({
                ...options,
                labels: [`Population: ${population}`, `Deaths: ${(10 ** magnitude).toFixed(0)}`]
            });
            setSeries([...series, 10 ** magnitude]);
            setShowingNext(true);
        }, 5000);
    }, [magnitude, countries]);

    return (
        <div className="panic-stats">
            <Chart
                type="pie"
                series={series}
                options={options}
                width={500}
            />
            {
                showingNext === false
                    ? false
                    : (
                        <button type="button" onClick={nextStep}>Next</button>
                    )
            }
        </div>
    );
}

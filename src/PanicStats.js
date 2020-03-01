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
        labels: [`Population: ${new Intl.NumberFormat().format(population)}`],
        dataLabels: {
            formatter: (val, { seriesIndex }) => {
                return `${seriesIndex === 0 ? 'Alive' : 'Dead'}: ${val.toFixed(6)}%`;
            }
        },
        legend: {
            labels: {
                colors: ['#fff', '#fff']
            },
            position: 'bottom',
        },
        stroke: {
            colors: ['#00000000', '#fff'],
            width: 1
        },
        tooltip: {
            y: {
                formatter: () => ''
            }
        }
    });
    const [series, setSeries] = useState([population]);
    const [showingNext, setShowingNext] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOptions({
                ...options,
                labels: [`Population: ${new Intl.NumberFormat().format(population)}`, `Deaths: ${new Intl.NumberFormat().format((10 ** magnitude).toFixed(0))}`]
            });
            setSeries([...series, 10 ** magnitude]);
            setShowingNext(true);
        }, 5000);
    }, [magnitude, countries]);

    return (
        <div className="panic-stats">
            <h1>Deaths versus population</h1>
            <Chart
                type="pie"
                series={series}
                options={options}
                width={320}
            />
            {
                showingNext === false
                    ? false
                    : (
                        <div>
                            <button type="button" className="animated fadeIn" onClick={nextStep}>Put it in context</button>
                        </div>
                    )
            }
        </div>
    );
}

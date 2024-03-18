import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { ROUTE_ID_NAME_MAPPING } from '../../utils/constants';

const RouteChart = ({ routeId, routes }) => {
  useEffect(() => {
    const { stopTimes, distances, stops } = routes[routeId];
    const ctx = document.getElementById(`stopTimesChart_${routeId}`);

    if (ctx) {
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      const timeLabels = stopTimes.map(time => {
        const timeParts = time.stopTime.arrival_time.split(':');
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const meridian = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12
        return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${meridian}`;
      });
      const stopLabels = stops.map(stop => stop.stop_name);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: timeLabels,
          datasets: [{
            label: `Route ${ROUTE_ID_NAME_MAPPING[routeId]} Distance`, // Use route ID mapping
            data: distances,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Stops'
              },
              ticks: {
                autoSkip: true,
              },
              labels: stopLabels,
            },
            y: {
              title: {
                display: true,
                text: 'Time'
              },
              ticks: {
                callback: function (value, index, values) {
                  return timeLabels[index];
                }
              },
            }
          }
        }
      });
    }
  }, [routeId, routes, ROUTE_ID_NAME_MAPPING]);

  return (
    <div key={`chart_${routeId}`}>
      <h2>Fahrplan - {ROUTE_ID_NAME_MAPPING[routeId]}</h2>
      <canvas id={`stopTimesChart_${routeId}`} width="800" height="800"></canvas>
    </div>
  );
};

export default RouteChart;

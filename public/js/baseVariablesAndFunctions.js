console.log('about to fetch some weather data');

const CANVAS = document.getElementsByTagName('canvas')[0],
  CTX = CANVAS.getContext('2d'),
  CITIES = ['Arica', 'Antofagasta', 'La Serena', 'Valparaíso', 'Los Andes', 'Santiago', 'Talca', 'Concepción', 'Valdivia', 'Puerto Montt', 'Punta Arenas'];

CANVAS.width = innerWidth;
CANVAS.height = innerHeight;
document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';

let temperatures = [],
  cities = [],
  colors = [];

function randomRGBA() {
  let color = 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.random() + ')';

  if (!(color < 'rgba(0, 0, 0, 1)' && color > 'rgba(0, 0, 0, 0)')) {
    return color;
  }
}

function chart(cities, temperatures, colors) {
  let chart = new Chart(CTX,
    {
      type: 'horizontalBar',
      data:
      {
        labels: cities,
        datasets: [
          {
            label: 'Current Temperature',
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
            data: temperatures
          }
        ]
      },
      options:
      {
        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines:
              {
                display: true,
                color: 'rgba(255, 255, 255, 0.6)'
              },
              ticks:
              {
                beginAtZero: true,
              }
            }
          ],
          xAxes: [
            {
              stacked: true,
              gridLines:
              {
                display: true
              }
            }
          ]
        }
      }
    }
  );
}

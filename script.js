const CANVAS = document.getElementById('weatherChart'),
  CTX = CANVAS.getContext('2d'),
  KEY = '550bcc4f3661bf6aaff5ce884577241c',
  CITY = ['Arica', 'Antofagasta', 'La Serena', 'Valparaíso', 'Los Andes', 'Santiago', 'Talca', 'Concepción', 'Valdivia', 'Puerto Montt', 'Punta Arenas'],
  COUNTRY = ', CL';

CANVAS.width = innerWidth;
CANVAS.height = innerHeight;
document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';

let temperatures = [],
  cities = [];

function response() {
  if (this.responseText.charAt(0) === '{') {
    let obj = JSON.parse(this.responseText);
    for (let [index, contents] of Object.entries(obj)) {
      if (typeof contents === 'object') {
        for (let [i, c] of Object.entries(contents)) {
          // console.log(i, c);
          if (i === 'temp') {
            temperatures.push(c);
          }
        }
      } else if (typeof contents === 'string' && contents !== 'stations') {
        // console.log('string', contents);
        cities.push(contents);
      } else if (typeof contents === 'number') {
        // console.log('number', contents);
      } else {
        // console.log('filtered elements', contents);
      }
    }
  } else {
    console.log('Syntax error');
  }
  chart();
}

function chart() {
  let chart = new Chart(CTX, {
      type: 'horizontalBar',
      data: {
          labels: cities,
          datasets: [{
              label: 'Current Temperature in Chile',
              data: temperatures,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(126, 72, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(126, 72, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}

for (let i = 0; i < CITY.length; i++) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', "https://api.openweathermap.org/data/2.5/weather?q=" + CITY[i] + COUNTRY + "&units=metric&apikey=" + KEY);
  xhr.onload = response;
  xhr.send();
}

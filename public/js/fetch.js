async function getData(CITIES) {
  for (let [i, city] of Object.entries(CITIES)) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + ', CL&units=metric&apikey=550bcc4f3661bf6aaff5ce884577241c');
    const data = await response.json();
    cities.push(data.name);
    temperatures.push(data.main.temp);
    colors.push(randomRGBA());
  }
  chart(cities, temperatures, colors);
}

getData(CITIES)
  .then(response => {
    console.log('yay');
  })
  .catch(error => {
    console.log('error!');
    console.error(error);
  });

window.addEventListener('unhandledrejection', (e) => {
  console.log(e);
  e.preventDefault();
}, false);
